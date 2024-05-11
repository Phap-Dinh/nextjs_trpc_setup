import { initTRPC } from '@trpc/server'
import type { inferAsyncReturnType } from '@trpc/server'
import { type CreateNextContextOptions } from '@trpc/server/adapters/next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { ZodError } from 'zod'
import { transformer } from '@/lib/utils/transformer'
import { prisma } from './prisma'

export interface CreateInnerContextOptions
	extends Partial<CreateNextContextOptions> {
	locale: string
	i18n: inferAsyncReturnType<typeof serverSideTranslations>
}

export async function createInnerTRPCContext(opts?: CreateInnerContextOptions) {
	return {
		prisma,
		...opts,
	}
}

export const createTRPCContext = async (opts?: CreateNextContextOptions) => {
	const acceptLanguage = opts?.req.headers['accept-language']
	const locale = acceptLanguage?.includes('en') ? 'en' : 'fr'
	const _i18n = await serverSideTranslations(locale, ['common'])

	const innerContext = await createInnerTRPCContext({
		req: opts?.req,
		locale,
		i18n: _i18n,
	})

	return {
		...innerContext,
		req: opts?.req,
	}
}

export const t = initTRPC.context<typeof createTRPCContext>().create({
	transformer,
	errorFormatter({ shape, error }) {
		return {
			...shape,
			data: {
				...shape.data,
				zodError:
					error.cause instanceof ZodError ? error.cause.flatten() : null,
			},
		}
	},
	allowOutsideOfServer: true,
})

export const middleware = t.middleware
export const router = t.router
export const mergeRouters = t.mergeRouters
export const baseProcedure = t.procedure
