'use client';

import { useState } from 'react';
import { useRouter } from '@/lib/navigation';
import { Link } from '@/lib/navigation';
import Image from 'next/image';
import { FaLock, FaCreditCard, FaMoneyBillWave, FaMobileAlt, FaCheckCircle, FaArrowLeft, FaMapMarkerAlt, FaUser, FaEnvelope, FaPhone } from 'react-icons/fa';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  
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

  // Redirect if cart is empty
  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-black mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">
            Please add items to your cart before proceeding to checkout.
          </p>
          <Link href="/cart">
            <Button className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-8 py-6 text-lg">
              <FaArrowLeft className="mr-2" />
              Back to Cart
            </Button>
          </Link>
        </div>
      </div>
    );
  }

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
    
    if (!validateForm()) {
      toast.error('Please fill in all required fields correctly');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const orderNum = `FM-${Date.now().toString().slice(-8)}`;
      setOrderNumber(orderNum);
      setOrderPlaced(true);
      setIsSubmitting(false);
      toast.success('Order placed successfully!');
      
      // Clear cart after successful order
      setTimeout(() => {
        clearCart();
      }, 2000);
    }, 1500);
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const subtotal = getTotalPrice();
  const shipping = 0; // Free shipping or calculated
  const total = subtotal + shipping;

  // Order Confirmation View
  if (orderPlaced) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaCheckCircle className="text-green-500" size={64} />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-black mb-4">Order Confirmed!</h1>
          <p className="text-gray-600 mb-2">
            Thank you for your order, <strong>{formData.firstName} {formData.lastName}</strong>!
          </p>
          <p className="text-gray-600 mb-8">
            Your order number is <strong className="text-amber-500">{orderNumber}</strong>
          </p>
          
          <div className="bg-gray-50 border border-gray-200 p-6 mb-8 text-left">
            <h2 className="text-xl font-bold text-black mb-4">What's Next?</h2>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start gap-3">
                <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                <span>We've sent a confirmation email to <strong>{formData.email}</strong></span>
              </li>
              <li className="flex items-start gap-3">
                <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                <span>Our team will contact you at <strong>{formData.phone}</strong> within 24 hours</span>
              </li>
              <li className="flex items-start gap-3">
                <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                <span>We'll discuss customization options and finalize your order details</span>
              </li>
              <li className="flex items-start gap-3">
                <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                <span>Your furniture will be crafted and delivered to <strong>{formData.address}, {formData.city}</strong></span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/shop">
              <Button className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-8 py-6 text-lg">
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

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Link href="/cart" className="text-gray-600 hover:text-amber-500 transition-colors">
            <FaArrowLeft />
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-black">Checkout</h1>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <FaLock className="text-green-500" />
          <span>Secure checkout • Your information is safe</span>
        </div>
      </div>

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
                <h2 className="text-2xl font-bold text-black">Customer Information</h2>
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
                <h2 className="text-2xl font-bold text-black">Shipping Address</h2>
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
                <h2 className="text-2xl font-bold text-black">Payment Method</h2>
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
              <h2 className="text-2xl font-bold text-black mb-6">Order Summary</h2>

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
                        Qty: {item.quantity} × ${item.price.toFixed(2)}
                      </p>
                    </div>
                    <p className="text-sm font-semibold text-black">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Summary Totals */}
              <div className="border-t border-gray-300 pt-4 space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'})</span>
                  <span className="text-black font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-black font-medium">
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="border-t border-gray-300 pt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold text-black">Total</span>
                    <span className="text-2xl font-bold text-amber-500">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-6 text-lg mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
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
