'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FilterOptions } from '@/lib/types';

interface FilterState extends FilterOptions {
  query?: string;
  sortBy?: string;
}

interface PlantFilterProps {
  onFilterChange: (filters: FilterState) => void;
  initialFilters?: FilterState;
  className?: string;
}

const PlantFilter: React.FC<PlantFilterProps> = ({ 
  onFilterChange, 
  initialFilters = {},
  className = '' 
}) => {
  const [filters, setFilters] = useState({
    query: initialFilters.query || '',
    category: initialFilters.category || '',
    careLevel: initialFilters.careLevel || '',
    lightRequirement: initialFilters.lightRequirement || '',
    size: initialFilters.size || '',
    priceRange: initialFilters.priceRange || { min: 0, max: 2000 },
    inStock: initialFilters.inStock || false,
    rating: initialFilters.rating || 0,
    sortBy: initialFilters.sortBy || 'rating'
  });

  const [activeFilters, setActiveFilters] = useState<string[]>([]);

   // Update filters when props change
  useEffect(() => {
    setFilters({
      query: initialFilters?.query || '',
      category: initialFilters?.category || '',
      careLevel: initialFilters?.careLevel || '',
      lightRequirement: initialFilters?.lightRequirement || '',
      size: initialFilters?.size || '',
      priceRange: initialFilters?.priceRange || { min: 0, max: 2000 },
      inStock: initialFilters?.inStock || false,
      rating: initialFilters?.rating || 0,
      sortBy: initialFilters?.sortBy || 'rating'
    });
  }, [initialFilters]);

  // Track active filters for display
  useEffect(() => {
    const active = [];
    if (filters.category) active.push(`Category: ${filters.category}`);
    if (filters.careLevel) active.push(`Care: ${filters.careLevel}`);
    if (filters.lightRequirement) active.push(`Light: ${filters.lightRequirement}`);
    if (filters.size) active.push(`Size: ${filters.size}`);
    if (filters.inStock) active.push('In Stock Only');
    if (filters.rating > 0) active.push(`${filters.rating}+ Stars`);
    if (filters.priceRange.min > 0 || filters.priceRange.max < 2000) {
      active.push(`₹${filters.priceRange.min} - ₹${filters.priceRange.max}`);
    }
    setActiveFilters(active);
  }, [filters]);

  const handleFilterChange = (newFilters: any) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const clearFilter = (filterKey: string) => {
    const clearedFilters = { ...filters };
    switch (filterKey) {
      case 'category':
      case 'careLevel':
      case 'lightRequirement':
      case 'size':
        clearedFilters[filterKey as keyof typeof clearedFilters] = '';
        break;
      case 'inStock':
        clearedFilters.inStock = false;
        break;
      case 'rating':
        clearedFilters.rating = 0;
        break;
      case 'priceRange':
        clearedFilters.priceRange = { min: 0, max: 2000 };
        break;
    }
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const clearAllFilters = () => {
    const resetFilters = {
      query: '',
      category: '',
      careLevel: '',
      lightRequirement: '',
      size: '',
      priceRange: { min: 0, max: 2000 },
      inStock: false,
      rating: 0,
      sortBy: 'rating'
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Filter Plants</CardTitle>
          {activeFilters.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-gray-500 hover:text-gray-700"
            >
              Clear All
            </Button>
          )}
        </div>
        
        {/* Active Filters Display */}
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {activeFilters.map((filter, index) => (
              <Badge 
                key={index}
                variant="secondary" 
                className="text-xs cursor-pointer hover:bg-gray-300"
                onClick={() => {
                  // Simple logic to clear specific filters
                  if (filter.includes('Category')) clearFilter('category');
                  else if (filter.includes('Care')) clearFilter('careLevel');
                  else if (filter.includes('Light')) clearFilter('lightRequirement');
                  else if (filter.includes('Size')) clearFilter('size');
                  else if (filter.includes('Stock')) clearFilter('inStock');
                  else if (filter.includes('Stars')) clearFilter('rating');
                  else if (filter.includes('₹')) clearFilter('priceRange');
                }}
              >
                {filter} ×
              </Badge>
            ))}
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Search Query */}
        <div>
          <Label htmlFor="search" className="text-sm font-medium">
            Search Plants
          </Label>
          <Input
            id="search"
            type="text"
            placeholder="Search by name or features..."
            value={filters.query}
            onChange={(e) => handleFilterChange({ query: e.target.value })}
            className="mt-1"
          />
        </div>

        {/* Sort By */}
        <div>
          <Label className="text-sm font-medium">Sort By</Label>
          <Select 
            value={filters.sortBy} 
            onValueChange={(value) => handleFilterChange({ sortBy: value })}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Sort plants by..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">Customer Rating</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="name">Name (A-Z)</SelectItem>
              <SelectItem value="newest">Newest Arrivals</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Category Filter */}
        <div>
          <Label className="text-sm font-medium">Category</Label>
          <Select 
            value={filters.category} 
            onValueChange={(value) => handleFilterChange({ category: value === 'all' ? '' : value })}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="All categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="indoor">🏠 Indoor Plants</SelectItem>
              <SelectItem value="outdoor">🌳 Outdoor Plants</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Care Level Filter */}
        <div>
          <Label className="text-sm font-medium">Care Level</Label>
          <Select 
            value={filters.careLevel} 
            onValueChange={(value) => handleFilterChange({ careLevel: value === 'all' ? '' : value })}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="All care levels" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Care Levels</SelectItem>
              <SelectItem value="beginner">🌱 Beginner Friendly</SelectItem>
              <SelectItem value="intermediate">🌿 Intermediate</SelectItem>
              <SelectItem value="expert">🌳 Expert Level</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Light Requirement Filter */}
        <div>
          <Label className="text-sm font-medium">Light Requirements</Label>
          <Select 
            value={filters.lightRequirement} 
            onValueChange={(value) => handleFilterChange({ lightRequirement: value === 'all' ? '' : value })}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="All light levels" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Light Levels</SelectItem>
              <SelectItem value="low">🌙 Low Light</SelectItem>
              <SelectItem value="medium">☁️ Medium Light</SelectItem>
              <SelectItem value="high">☀️ High Light</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Plant Size Filter */}
        <div>
          <Label className="text-sm font-medium">Plant Size</Label>
          <Select 
            value={filters.size} 
            onValueChange={(value) => handleFilterChange({ size: value === 'all' ? '' : value })}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="All sizes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sizes</SelectItem>
              <SelectItem value="small">Small (Up to 12")</SelectItem>
              <SelectItem value="medium">Medium (12" - 24")</SelectItem>
              <SelectItem value="large">Large (24"+)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Price Range Filter */}
        <div>
          <Label className="text-sm font-medium">
            Price Range: ₹{filters.priceRange.min} - ₹{filters.priceRange.max}
          </Label>
          <div className="mt-3 px-2">
            <Slider
              defaultValue={[filters.priceRange.min, filters.priceRange.max]}
              max={2000}
              min={0}
              step={50}
              value={[filters.priceRange.min, filters.priceRange.max]}
              onValueChange={(value) => 
                handleFilterChange({ 
                  priceRange: { min: value[0], max: value[1] }
                })
              }
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>₹0</span>
              <span>₹2000+</span>
            </div>
          </div>
        </div>

        {/* Minimum Rating Filter */}
        <div>
          <Label className="text-sm font-medium">Minimum Rating</Label>
          <Select 
            value={filters.rating.toString()} 
            onValueChange={(value) => handleFilterChange({ rating: parseInt(value) })}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Any rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Any Rating</SelectItem>
              <SelectItem value="4">★★★★☆ 4+ Stars</SelectItem>
              <SelectItem value="4.5">★★★★★ 4.5+ Stars</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Stock Filter */}
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="inStock" 
            checked={filters.inStock}
            onCheckedChange={(checked) => handleFilterChange({ inStock: checked })}
          />
          <Label htmlFor="inStock" className="text-sm font-medium">
            In Stock Only
          </Label>
        </div>

        {/* Filter Summary */}
        {activeFilters.length > 0 && (
          <div className="pt-4 border-t">
            <div className="text-sm text-gray-600">
              {activeFilters.length} filter{activeFilters.length !== 1 ? 's' : ''} applied
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PlantFilter;