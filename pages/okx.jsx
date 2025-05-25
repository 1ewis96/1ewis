import { Button } from "../components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from 'next/link';

export default function OKXPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-900 to-black text-white px-6 py-12 md:px-16">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <img
          src="https://cryptologos.cc/logos/okb-okb-logo.png"
          alt="OKX Logo"
          width="72"
          height="72"
          className="mx-auto mb-4"
        />
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-green-400">
          OKX
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-gray-300">
          Advanced tools and Web3 wallet integration for the modern crypto trader.
        </p>
      </div>

      {/* Features Section */}
      <div className="grid gap-8 md:grid-cols-3 mb-16">
        <div className="bg-green-900/40 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-green-800">
          <h3 className="text-xl font-semibold text-green-300 mb-2">Web3 Wallet</h3>
          <p className="text-gray-300">Seamlessly connect to DeFi protocols and manage your crypto assets in one place.</p>
        </div>
        <div className="bg-green-900/40 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-green-800">
          <h3 className="text-xl font-semibold text-green-300 mb-2">Trading Bots</h3>
          <p className="text-gray-300">Automate your trading strategies with customizable bots and algorithms.</p>
        </div>
        <div className="bg-green-900/40 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-green-800">
          <h3 className="text-xl font-semibold text-green-300 mb-2">NFT Marketplace</h3>
          <p className="text-gray-300">Buy, sell, and trade NFTs directly from your OKX account with low fees.</p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <p className="text-lg text-gray-300 mb-4">
          Join OKX today and explore their advanced trading ecosystem using my referral link.
        </p>
        <Button 
          href="https://www.okx.com/join/YOUR_REF_CODE" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-lg px-8 py-6 bg-green-500 text-white hover:bg-green-400 font-semibold"
        >
          <span className="flex items-center justify-center">
            Join OKX Now <ArrowRight className="ml-2 w-5 h-5" />
          </span>
        </Button>
      </div>

      {/* Footer */}
      <footer className="mt-20 text-center text-sm text-gray-500">
        <div className="mb-4">
          <Link href="/" className="text-gray-400 hover:text-green-400">
            ← Back to Home
          </Link>
        </div>
        Affiliate link provided by 1ewis.com - thank you for your support!
      </footer>
    </div>
  );
}
