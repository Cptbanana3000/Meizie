# Meizie AI - E-commerce Caption Generator

Generate high-converting product captions for your e-commerce store in seconds with Meizie AI.

![Meizie AI](https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800)

## Features

- 🤖 AI-generated captions tailored to your products
- 🎨 Different tones: Friendly, Urgent, Luxury, Casual
- 📱 Platform-specific formatting for Instagram, TikTok, Facebook, and Amazon
- 🔑 Keyword integration for better SEO
- 📊 Multiple variations per generation

## Getting Started

1. Clone this repository
2. Install dependencies: `npm install`
3. Create a `.env` file with your OpenAI API key (see `.env.example`)
4. Run the development server: `npm run dev`

## Configuration

To use the OpenAI integration, you'll need to:

1. Get an API key from [OpenAI](https://platform.openai.com/api-keys)
2. Add your API key to the `.env` file:
   ```
   VITE_OPENAI_KEY=your_api_key_here
   ```

Without an API key, the app will use mock data for testing purposes.

## Business Model

Meizie AI operates on a freemium model:
- Free tier: 3 caption generations
- Starter: $5/month for 50 captions
- Growth: $15/month for 200 captions (discounted from $25)
- Lifetime: $99 one-time fee for unlimited captions (discounted from $249)

## Deployment

This app can be easily deployed to Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables (VITE_OPENAI_KEY) in the Vercel dashboard
4. Deploy!

## Payment Integration

To set up Gumroad for payments:

1. Create a Gumroad account
2. Create products for your caption service tiers
3. Update the payment links in the Paywall and PricingPlans components

## Tech Stack

- React + Vite
- Chakra UI for styling
- OpenAI API for caption generation

## Credits

- Design by: Meizie Team
- AI integration: OpenAI GPT-4
- Icons: Font Awesome & Chakra UI

## License

MIT
