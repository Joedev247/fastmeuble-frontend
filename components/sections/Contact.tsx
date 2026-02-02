'use client';

import { useState } from 'react';
import { useTranslations, useMessages } from 'next-intl';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock, FaPaperPlane } from 'react-icons/fa';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { contactAPI } from '@/lib/api/contact';

interface ContactData {
  title: string;
  subtitle: string;
  description: string;
  description2?: string;
  location: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  formTitle: string;
  formSubtitle: string;
  nameLabel: string;
  emailLabel: string;
  phoneLabel: string;
  messageLabel: string;
  submitButton: string;
}

export default function Contact() {
  const t = useTranslations('components.sections.Contact');
  const messages = useMessages();

  // Get contact data from translations
  let data: ContactData | null = null;
  try {
    const contactData = (messages as any)?.components?.sections?.Contact?.data;
    if (contactData) {
      data = contactData;
    }
  } catch (e) {
    console.warn('Could not load Contact data from translations', e);
  }

  // Fallback data if translations fail
  if (!data) {
    data = {
      title: 'Get In Touch',
      subtitle: 'CONTACT US',
      description: 'Have a project in mind? We work on command to bring your vision to life.',
      description2: 'Get in touch with us to discuss your custom furniture needs.',
      location: 'Bepanda carrefour mala (bepanda manoua voyage), Douala - Cameroon',
      address: 'Bepanda carrefour mala (bepanda manoua voyage), Douala, Cameroon',
      phone: '+237 654 366 920',
      email: 'info@fastmeuble.com',
      hours: 'Mon - Sat: 8:00 AM - 6:00 PM',
      formTitle: 'Send Us a Message',
      formSubtitle: 'Fill out the form below and we\'ll get back to you as soon as possible.',
      nameLabel: 'Your Name',
      emailLabel: 'Your Email',
      phoneLabel: 'Your Phone',
      messageLabel: 'Your Message',
      submitButton: 'Send Message',
    };
  }

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const messageText = formData.subject 
        ? `Subject: ${formData.subject}\n\n${formData.message}`
        : formData.message;
      
      await contactAPI.create({
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        message: messageText,
      });
      
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      setFormData({ firstName: '', lastName: '', email: '', subject: '', message: '' });
    } catch (error: any) {
      console.error('Error sending message:', error);
      toast.error(error.message || 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Split email and phone for multiple entries
  const emails = data.email.split(',').map(e => e.trim());
  const phones = data.phone.split(',').map(p => p.trim());

  return (
    <section id="contact" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <p className="text-amber-600 text-sm mb-3 text-center">{data.subtitle}</p>
        <h2 className="text-5xl font-semibold text-black mb-2 text-center">{data.title}</h2>
        <p className="text-gray-600 text-lg mb-10 text-center">
          {data.description}
          {data.description2 && (
            <>
              <br />
              {data.description2}
            </>
          )}
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
          {/* Left Column - Contact Information Cards */}
          <div className="space-y-6">
            {/* Email Us Card */}
            <div className="bg-white shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <FaEnvelope className="text-amber-600" size={20} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-black mb-2">Email Us</h3>
                  <div className="space-y-1">
                    {emails.map((email, index) => (
                      <a
                        key={index}
                        href={`mailto:${email}`}
                        className="block text-gray-600 hover:text-amber-500 transition-colors text-sm"
                      >
                        {email}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Call Us Card */}
            <div className="bg-white shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <FaPhone className="text-amber-600" size={20} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-black mb-2">Call Us</h3>
                  <div className="space-y-1">
                    {phones.map((phone, index) => (
                      <a
                        key={index}
                        href={`tel:${phone.replace(/\s/g, '')}`}
                        className="block text-gray-600 hover:text-amber-500 transition-colors text-sm"
                      >
                        {phone}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Visit Us Card */}
            <div className="bg-white shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <FaMapMarkerAlt className="text-amber-600" size={20} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-black mb-2">Visit Us</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {data.address}
                  </p>
                </div>
              </div>
            </div>

            {/* Business Hours Card */}
            <div className="bg-white shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <FaClock className="text-amber-600" size={20} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-black mb-2">Business Hours</h3>
                  <div className="space-y-1 text-gray-600 text-sm">
                    <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p>Saturday: 10:00 AM - 4:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="bg-white shadow-sm border border-gray-200 p-8">
       
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* First Name and Last Name - Side by Side */}
              <div className="flex flex-col sm:flex-row gap-5">
                {/* First Name */}
                <div className="flex-1">
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <Input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full"
                    placeholder="John"
                  />
                </div>

                {/* Last Name */}
                <div className="flex-1">
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <Input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full"
                    placeholder="Doe"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full"
                  placeholder="john@example.com"
                />
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <Input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full"
                  placeholder="How can we help?"
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
                  placeholder="Your message..."
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-amber-500 hover:bg-amber-600 text-white font-medium px-6 py-3 transition-colors duration-300 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  'Sending...'
                ) : (
                  <>
                    <FaPaperPlane className="mr-2" size={14} />
                    {data.submitButton}
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-12">
          <div className="bg-white shadow-sm border border-gray-200 overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3979.8!2d9.7!3d4.05!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x107f35c8e8c8c8c9%3A0x8c8c8c8c8c8c8c8c!2sBepanda%20carrefour%20mala%20(bepanda%20manoua%20voyage)%2C%20Douala%2C%20Cameroon!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
              title="Fast Meuble Location - Bepanda carrefour mala (bepanda manoua voyage), Douala, Cameroon"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
