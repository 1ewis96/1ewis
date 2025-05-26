import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What are crypto exchange referral bonuses?",
      answer: "Crypto exchange referral bonuses are rewards you receive for signing up through an affiliate link. These can include trading fee discounts, free cryptocurrency, or other perks. When you use our referral links, you'll get the maximum available bonus for that platform."
    },
    {
      question: "How do I claim my sign-up bonus?",
      answer: "To claim your sign-up bonus, simply use our referral link when creating your account. The bonus will be automatically applied to your account. Some exchanges require you to complete certain actions like making a minimum deposit or trading a specific volume to unlock the full bonus."
    },
    {
      question: "Which exchange has the lowest fees?",
      answer: "Bitrue offers very competitive trading fees at 0.098% for spot trading, which can be reduced further by using their native token or maintaining higher trading volumes. Check our comparison table for detailed fee information."
    },
    {
      question: "Is Bitrue safe to use?",
      answer: "Bitrue implements strong security measures like two-factor authentication, cold storage for funds, and regular security audits. They have a strong focus on security and regulatory compliance, making them a reliable choice for traders concerned with safety."
    },
    {
      question: "Is Bitrue good for beginners?",
      answer: "Bitrue is an excellent choice for beginners due to its intuitive interface, comprehensive educational resources, mobile app, and extensive learning materials. Their platform is designed to be user-friendly while still offering advanced features as you grow more comfortable with trading."
    },
    {
      question: "Can I use these exchanges in my country?",
      answer: "Availability varies by exchange and country. Most exchanges operate globally but have restrictions in certain jurisdictions due to regulatory requirements. Always check the exchange's terms of service or our comparison table for country availability before signing up."
    },
    {
      question: "What's the difference between spot and futures trading?",
      answer: "Spot trading involves buying and selling cryptocurrencies at the current market price for immediate delivery. Futures trading involves contracts to buy or sell assets at a predetermined price at a specified time in the future, allowing for leverage and short positions. Futures trading carries higher risk but offers potential for higher returns."
    },
    {
      question: "How do I withdraw my funds from an exchange?",
      answer: "To withdraw funds, navigate to the withdrawal section of your exchange, select the cryptocurrency you wish to withdraw, enter the destination wallet address, and confirm the transaction. Always double-check addresses before confirming and be aware of network fees which vary by cryptocurrency and network congestion."
    }
  ];

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <motion.div 
            key={index}
            className="border border-gray-800 rounded-lg overflow-hidden bg-gray-900"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <button
              className="flex justify-between items-center w-full px-6 py-4 text-left focus:outline-none"
              onClick={() => toggleFaq(index)}
            >
              <span className="font-medium text-lg">{faq.question}</span>
              <motion.div
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-blue-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </motion.div>
            </button>
            
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 py-4 bg-gray-800/50 text-gray-300">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FaqSection;
