import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Calculator, Gift } from 'lucide-react';
import { Button } from '../components/ui/button';

const exchangeBonuses = {
  bittrue: {
    name: 'Bitrue',
    color: 'blue',
    tiers: [
      { min: 0, max: 1000, rate: 0.15 },
      { min: 1000, max: 5000, rate: 0.18 },
      { min: 5000, max: 25000, rate: 0.20 },
      { min: 25000, max: 100000, rate: 0.25 },
      { min: 100000, max: Infinity, rate: 0.30 }
    ],
    maxBonus: 5000,
    tradingFeeDiscount: '20% off trading fees for 180 days'
  },
  coinbase: {
    name: 'Coinbase',
    color: 'blue',
    tiers: [
      { min: 0, max: 1000, rate: 0.05 },
      { min: 1000, max: 5000, rate: 0.08 },
      { min: 5000, max: 25000, rate: 0.10 },
      { min: 25000, max: 100000, rate: 0.12 },
      { min: 100000, max: Infinity, rate: 0.15 }
    ],
    maxBonus: 1000,
    tradingFeeDiscount: '5% off trading fees for 60 days'
  },
  huobi: {
    name: 'Huobi',
    color: 'green',
    tiers: [
      { min: 0, max: 1000, rate: 0.10 },
      { min: 1000, max: 5000, rate: 0.12 },
      { min: 5000, max: 25000, rate: 0.15 },
      { min: 25000, max: 100000, rate: 0.18 },
      { min: 100000, max: Infinity, rate: 0.20 }
    ],
    maxBonus: 3000,
    tradingFeeDiscount: '10% off trading fees for 90 days'
  },
  bitstamp: {
    name: 'Bitstamp',
    color: 'red',
    tiers: [
      { min: 0, max: 1000, rate: 0.08 },
      { min: 1000, max: 5000, rate: 0.10 },
      { min: 5000, max: 25000, rate: 0.12 },
      { min: 25000, max: 100000, rate: 0.15 },
      { min: 100000, max: Infinity, rate: 0.18 }
    ],
    maxBonus: 2000,
    tradingFeeDiscount: '8% off trading fees for 120 days'
  }
};

