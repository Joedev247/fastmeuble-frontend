'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Link } from '@/lib/navigation';
import { FaStar, FaRegStar, FaStarHalfAlt, FaWhatsapp, FaShoppingBag, FaHeart, FaShareAlt, FaCheck } from 'react-icons/fa';
import { RiShoppingBag3Line } from 'react-icons/ri';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from '@/lib/navigation';
import { toast } from 'sonner';
import { reviewAPI } from '@/lib/api/reviews';
import { formatXAF } from '@/lib/utils/currency';
import { openWhatsAppWithCart, openWhatsAppWithProduct } from '@/lib/utils/whatsapp';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  images: string[];
  description: string;
  specifications: {
    material: string;
    dimensions: string;
    weight: string;
    color: string;
  };
  inStock: boolean;
  isHot?: boolean;
  originalPrice?: number;
  discount?: string;
}

interface ProductDetailProps {
  product: Product;
}

interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

function renderStars(rating: number, size: 'sm' | 'md' = 'md') {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  const starSize = size === 'sm' ? 'text-sm' : 'text-base';

  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar key={`full-${i}`} className={`text-yellow-400 ${starSize} fill-current`} />);
  }
  if (hasHalfStar) {
    stars.push(<FaStarHalfAlt key="half" className={`text-yellow-400 ${starSize} fill-current`} />);
  }
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<FaRegStar key={`empty-${i}`} className={`text-gray-300 ${starSize}`} />);
  }
  return stars;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const { addToCart, items } = useCart();
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [selectedRating, setSelectedRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [userName, setUserName] = useState('');
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showReviewDialog, setShowReviewDialog] = useState(false);
  const [showOrderDialog, setShowOrderDialog] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [orderDetails, setOrderDetails] = useState({
    quantity: 1,
    customization: '',
    deliveryAddress: '',
    phoneNumber: '',
  });

  // Load reviews from API
  useEffect(() => {
    const loadReviews = async () => {
      try {
        const reviewsData = await reviewAPI.getProductReviews(product.id);
        const formattedReviews: Review[] = reviewsData.map((r: any) => ({
          id: r.id || r._id,
          userName: r.userName,
          rating: r.rating,
          comment: r.comment,
          date: new Date(r.createdAt).toISOString().split('T')[0],
        }));
        setReviews(formattedReviews);
      } catch (error) {
        console.error('Error loading reviews:', error);
        // Start with empty reviews if API fails
        setReviews([]);
      }
    };

    loadReviews();
  }, [product.id]);

  const handleAddToCart = () => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      router.push('/login');
      return;
    }
    
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
      });
    }
    toast.success(`${quantity} ${product.name} added to cart!`);
  };

  const handleSubmitReview = async () => {
    if (selectedRating === 0 || !reviewText.trim() || !userName.trim()) {
      toast.error('Please fill in all fields and select a rating');
      return;
    }

    try {
      const newReview = await reviewAPI.create({
        productId: product.id,
        userName,
        rating: selectedRating,
        comment: reviewText,
      });

      const formattedReview: Review = {
        id: newReview.id || newReview._id,
        userName: newReview.userName,
        rating: newReview.rating,
        comment: newReview.comment,
        date: new Date(newReview.createdAt).toISOString().split('T')[0],
      };

      setReviews([formattedReview, ...reviews]);
      setShowReviewDialog(false);
      setSelectedRating(0);
      setReviewText('');
      setUserName('');
      toast.success('Review submitted successfully!');
    } catch (error: any) {
      console.error('Error submitting review:', error);
      toast.error(error.message || 'Failed to submit review');
    }
  };

  const handlePlaceOrder = () => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      toast.error('Please login to place an order');
      router.push('/login');
      return;
    }
    
    if (!orderDetails.phoneNumber.trim() || !orderDetails.deliveryAddress.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    // Prepare order items: include all cart items plus this product with specified quantity
    const orderItems: Array<{ id: string; name: string; price: number; image: string; category: string; quantity: number }> = [];
    
    // Add all existing cart items (excluding this product if it's already in cart)
    items.forEach(item => {
      if (item.id !== product.id) {
        orderItems.push({
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          category: item.category || '',
          quantity: item.quantity,
        });
      }
    });
    
    // Add this product with the specified quantity
    orderItems.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      quantity: orderDetails.quantity,
    });
    
    // Send order to WhatsApp
    openWhatsAppWithCart(orderItems);
    setShowOrderDialog(false);
    toast.success('Opening WhatsApp with your order details...');
  };

  const handleWhatsAppContact = () => {
    // If product is in cart or there are other items, send all cart items including this product
    const productInCart = items.find(item => item.id === product.id);
    if (productInCart || items.length > 0) {
      // Prepare items: all cart items plus this product if not in cart
      const allItems = [...items] as Array<{ id: string; name: string; price: number; image: string; category: string | undefined; quantity: number }>;
      
      if (!productInCart) {
        allItems.push({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          category: product.category,
          quantity: quantity,
        });
      }
      
      openWhatsAppWithCart(allItems as any);
    } else {
      // Just send this product
      openWhatsAppWithProduct(product.name, product.category, quantity);
    }
  };

  const handlePayment = () => {
    // Here you would integrate with a payment gateway
    alert('Redirecting to payment gateway...');
  };

  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : product.rating;

  return (
    <div className="min-h-screen bg-white pt-24 pb-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-gray-600">
          <Link href="/" className="hover:text-amber-500">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/shop" className="hover:text-amber-500">Shop</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative w-full aspect-square bg-gray-50 Fast Meuble overflow-hidden">
              <Image
                src={selectedImage}
                alt={product.name}
                fill
                className="object-contain object-center p-8"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              {product.isHot && (
                <div className="absolute top-4 left-4 bg-amber-500 text-white text-xs font-normal px-3 py-1.5 uppercase z-10 rounded">
                  HOT
                </div>
              )}
              {product.discount && (
                <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-normal px-3 py-1.5 z-10 rounded">
                  -{product.discount}
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(img)}
                  className={`relative aspect-square bg-gray-50 Fast Meuble overflow-hidden border-2 transition-all ${
                    selectedImage === img ? 'border-amber-500' : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} ${index + 1}`}
                    fill
                    className="object-contain object-center p-2"
                    sizes="(max-width: 1024px) 25vw, 12.5vw"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="text-sm text-gray-500 mb-2">{product.category}</div>
              <h1 className="text-3xl md:text-4xl font-normal text-gray-900 mb-4">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1">
                  {renderStars(averageRating, 'md')}
                </div>
                <span className="text-gray-600">
                  {averageRating.toFixed(1)} ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})
                </span>
              </div>

              {/* Price */}
              <div className="mb-6">
                {product.originalPrice ? (
                  <div className="flex items-center gap-4">
                    <span className="text-3xl font-normal text-red-500">
                      {formatXAF(product.price)}
                    </span>
                    <span className="text-xl text-gray-400 line-through">
                      {formatXAF(product.originalPrice)}
                    </span>
                  </div>
                ) : (
                  <span className="text-3xl font-normal text-gray-900">
                    {formatXAF(product.price)}
                  </span>
                )}
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2 mb-6">
                {product.inStock ? (
                  <>
                    <FaCheck className="text-green-500" />
                    <span className="text-green-600 font-medium">In Stock</span>
                  </>
                ) : (
                  <span className="text-red-600 font-medium">Out of Stock</span>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-xl font-normal text-gray-900 mb-3">Description</h2>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Specifications */}
            <div>
              <h2 className="text-xl font-normal text-gray-900 mb-3">Specifications</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-gray-500">Material:</span>
                  <p className="font-medium">{product.specifications.material}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Dimensions:</span>
                  <p className="font-medium">{product.specifications.dimensions}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Weight:</span>
                  <p className="font-medium">{product.specifications.weight}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Color:</span>
                  <p className="font-medium">{product.specifications.color}</p>
                </div>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 pt-6 border-t mb-4">
              <Label htmlFor="quantity-select" className="text-sm font-medium text-gray-700">
                Quantity:
              </Label>
              <div className="flex items-center border border-gray-300">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  -
                </button>
                <input
                  id="quantity-select"
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 text-center border-0 focus:outline-none text-gray-900 font-medium"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleAddToCart}
                className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-normal py-6 text-lg"
              >
                <RiShoppingBag3Line className="mr-2" size={18} />
                Add to Cart
              </Button>
             
              <Button
                onClick={() => setShowOrderDialog(true)}
                variant="outline"
                className="flex-1 border-2 border-gray-900 hover:bg-gray-50 py-6 text-lg font-medium"
              >
                Place Order
              </Button>
              <Button
                onClick={handleWhatsAppContact}
                variant="outline"
                className="flex-1 border-2 border-green-600 text-green-600 hover:bg-green-50 py-6 text-lg font-medium"
              >
                <FaWhatsapp className="mr-2" />
                WhatsApp
              </Button>
            </div>

            {/* Social Share */}
            <div className="flex items-center gap-4 pt-4 border-t">
              <span className="text-sm text-gray-600">Share:</span>
              <button className="p-2 text-gray-600 hover:text-amber-500 transition-colors">
                <FaShareAlt size={20} />
              </button>
              <button className="p-2 text-gray-600 hover:text-red-500 transition-colors">
                <FaHeart size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Customer Reviews</CardTitle>
                <CardDescription>
                  {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
                </CardDescription>
              </div>
              <Dialog open={showReviewDialog} onOpenChange={setShowReviewDialog}>
                <DialogTrigger asChild>
                  <Button className="bg-amber-500 hover:bg-amber-600 text-white">
                    Write a Review
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Write a Review</DialogTitle>
                    <DialogDescription>
                      Share your experience with this product
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div>
                      <Label htmlFor="userName">Your Name</Label>
                      <Input
                        id="userName"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="Enter your name"
                      />
                    </div>
                    <div>
                      <Label>Rating</Label>
                      <div className="flex items-center gap-2 mt-2">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <button
                            key={rating}
                            onClick={() => setSelectedRating(rating)}
                            onMouseEnter={() => setHoverRating(rating)}
                            onMouseLeave={() => setHoverRating(0)}
                            className="focus:outline-none"
                          >
                            {(hoverRating >= rating || selectedRating >= rating) ? (
                              <FaStar className="text-yellow-400 text-2xl fill-current cursor-pointer" />
                            ) : (
                              <FaRegStar className="text-gray-300 text-2xl cursor-pointer" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="review">Your Review</Label>
                      <Textarea
                        id="review"
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        placeholder="Write your review here..."
                        rows={5}
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setShowReviewDialog(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleSubmitReview}
                        className="bg-amber-500 hover:bg-amber-600 text-white"
                      >
                        Submit Review
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="border-b pb-6 last:border-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-900">{review.userName}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        {renderStars(review.rating, 'sm')}
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 mt-2">{review.comment}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Order Dialog */}
        <Dialog open={showOrderDialog} onOpenChange={setShowOrderDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Place Your Order</DialogTitle>
              <DialogDescription>
                Fill in the details to place your order for {product.name}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  value={orderDetails.quantity}
                  onChange={(e) => setOrderDetails({ ...orderDetails, quantity: parseInt(e.target.value) || 1 })}
                />
              </div>
              <div>
                <Label htmlFor="customization">Customization Notes (Optional)</Label>
                <Textarea
                  id="customization"
                  value={orderDetails.customization}
                  onChange={(e) => setOrderDetails({ ...orderDetails, customization: e.target.value })}
                  placeholder="Any specific customization requirements..."
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="phoneNumber">Phone Number *</Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  value={orderDetails.phoneNumber}
                  onChange={(e) => setOrderDetails({ ...orderDetails, phoneNumber: e.target.value })}
                  placeholder="+237 6XX XXX XXX"
                  required
                />
              </div>
              <div>
                <Label htmlFor="deliveryAddress">Delivery Address *</Label>
                <Textarea
                  id="deliveryAddress"
                  value={orderDetails.deliveryAddress}
                  onChange={(e) => setOrderDetails({ ...orderDetails, deliveryAddress: e.target.value })}
                  placeholder="Enter your delivery address"
                  rows={3}
                  required
                />
              </div>
              <div className="bg-amber-50 border border-amber-200 Fast Meuble p-4">
                <p className="text-sm text-amber-800">
                  <strong>Total:</strong> ${(product.price * orderDetails.quantity).toFixed(2)}
                </p>
                <p className="text-xs text-amber-700 mt-1">
                  We will contact you to confirm your order and discuss delivery options.
                </p>
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setShowOrderDialog(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handlePlaceOrder}
                  className="bg-amber-500 hover:bg-amber-600 text-white"
                >
                  Confirm Order
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
