import { Card, CardContent } from "../components/ui/card";
import { Button, ButtonLink } from "../components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from 'next/link';

export default function HomePage() {
  const exchanges = [
    {
      name: "Binance",
      tagline: "Top global exchange with low fees",
      link: "/binance",
    },
    {
      name: "Bybit",
      tagline: "Best for futures trading & bonuses",
      link: "/bybit",
    },
    {
      name: "Kraken",
      tagline: "Trusted, US-compliant crypto platform",
      link: "/kraken",
    },
    {
      name: "OKX",
      tagline: "Advanced tools and Web3 wallet integration",
      link: "/okx",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-12 md:px-16">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to 1ewis.com</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Your gateway to the top crypto platforms. Compare the best, claim bonuses, and start trading smarter.
        </p>
      </div>

      {/* Exchanges Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {exchanges.map((exchange) => (
          <Card key={exchange.name} className="hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-2">{exchange.name}</h2>
              <p className="text-muted-foreground mb-4">{exchange.tagline}</p>
              <ButtonLink href={exchange.link} className="w-full">
                <span className="flex items-center justify-center">
                  Explore {exchange.name} <ArrowRight className="ml-2 w-4 h-4" />
                </span>
              </ButtonLink>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Footer */}
      <footer className="mt-16 text-center text-sm text-muted-foreground">
        © 2025 1ewis.com — All Rights Reserved
      </footer>
    </div>
  );
}
