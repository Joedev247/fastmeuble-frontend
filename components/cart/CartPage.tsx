'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/lib/navigation';
import Image from 'next/image';
import { FaTrash, FaPlus, FaMinus, FaShoppingBag, FaArrowLeft } from 'react-icons/fa';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function CartPage() {
  const t = useTranslations('components.cart.CartPage');
  const { items, removeFromCart, updateQuantity, clearCart, getTotalPrice, getTotalItems } = useCart();

  const handleRemoveItem = (productId: string, productName: string) => {
    removeFromCart(productId);
    toast.success(`${productName} removed from cart`);
  };

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      const item = items.find((i) => i.id === productId);
      if (item) {
        handleRemoveItem(productId, item.name);
      }
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleClearCart = () => {
    if (items.length === 0) return;
    if (confirm('Are you sure you want to clear your cart?')) {
      clearCart();
      toast.success('Cart cleared');
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaShoppingBag className="text-gray-400" size={48} />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-black mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link href="/shop" className="inline-block">
            <Button className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-8 py-6 text-lg">
              <FaArrowLeft className="mr-2" />
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-black mb-2">Shopping Cart</h1>
        <p className="text-gray-600">
          {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'} in your cart
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {/* Clear Cart Button */}
          <div className="flex justify-end">
            <button
              onClick={handleClearCart}
              className="text-sm text-red-600 hover:text-red-700 font-medium"
            >
              Clear Cart
            </button>
          </div>

          {/* Cart Items List */}
          <div className="bg-white border border-gray-200 divide-y divide-gray-200">
            {items.map((item) => (
              <div key={item.id} className="p-4 md:p-6">
                <div className="flex gap-4">
                  {/* Product Image */}
                  <Link href={`/shop/${item.id}`} className="flex-shrink-0">
                    <div className="relative w-24 h-24 md:w-32 md:h-32 bg-gray-50 rounded overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain p-2"
                        sizes="(max-width: 768px) 96px, 128px"
                      />
                    </div>
                  </Link>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <Link href={`/shop/${item.id}`}>
                      <h3 className="text-lg md:text-xl font-semibold text-black mb-2 hover:text-amber-500 transition-colors">
                        {item.name}
                      </h3>
                    </Link>
                    {item.category && (
                      <p className="text-sm text-gray-500 mb-2">{item.category}</p>
                    )}
                    <p className="text-lg font-bold text-amber-500 mb-4">
                      ${item.price.toFixed(2)}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-4">
                      <div className="flex items-center border border-gray-300">
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <FaMinus size={12} />
                        </button>
                        <span className="px-4 py-2 text-gray-900 font-medium min-w-[3rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <FaPlus size={12} />
                        </button>
                      </div>
                      <button
                        onClick={() => handleRemoveItem(item.id, item.name)}
                        className="text-red-600 hover:text-red-700 p-2 transition-colors"
                        aria-label="Remove item"
                      >
                        <FaTrash size={16} />
                      </button>
                    </div>

                    {/* Item Total */}
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-sm text-gray-600">
                        Subtotal: <span className="font-bold text-black">${(item.price * item.quantity).toFixed(2)}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Continue Shopping */}
          <Link href="/shop">
            <Button variant="outline" className="w-full border-2 border-gray-900 hover:bg-gray-50 py-6 text-lg font-medium">
              <FaArrowLeft className="mr-2" />
              Continue Shopping
            </Button>
          </Link>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 border border-gray-200 p-6 sticky top-24">
            <h2 className="text-2xl font-bold text-black mb-6">Order Summary</h2>

            {/* Summary Details */}
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'})</span>
                <span className="text-black font-medium">${getTotalPrice().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="text-black font-medium">Calculated at checkout</span>
              </div>
              <div className="border-t border-gray-300 pt-4">
                <div className="flex justify-between">
                  <span className="text-lg font-bold text-black">Total</span>
                  <span className="text-2xl font-bold text-amber-500">${getTotalPrice().toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Checkout Button */}
            <Link href="/checkout" className="block">
              <Button className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-6 text-lg mb-4">
                Proceed to Checkout
              </Button>
            </Link>

            {/* WhatsApp Contact */}
            <Button
              variant="outline"
              className="w-full border-2 border-green-600 text-green-600 hover:bg-green-50 py-6 text-lg font-medium"
              onClick={() => {
                const message = encodeURIComponent(
                  `Hello! I'm interested in purchasing these items from my cart. Can we discuss?`
                );
                const whatsappNumber = '237XXXXXXXXX';
                const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;
                window.open(whatsappUrl, '_blank');
              }}
            >
              Contact via WhatsApp
            </Button>

            {/* Info Note */}
            <p className="text-xs text-gray-500 mt-4 text-center">
              We work on command. After checkout, we'll contact you to confirm your order and discuss customization options.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
