'use client';

import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart, getCartTotal, getCartItemCount } = useCart();

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="text-6xl mb-6">🛒</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Your Cart is Empty
            </h1>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Looks like you haven't added any plants to your cart yet. 
              Discover our beautiful collection of indoor and outdoor plants.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                <Link href="/plants">
                  Browse All Plants 🌿
                </Link>
              </Button>
              <Button variant="outline" size="lg">
                <Link href="/plants?category=indoor">
                  Indoor Plants 🏠
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleQuantityChange = (plantId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(plantId);
      toast.success('Item removed from cart');
    } else {
      updateQuantity(plantId, newQuantity);
    }
  };

  const handleRemoveItem = (plantId: string, plantName: string) => {
    removeFromCart(plantId);
    toast.success(`${plantName} removed from cart`);
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your entire cart?')) {
      clearCart();
      toast.success('Cart cleared');
    }
  };

  const subtotal = getCartTotal();
  const shipping = subtotal >= 75 ? 0 : 50; // Free shipping over ₹75
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
              <p className="text-gray-600 mt-2">
                {getCartItemCount()} {getCartItemCount() === 1 ? 'item' : 'items'} in your cart
              </p>
            </div>
            {cart.items.length > 0 && (
              <Button 
                variant="outline" 
                onClick={handleClearCart}
                className="text-red-600 hover:text-red-700"
              >
                Clear Cart
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.items.map((item) => (
              <Card key={`${item.plant.id}-${item.selectedSize}-${item.potOption}`} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    {/* Plant Image */}
                    <Link href={`/plants/${item.plant.id}`}>
                      <div className="flex-shrink-0 w-24 h-24 bg-gray-100 rounded-lg overflow-hidden">
                        <img
                          src={item.plant.images[0]}
                          alt={item.plant.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform"
                        />
                      </div>
                    </Link>

                    {/* Item Details */}
                    <div className="flex-1 min-w-0">
                      <Link href={`/plants/${item.plant.id}`}>
                        <h3 className="text-lg font-semibold text-gray-900 hover:text-green-600 transition-colors">
                          {item.plant.name}
                        </h3>
                      </Link>
                      <p className="text-sm text-gray-600 italic">
                        {item.plant.scientificName}
                      </p>
                      
                      {/* Plant Info */}
                      <div className="flex items-center space-x-4 mt-2">
                        <Badge variant="secondary" className="text-xs">
                          {item.plant.category}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {item.plant.careLevel} care
                        </Badge>
                      </div>

                      {/* Options */}
                      <div className="mt-2 text-sm text-gray-600">
                        {item.selectedSize && (
                          <span className="block">Size: {item.selectedSize}</span>
                        )}
                        {item.potOption && (
                          <span className="block">✓ Decorative pot included</span>
                        )}
                      </div>

                      {/* Stock Status */}
                      {item.plant.stock <= 5 && (
                        <Badge variant="outline" className="mt-2 text-xs bg-orange-100 text-orange-800">
                          Only {item.plant.stock} left in stock
                        </Badge>
                      )}
                    </div>

                    {/* Price and Quantity Controls */}
                    <div className="flex flex-col items-end space-y-4">
                      {/* Price */}
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">
                          ₹{((item.plant.price + (item.potOption ? item.plant.price * 0.1 : 0)) * item.quantity).toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-600">
                          ₹{(item.plant.price + (item.potOption ? item.plant.price * 0.1 : 0)).toLocaleString()} each
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                          onClick={() => handleQuantityChange(item.plant.id, item.quantity - 1)}
                          className="px-3 py-1 hover:bg-gray-100 transition-colors"
                        >
                          −
                        </button>
                        <span className="px-4 py-1 min-w-[50px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item.plant.id, item.quantity + 1)}
                          className="px-3 py-1 hover:bg-gray-100 transition-colors"
                          disabled={item.quantity >= item.plant.stock}
                        >
                          +
                        </button>
                      </div>

                      {/* Remove Button */}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveItem(item.plant.id, item.plant.name)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Order Summary
                </h2>

                <div className="space-y-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({getCartItemCount()} items)</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>
                      {shipping === 0 ? (
                        <span className="text-green-600 font-medium">FREE</span>
                      ) : (
                        `₹${shipping}`
                      )}
                    </span>
                  </div>

                  {shipping > 0 && (
                    <div className="text-sm text-orange-600 bg-orange-50 p-3 rounded-lg">
                      Add ₹{(75 - subtotal).toLocaleString()} more for free shipping!
                    </div>
                  )}

                  <Separator />

                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>Total</span>
                    <span>₹{total.toLocaleString()}</span>
                  </div>
                </div>

                <Button 
                  size="lg" 
                  className="w-full mt-6 bg-green-600 hover:bg-green-700"
                >
                  <Link href="/checkout" className="w-full">
                    Proceed to Checkout
                  </Link>
                </Button>

                <div className="mt-4 text-center">
                  <Link 
                    href="/plants" 
                    className="text-sm text-green-600 hover:text-green-700 underline"
                  >
                    Continue Shopping
                  </Link>
                </div>

                {/* Trust Badges */}
                <div className="mt-6 pt-6 border-t space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="mr-2">🔒</span>
                    <span>Secure checkout</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="mr-2">🌱</span>
                    <span>Plant health guarantee</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="mr-2">🚚</span>
                    <span>Safe plant packaging</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="mr-2">📞</span>
                    <span>24/7 plant care support</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recommended Products */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Complete Your Garden
          </h2>
          <p className="text-gray-600 text-center mb-8">
            Add these popular plants to create a beautiful green space
          </p>
          <div className="text-center">
            <Button variant="outline" size="lg">
              <Link href="/plants">
                Browse More Plants 🌿
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}