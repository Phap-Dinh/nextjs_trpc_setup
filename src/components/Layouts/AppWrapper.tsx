import { ReactNode } from 'react'
import { cn } from '@/lib/utils/ui'

type AppWrapperProps = {
  className?: string
  children: ReactNode
}

const AppWrapper = ({
  className,
  children,
}: AppWrapperProps) => {
  return (
    <div className={cn('max-auto w-full max-w-screen-xl px-2.5 md:px-20', className)}>
      {children}
    </div>
  )
}

export default AppWrapper