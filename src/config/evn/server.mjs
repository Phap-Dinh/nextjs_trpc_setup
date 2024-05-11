import { z } from 'zod'

const server = z.object({
	NODE_ENV: z.enum(['development', 'test', 'production']),
})

const client = z.object({})

const processEnv = {
	NODE_ENV: process.env.NODE_ENV,
}

const merged = server.merge(client)

let env = (process.env)

if (!!process.env.SKIP_ENV_VALIDATION == false) {
	const isServer = typeof window === 'undefined'

	const parsed = (
		isServer
			? merged.safeParse(processEnv) 
			: client.safeParse(processEnv)
	)

	if (parsed.success === false) {
		console.error(
			'❌ Invalid environment variables:',
			parsed.error.flatten().fieldErrors
		)
		throw new Error('Invalid environment variables')
	}

	env = new Proxy(parsed.data, {
		get(target, prop) {
			if (typeof prop !== 'string') return undefined
			
			if (!isServer && !prop.startsWith('NEXT_PUBLIC_'))
				throw new Error(
					process.env.NODE_ENV === 'production'
						? '❌ Attempted to access a server-side environment variable on the client'
						: `❌ Attempted to access server-side environment variable '${prop}' on the client`
				)
			return target[/** @type {keyof typeof target} */ (prop)]
		},
	})
}

export { env }
