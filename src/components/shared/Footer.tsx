import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-[#faf5f0] text-[#533828] border-t border-[#e8d5c0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-[#831843]">HomeBakes 🎂</h3>
            <p className="text-sm">Delicious homemade cakes, brownies, cupcakes & more. Baked with love and fresh ingredients.</p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-[#7d5235]">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/shop" className="hover:text-[#ec4899] transition-colors">Shop</Link></li>
              <li><Link href="/custom-cake" className="hover:text-[#ec4899] transition-colors">Custom Cakes</Link></li>
              <li><Link href="/about" className="hover:text-[#ec4899] transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-[#ec4899] transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-[#7d5235]">Contact Info</h4>
            <ul className="space-y-2 text-sm">
              <li>📞 +91 98765 43210</li>
              <li>✉️ hello@homebakes.com</li>
              <li>📍 123 Bakery Lane, Food City</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-[#7d5235]">We Accept</h4>
            <div className="flex gap-2">
              <span className="px-2 py-1 bg-white border border-[#e8d5c0] rounded text-xs">UPI</span>
              <span className="px-2 py-1 bg-white border border-[#e8d5c0] rounded text-xs">Cards</span>
              <span className="px-2 py-1 bg-white border border-[#e8d5c0] rounded text-xs">COD</span>
            </div>
            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="inline-block mt-4 text-[#16a34a] hover:underline text-sm font-medium">
              💬 Chat with us on WhatsApp
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-[#e8d5c0] text-center text-sm text-[#9a6840]">
          <p>&copy; {new Date().getFullYear()} HomeBakes. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
