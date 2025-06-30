import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ArrowLeft, Calendar, Clock, CreditCard, Check, Info, AlertCircle } from 'lucide-react';
import Navigation from '../../../components/navigation';
import Footer from '../../../components/Footer';

export default function AdvertisePurchasePage() {
  const router = useRouter();
  const { placement: initialPlacement } = router.query;
  
  // State for form selections
  const [selectedPlacement, setSelectedPlacement] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState('30');
  const [totalPrice, setTotalPrice] = useState(0);
  
  // Ad placement options
  const adPlacements = [
    {
      id: 'tokens-premium',
      name: 'Tokens Page - Premium Spot',
      description: 'Featured at the top of our tokens listing page',
      basePrice: 1499,
      impressions: '100,000+',
      position: 'Top of page',
      audience: 'Crypto investors',
      popular: true,
      image: '/images/ad-tokens-premium.jpg'
    },
    {
      id: 'homepage-sidebar',
      name: 'Homepage Sidebar',
      description: 'Visible on the main homepage sidebar',
      basePrice: 999,
      impressions: '80,000+',
      position: 'Right sidebar',
      audience: 'General visitors',
      popular: false,
      image: '/images/ad-homepage-sidebar.jpg'
    },
    {
      id: 'news-banner',
      name: 'News Section Banner',
      description: 'Banner displayed in the news section',
      basePrice: 799,
      impressions: '50,000+',
      position: 'Between articles',
      audience: 'News readers',
      popular: false,
      image: '/images/ad-news-banner.jpg'
    },
  ];
  
  // Duration options
  const durationOptions = [
    { value: '7', label: '7 Days', discount: 0 },
    { value: '30', label: '30 Days', discount: 0 },
    { value: '90', label: '90 Days', discount: 10 },
    { value: '180', label: '180 Days', discount: 15 },
    { value: '365', label: '365 Days', discount: 25 },
  ];
  
  // Set initial placement from URL query param
  useEffect(() => {
    if (initialPlacement) {
      const placement = adPlacements.find(p => p.id === initialPlacement);
      if (placement) {
        setSelectedPlacement(placement);
      }
    }
  }, [initialPlacement]);
  
  // Calculate total price whenever placement or duration changes
  useEffect(() => {
    if (!selectedPlacement) return;
    
    const duration = durationOptions.find(d => d.value === selectedDuration);
    const durationMultiplier = parseInt(selectedDuration) / 30; // Base price is for 30 days
    const discountPercent = duration.discount;
    
    let price = selectedPlacement.basePrice * durationMultiplier;
    if (discountPercent > 0) {
      price = price * (1 - discountPercent / 100);
    }
    
    setTotalPrice(Math.round(price));
  }, [selectedPlacement, selectedDuration]);

  return (
    <div className="min-h-screen bg-gray-900">
      <Head>
        <title>Purchase Ad Space | 1ewis</title>
        <meta name="description" content="Select and purchase advertising space for your token" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navigation />

      <main className="container mx-auto px-4 pt-16 pb-8">
        {/* Back button */}
        <div className="mb-6">
          <Link href="/advertise" className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Ad Options
          </Link>
        </div>
        
        <h1 className="text-3xl font-bold text-white mb-8">Purchase Ad Space</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Ad selection */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50 mb-8">
              <h2 className="text-xl font-bold text-white mb-4">1. Select Ad Placement</h2>
              
              <div className="space-y-4">
                {adPlacements.map((placement) => (
                  <div 
                    key={placement.id}
                    onClick={() => setSelectedPlacement(placement)}
                    className={`flex border rounded-lg p-4 cursor-pointer transition-colors ${
                      selectedPlacement?.id === placement.id 
                        ? 'bg-blue-900/30 border-blue-500' 
                        : 'bg-gray-800/30 border-gray-700 hover:border-gray-600'
                    }`}
                  >
                    <div className="flex-shrink-0 w-16 h-16 bg-gray-700 rounded-md mr-4 flex items-center justify-center">
                      {/* Placeholder for ad image */}
                      <div className="text-xs text-gray-400">Ad Preview</div>
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center">
                        <h3 className="font-medium text-white">{placement.name}</h3>
                        {placement.popular && (
                          <span className="ml-2 text-xs bg-yellow-500 text-black px-1.5 py-0.5 rounded-full">POPULAR</span>
                        )}
                      </div>
                      <p className="text-sm text-gray-400 mt-1">{placement.description}</p>
                      <div className="flex items-center mt-2 text-xs text-gray-500">
                        <span className="mr-3">{placement.impressions} impressions</span>
                        <span>{placement.audience}</span>
                      </div>
                    </div>
                    <div className="flex-shrink-0 ml-4">
                      <div className="text-lg font-bold text-white">${placement.basePrice}</div>
                      <div className="text-xs text-gray-400">per month</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
              <h2 className="text-xl font-bold text-white mb-4">2. Select Duration</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {durationOptions.map((option) => (
                  <div 
                    key={option.value}
                    onClick={() => setSelectedDuration(option.value)}
                    className={`border rounded-lg p-3 text-center cursor-pointer transition-colors relative ${
                      selectedDuration === option.value 
                        ? 'bg-blue-900/30 border-blue-500' 
                        : 'bg-gray-800/30 border-gray-700 hover:border-gray-600'
                    }`}
                  >
                    {option.discount > 0 && (
                      <div className="absolute -top-2 -right-2 bg-green-500 text-xs text-black font-bold px-1.5 py-0.5 rounded-full">
                        -{option.discount}%
                      </div>
                    )}
                    <div className="text-lg font-medium text-white">{option.label}</div>
                    <div className="text-xs text-gray-400 mt-1">
                      {option.discount > 0 ? 'Best value' : 'Standard rate'}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-blue-900/20 border border-blue-800/50 rounded-lg">
                <div className="flex items-start">
                  <Info className="w-5 h-5 text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-blue-300">
                    Longer durations offer better value with automatic discounts. All ad placements are subject to content review before going live.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right column - Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800/50 rounded-xl border border-gray-700/50 sticky top-4">
              <div className="p-6 border-b border-gray-700">
                <h2 className="text-xl font-bold text-white mb-4">Order Summary</h2>
                
                {selectedPlacement ? (
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300">Ad Placement:</span>
                      <span className="text-white font-medium">{selectedPlacement.name}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300">Duration:</span>
                      <span className="text-white font-medium">
                        {durationOptions.find(d => d.value === selectedDuration)?.label}
                      </span>
                    </div>
                    
                    {parseInt(selectedDuration) > 30 && (
                      <div className="flex justify-between mb-2 text-green-400">
                        <span>Discount:</span>
                        <span>
                          -{durationOptions.find(d => d.value === selectedDuration)?.discount}%
                        </span>
                      </div>
                    )}
                    
                    <div className="border-t border-gray-700 my-4 pt-4 flex justify-between">
                      <span className="text-white font-medium">Total:</span>
                      <span className="text-xl text-white font-bold">${totalPrice}</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-gray-400">Select an ad placement to see pricing</p>
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <button
                  disabled={!selectedPlacement}
                  className={`w-full py-3 px-4 rounded-lg font-medium flex items-center justify-center ${
                    selectedPlacement 
                      ? 'bg-yellow-500 text-black hover:bg-yellow-400 transition-colors' 
                      : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <CreditCard className="w-5 h-5 mr-2" />
                  Proceed to Payment
                </button>
                
                <div className="mt-4 text-xs text-gray-400 text-center">
                  By proceeding, you agree to our advertising terms and conditions.
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Additional information */}
        <div className="mt-12 bg-gray-800/30 rounded-xl p-6 border border-gray-700/50">
          <h2 className="text-xl font-bold text-white mb-4">Ad Requirements & Specifications</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-white mb-3">Content Guidelines</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <Check className="w-4 h-4 text-green-400 mr-2 mt-1 flex-shrink-0" />
                  <span>All ads must comply with our content policy and cryptocurrency regulations</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-4 h-4 text-green-400 mr-2 mt-1 flex-shrink-0" />
                  <span>No misleading claims or promises of financial returns</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-4 h-4 text-green-400 mr-2 mt-1 flex-shrink-0" />
                  <span>Clear identification of advertised token and project</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-4 h-4 text-green-400 mr-2 mt-1 flex-shrink-0" />
                  <span>No offensive, illegal, or inappropriate content</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-white mb-3">Technical Specifications</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <Check className="w-4 h-4 text-green-400 mr-2 mt-1 flex-shrink-0" />
                  <span>Banner ads: 728×90px (desktop), 320×50px (mobile)</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-4 h-4 text-green-400 mr-2 mt-1 flex-shrink-0" />
                  <span>Sidebar ads: 300×250px</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-4 h-4 text-green-400 mr-2 mt-1 flex-shrink-0" />
                  <span>File formats: JPG, PNG, or GIF (static or animated)</span>
                </li>
                <li className="flex items-start">
                  <Check className="w-4 h-4 text-green-400 mr-2 mt-1 flex-shrink-0" />
                  <span>Maximum file size: 150KB</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-yellow-900/20 border border-yellow-800/50 rounded-lg">
            <div className="flex items-start">
              <AlertCircle className="w-5 h-5 text-yellow-400 mr-2 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-yellow-300">
                After purchase, you'll be prompted to upload your ad creative and provide targeting preferences. Our team will review your submission within 24-48 hours before your ad goes live.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
