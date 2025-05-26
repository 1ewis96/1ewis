import React, { useState } from 'react';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';
import { motion } from 'framer-motion';

const exchangeData = {
  bittrue: {
    name: 'Bitrue',
    color: 'blue-400',
    features: [
      { name: 'Trading Fee', value: '0.098%' },
      { name: 'Number of Coins', value: '200+' },
      { name: 'Mobile App Rating', value: '4.5/5' },
      { name: 'Fiat Currencies', value: '30+' },
      { name: 'Leverage Trading', value: 'Up to 100x' },
      { name: 'Staking Rewards', value: 'Up to 80% APY' },
    ]
  },
  coinbase: {
    name: 'Coinbase',
    color: 'blue-500',
    features: [
      { name: 'Trading Fee', value: '0.6%' },
      { name: 'Number of Coins', value: '150+' },
      { name: 'Mobile App Rating', value: '4.7/5' },
      { name: 'Fiat Currencies', value: '20+' },
      { name: 'Leverage Trading', value: 'Limited' },
      { name: 'Staking Rewards', value: 'Up to 5% APY' },
    ]
  },
  huobi: {
    name: 'Huobi',
    color: 'green-400',
    features: [
      { name: 'Trading Fee', value: '0.2%' },
      { name: 'Number of Coins', value: '350+' },
      { name: 'Mobile App Rating', value: '4.2/5' },
      { name: 'Fiat Currencies', value: '15+' },
      { name: 'Leverage Trading', value: 'Up to 125x' },
      { name: 'Staking Rewards', value: 'Up to 30% APY' },
    ]
  },
  bitstamp: {
    name: 'Bitstamp',
    color: 'red-400',
    features: [
      { name: 'Trading Fee', value: '0.5%' },
      { name: 'Number of Coins', value: '70+' },
      { name: 'Mobile App Rating', value: '4.1/5' },
      { name: 'Fiat Currencies', value: '5+' },
      { name: 'Leverage Trading', value: 'No' },
      { name: 'Staking Rewards', value: 'Limited options' },
    ]
  }
};

export default function ExchangeCompare() {
  const [leftExchange, setLeftExchange] = useState('bittrue');
  const [rightExchange, setRightExchange] = useState('coinbase');
  
  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div 
      className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 mb-12"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInVariants}
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Interactive Exchange Comparison</h2>
      
      <div className="flex justify-center space-x-4 mb-8">
        <div className="flex flex-col">
          <label className="text-sm text-gray-400 mb-1">Left Exchange</label>
          <select 
            value={leftExchange}
            onChange={(e) => setLeftExchange(e.target.value)}
            className="bg-gray-700 rounded-md border border-gray-600 p-2 text-white"
          >
            {Object.keys(exchangeData).map(key => (
              <option key={key} value={key} disabled={key === rightExchange}>
                {exchangeData[key].name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex flex-col">
          <label className="text-sm text-gray-400 mb-1">Right Exchange</label>
          <select 
            value={rightExchange}
            onChange={(e) => setRightExchange(e.target.value)}
            className="bg-gray-700 rounded-md border border-gray-600 p-2 text-white"
          >
            {Object.keys(exchangeData).map(key => (
              <option key={key} value={key} disabled={key === leftExchange}>
                {exchangeData[key].name}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="relative h-[400px] mb-6">
        <ReactCompareSlider
          itemOne={
            <div className={`h-full w-full bg-gradient-to-br from-${exchangeData[leftExchange].color.split('-')[0]}-900/70 to-black p-8 flex flex-col items-center`}>
              <img 
                src={exchangeData[leftExchange].image} 
                alt={`${exchangeData[leftExchange].name} Logo`}
                className="w-16 h-16 mb-4"
              />
              <h3 className={`text-2xl font-bold mb-6 text-${exchangeData[leftExchange].color}`}>
                {exchangeData[leftExchange].name}
              </h3>
              <div className="w-full space-y-4">
                {exchangeData[leftExchange].features.map((feature, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-gray-300">{feature.name}</span>
                    <span className={`font-semibold text-${exchangeData[leftExchange].color}`}>{feature.value}</span>
                  </div>
                ))}
              </div>
            </div>
          }
          itemTwo={
            <div className={`h-full w-full bg-gradient-to-br from-${exchangeData[rightExchange].color.split('-')[0]}-900/70 to-black p-8 flex flex-col items-center`}>
              <img 
                src={exchangeData[rightExchange].image} 
                alt={`${exchangeData[rightExchange].name} Logo`}
                className="w-16 h-16 mb-4"
              />
              <h3 className={`text-2xl font-bold mb-6 text-${exchangeData[rightExchange].color}`}>
                {exchangeData[rightExchange].name}
              </h3>
              <div className="w-full space-y-4">
                {exchangeData[rightExchange].features.map((feature, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-gray-300">{feature.name}</span>
                    <span className={`font-semibold text-${exchangeData[rightExchange].color}`}>{feature.value}</span>
                  </div>
                ))}
              </div>
            </div>
          }
          className="h-full rounded-xl overflow-hidden"
        />
      </div>
      
      <p className="text-center text-gray-400 text-sm">
        Drag the slider to compare exchange features side by side
      </p>
    </motion.div>
  );
}
