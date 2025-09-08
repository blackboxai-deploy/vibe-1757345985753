import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t">
      {/* Newsletter Subscription */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">Stay Connected with Green Homes</h3>
            <p className="text-green-100 mb-6">
              Get plant care tips, seasonal guides, and exclusive offers delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 bg-white text-gray-900 border-none"
              />
              <Button variant="secondary" className="bg-white text-green-600 hover:bg-gray-100">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg">🌿</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Green Homes</span>
            </div>
            <p className="text-gray-600 text-sm">
              Bringing nature into your home with premium indoor and outdoor plants. 
              Expert care guidance and fast delivery nationwide.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="p-2">
                📘 {/* Facebook placeholder */}
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                📷 {/* Instagram placeholder */}
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                🐦 {/* Twitter placeholder */}
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                📌 {/* Pinterest placeholder */}
              </Button>
            </div>
          </div>

          {/* Shop Categories */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Shop Plants</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/plants?category=indoor" className="text-gray-600 hover:text-green-600 transition-colors">
                  Indoor Plants
                </Link>
              </li>
              <li>
                <Link href="/plants?category=outdoor" className="text-gray-600 hover:text-green-600 transition-colors">
                  Outdoor Plants
                </Link>
              </li>
              <li>
                <Link href="/plants?careLevel=beginner" className="text-gray-600 hover:text-green-600 transition-colors">
                  Beginner Plants
                </Link>
              </li>
              <li>
                <Link href="/plants?lightRequirement=low" className="text-gray-600 hover:text-green-600 transition-colors">
                  Low Light Plants
                </Link>
              </li>
              <li>
                <Link href="/plants?featured=true" className="text-gray-600 hover:text-green-600 transition-colors">
                  Featured Plants
                </Link>
              </li>
              <li>
                <Link href="/plants?size=large" className="text-gray-600 hover:text-green-600 transition-colors">
                  Large Plants
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Customer Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/care-guide" className="text-gray-600 hover:text-green-600 transition-colors">
                  Plant Care Guide
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-gray-600 hover:text-green-600 transition-colors">
                  Shipping Information
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-gray-600 hover:text-green-600 transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-600 hover:text-green-600 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-green-600 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="text-gray-600 hover:text-green-600 transition-colors">
                  Track Your Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Info */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-green-600 transition-colors">
                  About Green Homes
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-600 hover:text-green-600 transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-600 hover:text-green-600 transition-colors">
                  Plant Care Blog
                </Link>
              </li>
              <li>
                <Link href="/sustainability" className="text-gray-600 hover:text-green-600 transition-colors">
                  Sustainability
                </Link>
              </li>
              <li>
                <Link href="/partnership" className="text-gray-600 hover:text-green-600 transition-colors">
                  Partnership Program
                </Link>
              </li>
              <li>
                <Link href="/wholesale" className="text-gray-600 hover:text-green-600 transition-colors">
                  Wholesale Inquiries
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="text-center md:text-left">
            <h5 className="font-semibold text-gray-900 mb-2">📞 Customer Service</h5>
            <p className="text-gray-600 text-sm">1-800-GREEN-HOME</p>
            <p className="text-gray-600 text-sm">Mon-Fri: 8AM-8PM EST</p>
          </div>
          <div className="text-center md:text-left">
            <h5 className="font-semibold text-gray-900 mb-2">📧 Email Support</h5>
            <p className="text-gray-600 text-sm">support@greenhomes.com</p>
            <p className="text-gray-600 text-sm">Response within 24 hours</p>
          </div>
          <div className="text-center md:text-left">
            <h5 className="font-semibold text-gray-900 mb-2">🚚 Free Shipping</h5>
            <p className="text-gray-600 text-sm">Orders over $75</p>
            <p className="text-gray-600 text-sm">Nationwide delivery</p>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-gray-600">
            © 2024 Green Homes. All rights reserved.
          </div>
          <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm">
            <Link href="/privacy" className="text-gray-600 hover:text-green-600 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-600 hover:text-green-600 transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-gray-600 hover:text-green-600 transition-colors">
              Cookie Policy
            </Link>
            <Link href="/accessibility" className="text-gray-600 hover:text-green-600 transition-colors">
              Accessibility
            </Link>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-8 flex flex-wrap justify-center items-center space-x-6 text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <span>🔒</span>
            <span>SSL Secure Checkout</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>🌱</span>
            <span>Sustainably Sourced</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>📦</span>
            <span>Safe Plant Packaging</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>💯</span>
            <span>Plant Health Guarantee</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;