import { z } from 'zod'

export const serverSchema = z.object({
	NODE_ENV: z.enum(['development', 'test', 'production']),
})

export const serverEnv = {
	NODE_ENV: process.env.NODE_ENV,
}

export const clientSchema = z.object({
})

export const clientEnv = {
}
