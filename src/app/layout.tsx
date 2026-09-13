import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'HomeBakes - Fresh Homemade Bakery',
  description: 'Delicious homemade cakes, brownies, cupcakes & more. Order online for delivery or pickup.',
  keywords: ['bakery', 'cakes', 'homemade', 'delivery', 'cupcakes', 'brownies'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  )
}
