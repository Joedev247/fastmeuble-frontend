'use client';

import { useState } from 'react';
import { useTranslations, useMessages } from 'next-intl';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';

interface ContactData {
  title: string;
  subtitle: string;
  description: string;
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
      location: 'Bepanda, Douala - Cameroon',
      address: 'Bepanda, Douala, Cameroon',
      phone: '+237 XXX XXX XXX',
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
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // TODO: Implement form submission logic (API call, email service, etc.)
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-gray-400 text-sm uppercase tracking-wider mb-4">
            {data.subtitle}
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-4">
            {data.title}
          </h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {data.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h3 className="text-2xl font-bold text-black mb-6">Contact Information</h3>
            
            <div className="space-y-6">
              {/* Location */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center">
                  <FaMapMarkerAlt className="text-white" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-black mb-1">Location</h4>
                  <p className="text-gray-600">{data.address}</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center">
                  <FaPhone className="text-white" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-black mb-1">Phone</h4>
                  <a href={`tel:${data.phone}`} className="text-gray-600 hover:text-amber-500 transition-colors">
                    {data.phone}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center">
                  <FaEnvelope className="text-white" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-black mb-1">Email</h4>
                  <a href={`mailto:${data.email}`} className="text-gray-600 hover:text-amber-500 transition-colors">
                    {data.email}
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center">
                  <FaClock className="text-white" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-black mb-1">Business Hours</h4>
                  <p className="text-gray-600">{data.hours}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h3 className="text-2xl font-bold text-black mb-2">{data.formTitle}</h3>
            <p className="text-gray-600 mb-6">{data.formSubtitle}</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  {data.nameLabel}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 Fast Meuble focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  {data.emailLabel}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 Fast Meuble focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  {data.phoneLabel}
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 Fast Meuble focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  {data.messageLabel}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 Fast Meuble focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold px-8 py-4 Fast Meuble transition-colors duration-300 uppercase text-sm shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : data.submitButton}
              </button>

              {/* Success/Error Messages */}
              {submitStatus === 'success' && (
                <div className="p-4 bg-green-50 border border-green-200 Fast Meuble text-green-800">
                  Thank you! Your message has been sent. We'll get back to you soon.
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="p-4 bg-red-50 border border-red-200 Fast Meuble text-red-800">
                  Something went wrong. Please try again later.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
