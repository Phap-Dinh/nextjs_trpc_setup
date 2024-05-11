import { httpBatchLink, loggerLink } from '@trpc/client'
import { createTRPCNext } from '@trpc/next'
import { inferRouterInputs, inferRouterOutputs } from '@trpc/server'
import type { AppRouter } from '@/server/routers'
import { NextPageContext } from 'next'
import { transformer } from './transformer'

const getBaseUrl = () => {
	if (typeof window !== 'undefined') {
		return ''
	}

	if (process.env.VERCEL_URL) {
		return `https://${process.env.VERCEL_URL}`
	}

	if (process.env.RENDER_INTERNAL_HOSTNAME) {
		return `https://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`
	}

	return `${process.env.SERVER_URL}:${process.env.SERVER_PORT ?? 3000}`
}

export interface SSRContext extends NextPageContext {
	status?: number
}

export const trpc = createTRPCNext<AppRouter, SSRContext>({
	config({ ctx }) {
		return {
			transformer,
			links: [
				loggerLink({
					enabled: (opts) =>
						process.env.NODE_ENV === 'development' ||
						(opts.direction === 'down' && opts.result instanceof Error),
				}),
				httpBatchLink({
					url: `${getBaseUrl()}/api/trpc`,
					headers() {
						if (!ctx?.req?.headers) {
							return {}
						}
						// To use SSR properly, you need to forward the client's headers to the server
						// This is so you can pass through things like cookies when we're server-side rendering

						const {
							// If you're using Node 18 before 18.15.0, omit the "connection" header
							connection: _connection,
							...headers
						} = ctx.req.headers

						return {
							cookie: ctx.req.headers.cookie,
							...headers,
						}
					},
				}),
			],
			queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
		}
	},
	ssr: true,
	responseMeta(opts) {
		const ctx = opts.ctx as SSRContext

		if (ctx.status) {
			return {
				status: ctx.status,
			}
		}

		const error = opts.clientErrors[0]
		if (error) {
			return {
				status: error.data?.httpStatus ?? 500,
			}
		}

		return {}
	},
})

export const withTRPC = trpc.withTRPC
export type RouterInput = inferRouterInputs<AppRouter>
export type RouterOutput = inferRouterOutputs<AppRouter>
