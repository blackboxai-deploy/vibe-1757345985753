import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ProductCard from '@/components/ProductCard';
import { getFeaturedPlants, getPlantsByCategory } from '@/lib/plants-data';

export default function HomePage() {
  const featuredPlants = getFeaturedPlants(6);
  const indoorPlants = getPlantsByCategory('indoor').slice(0, 3);
  const outdoorPlants = getPlantsByCategory('outdoor').slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                  🌱 New Plant Collection Available
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                  Transform Your Space with 
                  <span className="text-green-600 block">Beautiful Plants</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Discover premium indoor and outdoor plants with expert care guides. 
                  From beginner-friendly options to statement pieces that transform your home.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-lg px-8 py-3">
                  <Link href="/plants" className="flex items-center">
                    Shop All Plants 🌿
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                  <Link href="/care-guide">
                    Plant Care Guide 📖
                  </Link>
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap gap-6 pt-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <span>🚚</span>
                  <span>Free delivery over ₹75</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <span>🌱</span>
                  <span>Plant health guarantee</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <span>💬</span>
                  <span>Expert plant care support</span>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="aspect-square bg-white rounded-3xl shadow-2xl overflow-hidden">
                <img
                  src="https://placehold.co/600x600?text=Beautiful+indoor+plant+collection+in+modern+bright+living+room+setting"
                  alt="Beautiful plant collection in modern living room"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-lg">
                <div className="text-2xl">🌿</div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-green-100 rounded-2xl p-4 shadow-lg">
                <div className="text-sm font-semibold text-green-800">500+ Happy Customers</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Whether you're looking to brighten your indoor spaces or create a stunning outdoor garden, 
              we have the perfect plants for every environment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Indoor Plants Category */}
            <Card className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-xl">
              <Link href="/plants?category=indoor">
                <div className="relative h-64 bg-gradient-to-br from-green-100 to-emerald-100">
                  <img
                    src="https://placehold.co/600x400?text=Beautiful+indoor+plants+collection+with+snake+plant+monstera+and+peace+lily"
                    alt="Indoor Plants Collection"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">🏠 Indoor Plants</h3>
                    <p className="text-sm opacity-90">Perfect for home decoration and air purification</p>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold text-lg">Discover Indoor Collection</h4>
                      <p className="text-gray-600">Low-light friendly • Easy care • Air purifying</p>
                    </div>
                    <Button variant="ghost" className="text-green-600">
                      Explore →
                    </Button>
                  </div>
                </CardContent>
              </Link>
            </Card>

            {/* Outdoor Plants Category */}
            <Card className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-xl">
              <Link href="/plants?category=outdoor">
                <div className="relative h-64 bg-gradient-to-br from-green-100 to-emerald-100">
                  <img
                    src="https://placehold.co/600x400?text=Beautiful+outdoor+garden+plants+with+roses+lavender+and+succulents"
                    alt="Outdoor Plants Collection"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">🌳 Outdoor Plants</h3>
                    <p className="text-sm opacity-90">Create stunning gardens and outdoor spaces</p>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold text-lg">Explore Outdoor Collection</h4>
                      <p className="text-gray-600">Garden ready • Weather resistant • Seasonal blooms</p>
                    </div>
                    <Button variant="ghost" className="text-green-600">
                      Explore →
                    </Button>
                  </div>
                </CardContent>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Plants Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Plants
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Handpicked plants loved by our customers. These top-rated plants are perfect 
              for both beginners and experienced plant parents.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featuredPlants.map((plant) => (
              <ProductCard key={plant.id} plant={plant} />
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" variant="outline" className="text-green-600 border-green-600 hover:bg-green-50">
              <Link href="/plants">
                View All Plants 🌿
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Plant Care Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Green Homes?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're not just selling plants – we're helping you create a greener, healthier lifestyle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto text-2xl">
                🌱
              </div>
              <h3 className="text-xl font-semibold">Premium Quality</h3>
              <p className="text-gray-600">
                Hand-selected plants from trusted nurseries with guaranteed health and quality.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto text-2xl">
                📚
              </div>
              <h3 className="text-xl font-semibold">Expert Care Guides</h3>
              <p className="text-gray-600">
                Detailed care instructions and ongoing support to help your plants thrive.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto text-2xl">
                🚚
              </div>
              <h3 className="text-xl font-semibold">Safe Delivery</h3>
              <p className="text-gray-600">
                Specially designed packaging ensures your plants arrive healthy and happy.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto text-2xl">
                💚
              </div>
              <h3 className="text-xl font-semibold">Plant Guarantee</h3>
              <p className="text-gray-600">
                30-day plant health guarantee with free replacement if you're not satisfied.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular by Category Quick Links */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Popular Collections
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Indoor Plants Showcase */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                🏠 Popular Indoor Plants
              </h3>
              <div className="space-y-4">
                {indoorPlants.map((plant) => (
                  <Card key={plant.id} className="p-4 hover:shadow-md transition-shadow">
                    <Link href={`/plants/${plant.id}`}>
                      <div className="flex items-center space-x-4">
                        <img
                          src={plant.images[0]}
                          alt={plant.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg">{plant.name}</h4>
                          <p className="text-gray-600 text-sm">{plant.description.slice(0, 80)}...</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="secondary" className="text-xs">
                              {plant.careLevel}
                            </Badge>
                            <span className="text-green-600 font-semibold">₹{plant.price}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </Card>
                ))}
              </div>
              <div className="mt-6">
                <Button variant="outline" className="w-full">
                  <Link href="/plants?category=indoor">
                    View All Indoor Plants
                  </Link>
                </Button>
              </div>
            </div>

            {/* Outdoor Plants Showcase */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                🌳 Popular Outdoor Plants
              </h3>
              <div className="space-y-4">
                {outdoorPlants.map((plant) => (
                  <Card key={plant.id} className="p-4 hover:shadow-md transition-shadow">
                    <Link href={`/plants/${plant.id}`}>
                      <div className="flex items-center space-x-4">
                        <img
                          src={plant.images[0]}
                          alt={plant.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg">{plant.name}</h4>
                          <p className="text-gray-600 text-sm">{plant.description.slice(0, 80)}...</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <Badge variant="secondary" className="text-xs">
                              {plant.careLevel}
                            </Badge>
                            <span className="text-green-600 font-semibold">₹{plant.price}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </Card>
                ))}
              </div>
              <div className="mt-6">
                <Button variant="outline" className="w-full">
                  <Link href="/plants?category=outdoor">
                    View All Outdoor Plants
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Join the Green Homes Community
          </h2>
          <p className="text-lg text-green-100 mb-8 max-w-2xl mx-auto">
            Get weekly plant care tips, seasonal guides, and exclusive offers delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 border-none outline-none"
            />
            <Button variant="secondary" className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3">
              Subscribe 🌱
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}