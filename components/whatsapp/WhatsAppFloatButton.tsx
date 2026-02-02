'use client';

import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';
import { openWhatsAppWithCart, openWhatsApp } from '@/lib/utils/whatsapp';

export default function WhatsAppFloatButton() {
  const { items } = useCart();

  const handleClick = () => {
    // If there are items in cart, send cart items, otherwise send a professional business message
    if (items.length > 0) {
      openWhatsAppWithCart(items);
    } else {
      const professionalMessage = `Hello Fast Meuble

I'm interested in learning more about your furniture products and services. Could you please provide me with information about:

• Available products and collections
• Customization options
• Pricing and delivery information
• Current promotions or special offers

Thank you for your time. I look forward to hearing from you!`;

      openWhatsApp(professionalMessage);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 md:bottom-8 md:right-8">
      <button
        onClick={handleClick}
        className="group relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-[#25D366] hover:bg-[#20BA5A] rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95"
        aria-label="Contact us on WhatsApp"
        title="Chat with us on WhatsApp"
      >
        {/* WhatsApp Logo from public/images */}
        <Image
          src="/images/whatsapp-logo1.avif"
          alt="WhatsApp"
          width={28}
          height={28}
          className="md:w-15 md:h-15 object-cover rounded-full"
          priority
        />

        {/* Subtle pulse animation ring - only on hover */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-0 group-hover:opacity-20 group-hover:animate-ping transition-opacity duration-300"></span>

        {/* Notification badge if cart has items */}
        {items.length > 0 && (
          <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 md:w-6 md:h-6 bg-red-500 text-white text-[10px] md:text-xs font-normal rounded-full border-2 border-white">
            {items.length > 9 ? '9+' : items.length}
          </span>
        )}

        {/* Tooltip on hover - hidden on mobile, shown on desktop */}
        <div className="hidden md:block absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="bg-gray-900 text-white text-sm font-medium px-3 py-2  whitespace-nowrap shadow-lg">
            {items.length > 0 ? `Order ${items.length} item${items.length > 1 ? 's' : ''} via WhatsApp` : 'Chat with us on WhatsApp'}
            <div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-gray-900"></div>
          </div>
        </div>
      </button>
    </div>
  );
}

