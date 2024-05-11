// @ts-nocheck
'use client'

import { PropsWithChildren, useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { trpc } from '@/app/_trpc/client'
import { httpBatchLink } from '@trpc/client'
import { transformer } from '@/lib/utils/transformer'
import { absoluteUrl } from '@/lib/utils/core'

const TrpcProvider = ({ children }: PropsWithChildren) => {
  const [queryClient] = useState(() => new QueryClient())
  const [trpcClient] = useState(() =>
    trpc.createClient({
      transformer,
      links: [
        loggerLink({
          enabled: () => true,
        }),
        httpBatchLink({
          url: absoluteUrl('/api/trpc'),
        }),
      ],
    })
  )

  return (
    <trpc.Provider
      client={trpcClient}
      queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
      {children}
    </trpc.Provider>
  )
}

export default TrpcProvider
