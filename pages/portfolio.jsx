import { Button } from "../components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from 'next/link';

export default function PortfolioPage() {
  const exchanges = [
    {
      name: "Binance",
      logo: "https://cryptologos.cc/logos/binance-coin-bnb-logo.png",
      color: "yellow-400",
      description: "The world's largest crypto exchange by trading volume, offering 350+ cryptocurrencies with fees as low as 0.1%.",
      pros: ["Lowest trading fees", "Highest liquidity", "Wide range of products", "User-friendly mobile app"],
      cons: ["Complex for beginners", "Limited customer support"],
      bestFor: "Active traders looking for low fees and high liquidity",
      link: "/binance",
      refLink: "https://www.binance.com/en/activity/referral-entry?ref=YOUR_REF_CODE"
    },
    {
      name: "Bybit",
      logo: "https://cryptologos.cc/logos/bybit-logo.png",
      color: "blue-400",
      description: "A derivatives-focused exchange offering up to $4,100 in sign-up bonuses and competitive trading fees.",
      pros: ["Generous sign-up bonuses", "Advanced futures trading", "Low fees", "Intuitive interface"],
      cons: ["Fewer spot trading pairs", "Limited educational resources"],
      bestFor: "Futures traders and those looking for sign-up bonuses",
      link: "/bybit",
      refLink: "https://www.bybit.com/en-US/register?affiliate_id=YOUR_REF_CODE"
    },
    {
      name: "Kraken",
      logo: "https://cryptologos.cc/logos/kraken-logo.png",
      color: "purple-400",
      description: "A highly secure, US-regulated exchange with a focus on compliance and security.",
      pros: ["Bank-level security", "Regulatory compliance", "Excellent customer support", "Fiat on-ramps"],
      cons: ["Higher fees than some competitors", "Less intuitive interface"],
      bestFor: "Security-focused traders and US-based users",
      link: "/kraken",
      refLink: "https://www.kraken.com/sign-up?ref=YOUR_REF_CODE"
    },
    {
      name: "OKX",
      logo: "https://cryptologos.cc/logos/okb-okb-logo.png",
      color: "green-400",
      description: "A comprehensive crypto platform with advanced trading tools and Web3 wallet integration.",
      pros: ["Web3 wallet integration", "Trading bots", "NFT marketplace", "DeFi access"],
      cons: ["Less regulatory clarity", "Complex for beginners"],
      bestFor: "Advanced traders interested in DeFi and Web3",
      link: "/okx",
      refLink: "https://www.okx.com/join/YOUR_REF_CODE"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white px-6 py-12 md:px-16">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
          Crypto Exchange Portfolio
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-300">
          Compare the top crypto exchanges side by side and find the perfect platform for your trading needs.
        </p>
      </div>

      {/* Comparison Table - Desktop */}
      <div className="hidden lg:block overflow-x-auto mb-16">
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
                    <Link href={exchange.link} passHref>
                      <Button href="#" size="sm" variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                        Details
                      </Button>
                    </Link>
                    <Button 
                      href={exchange.refLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      size="sm" 
                      className={`bg-${exchange.color.split('-')[0]}-500 hover:bg-${exchange.color.split('-')[0]}-400`}
                    >
                      Join
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Exchange Cards - Mobile */}
      <div className="lg:hidden grid gap-8 mb-16">
        {exchanges.map((exchange) => (
          <div key={exchange.name} className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
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
              <Link href={exchange.link} passHref>
                <Button href="#" className="flex-1" variant="outline">
                  View Details
                </Button>
              </Link>
              <Button 
                href={exchange.refLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className={`flex-1 bg-${exchange.color.split('-')[0]}-500 hover:bg-${exchange.color.split('-')[0]}-400`}
              >
                Join Now
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="mb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-gray-800/30 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-3">How do affiliate links work?</h3>
            <p className="text-gray-300">When you sign up using my affiliate links, I receive a small commission at no extra cost to you. In fact, you often get exclusive bonuses when using these links!</p>
          </div>
          <div className="bg-gray-800/30 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-3">Which exchange is best for beginners?</h3>
            <p className="text-gray-300">Binance offers the most comprehensive educational resources, but Bybit has a more intuitive interface. Both are excellent choices for newcomers.</p>
          </div>
          <div className="bg-gray-800/30 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-3">Are these exchanges safe?</h3>
            <p className="text-gray-300">All exchanges featured here implement strong security measures. Kraken stands out for regulatory compliance, while Binance and OKX offer the most comprehensive insurance funds.</p>
          </div>
          <div className="bg-gray-800/30 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-3">Which has the lowest fees?</h3>
            <p className="text-gray-300">Binance generally offers the lowest trading fees at 0.1%, with further reductions possible when using BNB. Bybit is a close second with competitive fee structures.</p>
          </div>
        </div>
      </div>

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
  );
}
