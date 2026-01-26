import AboutHero from '@/components/about/AboutHero';
import OurStory from '@/components/about/OurStory';
import MissionVision from '@/components/about/MissionVision';
import OurValues from '@/components/about/OurValues';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import FAQ from '@/components/about/FAQ';
import ContactInfo from '@/components/about/ContactInfo';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="pt-24">
        <AboutHero />
        <OurStory />
        <MissionVision />
        <WhyChooseUs />
        <OurValues />
        <FAQ />
        <ContactInfo />
      </div>
    </div>
  );
}
