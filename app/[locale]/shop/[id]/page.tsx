'use client';

import { useEffect, useState } from 'react';
import { ProductDetail } from '@/components/products/ProductDetail';
import { ProductDetailSkeleton } from '@/components/products/ProductDetailSkeleton';
import { notFound } from 'next/navigation';
import { useRouter } from '@/lib/navigation';
import { productAPI } from '@/lib/api/products';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

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

export default function ProductDetailPage({ params }: { params: Promise<{ id: string; locale: string }> }) {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  // Check authentication and redirect if not logged in
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      toast.error('Please login to view product details');
      router.push('/login');
    }
  }, [isAuthenticated, authLoading, router]);

  useEffect(() => {
    const loadProduct = async () => {
      // Don't load product if not authenticated
      if (!isAuthenticated) {
        return;
      }
      try {
        setLoading(true);
        const resolvedParams = await params;
        // Decode the ID in case it's a URL-encoded product name
        const decodedId = decodeURIComponent(resolvedParams.id);
        const productData = await productAPI.getById(decodedId);
        
        // Format product for ProductDetail component
        const formattedProduct: Product = {
          id: productData.id || productData._id,
          name: productData.name,
          category: typeof productData.category === 'object' ? productData.category.name : productData.category,
          price: productData.price,
          rating: productData.rating || 0,
          reviews: productData.reviews || 0,
          image: productData.mainImage || productData.images?.[0] || '/images/category-1.jpg',
          images: productData.images || [productData.mainImage || '/images/category-1.jpg'],
          description: productData.description,
          specifications: productData.specifications,
          inStock: productData.inStock,
          isHot: productData.isHot,
          originalPrice: productData.originalPrice,
          discount: productData.discount,
        };
        
        setProduct(formattedProduct);
      } catch (error: any) {
        console.error('Error loading product:', error);
        toast.error('Product not found');
        notFound();
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [params, isAuthenticated]);

  // Show loading while checking auth or loading product
  if (authLoading || loading || !isAuthenticated) {
    return <ProductDetailSkeleton />;
  }

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}
