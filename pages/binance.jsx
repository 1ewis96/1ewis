import { Button, ButtonLink } from "../components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from 'next/link';

export default function BinancePage() {
  return (
    <div className="min-h-screen bg-black text-white px-6 py-12 md:px-16">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <img
          src="https://cryptologos.cc/logos/binance-coin-bnb-logo.png"
          alt="Binance Logo"
          width="72"
          height="72"
          className="mx-auto mb-4"
        />
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-yellow-400">
          Binance
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-gray-300">
          Join the world's largest crypto exchange. Low fees, deep liquidity, and powerful trading tools.
        </p>
      </div>

      {/* Features Section */}
      <div className="grid gap-8 md:grid-cols-3 mb-16">
        <div className="bg-zinc-900 rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold text-yellow-300 mb-2">Ultra Low Fees</h3>
          <p className="text-gray-400">Trade with some of the lowest fees in the market - as low as 0.1%.</p>
        </div>
        <div className="bg-zinc-900 rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold text-yellow-300 mb-2">Staking & Earn</h3>
          <p className="text-gray-400">Grow your crypto through staking, savings, and liquidity farming.</p>
        </div>
        <div className="bg-zinc-900 rounded-2xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold text-yellow-300 mb-2">Powerful Trading Tools</h3>
          <p className="text-gray-400">Advanced charts, futures, and leveraged tokens all in one place.</p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <p className="text-lg text-gray-300 mb-4">
          Sign up today and get 10% off your trading fees using my referral link.
        </p>
        <Button 
          href="https://www.binance.com/en/activity/referral-entry?ref=YOUR_REF_CODE" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-lg px-8 py-6 bg-yellow-400 text-black hover:bg-yellow-300 font-semibold"
        >
          <span className="flex items-center justify-center">
            Join Binance Now <ArrowRight className="ml-2 w-5 h-5" />
          </span>
        </Button>
      </div>

      {/* Footer */}
      <footer className="mt-20 text-center text-sm text-gray-500">
        <div className="mb-4">
          <Link href="/" className="text-gray-400 hover:text-yellow-400">
            ← Back to Home
          </Link>
        </div>
        Affiliate link provided by 1ewis.com - thank you for your support!
      </footer>
    </div>
  );
}
