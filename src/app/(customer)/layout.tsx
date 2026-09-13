import { Navbar } from '@/components/shared/Navbar'
import { Footer } from '@/components/shared/Footer'
import { AnnouncementBar } from '@/components/customer/AnnouncementBar'
import { SupportWidget } from '@/components/customer/SupportWidget'

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <SupportWidget />
    </div>
  )
}
