'use client';

import Link from 'next/link';
import { Plant } from '@/lib/types';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { toast } from 'sonner';

interface ProductCardProps {
  plant: Plant;
  showQuickAdd?: boolean;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  plant, 
  showQuickAdd = true, 
  className = '' 
}) => {
  const { addToCart } = useCart();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (plant.stock > 0) {
      addToCart(plant, 1);
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

  const getLightRequirement = (light: string) => {
    const lights = {
      low: '🌙',
      medium: '☁️',
      high: '☀️'
    };
    return lights[light as keyof typeof lights] || '☀️';
  };

  const careLevel = getCareLevel(plant.careLevel);
  const lightIcon = getLightRequirement(plant.lightRequirement);

  return (
    <Card className={`group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02] ${className}`}>
      <Link href={`/plants/${plant.id}`}>
        <div className="relative">
          {/* Plant Image */}
          <div className="aspect-square overflow-hidden bg-gray-100">
            <img
              src={plant.images[0]}
              alt={plant.name}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://placehold.co/400x400?text=Plant+Image+Loading';
              }}
            />
          </div>

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {discountPercentage > 0 && (
              <Badge variant="destructive" className="text-xs font-semibold">
                {discountPercentage}% OFF
              </Badge>
            )}
            {plant.stock === 0 && (
              <Badge variant="secondary" className="text-xs">
                Out of Stock
              </Badge>
            )}
            {plant.stock > 0 && plant.stock <= 5 && (
              <Badge variant="outline" className="text-xs bg-orange-100 text-orange-800 border-orange-300">
                Only {plant.stock} left
              </Badge>
            )}
          </div>

          {/* Category Badge */}
          <div className="absolute top-2 right-2">
            <Badge variant="outline" className="text-xs bg-white/90 backdrop-blur">
              {plant.category === 'indoor' ? '🏠' : '🌳'} {plant.category}
            </Badge>
          </div>

          {/* Quick Add Button */}
          {showQuickAdd && plant.stock > 0 && (
            <div className="absolute inset-x-2 bottom-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button
                onClick={handleQuickAdd}
                className="w-full bg-green-600 hover:bg-green-700 text-white shadow-lg"
                size="sm"
              >
                Quick Add to Cart
              </Button>
            </div>
          )}
        </div>

        <CardContent className="p-4">
          {/* Plant Name */}
          <div className="space-y-1">
            <h3 className="font-semibold text-lg text-gray-900 line-clamp-2 group-hover:text-green-600 transition-colors">
              {plant.name}
            </h3>
            <p className="text-sm text-gray-500 italic">
              {plant.scientificName}
            </p>
          </div>

          {/* Plant Characteristics */}
          <div className="flex items-center gap-3 mt-3">
            <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${careLevel.color}`}>
              {careLevel.emoji} {careLevel.text}
            </div>
            <div className="flex items-center text-xs text-gray-600">
              {lightIcon} {plant.lightRequirement} light
            </div>
          </div>

          {/* Features */}
          <div className="mt-3">
            <div className="flex flex-wrap gap-1">
              {plant.features.slice(0, 2).map((feature) => (
                <Badge
                  key={feature}
                  variant="secondary"
                  className="text-xs px-2 py-0.5 bg-gray-100 text-gray-700"
                >
                  {feature}
                </Badge>
              ))}
              {plant.features.length > 2 && (
                <Badge variant="outline" className="text-xs px-2 py-0.5">
                  +{plant.features.length - 2} more
                </Badge>
              )}
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-3">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`text-sm ${
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
            <span className="text-sm text-gray-600">
              {plant.rating} ({plant.reviewCount} reviews)
            </span>
          </div>

          {/* Description Preview */}
          <p className="text-sm text-gray-600 mt-2 line-clamp-2">
            {plant.description}
          </p>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <div className="flex items-center justify-between w-full">
            {/* Price */}
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-green-600">
                ₹{plant.price.toLocaleString()}
              </span>
              {plant.originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  ₹{plant.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            {/* Delivery Info */}
            <div className="text-xs text-gray-600">
              🚚 {plant.deliveryTime}
            </div>
          </div>

          {/* Pot Included Info */}
          {plant.potIncluded && (
            <div className="w-full mt-2">
              <div className="flex items-center text-xs text-green-600">
                <span className="mr-1">🪴</span>
                Decorative pot included
              </div>
            </div>
          )}
        </CardFooter>
      </Link>
    </Card>
  );
};

export default ProductCard;