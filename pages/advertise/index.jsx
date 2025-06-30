import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Check, Info, ArrowRight, MapPin, Clock, DollarSign, BarChart } from 'lucide-react';
import Navigation from '../../components/navigation';
import Footer from '../../components/Footer';

export default function AdvertisePage() {
  // Ad placement options
  const adPlacements = [
    {
      id: 'tokens-premium',
      name: 'Tokens Page - Premium Spot',
      description: 'Featured at the top of our tokens listing page',
      price: 1499,
      impressions: '100,000+',
      position: 'Top of page',
      audience: 'Crypto investors',
      popular: true,
    },
    {
      id: 'homepage-sidebar',
      name: 'Homepage Sidebar',
      description: 'Visible on the main homepage sidebar',
      price: 999,
      impressions: '80,000+',
      position: 'Right sidebar',
      audience: 'General visitors',
      popular: false,
    },
    {
      id: 'news-banner',
      name: 'News Section Banner',
      description: 'Banner displayed in the news section',
      price: 799,
      impressions: '50,000+',
      position: 'Between articles',
      audience: 'News readers',
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      <Head>
        <title>Advertise Your Token | 1ewis</title>
        <meta name="description" content="Promote your cryptocurrency token to thousands of potential investors" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navigation />

      <main className="container mx-auto px-4 pt-16 pb-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Advertise Your Token</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Reach thousands of potential investors and increase your token's visibility with our premium advertising spots
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50 text-center">
            <div className="bg-blue-500/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <BarChart className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">250K+</h3>
            <p className="text-gray-400">Monthly Visitors</p>
          </div>
          
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50 text-center">
            <div className="bg-green-500/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-6 h-6 text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">8:35</h3>
            <p className="text-gray-400">Avg. Time on Site</p>
          </div>
          
          <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50 text-center">
            <div className="bg-yellow-500/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <DollarSign className="w-6 h-6 text-yellow-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">85%</h3>
            <p className="text-gray-400">Crypto Investors</p>
          </div>
        </div>

        {/* Ad Placement Options */}
        <h2 className="text-2xl font-bold text-white mb-6">Available Ad Placements</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {adPlacements.map((placement) => (
            <div 
              key={placement.id} 
              className={`bg-gray-800/50 rounded-xl border ${placement.popular ? 'border-yellow-500/50' : 'border-gray-700/50'} overflow-hidden relative`}
            >
              {placement.popular && (
                <div className="absolute top-0 right-0 bg-yellow-500 text-xs text-black font-bold px-2 py-0.5">
                  MOST POPULAR
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{placement.name}</h3>
                <p className="text-gray-400 mb-4">{placement.description}</p>
                <div className="flex items-center mb-2">
                  <MapPin className="w-4 h-4 text-gray-500 mr-2" />
                  <span className="text-gray-300">{placement.position}</span>
                </div>
                <div className="flex items-center mb-2">
                  <BarChart className="w-4 h-4 text-gray-500 mr-2" />
                  <span className="text-gray-300">{placement.impressions} impressions/month</span>
                </div>
                <div className="flex items-center mb-4">
                  <Info className="w-4 h-4 text-gray-500 mr-2" />
                  <span className="text-gray-300">{placement.audience}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-white">${placement.price}</span>
                  <Link 
                    href={`/advertise/purchase?placement=${placement.id}`}
                    className={`inline-flex items-center px-4 py-2 rounded-full ${placement.popular ? 'bg-yellow-500 text-black hover:bg-yellow-400' : 'bg-blue-600 text-white hover:bg-blue-500'} transition-colors duration-200 font-medium`}
                  >
                    Select <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Why Advertise Section */}
        <div className="bg-gray-800/30 rounded-xl p-8 border border-gray-700/50 mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Why Advertise with Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="bg-green-500/20 w-10 h-10 rounded-full flex items-center justify-center">
                  <Check className="w-5 h-5 text-green-400" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-white mb-2">Targeted Audience</h3>
                <p className="text-gray-400">
                  Our platform attracts crypto enthusiasts, investors, and traders actively looking for new opportunities.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="bg-green-500/20 w-10 h-10 rounded-full flex items-center justify-center">
                  <Check className="w-5 h-5 text-green-400" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-white mb-2">Premium Placement</h3>
                <p className="text-gray-400">
                  Strategic ad positions designed to maximize visibility and engagement with your token.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="bg-green-500/20 w-10 h-10 rounded-full flex items-center justify-center">
                  <Check className="w-5 h-5 text-green-400" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-white mb-2">Performance Tracking</h3>
                <p className="text-gray-400">
                  Detailed analytics to track impressions, clicks, and conversions for your campaign.
                </p>
              </div>
            </div>
            
            <div className="flex">
              <div className="flex-shrink-0">
                <div className="bg-green-500/20 w-10 h-10 rounded-full flex items-center justify-center">
                  <Check className="w-5 h-5 text-green-400" />
                </div>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-white mb-2">Flexible Options</h3>
                <p className="text-gray-400">
                  Choose from various timeframes and placements to fit your marketing budget and goals.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to Promote Your Token?</h2>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Select one of our premium ad placements above or contact our team for custom advertising solutions.
          </p>
          <Link 
            href="/advertise/purchase"
            className="inline-flex items-center px-6 py-3 rounded-full bg-yellow-500 text-black hover:bg-yellow-400 transition-colors duration-200 font-bold text-lg"
          >
            View All Options <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
