'use client';

import { useState } from 'react';
import { useTranslations, useMessages } from 'next-intl';
import { Link } from '@/lib/navigation';
import Image from 'next/image';
import { FaStar, FaStarHalfAlt, FaRegStar, FaCaretRight, FaSearch, FaHeart, FaShoppingBag, FaShareAlt } from 'react-icons/fa';
import { RiShoppingBag3Line } from 'react-icons/ri';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

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
    const [activeTab, setActiveTab] = useState<TabType>('latest');

    // Get products from translations
    let products: Product[] = [];
    try {
        const productsData = (messages as any)?.components?.products?.HotProducts?.products;
        if (Array.isArray(productsData)) {
            products = productsData;
        }
    } catch (e) {
        console.warn('Could not load products from translations', e);
    }

    // Fallback products if translations fail
    if (products.length === 0) {
        products = [
            {
                id: '1',
                name: 'Chair Padded Seat',
                image: '/images/category-1.jpg',
                price: '$100.00',
                rating: 4.5,
                reviews: 2,
                link: '/shop/chair-padded-seat',
            },
            {
                id: '2',
                name: 'Beam Decatur',
                image: '/images/category-2.jpg',
                price: '$30.51',
                rating: 0,
                reviews: 0,
                link: '/shop/beam-decatur',
            },
            {
                id: '3',
                name: 'Briarwood Decorative',
                image: '/images/category-3.jpg',
                price: '$20.00',
                rating: 0,
                reviews: 0,
                link: '/shop/briarwood-decorative',
            },
            {
                id: '4',
                name: 'Ceramic Canister',
                image: '/images/discount-1.jpg',
                price: '$27.00',
                originalPrice: '$30.51',
                rating: 0,
                reviews: 0,
                discount: '12%',
                link: '/shop/ceramic-canister',
            },
            {
                id: '5',
                name: 'Aqua Globes',
                image: '/images/discount-2.jpg',
                price: '$25.00 - $30.00',
                rating: 0,
                reviews: 0,
                isHot: true,
                link: '/shop/aqua-globes',
            },
            {
                id: '6',
                name: 'CWI Gifts Wood',
                image: '/images/slider5-1.jpg',
                price: '$21.00',
                originalPrice: '$30.51',
                rating: 0,
                reviews: 0,
                discount: '31%',
                link: '/shop/cwi-gifts-wood',
            },
            {
                id: '7',
                name: 'Alarm Clock',
                image: '/images/slider5-2.jpg',
                price: '$259.00',
                rating: 0,
                reviews: 0,
                isHot: true,
                link: '/shop/alarm-clock',
            },
            {
                id: '8',
                name: 'Casper Sleep Pillow',
                image: '/images/slider5-3.jpg',
                price: '$287.00',
                rating: 4.5,
                reviews: 1,
                isHot: true,
                link: '/shop/casper-sleep-pillow',
            },
        ];
    }

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
                                <span className="text-2xl md:text-3xl font-bold relative inline-block">
                                    Hot
                                    {/* Orange Underline directly under "Hot" */}
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-500"></span>
                                </span>
                                <span className="text-2xl md:text-3xl font-bold">Products</span>
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
                                        <div className="absolute top-2 left-2 bg-amber-500 text-white text-xs font-bold px-2 py-1 uppercase z-10 ">
                                            {t('badges.hot')}
                                        </div>
                                    )}
                                    {product.discount && (
                                        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 z-10 ">
                                            -{product.discount}
                                        </div>
                                    )}

                                    {/* Hover Overlay Icons */}
                                    {/* Bottom-left: Search Icon - Black circular button */}
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            // Handle quick view
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
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
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

                                        {/* Heart Icon */}
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                // Handle wishlist
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
                                                // Handle share
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
                                                    <span className="text-red-500 font-bold text-lg">
                                                        {product.price}
                                                    </span>
                                                    <span className="text-gray-400 text-sm line-through">
                                                        {product.originalPrice}
                                                    </span>
                                                </>
                                            ) : (
                                                <span className="text-black font-bold text-lg">
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
            </div>
        </section>
    );
}
