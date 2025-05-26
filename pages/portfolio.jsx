import { Button, ButtonLink } from "../components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";
import Link from 'next/link';
import { motion } from 'framer-motion';
import PriceTicker from '../components/PriceTicker';
import ExchangeCompare from '../components/ExchangeCompare';
import TradingVolumeChart from '../components/TradingVolumeChart';

export default function PortfolioPage() {
  const exchanges = [
    {
      name: "Bitrue",
      color: "blue-400",
      description: "An exchange focused on XRP and crypto yield products, offering competitive trading fees and excellent staking options.",
      pros: ["Competitive trading fees", "XRP ecosystem focus", "High-yield staking products", "User-friendly mobile app"],
      cons: ["Fewer trading pairs than some competitors", "Limited advanced trading tools"],
      bestFor: "XRP enthusiasts and yield-focused traders looking for competitive rates",
      link: "/bitrue",
      refLink: "https://www.bitrue.com/referral/landing?cn=600000&inviteCode=TWLQHQZ"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Price Ticker */}
      <PriceTicker />
      
      {/* Hero Section */}
      <div className="px-6 py-20 md:px-16 bg-gradient-to-b from-gray-900 to-black">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
            Crypto Exchange Portfolio
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-300">
            Compare the top crypto exchanges side by side and find the perfect platform for your trading needs.
          </p>
        </motion.div>
        
        {/* Interactive Exchange Comparison */}
        <ExchangeCompare />
        
        {/* Trading Volume Chart */}
        <TradingVolumeChart />

        {/* Comparison Table - Desktop */}
        <motion.div 
          className="hidden lg:block overflow-x-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="py-4 px-6 text-left">Exchange</th>
                <th className="py-4 px-6 text-left">Best For</th>
                <th className="py-4 px-6 text-left">Pros</th>
                <th className="py-4 px-6 text-left">Cons</th>
                <th className="py-4 px-6 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {exchanges.map((exchange) => (
                <tr key={exchange.name} className="border-b border-gray-800 hover:bg-gray-800/30">
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <img src={exchange.logo} alt={`${exchange.name} Logo`} className="w-8 h-8 mr-3" />
                      <span className={`font-semibold text-${exchange.color}`}>{exchange.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-300">{exchange.bestFor}</td>
                  <td className="py-4 px-6">
                    <ul className="list-disc pl-5 text-gray-300">
                      {exchange.pros.slice(0, 2).map((pro, index) => (
                        <li key={index}>{pro}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="py-4 px-6">
                    <ul className="list-disc pl-5 text-gray-300">
                      {exchange.cons.slice(0, 2).map((con, index) => (
                        <li key={index}>{con}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex space-x-2">
                      <ButtonLink 
                        href={exchange.link} 
                        size="sm" 
                        variant="outline" 
                        className="border-gray-700 text-gray-300 hover:bg-gray-800"
                      >
                        Details
                      </ButtonLink>
                      <ButtonLink 
                        href={exchange.refLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        size="sm" 
                        className={`bg-${exchange.color.split('-')[0]}-500 hover:bg-${exchange.color.split('-')[0]}-400`}
                      >
                        Join
                      </ButtonLink>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Exchange Cards - Mobile */}
        <div className="lg:hidden grid gap-8 mb-16">
          {exchanges.map((exchange, index) => (
            <motion.div 
              key={exchange.name} 
              className="bg-gray-800/50 rounded-xl p-6 border border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-4">
                <img src={exchange.logo} alt={`${exchange.name} Logo`} className="w-10 h-10 mr-3" />
                <h2 className={`text-xl font-semibold text-${exchange.color}`}>{exchange.name}</h2>
              </div>
              <p className="text-gray-300 mb-4">{exchange.description}</p>
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Best For:</h3>
                <p className="text-gray-300">{exchange.bestFor}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <h3 className="font-semibold mb-2">Pros:</h3>
                  <ul className="list-disc pl-5 text-gray-300">
                    {exchange.pros.map((pro, index) => (
                      <li key={index}>{pro}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Cons:</h3>
                  <ul className="list-disc pl-5 text-gray-300">
                    {exchange.cons.map((con, index) => (
                      <li key={index}>{con}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="flex space-x-3">
                <ButtonLink 
                  href={exchange.link} 
                  className="flex-1" 
                  variant="outline"
                >
                  View Details
                </ButtonLink>
                <ButtonLink 
                  href={exchange.refLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`flex-1 bg-${exchange.color.split('-')[0]}-500 hover:bg-${exchange.color.split('-')[0]}-400`}
                >
                  Join Now
                </ButtonLink>
              </div>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <motion.div 
              className="bg-gray-800/30 rounded-xl p-6 hover:bg-gray-800/50 transition-colors duration-300"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3 className="text-xl font-semibold mb-3">How do affiliate links work?</h3>
              <p className="text-gray-300">When you sign up using my affiliate links, I receive a small commission at no extra cost to you. In fact, you often get exclusive bonuses when using these links!</p>
            </motion.div>
            <motion.div 
              className="bg-gray-800/30 rounded-xl p-6 hover:bg-gray-800/50 transition-colors duration-300"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3 className="text-xl font-semibold mb-3">Which exchange is best for beginners?</h3>
              <p className="text-gray-300">Binance offers the most comprehensive educational resources, but Bybit has a more intuitive interface. Both are excellent choices for newcomers.</p>
            </motion.div>
            <motion.div 
              className="bg-gray-800/30 rounded-xl p-6 hover:bg-gray-800/50 transition-colors duration-300"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3 className="text-xl font-semibold mb-3">Are these exchanges safe?</h3>
              <p className="text-gray-300">All exchanges featured here implement strong security measures. Kraken stands out for regulatory compliance, while Binance and OKX offer the most comprehensive insurance funds.</p>
            </motion.div>
            <motion.div 
              className="bg-gray-800/30 rounded-xl p-6 hover:bg-gray-800/50 transition-colors duration-300"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h3 className="text-xl font-semibold mb-3">Which has the lowest fees?</h3>
              <p className="text-gray-300">Binance generally offers the lowest trading fees at 0.1%, with further reductions possible when using BNB. Bybit is a close second with competitive fee structures.</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Footer */}
        <footer className="mt-20 text-center text-sm text-gray-500">
          <div className="mb-4">
            <Link href="/" className="text-gray-400 hover:text-blue-400">
              ← Back to Home
            </Link>
          </div>
          © 2025 1ewis.com — All affiliate links on this site help support the content at no extra cost to you.
        </footer>
      </div>
    </div>
  );
}
