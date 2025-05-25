import { Button } from "../components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from 'next/link';

export default function BybitPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-black text-white px-6 py-12 md:px-16">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <img
          src="https://cryptologos.cc/logos/bybit-logo.png"
          alt="Bybit Logo"
          width="72"
          height="72"
          className="mx-auto mb-4"
        />
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-blue-400">
          Bybit
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-gray-300">
          Best platform for futures trading with generous sign-up bonuses and competitive fees.
        </p>
      </div>

      {/* Features Section */}
      <div className="grid gap-8 md:grid-cols-3 mb-16">
        <div className="bg-blue-900/40 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-blue-800">
          <h3 className="text-xl font-semibold text-blue-300 mb-2">Sign-up Bonus</h3>
          <p className="text-gray-300">Get up to $4,100 in bonuses when you sign up and make your first deposit.</p>
        </div>
        <div className="bg-blue-900/40 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-blue-800">
          <h3 className="text-xl font-semibold text-blue-300 mb-2">Advanced Futures</h3>
          <p className="text-gray-300">Trade with up to 100x leverage on a wide range of crypto assets.</p>
        </div>
        <div className="bg-blue-900/40 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-blue-800">
          <h3 className="text-xl font-semibold text-blue-300 mb-2">User-Friendly Interface</h3>
          <p className="text-gray-300">Intuitive platform designed for both beginners and professional traders.</p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <p className="text-lg text-gray-300 mb-4">
          Join Bybit today and claim your welcome bonus using my referral link.
        </p>
        <Button 
          href="https://www.bybit.com/en-US/register?affiliate_id=YOUR_REF_CODE" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-lg px-8 py-6 bg-blue-500 text-white hover:bg-blue-400 font-semibold"
        >
          <span className="flex items-center justify-center">
            Join Bybit Now <ArrowRight className="ml-2 w-5 h-5" />
          </span>
        </Button>
      </div>

      {/* Footer */}
      <footer className="mt-20 text-center text-sm text-gray-500">
        <div className="mb-4">
          <Link href="/" className="text-gray-400 hover:text-blue-400">
            ← Back to Home
          </Link>
        </div>
        Affiliate link provided by 1ewis.com - thank you for your support!
      </footer>
    </div>
  );
}
