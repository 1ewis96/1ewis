import React from 'react';
import PriceTicker from '../components/PriceTicker';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Footer from '../components/Footer';

export default function TermsPage() {
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
            Terms of Service
          </h1>
          
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-8 border border-gray-800 mb-8 prose prose-invert max-w-none">
            <p className="text-gray-300 mb-6">
              Last Updated: May 25, 2025
            </p>
            
            <h2 className="text-xl font-semibold mb-4 text-blue-400">1. Introduction</h2>
            <p className="mb-4">
              Welcome to 1ewis.com ("we," "our," or "us"). By accessing or using our website, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website.
            </p>
            
            <h2 className="text-xl font-semibold mb-4 text-blue-400">2. Affiliate Disclosure</h2>
            <p className="mb-4">
              1ewis.com is a crypto affiliate website. We participate in various affiliate programs, including but not limited to cryptocurrency exchanges, wallet providers, and other crypto-related services. This means we may earn commissions when you click on our affiliate links and sign up for the services we recommend.
            </p>
            <p className="mb-4">
              All affiliate links on our website are identified as such or should be assumed to be affiliate links. We strive to recommend only products and services we believe will provide value to our users, but we encourage you to perform your own due diligence before making any decisions.
            </p>
            
            <h2 className="text-xl font-semibold mb-4 text-blue-400">3. Not Financial Advice</h2>
            <p className="mb-4">
              The information provided on 1ewis.com is for general informational purposes only. It should not be considered financial, investment, legal, or tax advice. We are not financial advisors, and we do not claim to be experts in cryptocurrency investments.
            </p>
            <p className="mb-4">
              Cryptocurrency investments are volatile and carry significant risk. You should always consult with a qualified professional before making any financial decisions or investments. We are not responsible for any losses you may incur as a result of using the information provided on our website.
            </p>
            
            <h2 className="text-xl font-semibold mb-4 text-blue-400">4. User Content</h2>
            <p className="mb-4">
              If our website allows you to post, link, store, share or otherwise make available content, you are responsible for the content you post. By posting content, you represent that you have the necessary rights to that content and that it does not violate any laws or these Terms of Service.
            </p>
            <p className="mb-4">
              We reserve the right to remove any content that we believe violates these Terms of Service or is otherwise harmful, offensive, or inappropriate.
            </p>
            
            <h2 className="text-xl font-semibold mb-4 text-blue-400">5. Intellectual Property</h2>
            <p className="mb-4">
              All content on 1ewis.com, including but not limited to text, graphics, logos, images, and software, is the property of 1ewis.com or its content suppliers and is protected by international copyright, trademark, and other intellectual property laws.
            </p>
            <p className="mb-4">
              You may not reproduce, duplicate, copy, sell, resell, or exploit any portion of our website without our express written permission.
            </p>
            
            <h2 className="text-xl font-semibold mb-4 text-blue-400">6. Third-Party Links</h2>
            <p className="mb-4">
              Our website may contain links to third-party websites or services that are not owned or controlled by 1ewis.com. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services.
            </p>
            <p className="mb-4">
              You acknowledge and agree that 1ewis.com shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods, or services available on or through any such websites or services.
            </p>
            
            <h2 className="text-xl font-semibold mb-4 text-blue-400">7. Limitation of Liability</h2>
            <p className="mb-4">
              In no event shall 1ewis.com, its directors, employees, partners, agents, suppliers, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-300">
              <li>Your access to or use of or inability to access or use the website</li>
              <li>Any conduct or content of any third party on the website</li>
              <li>Any content obtained from the website</li>
              <li>Unauthorized access, use, or alteration of your transmissions or content</li>
            </ul>
            
            <h2 className="text-xl font-semibold mb-4 text-blue-400">8. Changes to Terms</h2>
            <p className="mb-4">
              We reserve the right to modify or replace these Terms of Service at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
            </p>
            <p className="mb-4">
              By continuing to access or use our website after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the website.
            </p>
            
            <h2 className="text-xl font-semibold mb-4 text-blue-400">9. Governing Law</h2>
            <p className="mb-4">
              These Terms shall be governed and construed in accordance with the laws of the United Kingdom, without regard to its conflict of law provisions.
            </p>
            <p className="mb-4">
              Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.
            </p>
            
            <h2 className="text-xl font-semibold mb-4 text-blue-400">10. Contact Us</h2>
            <p className="mb-4">
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <p className="mb-4">
              Email: contact@1ewis.com<br />
              Twitter: @1ewis_
            </p>
          </div>
          
          <div className="text-center">
            <Link href="/privacy" className="text-blue-400 hover:text-blue-300 transition-colors">
              View our Privacy Policy
            </Link>
          </div>
        </motion.div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
