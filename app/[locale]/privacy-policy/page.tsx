import { Metadata } from 'next';
import { Link } from '@/lib/navigation';
import { FaShieldAlt, FaLock, FaUserShield, FaEye, FaCookie } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'Privacy Policy | Fast Meuble',
  description: 'Privacy Policy and Cookie Policy for Fast Meuble - Your trusted furniture e-commerce platform',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-4">
              <FaShieldAlt className="text-amber-600 text-2xl" />
            </div>
            <h1 className="text-4xl md:text-5xl font-normal text-gray-900 mb-4">
              Privacy Policy
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
                <FaLock className="text-amber-500" />
                Introduction
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                At Fast Meuble ("we," "our," or "us"), we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
              </p>
              <p className="text-gray-700 leading-relaxed">
                By using our website, you consent to the data practices described in this policy. If you do not agree with the practices described in this policy, please do not use our services.
              </p>
            </section>

            {/* Information We Collect */}
            <section className="mb-12">
              <h2 className="text-2xl font-normal text-gray-900 mb-4 flex items-center gap-2">
                <FaUserShield className="text-amber-500" />
                Information We Collect
              </h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Personal Information</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may collect personal information that you voluntarily provide to us when you:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6 ml-4">
                <li>Register for an account</li>
                <li>Place an order</li>
                <li>Subscribe to our newsletter</li>
                <li>Contact us through our website</li>
                <li>Participate in surveys or promotions</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mb-4">
                This information may include:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6 ml-4">
                <li>Name and contact information (email address, phone number, mailing address)</li>
                <li>Payment information (credit card details, billing address)</li>
                <li>Account credentials (username, password)</li>
                <li>Order history and preferences</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Automatically Collected Information</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                When you visit our website, we automatically collect certain information about your device and browsing behavior, including:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6 ml-4">
                <li>IP address and location data</li>
                <li>Browser type and version</li>
                <li>Operating system</li>
                <li>Pages visited and time spent on pages</li>
                <li>Referring website addresses</li>
                <li>Device information</li>
              </ul>
            </section>

            {/* How We Use Your Information */}
            <section className="mb-12">
              <h2 className="text-2xl font-normal text-gray-900 mb-4 flex items-center gap-2">
                <FaEye className="text-amber-500" />
                How We Use Your Information
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We use the information we collect for various purposes, including:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6 ml-4">
                <li>Processing and fulfilling your orders</li>
                <li>Managing your account and providing customer support</li>
                <li>Sending you order confirmations and updates</li>
                <li>Communicating with you about products, services, and promotions</li>
                <li>Improving our website and user experience</li>
                <li>Analyzing website usage and trends</li>
                <li>Preventing fraud and ensuring security</li>
                <li>Complying with legal obligations</li>
              </ul>
            </section>

            {/* Cookies and Tracking Technologies */}
            <section id="cookies" className="mb-12 scroll-mt-24">
              <h2 className="text-2xl font-normal text-gray-900 mb-4 flex items-center gap-2">
                <FaCookie className="text-amber-500" />
                Cookies and Tracking Technologies
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We use cookies and similar tracking technologies to track activity on our website and store certain information. Cookies are files with a small amount of data that may include an anonymous unique identifier.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Types of Cookies We Use</h3>
              
              <div className="bg-gray-50  p-4 mb-4">
                <h4 className="font-semibold text-gray-800 mb-2">Essential Cookies</h4>
                <p className="text-gray-700 text-sm mb-3">
                  These cookies are necessary for the website to function properly. They enable basic functions like page navigation and access to secure areas of the website.
                </p>
                <p className="text-gray-600 text-xs italic">Status: Always Active</p>
              </div>

              <div className="bg-gray-50  p-4 mb-4">
                <h4 className="font-semibold text-gray-800 mb-2">Analytics Cookies</h4>
                <p className="text-gray-700 text-sm mb-3">
                  These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.
                </p>
                <p className="text-gray-600 text-xs italic">Status: Optional</p>
              </div>

              <div className="bg-gray-50  p-4 mb-4">
                <h4 className="font-semibold text-gray-800 mb-2">Marketing Cookies</h4>
                <p className="text-gray-700 text-sm mb-3">
                  These cookies are used to track visitors across websites to display relevant advertisements.
                </p>
                <p className="text-gray-600 text-xs italic">Status: Optional</p>
              </div>

              <p className="text-gray-700 leading-relaxed mt-4">
                You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.
              </p>
            </section>

            {/* Information Sharing */}
            <section className="mb-12">
              <h2 className="text-2xl font-normal text-gray-900 mb-4">Information Sharing and Disclosure</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6 ml-4">
                <li><strong>Service Providers:</strong> We may share information with third-party service providers who perform services on our behalf, such as payment processing, shipping, and data analysis.</li>
                <li><strong>Legal Requirements:</strong> We may disclose your information if required by law or in response to valid requests by public authorities.</li>
                <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred.</li>
                <li><strong>With Your Consent:</strong> We may share your information with your explicit consent.</li>
              </ul>
            </section>

            {/* Data Security */}
            <section className="mb-12">
              <h2 className="text-2xl font-normal text-gray-900 mb-4">Data Security</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure.
              </p>
            </section>

            {/* Your Rights */}
            <section className="mb-12">
              <h2 className="text-2xl font-normal text-gray-900 mb-4">Your Rights</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Depending on your location, you may have the following rights regarding your personal information:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6 ml-4">
                <li>Right to access your personal information</li>
                <li>Right to correct inaccurate information</li>
                <li>Right to delete your personal information</li>
                <li>Right to restrict processing of your information</li>
                <li>Right to data portability</li>
                <li>Right to object to processing</li>
                <li>Right to withdraw consent</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                To exercise these rights, please contact us using the information provided in the "Contact Us" section below.
              </p>
            </section>

            {/* Children's Privacy */}
            <section className="mb-12">
              <h2 className="text-2xl font-normal text-gray-900 mb-4">Children's Privacy</h2>
              <p className="text-gray-700 leading-relaxed">
                Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
              </p>
            </section>

            {/* Changes to This Policy */}
            <section className="mb-12">
              <h2 className="text-2xl font-normal text-gray-900 mb-4">Changes to This Privacy Policy</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
              <p className="text-gray-700 leading-relaxed">
                You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
              </p>
            </section>

            {/* Contact Us */}
            <section className="mb-12 bg-amber-50  p-6">
              <h2 className="text-2xl font-normal text-gray-900 mb-4">Contact Us</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have any questions about this Privacy Policy, please contact us:
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

