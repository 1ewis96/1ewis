import { Button } from "../components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from 'next/link';

export default function KrakenPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-black text-white px-6 py-12 md:px-16">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <img
          src="https://cryptologos.cc/logos/kraken-logo.png"
          alt="Kraken Logo"
          width="72"
          height="72"
          className="mx-auto mb-4"
        />
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-purple-400">
          Kraken
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-gray-300">
          Trusted, US-compliant crypto platform with strong security and a wide range of assets.
        </p>
      </div>

      {/* Features Section */}
      <div className="grid gap-8 md:grid-cols-3 mb-16">
        <div className="bg-purple-900/40 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-purple-800">
          <h3 className="text-xl font-semibold text-purple-300 mb-2">Bank-Level Security</h3>
          <p className="text-gray-300">Industry-leading security practices with 95% of assets stored in cold wallets.</p>
        </div>
        <div className="bg-purple-900/40 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-purple-800">
          <h3 className="text-xl font-semibold text-purple-300 mb-2">Regulatory Compliance</h3>
          <p className="text-gray-300">Fully compliant with US regulations, providing peace of mind for traders.</p>
        </div>
        <div className="bg-purple-900/40 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-purple-800">
          <h3 className="text-xl font-semibold text-purple-300 mb-2">Advanced Trading Tools</h3>
          <p className="text-gray-300">Professional charting, margin trading, and staking options available.</p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <p className="text-lg text-gray-300 mb-4">
          Join Kraken today and start trading with confidence using my referral link.
        </p>
        <Button 
          href="https://www.kraken.com/sign-up?ref=YOUR_REF_CODE" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-lg px-8 py-6 bg-purple-500 text-white hover:bg-purple-400 font-semibold"
        >
          <span className="flex items-center justify-center">
            Join Kraken Now <ArrowRight className="ml-2 w-5 h-5" />
          </span>
        </Button>
      </div>

      {/* Footer */}
      <footer className="mt-20 text-center text-sm text-gray-500">
        <div className="mb-4">
          <Link href="/" className="text-gray-400 hover:text-purple-400">
            ← Back to Home
          </Link>
        </div>
        Affiliate link provided by 1ewis.com - thank you for your support!
      </footer>
    </div>
  );
}
