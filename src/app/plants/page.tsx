'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import PlantFilter from '@/components/PlantFilter';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { searchPlants, plantsData } from '@/lib/plants-data';
import { Plant } from '@/lib/types';

export default function PlantsPage() {
  const searchParams = useSearchParams();
  const [plants, setPlants] = useState<Plant[]>(plantsData);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Initialize filters from URL parameters
  const initialFilters = useMemo(() => ({
    query: searchParams.get('search') || '',
    category: searchParams.get('category') as 'indoor' | 'outdoor' || '',
    careLevel: searchParams.get('careLevel') as 'beginner' | 'intermediate' | 'expert' || '',
    lightRequirement: searchParams.get('lightRequirement') as 'low' | 'medium' | 'high' || '',
    size: searchParams.get('size') as 'small' | 'medium' | 'large' || '',
    inStock: searchParams.get('inStock') === 'true',
    rating: parseInt(searchParams.get('rating') || '0'),
    sortBy: searchParams.get('sortBy') || 'rating',
    priceRange: {
      min: parseInt(searchParams.get('priceMin') || '0'),
      max: parseInt(searchParams.get('priceMax') || '2000')
    }
  }), [searchParams]);

  // Apply initial filters on mount
  useEffect(() => {
    handleFilterChange(initialFilters);
  }, []);

  const handleFilterChange = (filters: any) => {
    setLoading(true);
    
    // Simulate API call delay for better UX
    setTimeout(() => {
      let filteredPlants = searchPlants(filters.query, {
        category: filters.category,
        careLevel: filters.careLevel,
        lightRequirement: filters.lightRequirement,
        size: filters.size,
        inStock: filters.inStock,
        rating: filters.rating,
        priceRange: filters.priceRange
      });

      // Apply sorting
      switch (filters.sortBy) {
        case 'price-low':
          filteredPlants.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          filteredPlants.sort((a, b) => b.price - a.price);
          break;
        case 'name':
          filteredPlants.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'newest':
          // For demo purposes, reverse the array to simulate newest first
          filteredPlants.reverse();
          break;
        case 'rating':
        default:
          filteredPlants.sort((a, b) => b.rating - a.rating);
          break;
      }

      setPlants(filteredPlants);
      setLoading(false);
    }, 300);

    // Update URL with filter parameters
    const params = new URLSearchParams();
    if (filters.query) params.set('search', filters.query);
    if (filters.category) params.set('category', filters.category);
    if (filters.careLevel) params.set('careLevel', filters.careLevel);
    if (filters.lightRequirement) params.set('lightRequirement', filters.lightRequirement);
    if (filters.size) params.set('size', filters.size);
    if (filters.inStock) params.set('inStock', 'true');
    if (filters.rating > 0) params.set('rating', filters.rating.toString());
    if (filters.sortBy && filters.sortBy !== 'rating') params.set('sortBy', filters.sortBy);
    if (filters.priceRange.min > 0) params.set('priceMin', filters.priceRange.min.toString());
    if (filters.priceRange.max < 2000) params.set('priceMax', filters.priceRange.max.toString());

    const newUrl = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
    window.history.replaceState({}, '', newUrl);
  };

  const getPageTitle = () => {
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    
    if (search) return `Search Results for "${search}"`;
    if (category === 'indoor') return 'Indoor Plants';
    if (category === 'outdoor') return 'Outdoor Plants';
    return 'All Plants';
  };

  const getPageDescription = () => {
    const category = searchParams.get('category');
    
    if (category === 'indoor') {
      return 'Transform your indoor spaces with our premium collection of houseplants. Perfect for air purification and home decoration.';
    }
    if (category === 'outdoor') {
      return 'Create beautiful outdoor spaces with our garden plants, flowers, and outdoor greenery. Weather-resistant and garden-ready.';
    }
    return 'Explore our complete collection of premium indoor and outdoor plants. Expert care guides included with every purchase.';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {getPageTitle()}
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              {getPageDescription()}
            </p>
            
            {/* Results Count and Mobile Filter Toggle */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Badge variant="outline" className="text-sm">
                  {loading ? 'Searching...' : `${plants.length} plants found`}
                </Badge>
                {plants.length === 0 && !loading && (
                  <span className="text-sm text-gray-500">
                    Try adjusting your filters
                  </span>
                )}
              </div>
              
              <Button
                variant="outline"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="lg:hidden"
              >
                {isFilterOpen ? 'Hide Filters' : 'Show Filters'} 🔍
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:col-span-1 ${isFilterOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="sticky top-24">
              <PlantFilter
                onFilterChange={handleFilterChange}
                initialFilters={initialFilters}
                className="w-full"
              />
            </div>
          </div>

          {/* Plants Grid */}
          <div className="lg:col-span-3">
            {loading ? (
              // Loading State
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-gray-200 aspect-square rounded-lg mb-4"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : plants.length > 0 ? (
              // Plants Grid
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {plants.map((plant) => (
                  <ProductCard key={plant.id} plant={plant} />
                ))}
              </div>
            ) : (
              // No Results State
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🌱</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  No plants found
                </h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  We couldn't find any plants matching your criteria. 
                  Try adjusting your filters or browse our featured collection.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    onClick={() => handleFilterChange({
                      query: '',
                      category: '',
                      careLevel: '',
                      lightRequirement: '',
                      size: '',
                      priceRange: { min: 0, max: 2000 },
                      inStock: false,
                      rating: 0,
                      sortBy: 'rating'
                    })}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Clear All Filters
                  </Button>
                  <Button variant="outline" onClick={() => window.location.href = '/'}>
                    Browse Featured Plants
                  </Button>
                </div>
              </div>
            )}

            {/* Load More / Pagination (for future enhancement) */}
            {plants.length > 0 && plants.length % 12 === 0 && (
              <div className="text-center mt-12">
                <Button variant="outline" size="lg" disabled>
                  Load More Plants (Coming Soon)
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Plant Care Tips Section */}
      {plants.length > 0 && (
        <section className="bg-white border-t mt-16 py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Need Plant Care Help?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Every plant comes with detailed care instructions, but we're here to help 
                if you need extra guidance for your green journey.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                  📚
                </div>
                <h3 className="font-semibold text-lg mb-2">Care Guides</h3>
                <p className="text-gray-600 text-sm">
                  Detailed watering, lighting, and care instructions for every plant.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                  🌱
                </div>
                <h3 className="font-semibold text-lg mb-2">Expert Support</h3>
                <p className="text-gray-600 text-sm">
                  Get personalized advice from our plant care specialists.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                  💚
                </div>
                <h3 className="font-semibold text-lg mb-2">Health Guarantee</h3>
                <p className="text-gray-600 text-sm">
                  30-day guarantee on plant health with free replacements.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}