export default function BonusCalculator() {
  const [depositAmount, setDepositAmount] = useState(1000);
  const [selectedExchange, setSelectedExchange] = useState('bittrue');
  const [bonusAmount, setBonusAmount] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    calculateBonus();
  }, [depositAmount, selectedExchange]);

  const calculateBonus = () => {
    const exchange = exchangeBonuses[selectedExchange];
    const tier = exchange.tiers.find(
      tier => depositAmount >= tier.min && depositAmount <= tier.max
    );
    
    let calculatedBonus = depositAmount * tier.rate;
    
    // Cap at max bonus
    if (calculatedBonus > exchange.maxBonus) {
      calculatedBonus = exchange.maxBonus;
    }
    
    setBonusAmount(calculatedBonus);
  };

  const handleCalculate = () => {
    calculateBonus();
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <motion.div 
      className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 mb-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="flex items-center justify-center mb-6">
        <Calculator className="text-blue-400 mr-2" size={24} />
        <h2 className="text-2xl font-bold">Sign-Up Bonus Calculator</h2>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Select Exchange</label>
            <div className="grid grid-cols-2 gap-3">
              {Object.keys(exchangeBonuses).map(exchange => (
                <motion.button
                  key={exchange}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedExchange(exchange)}
                  className={`flex items-center p-3 rounded-lg border ${
                    selectedExchange === exchange 
                      ? `border-${exchangeBonuses[exchange].color}-500 bg-${exchangeBonuses[exchange].color}-500/20` 
                      : 'border-gray-700 bg-gray-700/50 hover:bg-gray-700'
                  }`}
                >
                  <span className={`inline-block w-3 h-3 rounded-full bg-${exchangeBonuses[exchange].color}-500 mr-2`}></span>
                  <span>{exchangeBonuses[exchange].name}</span>
                </motion.button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm text-gray-400 mb-2">Initial Deposit Amount</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="text-gray-400" size={18} />
              </div>
              <input
                type="number"
                min="0"
                value={depositAmount}
                onChange={(e) => setDepositAmount(Number(e.target.value))}
                className="bg-gray-700 border border-gray-600 rounded-md py-2 pl-10 pr-4 w-full text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="mt-4 flex justify-between">
              {[100, 1000, 5000, 10000].map(amount => (
                <Button
                  key={amount}
                  onClick={() => setDepositAmount(amount)}
                  variant={depositAmount === amount ? "default" : "outline"}
                  className="text-xs"
                >
                  {formatCurrency(amount)}
                </Button>
              ))}
            </div>
          </div>
          
          <Button 
            onClick={handleCalculate}
            className={`w-full bg-${exchangeBonuses[selectedExchange].color}-500 hover:bg-${exchangeBonuses[selectedExchange].color}-600 py-3 text-white font-semibold`}
          >
            Calculate Bonus
          </Button>
        </div>
        
        <motion.div 
          className={`bg-${exchangeBonuses[selectedExchange].color}-900/30 rounded-xl p-6 border border-${exchangeBonuses[selectedExchange].color}-800/50 flex flex-col items-center justify-center relative overflow-hidden`}
          animate={{ 
            boxShadow: showConfetti 
              ? [
                  `0 0 0 rgba(${exchangeBonuses[selectedExchange].color === 'yellow' ? '255, 206, 86' : exchangeBonuses[selectedExchange].color === 'blue' ? '54, 162, 235' : exchangeBonuses[selectedExchange].color === 'purple' ? '153, 102, 255' : '75, 192, 192'}, 0)`,
                  `0 0 20px rgba(${exchangeBonuses[selectedExchange].color === 'yellow' ? '255, 206, 86' : exchangeBonuses[selectedExchange].color === 'blue' ? '54, 162, 235' : exchangeBonuses[selectedExchange].color === 'purple' ? '153, 102, 255' : '75, 192, 192'}, 0.7)`,
                  `0 0 0 rgba(${exchangeBonuses[selectedExchange].color === 'yellow' ? '255, 206, 86' : exchangeBonuses[selectedExchange].color === 'blue' ? '54, 162, 235' : exchangeBonuses[selectedExchange].color === 'purple' ? '153, 102, 255' : '75, 192, 192'}, 0)`
                ] 
              : `0 0 0 rgba(${exchangeBonuses[selectedExchange].color === 'yellow' ? '255, 206, 86' : exchangeBonuses[selectedExchange].color === 'blue' ? '54, 162, 235' : exchangeBonuses[selectedExchange].color === 'purple' ? '153, 102, 255' : '75, 192, 192'}, 0)`
          }}
          transition={{ duration: 1.5, repeat: showConfetti ? 2 : 0 }}
        >
          <img 
            src={exchangeBonuses[selectedExchange].logo} 
            alt={`${exchangeBonuses[selectedExchange].name} Logo`}
            className="w-16 h-16 mb-4"
          />
          
          <div className="text-center mb-4">
            <h3 className={`text-${exchangeBonuses[selectedExchange].color}-400 font-semibold`}>
              {exchangeBonuses[selectedExchange].name} Bonus
            </h3>
            <div className="flex items-center justify-center">
              <Gift className={`text-${exchangeBonuses[selectedExchange].color}-400 mr-2`} size={20} />
              <p className="text-gray-300 text-sm">{exchangeBonuses[selectedExchange].tradingFeeDiscount}</p>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-gray-400 mb-2">Your Estimated Bonus</p>
            <motion.div 
              key={bonusAmount}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`text-4xl font-bold text-${exchangeBonuses[selectedExchange].color}-400`}
            >
              {formatCurrency(bonusAmount)}
            </motion.div>
            
            <p className="text-sm text-gray-500 mt-2">
              Based on {formatCurrency(depositAmount)} initial deposit
            </p>
          </div>
          
          {bonusAmount === exchangeBonuses[selectedExchange].maxBonus && (
            <div className="mt-4 bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded-full text-xs font-medium">
              Maximum bonus reached!
            </div>
          )}
          
          {showConfetti && (
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(50)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`absolute w-2 h-2 rounded-full bg-${exchangeBonuses[selectedExchange].color}-${Math.random() > 0.5 ? '400' : '500'}`}
                  initial={{
                    x: '50%',
                    y: '50%',
                    scale: 0
                  }}
                  animate={{
                    x: `${Math.random() * 100}%`,
                    y: `${Math.random() * 100}%`,
                    scale: Math.random() * 2 + 0.5,
                    opacity: [1, 0]
                  }}
                  transition={{
                    duration: 1.5,
                    ease: 'easeOut'
                  }}
                />
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
