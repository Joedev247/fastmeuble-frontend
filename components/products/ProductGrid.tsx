'use client';

import Image from 'next/image';
import { Link } from '@/lib/navigation';
import { FaStar, FaRegStar, FaStarHalfAlt, FaSearch, FaShoppingBag, FaHeart, FaShareAlt } from 'react-icons/fa';
import { RiShoppingBag3Line } from 'react-icons/ri';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  originalPrice?: number;
  discount?: string;
  isHot?: boolean;
}

interface ProductGridProps {
  products: Product[];
}

function renderStars(rating: number) {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar key={`full-${i}`} className="text-yellow-400 text-sm" />);
  }
  if (hasHalfStar) {
    stars.push(<FaStarHalfAlt key="half" className="text-yellow-400 text-sm" />);
  }
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<FaRegStar key={`empty-${i}`} className="text-gray-300 text-sm" />);
  }
  return stars;
}

export function ProductGrid({ products }: ProductGridProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    });
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div>
      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No products found. Try adjusting your filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative block bg-white overflow-hidden"
            >
              <div className="relative">
                {/* Product Image */}
                <div className="relative w-full aspect-square bg-gray-50 overflow-hidden rounded-t-lg">
                  <Link href={`/shop/${product.id}`} className="block w-full h-full">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-contain object-center p-4 group-hover:scale-110 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </Link>

                  {/* Badges */}
                  {product.isHot && (
                    <div className="absolute top-2 left-2 bg-amber-500 text-white text-xs font-bold px-2 py-1 uppercase z-10">
                      HOT
                    </div>
                  )}
                  {product.discount && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 z-10">
                      -{product.discount}
                    </div>
                  )}

                  {/* Hover Overlay Icons */}
                  {/* Bottom-left: Search Icon - Black circular button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      console.log('Quick view:', product.id);
                    }}
                    className="absolute bottom-3 left-3 bg-black text-white rounded-full p-3 w-11 h-11 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gray-800 z-30 shadow-lg"
                    aria-label="Quick view"
                  >
                    <FaSearch size={16} />
                  </button>

                  {/* Right side: Vertical stack of icons in white bordered container */}
                  <div className="absolute top-1/2 right-3 -translate-y-1/2 bg-white rounded border border-gray-200 p-1.5 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 z-30 shadow-md">
                    {/* Add to Cart Icon */}
                    <button
                      onClick={(e) => handleAddToCart(e, product)}
                      className="p-2.5 text-gray-700 hover:text-amber-500 hover:bg-gray-50 rounded transition-colors duration-200 flex items-center justify-center"
                      aria-label="Add to cart"
                    >
                      <RiShoppingBag3Line size={16} />
                    </button>

                    {/* Heart Icon */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log('Add to wishlist:', product.id);
                      }}
                      className="p-2.5 text-gray-700 hover:text-red-500 hover:bg-gray-50 rounded transition-colors duration-200 flex items-center justify-center"
                      aria-label="Add to wishlist"
                    >
                      <FaHeart size={16} />
                    </button>

                    {/* Share Icon */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log('Share:', product.id);
                      }}
                      className="p-2.5 text-gray-700 hover:text-blue-500 hover:bg-gray-50 rounded transition-colors duration-200 flex items-center justify-center"
                      aria-label="Share product"
                    >
                      <FaShareAlt size={16} />
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <Link href={`/shop/${product.id}`}>
                  <div className="p-4 pt-3">
                    {/* Product Name */}
                    <h3 className="text-black text-base font-normal mb-2 line-clamp-2 min-h-[3rem]">
                      {product.name}
                    </h3>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-0.5">
                        {renderStars(product.rating)}
                      </div>
                      <span className="text-gray-500 text-xs">
                        ({product.reviews} {product.reviews === 1 ? 'review' : 'reviews'})
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-2 flex-wrap">
                      {product.originalPrice ? (
                        <>
                          <span className="text-red-500 font-bold text-lg">
                            ${product.price.toFixed(2)}
                          </span>
                          <span className="text-gray-400 text-sm line-through">
                            ${product.originalPrice.toFixed(2)}
                          </span>
                        </>
                      ) : (
                        <span className="text-black font-bold text-lg">
                          ${product.price.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
