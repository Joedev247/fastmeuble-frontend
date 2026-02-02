'use client';

import { useState, useEffect } from 'react';
import { useRouter } from '@/lib/navigation';
import { Link } from '@/lib/navigation';
import Image from 'next/image';
import { FaLock, FaCreditCard, FaMoneyBillWave, FaMobileAlt, FaCheckCircle, FaArrowLeft, FaMapMarkerAlt, FaUser, FaEnvelope, FaPhone } from 'react-icons/fa';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { formatXAF } from '@/lib/utils/currency';
import { orderAPI } from '@/lib/api/orders';
import OrderReceipt from '@/components/orders/OrderReceipt';

type PaymentMethod = 'card' | 'mobile_money' | 'cash_on_delivery';

interface FormData {
  // Customer Info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  
  // Shipping Address
  address: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
  
  // Additional Info
  notes: string;
  
  // Payment
  paymentMethod: PaymentMethod;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotalPrice, getTotalItems, clearCart } = useCart();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      toast.error('Please login to proceed with checkout');
      router.push('/login');
    }
  }, [isAuthenticated, authLoading, router]);
  
  const [orderPlaced, setOrderPlaced] = useState(false);
  
  // Redirect if cart is empty (but not if order was just placed)
  useEffect(() => {
    if (items.length === 0 && !authLoading && !orderPlaced) {
      toast.error('Your cart is empty');
      router.push('/shop');
    }
  }, [items.length, authLoading, orderPlaced, router]);
  const [orderNumber, setOrderNumber] = useState('');
  const [orderData, setOrderData] = useState<any>(null);
  
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: 'Douala',
    region: 'Littoral',
    postalCode: '',
    country: 'Cameroon',
    notes: '',
    paymentMethod: 'mobile_money',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[0-9]{8,15}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.region.trim()) newErrors.region = 'Region is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check authentication
    if (!isAuthenticated) {
      toast.error('Please login to proceed with checkout');
      router.push('/login');
      return;
    }
    
    if (!validateForm()) {
      toast.error('Please fill in all required fields correctly');
      return;
    }

    if (items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    setIsSubmitting(true);

    try {
      // Format order data for backend
      const orderData = {
        items: items.map(item => ({
          productId: item.id,
          productName: item.name,
          quantity: item.quantity,
          price: item.price,
          image: item.image,
        })),
        customer: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          region: formData.region,
          country: formData.country,
          postalCode: formData.postalCode || '',
        },
        paymentMethod: formData.paymentMethod,
        shipping: shipping,
        notes: formData.notes || undefined,
      };

      // Create order via API
      const createdOrder = await orderAPI.create(orderData);
      
      setOrderNumber(createdOrder.orderNumber);
      setOrderData(createdOrder);
      setOrderPlaced(true);
      setIsSubmitting(false);
      toast.success('Order placed successfully!');
      
      // Clear cart after successful order (don't clear immediately to show receipt)
      // Cart will be cleared when user navigates away or after showing receipt
      setTimeout(() => {
        clearCart();
      }, 5000); // Increased delay to ensure receipt is shown
    } catch (error: any) {
      console.error('Error creating order:', error);
      setIsSubmitting(false);
      toast.error(error.message || 'Failed to place order. Please try again.');
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const subtotal = getTotalPrice();
  const shipping: number = 0; // Free shipping or calculated
  const total = subtotal + shipping;

  // Order Confirmation View - Show Receipt
  if (orderPlaced && orderData) {
    const professionalMessage = `Thank you for choosing Fast Meuble!

Your order is being processed. We will contact you within 24 hours to:
• Confirm order details
• Discuss customization options
• Arrange delivery`;

    return (
      <div className="pt-8">
        <OrderReceipt
          orderNumber={orderData.orderNumber}
          customer={{
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            city: formData.city,
            region: formData.region,
            country: formData.country,
            postalCode: formData.postalCode,
          }}
          items={orderData.items}
          subtotal={orderData.subtotal}
          shipping={orderData.shipping}
          total={orderData.total}
          createdAt={orderData.createdAt || new Date().toISOString()}
          professionalMessage={professionalMessage}
        />
        
        {/* Action Buttons */}
        <div className="max-w-2xl mx-auto px-4 pb-8">
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
            <Link href="/shop">
              <Button className="bg-amber-500 hover:bg-amber-600 text-white font-normal px-8 py-6 text-lg">
                Continue Shopping
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="border-2 border-gray-900 hover:bg-gray-50 px-8 py-6 text-lg font-medium">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Redirect if cart is empty (but not if order was just placed)
  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-normal text-black mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">
            Please add items to your cart before proceeding to checkout.
          </p>
          <Link href="/cart">
            <Button className="bg-amber-500 hover:bg-amber-600 text-white font-normal px-8 py-6 text-lg">
              <FaArrowLeft className="mr-2" />
              Back to Cart
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-8">
            {/* Customer Information */}
            <div className="bg-white border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
                  <FaUser className="text-white" />
                </div>
                <h2 className="text-2xl font-normal text-black">Customer Information</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                    First Name *
                  </Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className={`mt-1 ${errors.firstName ? 'border-red-500' : ''}`}
                    required
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                    Last Name *
                  </Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className={`mt-1 ${errors.lastName ? 'border-red-500' : ''}`}
                    required
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email Address *
                  </Label>
                  <div className="relative mt-1">
                    <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
                      required
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                    Phone Number *
                  </Label>
                  <div className="relative mt-1">
                    <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+237 6XX XXX XXX"
                      className={`pl-10 ${errors.phone ? 'border-red-500' : ''}`}
                      required
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
                  <FaMapMarkerAlt className="text-white" />
                </div>
                <h2 className="text-2xl font-normal text-black">Shipping Address</h2>
              </div>
              
              <div className="mb-4">
                <Label htmlFor="address" className="text-sm font-medium text-gray-700">
                  Street Address *
                </Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="House number, street name"
                  className={`mt-1 ${errors.address ? 'border-red-500' : ''}`}
                  required
                />
                {errors.address && (
                  <p className="text-red-500 text-xs mt-1">{errors.address}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="city" className="text-sm font-medium text-gray-700">
                    City *
                  </Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className={`mt-1 ${errors.city ? 'border-red-500' : ''}`}
                    required
                  />
                  {errors.city && (
                    <p className="text-red-500 text-xs mt-1">{errors.city}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="region" className="text-sm font-medium text-gray-700">
                    Region *
                  </Label>
                  <Input
                    id="region"
                    value={formData.region}
                    onChange={(e) => handleInputChange('region', e.target.value)}
                    className={`mt-1 ${errors.region ? 'border-red-500' : ''}`}
                    required
                  />
                  {errors.region && (
                    <p className="text-red-500 text-xs mt-1">{errors.region}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="postalCode" className="text-sm font-medium text-gray-700">
                    Postal Code
                  </Label>
                  <Input
                    id="postalCode"
                    value={formData.postalCode}
                    onChange={(e) => handleInputChange('postalCode', e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="mt-4">
                <Label htmlFor="country" className="text-sm font-medium text-gray-700">
                  Country
                </Label>
                <Input
                  id="country"
                  value={formData.country}
                  onChange={(e) => handleInputChange('country', e.target.value)}
                  className="mt-1"
                  readOnly
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
                  <FaCreditCard className="text-white" />
                </div>
                <h2 className="text-2xl font-normal text-black">Payment Method</h2>
              </div>
              
              <div className="space-y-4">
                <label
                  className={`flex items-center gap-4 p-4 border-2 cursor-pointer transition-all ${
                    formData.paymentMethod === 'mobile_money'
                      ? 'border-amber-500 bg-amber-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="mobile_money"
                    checked={formData.paymentMethod === 'mobile_money'}
                    onChange={(e) => handleInputChange('paymentMethod', e.target.value as PaymentMethod)}
                    className="w-5 h-5 text-amber-500"
                  />
                  <FaMobileAlt className="text-amber-500 text-xl" />
                  <div className="flex-1">
                    <div className="font-semibold text-black">Mobile Money</div>
                    <div className="text-sm text-gray-600">MTN Mobile Money, Orange Money</div>
                  </div>
                </label>

                <label
                  className={`flex items-center gap-4 p-4 border-2 cursor-pointer transition-all ${
                    formData.paymentMethod === 'cash_on_delivery'
                      ? 'border-amber-500 bg-amber-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash_on_delivery"
                    checked={formData.paymentMethod === 'cash_on_delivery'}
                    onChange={(e) => handleInputChange('paymentMethod', e.target.value as PaymentMethod)}
                    className="w-5 h-5 text-amber-500"
                  />
                  <FaMoneyBillWave className="text-amber-500 text-xl" />
                  <div className="flex-1">
                    <div className="font-semibold text-black">Cash on Delivery</div>
                    <div className="text-sm text-gray-600">Pay when you receive your order</div>
                  </div>
                </label>

                <label
                  className={`flex items-center gap-4 p-4 border-2 cursor-pointer transition-all ${
                    formData.paymentMethod === 'card'
                      ? 'border-amber-500 bg-amber-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={(e) => handleInputChange('paymentMethod', e.target.value as PaymentMethod)}
                    className="w-5 h-5 text-amber-500"
                  />
                  <FaCreditCard className="text-amber-500 text-xl" />
                  <div className="flex-1">
                    <div className="font-semibold text-black">Credit/Debit Card</div>
                    <div className="text-sm text-gray-600">Visa, Mastercard, etc.</div>
                  </div>
                </label>
              </div>
            </div>

            {/* Order Notes */}
            <div className="bg-white border border-gray-200 p-6">
              <Label htmlFor="notes" className="text-sm font-medium text-gray-700">
                Order Notes (Optional)
              </Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                placeholder="Any special instructions or customization requests..."
                rows={4}
                className="mt-1"
              />
              <p className="text-xs text-gray-500 mt-2">
                We work on command. Please include any specific customization requirements here.
              </p>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 border border-gray-200 p-6 sticky top-24">
              <h2 className="text-2xl font-normal text-black mb-6">Order Summary</h2>

              {/* Order Items */}
              <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
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
                      <h4 className="text-sm font-medium text-black truncate">{item.name}</h4>
                      <p className="text-xs text-gray-600">
                        Qty: {item.quantity} × {formatXAF(item.price)}
                      </p>
                    </div>
                    <p className="text-sm font-semibold text-black">
                      {formatXAF(item.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Summary Totals */}
              <div className="border-t border-gray-300 pt-4 space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'})</span>
                  <span className="text-black font-medium">{formatXAF(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-black font-medium">
                    {shipping === 0 ? 'Free' : formatXAF(shipping)}
                  </span>
                </div>
                <div className="border-t border-gray-300 pt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-normal text-black">Total</span>
                    <span className="text-2xl font-normal text-amber-500">{formatXAF(total)}</span>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-amber-500 hover:bg-amber-600 text-white font-normal py-6 text-lg mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span>
                    Processing...
                  </>
                ) : (
                  <>
                    <FaLock className="mr-2" />
                    Place Order
                  </>
                )}
              </Button>

              {/* Security Note */}
              <p className="text-xs text-gray-500 text-center">
                <FaLock className="inline mr-1" />
                Your payment information is secure and encrypted
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
