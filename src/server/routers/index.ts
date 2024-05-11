import { TRPCError } from '@trpc/server'
import { z } from 'zod'
// import { absoluteUrl } from '@/lib/utils/core'
import {
  // privateProcedure,
  // publicProcedure,
  router,
  mergeRouters,
} from '@/server/trpc'
import { coreRouter } from '@/server/routers/_core'
import { bookRouter } from '@/server/routers/book'

// Keep adding all sub routers into this mergeRouters()
export const appRouter = mergeRouters(coreRouter, bookRouter)

export type AppRouter = typeof appRouter
