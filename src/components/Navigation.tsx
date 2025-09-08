'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Navigation = () => {
  const { getCartItemCount } = useCart();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results
      window.location.href = `/plants?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  const cartItemCount = getCartItemCount();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center">
            <span className="text-white font-bold text-lg">🌿</span>
          </div>
          <span className="text-xl font-bold text-gray-900">Green Homes</span>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent">
                Shop Plants
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <div className="row-span-3">
                    <NavigationMenuLink asChild>
                      <Link
                        href="/plants"
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-green-50 to-green-100 p-6 no-underline outline-none focus:shadow-md"
                      >
                        <div className="text-4xl mb-2">🌱</div>
                        <div className="mb-2 mt-4 text-lg font-medium">
                          All Plants
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Browse our complete collection of indoor and outdoor plants
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </div>
                  <NavigationMenuLink asChild>
                    <Link 
                      href="/plants?category=indoor" 
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                      <div className="text-sm font-medium leading-none">🏠 Indoor Plants</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Perfect plants for indoor spaces and home decoration
                      </p>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link 
                      href="/plants?category=outdoor" 
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                      <div className="text-sm font-medium leading-none">🌳 Outdoor Plants</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Beautiful plants for gardens and outdoor spaces
                      </p>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link 
                      href="/plants?careLevel=beginner" 
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                      <div className="text-sm font-medium leading-none">🌟 Beginner Friendly</div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Easy-care plants perfect for beginners
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/care-guide" className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                Plant Care Guide
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/about" className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50">
                About Us
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-6">
          <form onSubmit={handleSearch} className="relative w-full">
            <Input
              type="search"
              placeholder="Search plants..."
              className="pr-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button
              type="submit"
              size="sm"
              variant="ghost"
              className="absolute right-0 top-0 h-full px-3"
            >
              🔍
            </Button>
          </form>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          {/* Mobile Search Toggle */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            🔍
          </Button>

          {/* User Account */}
          <Link href="/login">
            <Button variant="ghost" size="sm" className="hidden sm:flex">
              Login
            </Button>
          </Link>

          {/* Shopping Cart */}
          <Link href="/cart" className="relative">
            <Button variant="ghost" size="sm">
              🛒
              {cartItemCount > 0 && (
                <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                  {cartItemCount > 99 ? '99+' : cartItemCount}
                </Badge>
              )}
            </Button>
          </Link>

          {/* Mobile Menu */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="md:hidden">
                ☰
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-6 mt-6">
                <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                  <div className="text-lg font-semibold">Home</div>
                </Link>
                <div>
                  <div className="text-lg font-semibold mb-3">Shop Plants</div>
                  <div className="flex flex-col space-y-2 ml-4">
                    <Link href="/plants" onClick={() => setIsMobileMenuOpen(false)} className="text-sm">All Plants</Link>
                    <Link href="/plants?category=indoor" onClick={() => setIsMobileMenuOpen(false)} className="text-sm">🏠 Indoor Plants</Link>
                    <Link href="/plants?category=outdoor" onClick={() => setIsMobileMenuOpen(false)} className="text-sm">🌳 Outdoor Plants</Link>
                    <Link href="/plants?careLevel=beginner" onClick={() => setIsMobileMenuOpen(false)} className="text-sm">🌟 Beginner Friendly</Link>
                  </div>
                </div>
                <Link href="/care-guide" onClick={() => setIsMobileMenuOpen(false)}>
                  <div className="text-lg font-semibold">Plant Care Guide</div>
                </Link>
                <Link href="/about" onClick={() => setIsMobileMenuOpen(false)}>
                  <div className="text-lg font-semibold">About Us</div>
                </Link>
                <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <div className="text-lg font-semibold">Login / Sign Up</div>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {isSearchOpen && (
        <div className="md:hidden border-t bg-white p-4">
          <form onSubmit={handleSearch} className="relative">
            <Input
              type="search"
              placeholder="Search plants..."
              className="pr-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            <Button
              type="submit"
              size="sm"
              variant="ghost"
              className="absolute right-0 top-0 h-full px-3"
            >
              🔍
            </Button>
          </form>
        </div>
      )}
    </header>
  );
};

export default Navigation;