import { AppRouter } from '@/server/routers'
import { createTRPCReact } from '@trpc/react-query'

export const trpc = createTRPCReact<AppRouter>({
	unstable_overrides: {
		useMutation: {
			async onSuccess(opts) {
				await opts.originalFn()
				await opts.queryClient.invalidateQueries()
			},
		},
	},
})
