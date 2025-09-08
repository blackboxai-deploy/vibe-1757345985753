'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { getPlantById, getFeaturedPlants } from '@/lib/plants-data';
import { useCart } from '@/contexts/CartContext';
import { Plant } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import ProductCard from '@/components/ProductCard';
import { toast } from 'sonner';

export default function PlantDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const [plant, setPlant] = useState<Plant | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [potOption, setPotOption] = useState(false);
  const [relatedPlants, setRelatedPlants] = useState<Plant[]>([]);

  useEffect(() => {
    if (params.id) {
      const foundPlant = getPlantById(params.id as string);
      if (foundPlant) {
        setPlant(foundPlant);
        // Get related plants from the same category
        const related = getFeaturedPlants(4).filter(p => 
          p.id !== foundPlant.id && 
          (p.category === foundPlant.category || p.careLevel === foundPlant.careLevel)
        );
        setRelatedPlants(related);
      } else {
        router.push('/plants');
      }
    }
  }, [params.id, router]);

  if (!plant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin text-4xl mb-4">🌱</div>
          <p className="text-gray-600">Loading plant details...</p>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (plant.stock > 0) {
      addToCart(plant, quantity, { potOption });
      toast.success(`${plant.name} added to cart! 🌱`);
    } else {
      toast.error('Sorry, this plant is out of stock');
    }
  };

  const discountPercentage = plant.originalPrice 
    ? Math.round(((plant.originalPrice - plant.price) / plant.originalPrice) * 100)
    : 0;

  const getCareLevel = (level: string) => {
    const levels = {
      beginner: { emoji: '🌱', text: 'Easy Care', color: 'bg-green-100 text-green-800' },
      intermediate: { emoji: '🌿', text: 'Moderate Care', color: 'bg-yellow-100 text-yellow-800' },
      expert: { emoji: '🌳', text: 'Expert Care', color: 'bg-red-100 text-red-800' }
    };
    return levels[level as keyof typeof levels] || levels.beginner;
  };

  const getLightIcon = (light: string) => {
    const icons = { low: '🌙', medium: '☁️', high: '☀️' };
    return icons[light as keyof typeof icons] || '☀️';
  };

  const careLevel = getCareLevel(plant.careLevel);
  const lightIcon = getLightIcon(plant.lightRequirement);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-green-600">Home</Link>
            <span>→</span>
            <Link href="/plants" className="hover:text-green-600">Plants</Link>
            <span>→</span>
            <Link 
              href={`/plants?category=${plant.category}`} 
              className="hover:text-green-600 capitalize"
            >
              {plant.category}
            </Link>
            <span>→</span>
            <span className="text-gray-900 font-medium">{plant.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Details */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-white rounded-lg overflow-hidden shadow-md">
              <img
                src={plant.images[selectedImage]}
                alt={plant.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://placehold.co/600x600?text=Plant+Image+Loading';
                }}
              />
            </div>

            {/* Thumbnail Images */}
            {plant.images.length > 1 && (
              <div className="flex space-x-4">
                {plant.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-1 aspect-square bg-white rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index 
                        ? 'border-green-500 shadow-md' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${plant.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            {/* Plant Name and Basic Info */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Badge variant="outline" className="text-xs">
                  {plant.category === 'indoor' ? '🏠' : '🌳'} {plant.category}
                </Badge>
                {plant.stock <= 5 && plant.stock > 0 && (
                  <Badge variant="outline" className="text-xs bg-orange-100 text-orange-800">
                    Only {plant.stock} left
                  </Badge>
                )}
                {plant.stock === 0 && (
                  <Badge variant="destructive" className="text-xs">
                    Out of Stock
                  </Badge>
                )}
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {plant.name}
              </h1>
              <p className="text-lg text-gray-600 italic mb-4">
                {plant.scientificName}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`text-lg ${
                        star <= Math.floor(plant.rating)
                          ? 'text-yellow-400'
                          : star - 0.5 <= plant.rating
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-gray-600">
                  {plant.rating} ({plant.reviewCount} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold text-green-600">
                  ₹{plant.price.toLocaleString()}
                </span>
                {plant.originalPrice && (
                  <div className="flex items-center gap-2">
                    <span className="text-xl text-gray-500 line-through">
                      ₹{plant.originalPrice.toLocaleString()}
                    </span>
                    <Badge variant="destructive" className="text-xs">
                      {discountPercentage}% OFF
                    </Badge>
                  </div>
                )}
              </div>

              <p className="text-gray-700 mb-6">
                {plant.description}
              </p>
            </div>

            {/* Plant Characteristics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-4">
                <div className="flex items-center space-x-3">
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${careLevel.color}`}>
                    {careLevel.emoji} {careLevel.text}
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{lightIcon}</span>
                  <div>
                    <div className="font-medium">Light Needs</div>
                    <div className="text-sm text-gray-600 capitalize">
                      {plant.lightRequirement} Light
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">💧</span>
                  <div>
                    <div className="font-medium">Watering</div>
                    <div className="text-sm text-gray-600 capitalize">
                      {plant.wateringFrequency.replace('-', ' ')}
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">📏</span>
                  <div>
                    <div className="font-medium">Size</div>
                    <div className="text-sm text-gray-600 capitalize">
                      {plant.size}
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Features */}
            <div>
              <h3 className="font-semibold text-lg mb-3">Plant Features</h3>
              <div className="flex flex-wrap gap-2">
                {plant.features.map((feature) => (
                  <Badge
                    key={feature}
                    variant="secondary"
                    className="text-sm px-3 py-1 bg-gray-100 text-gray-700"
                  >
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Add to Cart Section */}
            <Card className="p-6 bg-green-50 border-green-200">
              <div className="space-y-4">
                {/* Quantity Selector */}
                <div className="flex items-center space-x-4">
                  <label className="font-medium">Quantity:</label>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-2 hover:bg-gray-100"
                      disabled={quantity <= 1}
                    >
                      −
                    </button>
                    <span className="px-4 py-2 min-w-[50px] text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(plant.stock, quantity + 1))}
                      className="px-3 py-2 hover:bg-gray-100"
                      disabled={quantity >= plant.stock}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Pot Option */}
                {!plant.potIncluded && (
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="potOption"
                      checked={potOption}
                      onChange={(e) => setPotOption(e.target.checked)}
                      className="rounded"
                    />
                    <label htmlFor="potOption" className="text-sm">
                      Add decorative pot (+₹{Math.round(plant.price * 0.1)})
                    </label>
                  </div>
                )}

                {/* Add to Cart Button */}
                <Button
                  onClick={handleAddToCart}
                  disabled={plant.stock === 0}
                  className="w-full bg-green-600 hover:bg-green-700 text-lg py-3"
                >
                  {plant.stock === 0 ? (
                    'Out of Stock'
                  ) : (
                    `Add to Cart • ₹${((plant.price + (potOption ? plant.price * 0.1 : 0)) * quantity).toLocaleString()}`
                  )}
                </Button>

                {/* Delivery Info */}
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <span>🚚</span>
                    <span>Delivery: {plant.deliveryTime}</span>
                  </div>
                  {plant.potIncluded && (
                    <div className="flex items-center space-x-1">
                      <span>🪴</span>
                      <span>Pot included</span>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="care" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="care">Care Instructions</TabsTrigger>
              <TabsTrigger value="benefits">Benefits</TabsTrigger>
              <TabsTrigger value="details">Additional Details</TabsTrigger>
            </TabsList>

            <TabsContent value="care" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Complete Care Guide</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(plant.careInstructions).map(([key, value]) => (
                      <div key={key}>
                        <h4 className="font-semibold text-lg mb-2 capitalize flex items-center">
                          {key === 'watering' && '💧'}
                          {key === 'sunlight' && '☀️'}
                          {key === 'soil' && '🌱'}
                          {key === 'temperature' && '🌡️'}
                          {key === 'humidity' && '💨'}
                          {key === 'fertilizer' && '🌿'}
                          <span className="ml-2">{key}</span>
                        </h4>
                        <p className="text-gray-700">{value}</p>
                      </div>
                    ))}
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Seasonal Information</h4>
                    <p className="text-gray-700">{plant.seasonalInfo}</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="benefits" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Plant Benefits</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plant.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <span className="text-green-600 mt-1">✓</span>
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="details" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Additional Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <strong>Scientific Name:</strong> {plant.scientificName}
                    </div>
                    <div>
                      <strong>Category:</strong> {plant.category} plant
                    </div>
                    <div>
                      <strong>Care Level:</strong> {plant.careLevel}
                    </div>
                    <div>
                      <strong>Light Requirement:</strong> {plant.lightRequirement}
                    </div>
                    <div>
                      <strong>Watering:</strong> {plant.wateringFrequency}
                    </div>
                    <div>
                      <strong>Size:</strong> {plant.size}
                    </div>
                    <div>
                      <strong>Pot Included:</strong> {plant.potIncluded ? 'Yes' : 'No'}
                    </div>
                    <div>
                      <strong>Delivery Time:</strong> {plant.deliveryTime}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Plants */}
        {relatedPlants.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
              You Might Also Like
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedPlants.map((relatedPlant) => (
                <ProductCard key={relatedPlant.id} plant={relatedPlant} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}