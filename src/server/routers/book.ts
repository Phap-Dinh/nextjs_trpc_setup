import { z } from 'zod'

import { baseProcedure, router } from '@/server/trpc'

const nameSchema = z.object({ name: z.string() })

export const bookRouter = router({
  getBookByName: baseProcedure
    .input(nameSchema)
    .query(async ({ input, ctx }) => {
      const { name } = input
      const { prisma } = ctx

      const book = await prisma.book.findUnique({
        where: { name },
      })
      return book
    }),
})

export type ProviderRouter = typeof bookRouter
