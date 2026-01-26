'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/navigation';
import { FaTimes, FaTrash } from 'react-icons/fa';
import { RiShoppingBag3Line } from 'react-icons/ri';
import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';

export default function Cart() {
  const t = useTranslations('components.navbar.Cart');
  const { items, removeFromCart, updateQuantity, getTotalItems, getTotalPrice } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const cartCount = getTotalItems();

  return (
    <div className="relative davici-topcart popup">
      <div className="dropdown mini-cart top-cart">
        <div 
          className={`remove-cart-shadow ${isOpen ? 'block' : 'hidden'}`}
          onClick={() => setIsOpen(false)}
        />
        <button
          className="dropdown-toggle cart-icon relative text-black hover:text-amber-500 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          title={t('viewCart')}
          aria-label={t('viewCart')}
        >
          <span className="icons-cart flex items-center relative">
            <RiShoppingBag3Line className="icon-bag" size={20} />
            {cartCount > 0 && (
              <span className="cart-count absolute -top-2 -right-2 bg-amber-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium">
                {cartCount}
              </span>
            )}
          </span>
        </button>
        <div className={`cart-popup popup absolute right-0 top-full mt-2 bg-white shadow-lg  p-4 min-w-[300px] z-50 ${isOpen ? 'block' : 'hidden'}`}>
          <div className="remove-cart mb-2 text-right">
            <button
              className="dropdown-toggle cart-remove"
              onClick={() => setIsOpen(false)}
              title={t('close')}
              aria-label={t('close')}
            >
              <FaTimes className="icon_close inline-block" size={16} />
            </button>
          </div>
          {items.length === 0 ? (
            <div className="text-center py-8">
              <RiShoppingBag3Line className="mx-auto text-gray-300 mb-3" size={48} />
              <p className="text-gray-500 text-sm">{t('noProductsInCart')}</p>
            </div>
          ) : (
            <>
              <ul className="cart_list product_list_widget max-h-96 overflow-y-auto space-y-3 mb-4">
                {items.map((item) => (
                  <li key={item.id} className="flex gap-3 pb-3 border-b border-gray-200 last:border-0">
                    <div className="relative w-16 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain p-1"
                        sizes="64px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-black truncate mb-1">
                        {item.name}
                      </h4>
                      <p className="text-xs text-gray-600 mb-2">
                        ${item.price.toFixed(2)} × {item.quantity}
                      </p>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center border border-gray-300 text-gray-600 hover:bg-gray-100 text-xs"
                        >
                          -
                        </button>
                        <span className="text-sm text-gray-700 w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center border border-gray-300 text-gray-600 hover:bg-gray-100 text-xs"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="ml-auto text-red-500 hover:text-red-700 p-1"
                          aria-label="Remove item"
                        >
                          <FaTrash size={14} />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-bold text-black">Total:</span>
                  <span className="font-bold text-amber-500">${getTotalPrice().toFixed(2)}</span>
                </div>
                <Link
                  href="/cart"
                  onClick={() => setIsOpen(false)}
                  className="block w-full bg-amber-500 hover:bg-amber-600 text-white text-center font-medium py-2 px-4 transition-colors"
                >
                  {t('viewCart')}
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
