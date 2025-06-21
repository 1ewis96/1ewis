import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button, ButtonLink } from "../components/ui/button";
import { ArrowRight, Github, Twitter, Mail, ExternalLink, CheckCircle, Award, Shield, Users, Youtube } from "lucide-react";
import Footer from '../components/Footer';

export default function AboutPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <Head>
        <title>About 1ewis.com | Crypto Education & Affiliate Resources</title>
        <meta name="description" content="Learn about 1ewis.com, our mission to provide unbiased cryptocurrency education, reviews, and affiliate resources to help you navigate the crypto ecosystem." />
        <meta name="keywords" content="crypto education, cryptocurrency resources, crypto affiliate, crypto reviews, about 1ewis" />
        <link rel="canonical" href="https://1ewis.com/about" />
        <meta property="og:title" content="About 1ewis.com | Crypto Education & Affiliate Resources" />
        <meta property="og:description" content="Learn about 1ewis.com, our mission to provide unbiased cryptocurrency education, reviews, and affiliate resources." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://1ewis.com/about" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About 1ewis.com | Crypto Education & Affiliate Resources" />
        <meta name="twitter:description" content="Learn about 1ewis.com, our mission to provide unbiased cryptocurrency education, reviews, and affiliate resources." />
        
        {/* Schema.org structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "name": "About 1ewis.com",
            "description": "Learn about 1ewis.com, our mission to provide unbiased cryptocurrency education, reviews, and affiliate resources to help you navigate the crypto ecosystem.",
            "publisher": {
              "@type": "Organization",
              "name": "1ewis.com",
              "logo": {
                "@type": "ImageObject",
                "url": "https://1ewis.com/images/logo.png"
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://1ewis.com/about"
            }
          })}
        </script>
      </Head>
      
      <main className="pt-28">
        {/* Hero Section */}
        <section className="py-16 px-4 bg-gradient-to-b from-gray-950 to-black relative overflow-hidden">
          {/* Background elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
            <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-blue-500/20 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-1/3 h-1/3 bg-purple-500/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
          
          <div className="container mx-auto max-w-5xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                About 1ewis.com
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Your trusted guide in the cryptocurrency ecosystem since 2023.
              </p>
            </motion.div>
          </div>
        </section>
        
        {/* Mission Section */}
        <section className="py-16 px-4 bg-black relative">
          <div className="container mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Our Mission</h2>
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-8 border border-gray-800 shadow-xl">
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6">
                  At 1ewis.com, we're dedicated to providing clear, unbiased information about cryptocurrency exchanges, wallets, tools, and educational resources to help you navigate the complex world of digital assets.
                </p>
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                  Our goal is to empower both newcomers and experienced users with the knowledge and tools they need to make informed decisions in their crypto journey, while maintaining transparency about our affiliate partnerships.
                </p>
              </div>
            </motion.div>
            
            {/* Core Values */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Our Core Values</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div 
                  variants={itemVariants}
                  className="bg-gradient-to-br from-blue-900/30 to-blue-700/10 rounded-xl p-6 border border-blue-800/30 shadow-lg"
                >
                  <div className="flex items-center mb-4">
                    <Shield className="text-blue-400 mr-3" size={24} />
                    <h3 className="text-2xl font-bold text-blue-400">Transparency</h3>
                  </div>
                  <p className="text-gray-300">
                    We clearly disclose our affiliate relationships and how we earn commissions. Our recommendations are based on genuine value, not just commission rates.
                  </p>
                </motion.div>
                
                <motion.div 
                  variants={itemVariants}
                  className="bg-gradient-to-br from-purple-900/30 to-purple-700/10 rounded-xl p-6 border border-purple-800/30 shadow-lg"
                >
                  <div className="flex items-center mb-4">
                    <CheckCircle className="text-purple-400 mr-3" size={24} />
                    <h3 className="text-2xl font-bold text-purple-400">Quality</h3>
                  </div>
                  <p className="text-gray-300">
                    We thoroughly research and test each platform before recommending it, ensuring we only promote services that meet our high standards for security, usability, and value.
                  </p>
                </motion.div>
                
                <motion.div 
                  variants={itemVariants}
                  className="bg-gradient-to-br from-pink-900/30 to-pink-700/10 rounded-xl p-6 border border-pink-800/30 shadow-lg"
                >
                  <div className="flex items-center mb-4">
                    <Users className="text-pink-400 mr-3" size={24} />
                    <h3 className="text-2xl font-bold text-pink-400">Community</h3>
                  </div>
                  <p className="text-gray-300">
                    We prioritize building a knowledgeable crypto community by providing educational resources that help users make informed decisions regardless of experience level.
                  </p>
                </motion.div>
                
                <motion.div 
                  variants={itemVariants}
                  className="bg-gradient-to-br from-yellow-900/30 to-yellow-700/10 rounded-xl p-6 border border-yellow-800/30 shadow-lg"
                >
                  <div className="flex items-center mb-4">
                    <Award className="text-yellow-400 mr-3" size={24} />
                    <h3 className="text-2xl font-bold text-yellow-400">Excellence</h3>
                  </div>
                  <p className="text-gray-300">
                    We continuously update our content and recommendations to reflect the latest developments in the cryptocurrency ecosystem, ensuring you always have access to current information.
                  </p>
                </motion.div>
              </div>
            </motion.div>
            
            {/* About the Founder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">About the Founder</h2>
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-8 border border-gray-800 shadow-xl">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/3 mb-6 md:mb-0 md:pr-8">
                    <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-blue-500/30 shadow-lg relative">
                      <Image 
                        src="https://s3.1ewis.com/personal/me.jpg" 
                        alt="Lewis - Founder of 1ewis.com" 
                        width={192} 
                        height={192} 
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <h3 className="text-2xl font-bold mb-4 text-blue-400">Lewis</h3>
                    <p className="text-gray-300 mb-4">
                      A cryptocurrency enthusiast and investor since 2017, Lewis founded 1ewis.com to share insights gained from years of navigating the crypto space. With a background in software development and finance, Lewis brings a unique perspective to cryptocurrency education and platform reviews.
                    </p>
                    <p className="text-gray-300">
                      Having experienced both bull and bear markets firsthand, Lewis is committed to helping others avoid common pitfalls while discovering valuable tools and platforms that can enhance their crypto journey.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-4">
                      <a 
                        href="https://twitter.com/1ewis_" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        <Twitter size={18} className="mr-1" />
                        <span>Twitter</span>
                      </a>
                      <a 
                        href="https://github.com/1ewis96" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        <Github size={18} className="mr-1" />
                        <span>GitHub</span>
                      </a>
                      <a 
                        href="https://youtube.com/@1ewis_com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center text-red-400 hover:text-red-300 transition-colors"
                      >
                        <Youtube size={18} className="mr-1" />
                        <span>YouTube</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Affiliate Disclosure */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Affiliate Disclosure</h2>
              <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/50 rounded-xl p-8 border border-gray-700 shadow-xl">
                <p className="text-gray-300 mb-4">
                  1ewis.com participates in various affiliate programs, including those from cryptocurrency exchanges, wallet providers, and tool developers. When you sign up or make purchases through links on our site, we may earn a commission at no additional cost to you.
                </p>
                <p className="text-gray-300 mb-4">
                  In fact, many of our affiliate partnerships include exclusive bonuses for our visitors, such as fee discounts, extended trial periods, or additional features.
                </p>
                <p className="text-gray-300 mb-6">
                  While we do earn from affiliate partnerships, we maintain editorial independence and only recommend products and services we genuinely believe provide value. Our reviews and recommendations are based on thorough research, testing, and consideration of user feedback.
                </p>
                <div className="flex justify-center">
                  <ButtonLink 
                    href="/portfolio" 
                    className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg transition-colors"
                  >
                    <span className="flex items-center">
                      View Our Recommended Platforms <ArrowRight className="ml-2" size={18} />
                    </span>
                  </ButtonLink>
                </div>
              </div>
            </motion.div>
            
            {/* Contact Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Get in Touch</h2>
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-8 border border-gray-800 shadow-xl text-center">
                <p className="text-xl text-gray-300 mb-8">
                  Have questions, feedback, or partnership inquiries? We'd love to hear from you!
                </p>
                <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6">
                  <ButtonLink 
                    href="mailto:contact@1ewis.com" 
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-6 py-3 rounded-lg transition-colors w-full md:w-auto"
                  >
                    <span className="flex items-center justify-center">
                      <Mail className="mr-2" size={18} />
                      Email Us
                    </span>
                  </ButtonLink>
                  <ButtonLink 
                    href="/mailing-list" 
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-6 py-3 rounded-lg transition-colors w-full md:w-auto"
                  >
                    <span className="flex items-center justify-center">
                      <ExternalLink className="mr-2" size={18} />
                      Join Our Newsletter
                    </span>
                  </ButtonLink>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
