import TrpcProvider from '@/components/TrpcProvider'

export default function BaseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <TrpcProvider>
      {children}
    </TrpcProvider>
  )
}
