'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useMessages } from 'next-intl';
import { Link } from '@/lib/navigation';
import Image from 'next/image';
import { FaStar, FaStarHalfAlt, FaRegStar, FaCaretRight, FaEye, FaShareAlt } from 'react-icons/fa';
import { RiShoppingBag3Line } from 'react-icons/ri';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from '@/lib/navigation';
import { toast } from 'sonner';
import { productAPI } from '@/lib/api/products';
import { formatXAF } from '@/lib/utils/currency';
import { ProductCardSkeleton } from '@/components/products/ProductCardSkeleton';

interface Product {
    id: string;
    name: string;
    image: string;
    price: string;
    originalPrice?: string;
    rating: number;
    reviews: number;
    isHot?: boolean;
    discount?: string;
    link: string;
}

type TabType = 'latest' | 'topRating' | 'bestSellers';

export default function HotProducts() {
    const t = useTranslations('components.products.HotProducts');
    const messages = useMessages();
    const { addToCart } = useCart();
    const { isAuthenticated } = useAuth();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<TabType>('latest');
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadHotProducts();
    }, [activeTab]);

    const loadHotProducts = async () => {
        try {
            setIsLoading(true);
            let productsData;
            
            if (activeTab === 'latest') {
                productsData = await productAPI.getAll({ isHot: true, limit: 8, status: 'published' });
            } else if (activeTab === 'topRating') {
                productsData = await productAPI.getAll({ limit: 8, status: 'published' });
                // Sort by rating
                productsData = productsData.sort((a: any, b: any) => (b.rating || 0) - (a.rating || 0)).slice(0, 8);
            } else {
                // bestSellers - could be based on reviews or orders
                productsData = await productAPI.getAll({ limit: 8, status: 'published' });
                productsData = productsData.sort((a: any, b: any) => (b.reviews || 0) - (a.reviews || 0)).slice(0, 8);
            }

            const formattedProducts: Product[] = productsData.map((p: any) => ({
                id: p.id || p._id,
                name: p.name,
                image: p.mainImage || p.images?.[0] || '/images/category-1.jpg',
                price: formatXAF(p.price),
                originalPrice: p.originalPrice ? formatXAF(p.originalPrice) : undefined,
                rating: p.rating || 0,
                reviews: p.reviews || 0,
                isHot: p.isHot,
                discount: p.discount,
                link: `/shop/${p.id || p._id}`,
            }));

            setProducts(formattedProducts);
        } catch (error) {
            console.error('Error loading hot products:', error);
            toast.error('Failed to load hot products');
        } finally {
            setIsLoading(false);
        }
    };

    const handleShareProduct = (product: Product) => {
        const productUrl = typeof window !== 'undefined' 
            ? `${window.location.origin}${product.link}`
            : `https://fastmeuble.com${product.link}`;
        
        // Check if Web Share API is available (mobile devices)
        if (navigator.share) {
            navigator.share({
                title: product.name,
                text: `Check out ${product.name} on Fast Meuble!`,
                url: productUrl,
            }).catch((error) => {
                console.log('Error sharing:', error);
                // Fallback to clipboard
                copyToClipboard(productUrl, product.name);
            });
        } else {
            // Fallback: Copy to clipboard and show share options
            copyToClipboard(productUrl, product.name);
        }
    };

    const copyToClipboard = (url: string, productName: string) => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(url).then(() => {
                toast.success(`Product link copied! Share ${productName} with anyone.`);
            }).catch(() => {
                // Fallback for older browsers
                fallbackCopyToClipboard(url, productName);
            });
        } else {
            fallbackCopyToClipboard(url, productName);
        }
    };

    const fallbackCopyToClipboard = (text: string, productName: string) => {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            document.execCommand('copy');
            toast.success(`Product link copied! Share ${productName} with anyone.`);
        } catch (err) {
            toast.error('Failed to copy link. Please copy manually.');
        }
        document.body.removeChild(textArea);
    };

    // Render star rating
    const renderStars = (rating: number) => {
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
    };

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                {/* Header Section */}
                <div className="mb-12">


                    {/* Tabs Row - Centered tabs with button on right */}
                    <div className="flex flex-col md:flex-row md:items-center gap-4 relative">

                        {/* Title - Inline Flex */}
                        <div className="flex items-center gap-3">
                            <h2 className="text-black flex items-center gap-2">
                                <span className="text-2xl md:text-3xl font-normal relative inline-block">
                                    Hot
                                    {/* Orange Underline directly under "Hot" */}
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-500"></span>
                                </span>
                                <span className="text-2xl md:text-3xl font-normal">Products</span>
                            </h2>
                        </div>


                        {/* Tabs - Centered */}
                        <div className="flex items-center justify-center flex-1 gap-4 md:gap-6">
                            <button
                                onClick={() => setActiveTab('latest')}
                                className={`uppercase text-sm font-medium transition-colors ${activeTab === 'latest'
                                        ? 'text-black border-b-2 border-black pb-1'
                                        : 'text-gray-600 hover:text-black'
                                    }`}
                            >
                                {t('tabs.latest')}
                            </button>
                            <button
                                onClick={() => setActiveTab('topRating')}
                                className={`uppercase text-sm font-medium transition-colors ${activeTab === 'topRating'
                                        ? 'text-black border-b-2 border-black pb-1'
                                        : 'text-gray-600 hover:text-black'
                                    }`}
                            >
                                {t('tabs.topRating')}
                            </button>
                            <button
                                onClick={() => setActiveTab('bestSellers')}
                                className={`uppercase text-sm font-medium transition-colors ${activeTab === 'bestSellers'
                                        ? 'text-black border-b-2 border-black pb-1'
                                        : 'text-gray-600 hover:text-black'
                                    }`}
                            >
                                {t('tabs.bestSellers')}
                            </button>
                        </div>

                        {/* All Products Button - Right aligned */}
                        <div className="flex justify-center md:justify-end">
                            <Link
                                href="/shop"
                                className="inline-flex items-center gap-2 border-2 border-black bg-white text-black font-medium px-6 py-2 uppercase text-sm hover:bg-black hover:text-white transition-colors duration-300 whitespace-nowrap"
                            >
                                <span>{t('allProducts')}</span>
                                <FaCaretRight className="text-xs" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Product Grid */}
                {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        {Array.from({ length: 8 }).map((_, index) => (
                            <ProductCardSkeleton key={index} />
                        ))}
                    </div>
                ) : products.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg mb-2">No hot products available</p>
                        <p className="text-gray-400 text-sm">Mark products as "Hot" in the admin dashboard to display them here.</p>
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
                                    <Link href={product.link} className="block w-full h-full">
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
                                        <div className="absolute top-2 left-2 bg-amber-500 text-white text-xs font-normal px-2 py-1 uppercase z-10 ">
                                            {t('badges.hot')}
                                        </div>
                                    )}

                                    {/* Hover Overlay Icons - Right side: Vertical stack of icons */}
                                    <div className="absolute top-1/2 right-3 -translate-y-1/2 bg-white rounded border border-gray-200 p-1.5 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 z-30 shadow-md">
                                        {/* View Icon - Navigate to product details */}
                                        <Link
                                            href={product.link}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                            }}
                                            className="p-2.5 text-gray-700 hover:text-blue-500 hover:bg-gray-50 rounded transition-colors duration-200 flex items-center justify-center"
                                            aria-label="View product details"
                                        >
                                            <FaEye size={16} />
                                        </Link>

                                        {/* Add to Cart Icon */}
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                
                                                // Check if user is authenticated
                                                if (!isAuthenticated) {
                                                    toast.error('Please login to add items to cart');
                                                    router.push('/login');
                                                    return;
                                                }
                                                
                                                const price = parseFloat(product.price.replace('$', '').replace(',', ''));
                                                addToCart({
                                                    id: product.id,
                                                    name: product.name,
                                                    price: price,
                                                    image: product.image,
                                                });
                                                toast.success(`${product.name} added to cart!`);
                                            }}
                                            className="p-2.5 text-gray-700 hover:text-amber-500 hover:bg-gray-50 rounded transition-colors duration-200 flex items-center justify-center"
                                            aria-label="Add to cart"
                                        >
                                            <RiShoppingBag3Line size={16} />
                                        </button>

                                        {/* Share Icon */}
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                handleShareProduct(product);
                                            }}
                                            className="p-2.5 text-gray-700 hover:text-green-500 hover:bg-gray-50 rounded transition-colors duration-200 flex items-center justify-center"
                                            aria-label="Share product"
                                        >
                                            <FaShareAlt size={16} />
                                        </button>
                                    </div>
                                </div>

                                {/* Product Info */}
                                <Link href={product.link}>
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
                                                ({product.reviews} {product.reviews === 1 ? t('review') : t('reviews')})
                                            </span>
                                        </div>

                                        {/* Price */}
                                        <div className="flex items-center gap-2 flex-wrap">
                                            {product.originalPrice ? (
                                                <>
                                                    <span className="text-red-500 font-normal text-lg">
                                                        {product.price}
                                                    </span>
                                                    <span className="text-gray-400 text-sm line-through">
                                                        {product.originalPrice}
                                                    </span>
                                                </>
                                            ) : (
                                                <span className="text-black font-normal text-lg">
                                                    {product.price}
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
        </section>
    );
}
