import { z } from 'zod'
import { baseProcedure, router } from '../trpc'

export const coreRouter = router({
	hello: baseProcedure
		.input(
			z.object({
				text: z.string(),
			})
		)
		.query((opts) => {
			return {
				greeting: opts.input.text,
			}
		}),

	i18n: baseProcedure.query(({ ctx }) => ({
		i18n: ctx.i18n,
		locale: ctx.locale,
	})),
})

export type CoreRouter = typeof coreRouter
