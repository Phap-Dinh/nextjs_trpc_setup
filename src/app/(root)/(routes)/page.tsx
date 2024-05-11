'use client'

import AppWrapper from '@/components/Layouts/AppWrapper'
import { trpc } from '@/app/_trpc/client'
import { withTRPC } from '@/lib/utils/trpc'

const Home = () => {
  const hello = trpc.hello.useQuery({ text: 'tRPC' })

  return (
    <AppWrapper className='mb-12 mt-28 sm:mt-40 flex flex-col items-center justify-center'>
      <div className='mx-auto mb-4 flex max-x-fit items-center justify-center space-x-2 overflow-hidden'>
        Hello!
      </div>
      <div className='mx-auto mb-4 flex max-x-fit items-center justify-center space-x-2 overflow-hidden'>
        Hi, this text is return from {hello.data?.greeting}
      </div>
    </AppWrapper>
  )
}

export default withTRPC(Home)