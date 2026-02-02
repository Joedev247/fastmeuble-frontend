import Hero from '@/components/hero/Hero';
import ShopByCategories from '@/components/categories/ShopByCategories';
import PromoBanners from '@/components/banners/PromoBanners';
import HotProducts from '@/components/products/HotProducts';
import ProductBanner from '@/components/banners/ProductBanner';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import OurStories from '@/components/sections/OurStories';
import Contact from '@/components/sections/Contact';

// Force dynamic rendering for dynamic locale param
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <ShopByCategories />
      <PromoBanners />
      <HotProducts />
      <ProductBanner />
      <WhyChooseUs />
      <OurStories />
      <Contact />
    </div>
  );
}
