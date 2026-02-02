import { Metadata } from 'next';
import { Link } from '@/lib/navigation';
import { FaFileContract, FaGavel, FaHandshake, FaExclamationTriangle, FaCheckCircle } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'Terms of Service | Fast Meuble',
  description: 'Terms of Service for Fast Meuble - Your trusted furniture e-commerce platform',
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-4">
              <FaFileContract className="text-amber-600 text-2xl" />
            </div>
            <h1 className="text-4xl md:text-5xl font-normal text-gray-900 mb-4">
              Terms of Service
            </h1>
            <p className="text-gray-600 text-lg">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            {/* Introduction */}
            <section className="mb-12">
              <h2 className="text-2xl font-normal text-gray-900 mb-4 flex items-center gap-2">
                <FaHandshake className="text-amber-500" />
                Agreement to Terms
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                These Terms of Service ("Terms") govern your access to and use of the Fast Meuble website and services ("Service") operated by Fast Meuble ("we," "our," or "us").
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of these Terms, then you may not access the Service.
              </p>
              <div className="bg-amber-50 border-l-4 border-amber-500 p-4 my-6">
                <p className="text-gray-700 text-sm">
                  <strong>Please read these Terms carefully before using our Service.</strong>
                </p>
              </div>
            </section>

            {/* Use of Service */}
            <section className="mb-12">
              <h2 className="text-2xl font-normal text-gray-900 mb-4">Use of Service</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Eligibility</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                You must be at least 18 years old to use our Service. By using the Service, you represent and warrant that:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6 ml-4">
                <li>You are at least 18 years of age</li>
                <li>You have the legal capacity to enter into these Terms</li>
                <li>You will use the Service in accordance with these Terms and applicable laws</li>
                <li>All information you provide is accurate and current</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Account Registration</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                To access certain features of our Service, you may be required to register for an account. When you register, you agree to:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6 ml-4">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain and update your information to keep it accurate</li>
                <li>Maintain the security of your account credentials</li>
                <li>Accept responsibility for all activities under your account</li>
                <li>Notify us immediately of any unauthorized use of your account</li>
              </ul>
            </section>

            {/* Products and Orders */}
            <section className="mb-12">
              <h2 className="text-2xl font-normal text-gray-900 mb-4">Products and Orders</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Product Information</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We strive to provide accurate product descriptions, images, and pricing. However, we do not warrant that product descriptions, images, or other content on our Service is accurate, complete, reliable, current, or error-free.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Pricing</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                All prices are displayed in FCFA (Central African CFA Franc) unless otherwise stated. We reserve the right to change prices at any time without prior notice. However, the price you pay will be the price displayed at the time you place your order.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Order Acceptance</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Your order is an offer to purchase products from us. We reserve the right to accept or reject your order for any reason, including:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6 ml-4">
                <li>Product availability</li>
                <li>Errors in pricing or product information</li>
                <li>Suspected fraud or unauthorized activity</li>
                <li>Errors in your order</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Payment</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Payment must be made at the time of order placement. We accept various payment methods as displayed on our checkout page. You agree to provide current, complete, and accurate purchase and account information for all purchases.
              </p>
            </section>

            {/* Shipping and Delivery */}
            <section className="mb-12">
              <h2 className="text-2xl font-normal text-gray-900 mb-4">Shipping and Delivery</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We will make every effort to deliver your order within the estimated timeframe. However, delivery times are estimates and not guaranteed. Factors that may affect delivery include:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6 ml-4">
                <li>Product availability and manufacturing time</li>
                <li>Customization requirements</li>
                <li>Delivery location</li>
                <li>Weather conditions or other circumstances beyond our control</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                Risk of loss and title for products pass to you upon delivery to the carrier. You are responsible for filing any claims with carriers for damaged or lost shipments.
              </p>
            </section>

            {/* Returns and Refunds */}
            <section className="mb-12">
              <h2 className="text-2xl font-normal text-gray-900 mb-4">Returns and Refunds</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Due to the custom nature of our furniture products, returns are subject to our Return Policy. Please review our return policy before making a purchase. Refunds, if applicable, will be processed according to our refund policy and may take several business days to appear in your account.
              </p>
            </section>

            {/* Intellectual Property */}
            <section className="mb-12">
              <h2 className="text-2xl font-normal text-gray-900 mb-4 flex items-center gap-2">
                <FaGavel className="text-amber-500" />
                Intellectual Property Rights
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                The Service and its original content, features, and functionality are owned by Fast Meuble and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                You may not:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6 ml-4">
                <li>Reproduce, distribute, or create derivative works from our content</li>
                <li>Use our trademarks or logos without permission</li>
                <li>Remove any copyright or proprietary notices</li>
                <li>Use automated systems to access the Service without permission</li>
              </ul>
            </section>

            {/* Prohibited Uses */}
            <section className="mb-12">
              <h2 className="text-2xl font-normal text-gray-900 mb-4 flex items-center gap-2">
                <FaExclamationTriangle className="text-amber-500" />
                Prohibited Uses
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                You agree not to use the Service:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6 ml-4">
                <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                <li>To submit false or misleading information</li>
                <li>To upload or transmit viruses or any other type of malicious code</li>
                <li>To collect or track the personal information of others</li>
                <li>To spam, phish, pharm, pretext, spider, crawl, or scrape</li>
                <li>For any obscene or immoral purpose</li>
                <li>To interfere with or circumvent the security features of the Service</li>
              </ul>
            </section>

            {/* Disclaimer of Warranties */}
            <section className="mb-12">
              <h2 className="text-2xl font-normal text-gray-900 mb-4">Disclaimer of Warranties</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. WE EXPRESSLY DISCLAIM ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We do not warrant that the Service will be uninterrupted, timely, secure, or error-free, or that defects will be corrected.
              </p>
            </section>

            {/* Limitation of Liability */}
            <section className="mb-12">
              <h2 className="text-2xl font-normal text-gray-900 mb-4">Limitation of Liability</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, IN NO EVENT SHALL FAST MEUBLE, ITS DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR USE OF THE SERVICE.
              </p>
            </section>

            {/* Indemnification */}
            <section className="mb-12">
              <h2 className="text-2xl font-normal text-gray-900 mb-4">Indemnification</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                You agree to defend, indemnify, and hold harmless Fast Meuble and its licensees and licensors, and their employees, contractors, agents, officers and directors, from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney's fees).
              </p>
            </section>

            {/* Termination */}
            <section className="mb-12">
              <h2 className="text-2xl font-normal text-gray-900 mb-4">Termination</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
              </p>
              <p className="text-gray-700 leading-relaxed">
                If you wish to terminate your account, you may simply discontinue using the Service or contact us to request account deletion.
              </p>
            </section>

            {/* Governing Law */}
            <section className="mb-12">
              <h2 className="text-2xl font-normal text-gray-900 mb-4">Governing Law</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                These Terms shall be interpreted and governed by the laws of Cameroon, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
              </p>
            </section>

            {/* Changes to Terms */}
            <section className="mb-12">
              <h2 className="text-2xl font-normal text-gray-900 mb-4">Changes to Terms</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect.
              </p>
              <p className="text-gray-700 leading-relaxed">
                What constitutes a material change will be determined at our sole discretion. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
              </p>
            </section>

            {/* Contact Information */}
            <section className="mb-12 bg-amber-50  p-6">
              <h2 className="text-2xl font-normal text-gray-900 mb-4 flex items-center gap-2">
                <FaCheckCircle className="text-amber-500" />
                Contact Information
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="text-gray-700 space-y-2">
                <p><strong>Fast Meuble</strong></p>
                <p>Bepanda carrefour mala (bepanda manoua voyage), Douala, Cameroon</p>
                <p>Email: info@fastmeuble.com</p>
                <p>Phone: +237 654 366 920</p>
              </div>
            </section>

            {/* Back to Home */}
            <div className="text-center mt-12">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-semibold transition-colors"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

