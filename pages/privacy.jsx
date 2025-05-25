import React from 'react';
import PriceTicker from '../components/PriceTicker';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Footer from '../components/Footer';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Price Ticker */}
      <PriceTicker />
      
      <div className="px-6 py-20 md:px-16">
        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
            Privacy Policy
          </h1>
          
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-8 border border-gray-800 mb-8 prose prose-invert max-w-none">
            <p className="text-gray-300 mb-6">
              Last Updated: May 25, 2025
            </p>
            
            <h2 className="text-xl font-semibold mb-4 text-blue-400">1. Introduction</h2>
            <p className="mb-4">
              At 1ewis.com ("we," "our," or "us"), we respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website.
            </p>
            <p className="mb-4">
              By using our website, you consent to the data practices described in this Privacy Policy. If you do not agree with the data practices described, you should not use our website.
            </p>
            
            <h2 className="text-xl font-semibold mb-4 text-blue-400">2. Information We Collect</h2>
            <p className="mb-4">
              We may collect several types of information from and about users of our website, including:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-300">
              <li><strong>Usage Data:</strong> Information about how you use our website, including your browsing actions and patterns. This may include the pages you visit, the time and date of your visit, the time spent on those pages, and other diagnostic data.</li>
              <li><strong>Device Data:</strong> Information about your device, including your IP address, browser type and version, operating system, and other technology identifiers.</li>
              <li><strong>Cookies and Similar Technologies:</strong> We use cookies and similar tracking technologies to track activity on our website and hold certain information. Cookies are files with a small amount of data that may include an anonymous unique identifier.</li>
            </ul>
            
            <h2 className="text-xl font-semibold mb-4 text-blue-400">3. How We Use Your Information</h2>
            <p className="mb-4">
              We use the information we collect for various purposes, including:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-300">
              <li>To provide and maintain our website</li>
              <li>To improve our website and user experience</li>
              <li>To analyze how users use our website</li>
              <li>To monitor and analyze usage patterns and trends</li>
              <li>To detect, prevent, and address technical issues</li>
              <li>To track and measure the performance of our affiliate marketing activities</li>
            </ul>
            
            <h2 className="text-xl font-semibold mb-4 text-blue-400">4. Affiliate Links and Tracking</h2>
            <p className="mb-4">
              As a crypto affiliate website, we participate in various affiliate programs. When you click on affiliate links on our website, the respective affiliate programs may use cookies and tracking technologies to identify that you came from our website. This allows us to earn commissions on qualifying purchases or sign-ups.
            </p>
            <p className="mb-4">
              These third-party affiliate programs have their own privacy policies, and we do not have access to or control over the cookies or other tracking technologies they use. We recommend reviewing the privacy policies of these third parties if you have concerns about their data practices.
            </p>
            
            <h2 className="text-xl font-semibold mb-4 text-blue-400">5. Analytics</h2>
            <p className="mb-4">
              We may use third-party analytics services, such as Google Analytics, to help us understand how users interact with our website. These services collect information about your use of our website and may use cookies and similar technologies to track your activity.
            </p>
            <p className="mb-4">
              The information generated about your use of our website (including your IP address) may be transmitted to and stored by these third-party analytics providers on servers in various countries. These providers may use this information to evaluate your use of our website, compile reports on website activity, and provide other services relating to website activity and internet usage.
            </p>
            
            <h2 className="text-xl font-semibold mb-4 text-blue-400">6. Data Security</h2>
            <p className="mb-4">
              We implement appropriate technical and organizational measures to protect the security of your personal information. However, please be aware that no method of transmission over the internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
            </p>
            
            <h2 className="text-xl font-semibold mb-4 text-blue-400">7. Third-Party Links</h2>
            <p className="mb-4">
              Our website contains links to third-party websites and services. We have no control over the content, privacy policies, or practices of these third-party websites or services. We encourage you to review the privacy policies of any third-party websites or services you visit.
            </p>
            
            <h2 className="text-xl font-semibold mb-4 text-blue-400">8. Children's Privacy</h2>
            <p className="mb-4">
              Our website is not intended for children under the age of 18. We do not knowingly collect personal information from children under 18. If you are a parent or guardian and you believe your child has provided us with personal information, please contact us, and we will take steps to remove that information from our servers.
            </p>
            
            <h2 className="text-xl font-semibold mb-4 text-blue-400">9. Changes to This Privacy Policy</h2>
            <p className="mb-4">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the top of this Privacy Policy.
            </p>
            <p className="mb-4">
              You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
            </p>
            
            <h2 className="text-xl font-semibold mb-4 text-blue-400">10. Your Rights</h2>
            <p className="mb-4">
              Depending on your location, you may have certain rights regarding your personal information, such as:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-300">
              <li>The right to access the personal information we have about you</li>
              <li>The right to request correction of inaccurate personal information</li>
              <li>The right to request deletion of your personal information</li>
              <li>The right to object to processing of your personal information</li>
              <li>The right to data portability</li>
              <li>The right to withdraw consent</li>
            </ul>
            <p className="mb-4">
              To exercise any of these rights, please contact us using the information provided below.
            </p>
            
            <h2 className="text-xl font-semibold mb-4 text-blue-400">11. Contact Us</h2>
            <p className="mb-4">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p className="mb-4">
              Email: contact@1ewis.com<br />
              Twitter: @1ewis_
            </p>
          </div>
          
          <div className="text-center">
            <Link href="/terms" className="text-blue-400 hover:text-blue-300 transition-colors">
              View our Terms of Service
            </Link>
          </div>
        </motion.div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
