export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-amber-50 flex flex-col justify-center items-center p-4">
      <div className="absolute inset-0 bg-[url('/bakery-pattern.png')] opacity-5 pointer-events-none"></div>
      <div className="z-10 w-full flex justify-center">
        {children}
      </div>
    </div>
  )
}
