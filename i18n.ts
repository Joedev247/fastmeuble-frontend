import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

export const locales = ['en', 'fr'] as const;
export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ locale: localeParam }) => {
  // `locale` can be undefined for certain internal Next.js requests; don't 404 the whole app.
  const locale = ((localeParam ?? 'en') as Locale);
  if (!locales.includes(locale)) notFound();

  // Load base translations if exists
  let messages: Record<string, any> = {};
  
  try {
    const baseTranslations = await import(`./messages/${locale}.json`);
    messages = baseTranslations.default || {};
  } catch (e) {
    // Base file might not exist, that's okay
  }

  // Load component-specific translations
  try {
    const cartTranslations = await import(`./messages/${locale}/components/navbar/Cart.json`);
    const searchTranslations = await import(`./messages/${locale}/components/navbar/Search.json`);
    const loginTranslations = await import(`./messages/${locale}/components/navbar/Login.json`);
    const mobileNavbarTranslations = await import(`./messages/${locale}/components/navbar/MobileNavbar.json`);
    const desktopNavbarTranslations = await import(`./messages/${locale}/components/navbar/DesktopNavbar.json`);
    const navigationMenuTranslations = await import(`./messages/${locale}/components/navbar/NavigationMenu.json`);
    const languageSwitcherTranslations = await import(`./messages/${locale}/components/navbar/LanguageSwitcher.json`);
    const heroTranslations = await import(`./messages/${locale}/components/hero/Hero.json`);
    const shopByCategoriesTranslations = await import(`./messages/${locale}/components/categories/ShopByCategories.json`);
    const promoBannersTranslations = await import(`./messages/${locale}/components/banners/PromoBanners.json`);
    const productBannerTranslations = await import(`./messages/${locale}/components/banners/ProductBanner.json`);
    const hotProductsTranslations = await import(`./messages/${locale}/components/products/HotProducts.json`);
    const productShowcaseTranslations = await import(`./messages/${locale}/components/products/ProductShowcase.json`);
    const ourStoriesTranslations = await import(`./messages/${locale}/components/sections/OurStories.json`);
    const whyChooseUsTranslations = await import(`./messages/${locale}/components/sections/WhyChooseUs.json`);
    const contactTranslations = await import(`./messages/${locale}/components/sections/Contact.json`);
    const footerTranslations = await import(`./messages/${locale}/components/footer/Footer.json`);
    const loginPageTranslations = await import(`./messages/${locale}/components/auth/LoginPage.json`);
    const aboutHeroTranslations = await import(`./messages/${locale}/components/about/AboutHero.json`);
    const ourStoryTranslations = await import(`./messages/${locale}/components/about/OurStory.json`);
    const missionVisionTranslations = await import(`./messages/${locale}/components/about/MissionVision.json`);
    const ourValuesTranslations = await import(`./messages/${locale}/components/about/OurValues.json`);
    const faqTranslations = await import(`./messages/${locale}/components/about/FAQ.json`);
    const contactInfoTranslations = await import(`./messages/${locale}/components/about/ContactInfo.json`);

    // Merge component translations under components namespace
    messages = {
      ...messages,
      components: {
        navbar: {
          Cart: cartTranslations.default,
          Search: searchTranslations.default,
          Login: loginTranslations.default,
          MobileNavbar: mobileNavbarTranslations.default,
          DesktopNavbar: desktopNavbarTranslations.default,
          NavigationMenu: navigationMenuTranslations.default,
          LanguageSwitcher: languageSwitcherTranslations.default,
        },
        hero: {
          Hero: heroTranslations.default,
        },
        categories: {
          ShopByCategories: shopByCategoriesTranslations.default,
        },
        banners: {
          PromoBanners: promoBannersTranslations.default,
          ProductBanner: productBannerTranslations.default,
        },
        products: {
          HotProducts: hotProductsTranslations.default,
          ProductShowcase: productShowcaseTranslations.default,
        },
        sections: {
          OurStories: ourStoriesTranslations.default,
          WhyChooseUs: whyChooseUsTranslations.default,
          Contact: contactTranslations.default,
        },
        footer: {
          Footer: footerTranslations.default,
        },
        auth: {
          LoginPage: loginPageTranslations.default,
        },
        about: {
          AboutHero: aboutHeroTranslations.default,
          OurStory: ourStoryTranslations.default,
          MissionVision: missionVisionTranslations.default,
          OurValues: ourValuesTranslations.default,
          FAQ: faqTranslations.default,
          ContactInfo: contactInfoTranslations.default,
        }
      }
    };
  } catch (e) {
    // Component translations might not exist yet, that's okay
    // eslint-disable-next-line no-console
    console.warn('Some component translations could not be loaded:', e);
  }

  return {
    locale,
    messages
  };
});
