'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from '@/lib/navigation';
import { ProductFilters } from '@/components/products/ProductFilters';
import { ProductGrid } from '@/components/products/ProductGrid';
import { ProductGridSkeleton } from '@/components/products/ProductCardSkeleton';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { FaFilter } from 'react-icons/fa';
import { productAPI } from '@/lib/api/products';
import { categoryAPI } from '@/lib/api/categories';
import { toast } from 'sonner';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  isHot?: boolean;
  originalPrice?: number;
  discount?: string;
}

interface Category {
  name: string;
  count: number;
}


export default function ProductsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Read category from URL params on mount
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setSelectedCategories([categoryParam]);
    }
  }, [searchParams]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      // Load products
      const productsData = await productAPI.getAll({ status: 'published' });
      const formattedProducts: Product[] = productsData.map((p: any) => ({
        id: p.id || p._id,
        name: p.name,
        category: typeof p.category === 'object' ? p.category.name : p.category,
        price: p.price,
        rating: p.rating || 0,
        reviews: p.reviews || 0,
        image: p.mainImage || p.images?.[0] || '/images/category-1.jpg',
        isHot: p.isHot,
        originalPrice: p.originalPrice,
        discount: p.discount,
      }));
      setProducts(formattedProducts);

      // Load categories
      const categoriesData = await categoryAPI.getAll();
      const formattedCategories: Category[] = categoriesData.map((c: any) => ({
        name: c.name,
        count: c.productCount || 0,
      }));
      setCategories(formattedCategories);
    } catch (error: any) {
      console.error('Error loading data:', error);
      toast.error('Failed to load products. Please check your connection.');
      // Don't use mock data - show empty state instead
      setProducts([]);
      setCategories([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategoryToggle = (category: string) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
    
    setSelectedCategories(newCategories);
    
    // Update URL with category filter
    const params = new URLSearchParams(searchParams.toString());
    if (newCategories.length > 0) {
      params.set('category', newCategories[0]); // Use first selected category
    } else {
      params.delete('category');
    }
    router.push(`/shop?${params.toString()}`);
  };

  const handleResetFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 1000]);
    setSelectedRating(null);
  };

  // Filter products based on selected filters
  const filteredProducts = products.filter(product => {
    if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
      return false;
    }
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false;
    }
    if (selectedRating !== null && product.rating < selectedRating) {
      return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-white pt-20 md:pt-24 pb-8">
      <div className="container mx-auto px-4">
        {/* Mobile Filter Button */}
        <div className="mb-4 md:hidden flex items-center justify-between">
          <h1 className="text-2xl font-normal text-gray-900">Shop</h1>
          <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <FaFilter size={16} />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-80 overflow-y-auto">
              <ProductFilters
                categories={categories}
                selectedCategories={selectedCategories}
                onCategoryToggle={handleCategoryToggle}
                priceRange={priceRange}
                onPriceRangeChange={setPriceRange}
                selectedRating={selectedRating}
                onRatingSelect={setSelectedRating}
                onResetFilters={handleResetFilters}
              />
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex flex-col md:flex-row gap-4 md:gap-8">
          {/* Left Sidebar - Filters (Desktop) */}
          <aside className="hidden md:block w-64 flex-shrink-0">
            <ProductFilters
              categories={categories}
              selectedCategories={selectedCategories}
              onCategoryToggle={handleCategoryToggle}
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
              selectedRating={selectedRating}
              onRatingSelect={setSelectedRating}
              onResetFilters={handleResetFilters}
            />
          </aside>

          {/* Main Content - Product Grid */}
          <main className="flex-1 min-w-0">
            {/* Results Header */}
            <div className="mb-4 md:mb-6">
              <h1 className="text-2xl md:text-3xl font-normal text-gray-900 mb-2 hidden md:block">Shop</h1>
              <p className="text-sm text-gray-600">
                {isLoading ? 'Loading...' : `Showing ${filteredProducts.length} ${filteredProducts.length === 1 ? 'product' : 'products'}`}
              </p>
            </div>
            {isLoading ? (
              <ProductGridSkeleton count={8} />
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg mb-2">No products found</p>
                <p className="text-gray-400 text-sm">
                  {products.length === 0 
                    ? 'No products have been added yet. Please add products from the admin dashboard.'
                    : 'No products match your filters. Try adjusting your search criteria.'}
                </p>
              </div>
            ) : (
              <ProductGrid products={filteredProducts} />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
