import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, AlertCircle, HelpCircle, Lightbulb, Shield } from 'lucide-react';
import Link from 'next/link';

const BeginnersGuide = () => {
  const [activeStep, setActiveStep] = useState(1);
  
  const steps = [
    {
      id: 1,
      title: "Choose the Right Exchange",
      icon: <HelpCircle className="w-6 h-6" />,
      content: "Selecting the right exchange is crucial for your crypto journey. Consider factors like fees, available cryptocurrencies, security features, and user interface. For beginners, we recommend Binance or Bybit for their comprehensive features and user-friendly interfaces.",
      cta: {
        text: "Compare Exchanges",
        link: "#comparison-table"
      }
    },
    {
      id: 2,
      title: "Create Your Account",
      icon: <Shield className="w-6 h-6" />,
      content: "Sign up using our referral links to get exclusive bonuses. You'll need to provide basic information and complete identity verification (KYC) to comply with regulations. This typically involves submitting a government-issued ID and sometimes a proof of address.",
      cta: {
        text: "Security Tips",
        link: "#security-tips"
      }
    },
    {
      id: 3,
      title: "Fund Your Account",
      icon: <AlertCircle className="w-6 h-6" />,
      content: "Most exchanges support multiple deposit methods including bank transfers, credit/debit cards, and cryptocurrency deposits. Bank transfers usually have lower fees but take longer, while card payments are instant but come with higher fees. Start with a small amount to get comfortable with the platform.",
      cta: {
        text: "Funding Options",
        link: "#funding-options"
      }
    },
    {
      id: 4,
      title: "Make Your First Trade",
      icon: <Lightbulb className="w-6 h-6" />,
      content: "Navigate to the trading section of your chosen exchange. For beginners, use the 'Convert' or 'Simple Trade' option to easily swap between currencies. If you're ready for more advanced trading, explore the spot trading interface where you can set specific prices for your orders.",
      cta: {
        text: "Trading Basics",
        link: "#trading-basics"
      }
    },
    {
      id: 5,
      title: "Secure Your Assets",
      icon: <CheckCircle className="w-6 h-6" />,
      content: "While it's convenient to keep small amounts on exchanges, for larger holdings consider transferring to a secure wallet. Hardware wallets like Ledger or Trezor offer the highest security, while software wallets like MetaMask provide a balance of security and convenience.",
      cta: {
        text: "Wallet Options",
        link: "#wallet-options"
      }
    }
  ];

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
    <div className="w-full max-w-5xl mx-auto">
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {steps.map((step) => (
          <motion.button
            key={step.id}
            variants={itemVariants}
            className={`px-4 py-3 rounded-lg flex flex-col items-center text-center transition-all duration-300 ${
              activeStep === step.id 
                ? 'bg-blue-500/20 border border-blue-500/50 text-blue-400' 
                : 'bg-gray-800/50 border border-gray-700 text-gray-400 hover:bg-gray-800'
            }`}
            onClick={() => setActiveStep(step.id)}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
              activeStep === step.id ? 'bg-blue-500/20 text-blue-400' : 'bg-gray-800 text-gray-400'
            }`}>
              {step.icon}
            </div>
            <span className="text-sm font-medium">Step {step.id}</span>
            <span className={`text-xs mt-1 ${activeStep === step.id ? 'text-blue-300' : 'text-gray-500'}`}>
              {step.title}
            </span>
          </motion.button>
        ))}
      </motion.div>

      <motion.div 
        className="bg-gray-900 border border-gray-800 rounded-xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        key={activeStep}
      >
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mr-4">
            {steps[activeStep - 1].icon}
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Step {activeStep}: {steps[activeStep - 1].title}</h3>
            <div className="flex mt-1">
              {steps.map((step) => (
                <div 
                  key={step.id}
                  className={`w-8 h-1 rounded-full mr-1 ${step.id === activeStep ? 'bg-blue-500' : 'bg-gray-700'}`}
                />
              ))}
            </div>
          </div>
        </div>

        <p className="text-gray-300 mb-6 leading-relaxed">
          {steps[activeStep - 1].content}
        </p>

        <div className="flex justify-between items-center">
          <Link 
            href={steps[activeStep - 1].cta.link}
            className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
          >
            <span>{steps[activeStep - 1].cta.text}</span>
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>

          <div className="flex space-x-2">
            <button
              className="px-4 py-2 rounded bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={activeStep === 1}
              onClick={() => setActiveStep(Math.max(1, activeStep - 1))}
            >
              Previous
            </button>
            <button
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={activeStep === steps.length}
              onClick={() => setActiveStep(Math.min(steps.length, activeStep + 1))}
            >
              Next Step
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BeginnersGuide;
