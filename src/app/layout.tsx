import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/contexts/CartContext';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Green Homes - Premium Indoor & Outdoor Plants',
  description: 'Discover beautiful indoor and outdoor plants for your home. Expert plant care guides, fast delivery, and premium quality plants for every space.',
  keywords: 'indoor plants, outdoor plants, home gardening, plant care, green homes, plant delivery',
  authors: [{ name: 'Green Homes Team' }],
  openGraph: {
    title: 'Green Homes - Premium Indoor & Outdoor Plants',
    description: 'Transform your space with premium indoor and outdoor plants. Expert care guides included.',
    type: 'website',
    locale: 'en_US',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <div className="min-h-screen flex flex-col">
            <Navigation />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster 
            position="bottom-right" 
            toastOptions={{
              duration: 3000,
              style: {
                background: '#10B981',
                color: '#FFFFFF',
                border: 'none',
              },
            }}
          />
        </CartProvider>
      </body>
    </html>
  );
}