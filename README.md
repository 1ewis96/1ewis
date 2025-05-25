# Crypto Affiliate Portfolio Website

A modern React-based website showcasing cryptocurrency exchange affiliate links with detailed information about each platform.

## Features

- Responsive design that works on mobile, tablet, and desktop
- Dedicated pages for each crypto exchange (Binance, Bybit, Kraken, OKX)
- Comparison portfolio page to help users choose the right platform
- Modern UI built with Next.js and TailwindCSS
- Affiliate link integration for monetization

## Getting Started

### Prerequisites

- Node.js 14.x or higher
- npm or yarn

### Installation

1. Clone the repository or download the source code

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the website

## Project Structure

- `/pages` - Next.js pages including exchange-specific pages
- `/components` - Reusable React components
- `/components/ui` - UI component library
- `/styles` - Global CSS and styling
- `/lib` - Utility functions

## Customization

### Affiliate Links

Update your affiliate links in the following files:
- `/pages/binance.jsx`
- `/pages/bybit.jsx`
- `/pages/kraken.jsx`
- `/pages/okx.jsx`
- `/pages/portfolio.jsx`

Look for the `ref=YOUR_REF_CODE` pattern and replace with your actual referral codes.

### Adding New Exchanges

1. Create a new page in the `/pages` directory
2. Add the exchange to the array in `/pages/index.jsx`
3. Add a navigation link in `/components/navigation.jsx`

## Deployment

This project can be easily deployed to Vercel, Netlify, or any other Next.js-compatible hosting platform.

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

## License

This project is licensed under the MIT License.
