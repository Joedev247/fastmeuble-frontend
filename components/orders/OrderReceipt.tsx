'use client';

import Image from 'next/image';
import { formatXAF } from '@/lib/utils/currency';
import { format } from 'date-fns';
import Barcode from './Barcode';

interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  image: string;
}

interface Customer {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  region: string;
  country: string;
  postalCode?: string;
}

interface OrderReceiptProps {
  orderNumber: string;
  customer: Customer;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  createdAt: string;
  professionalMessage?: string;
}

export default function OrderReceipt({
  orderNumber,
  customer,
  items,
  subtotal,
  shipping,
  total,
  createdAt,
  professionalMessage,
}: OrderReceiptProps) {
  const orderDate = format(new Date(createdAt), 'dd MMM yyyy');
  const customerFirstName = customer.name.split(' ')[0];

  return (
    <div className="min-h-screen py-4 px-4 print:py-2 print:px-0">
      <div className="max-w-md mx-auto relative print:max-w-full print:mx-0 shadow-sm">
        

        {/* Content with padding to account for borders */}
        <div className="px-5 py-4">
          {/* Header */}
          <div className="flex items-start justify-between mb-3 pb-2 border-b border-gray-200">
            <div className="flex items-center gap-2">
              {/* Logo */}
              <div className="relative w-16 h-8 flex-shrink-0">
                <Image
                  src="/images/fast-meuble-logo-removebg-preview.png"
                  alt="Fast Meuble"
                  fill
                  className="object-contain"
                  sizes="64px"
                  priority
                />
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-gray-600">{orderDate}</p>
            </div>
          </div>

          {/* Order Details - Moved to top, well structured */}
          <div className="mb-3 pb-2 border-b border-gray-200">
            <div className="space-y-1.5 text-[10px] text-gray-700">
              <div className="flex justify-between items-start">
                <span className="font-semibold text-gray-900">Order:</span>
                <span className="text-right font-mono">#{orderNumber}</span>
              </div>
              <div className="flex justify-between items-start gap-2">
                <span className="font-semibold text-gray-900 flex-shrink-0">Shipping:</span>
                <span className="text-right text-gray-600">{customer.address}, {customer.city}, {customer.region}</span>
              </div>
            </div>
          </div>

          {/* Greeting */}
          <div className="mb-3">
            <h2 className="text-xl font-normal text-gray-900 mb-1">
              Hello, {customerFirstName}!
            </h2>
            <p className="text-gray-700 text-xs">
              You have purchased these {items.length} {items.length === 1 ? 'item' : 'items'} in our store:
            </p>
          </div>

          {/* Order Items */}
          <div className="space-y-0 mb-3">
            {items.map((item, index) => (
              <div key={item.productId} className="border-b border-gray-200 py-2 last:border-0">
                <div className="flex items-start gap-2.5">
                  {/* Product Image */}
                  <div className="relative w-12 h-12 bg-gray-50 rounded overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.productName}
                      fill
                      className="object-contain p-1"
                      sizes="48px"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-xs mb-0.5 leading-tight">
                      #{index + 1} {item.productName}
                    </p>
                    <p className="text-[10px] text-gray-500">
                      Product Number: {item.productId.slice(-6).toUpperCase()}
                    </p>
                  </div>

                  {/* Quantity and Price */}
                  <div className="text-right flex-shrink-0">
                    <p className="text-gray-600 text-[10px] mb-0.5">Qty {item.quantity}</p>
                    <p className="font-semibold text-gray-900 text-xs">
                      {formatXAF(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="flex justify-between items-center mb-3 pt-2 border-t-2 border-amber-500">
            <span className="text-sm font-normal text-gray-900">Total:</span>
            <span className="text-base font-normal text-amber-600">{formatXAF(total)}</span>
          </div>

          {/* Professional Message */}
          {professionalMessage && (
            <div className="mb-2 pb-2 border-b border-gray-200 text-center">
              <p className="text-[10px] text-gray-700 leading-snug whitespace-pre-line">
                {professionalMessage}
              </p>
            </div>
          )}

          {/* Barcode */}
          <div className="mb-2 pt-2 border-t border-gray-200">
            <Barcode value={orderNumber} width={180} height={20} />
          </div>

          {/* Footer */}
          <div className="pt-2 border-t border-gray-200">
            <p className="text-[9px] text-gray-400 text-center">
              Fast Meuble - Quality Furniture Since 2024
            </p>
            <p className="text-[9px] text-gray-400 text-center">
              Visit{' '}
              <a href="/" className="text-amber-500 hover:underline">
                our website
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

