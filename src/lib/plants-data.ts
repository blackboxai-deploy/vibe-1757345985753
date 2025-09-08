import { Plant } from './types';

export const plantsData: Plant[] = [
  // Indoor Plants
  {
    id: 'indoor-001',
    name: 'Snake Plant (Sansevieria)',
    scientificName: 'Sansevieria trifasciata',
    category: 'indoor',
    price: 499,
    originalPrice: 599,
    images: [
      'https://placehold.co/600x600?text=Beautiful+Snake+Plant+Sansevieria+in+modern+ceramic+pot+with+tall+green+leaves',
      'https://placehold.co/600x600?text=Snake+Plant+care+guide+showing+watering+and+sunlight+requirements',
      'https://placehold.co/600x600?text=Snake+Plant+in+living+room+setting+on+wooden+table'
    ],
    description: 'The Snake Plant is perfect for beginners and busy plant parents. Known for its air-purifying qualities and striking upright leaves with yellow edges. Thrives in low light and requires minimal watering.',
    careLevel: 'beginner',
    lightRequirement: 'low',
    wateringFrequency: 'bi-weekly',
    size: 'medium',
    stock: 25,
    rating: 4.8,
    reviewCount: 342,
    features: ['Air Purifying', 'Low Maintenance', 'Pet Safe', 'Drought Tolerant'],
    careInstructions: {
      watering: 'Water every 2-3 weeks, allow soil to dry completely between waterings',
      sunlight: 'Tolerates low light, but prefers bright indirect light',
      soil: 'Well-draining potting mix or cactus soil',
      temperature: '65-80°F (18-27°C) ideal range',
      humidity: 'Low to moderate humidity (30-50%)',
      fertilizer: 'Feed monthly during spring/summer with balanced liquid fertilizer'
    },
    benefits: ['Releases oxygen at night', 'Removes toxins from air', 'Very low maintenance', 'Tolerates neglect'],
    seasonalInfo: 'Perfect year-round indoor plant, slower growth in winter',
    potIncluded: true,
    deliveryTime: '2-3 days'
  },
  {
    id: 'indoor-002',
    name: 'Monstera Deliciosa',
    scientificName: 'Monstera deliciosa',
    category: 'indoor',
    price: 899,
    originalPrice: 1099,
    images: [
      'https://placehold.co/600x600?text=Large+Monstera+Deliciosa+with+beautiful+split+leaves+in+white+pot',
      'https://placehold.co/600x600?text=Monstera+plant+showing+characteristic+holes+and+splits+in+leaves',
      'https://placehold.co/600x600?text=Monstera+in+bright+modern+living+space+near+window'
    ],
    description: 'The Instagram-famous Monstera Deliciosa features stunning split leaves that develop beautiful holes as it matures. A statement piece that brings tropical vibes to any indoor space.',
    careLevel: 'intermediate',
    lightRequirement: 'medium',
    wateringFrequency: 'weekly',
    size: 'large',
    stock: 18,
    rating: 4.6,
    reviewCount: 256,
    features: ['Statement Plant', 'Fast Growing', 'Climbing Vine', 'Instagram Famous'],
    careInstructions: {
      watering: 'Water when top inch of soil feels dry, typically weekly',
      sunlight: 'Bright, indirect light - avoid direct sun',
      soil: 'Rich, well-draining potting mix with peat moss',
      temperature: '65-85°F (18-29°C) for optimal growth',
      humidity: 'High humidity preferred (50-60%)',
      fertilizer: 'Monthly feeding during growing season with balanced fertilizer'
    },
    benefits: ['Air purifying qualities', 'Creates tropical atmosphere', 'Can grow very large', 'Develops unique fenestrations'],
    seasonalInfo: 'Active growth in spring/summer, slower in winter',
    potIncluded: true,
    deliveryTime: '3-4 days'
  },
  {
    id: 'indoor-003',
    name: 'Peace Lily',
    scientificName: 'Spathiphyllum wallisii',
    category: 'indoor',
    price: 399,
    images: [
      'https://placehold.co/600x600?text=Elegant+Peace+Lily+with+white+flowers+and+dark+green+leaves',
      'https://placehold.co/600x600?text=Peace+Lily+blooming+white+spathe+flowers+in+ceramic+pot',
      'https://placehold.co/600x600?text=Peace+Lily+in+bathroom+setting+with+good+humidity'
    ],
    description: 'Elegant Peace Lily produces beautiful white blooms and helps purify indoor air. Perfect for adding a touch of sophistication to any room while being relatively easy to care for.',
    careLevel: 'beginner',
    lightRequirement: 'low',
    wateringFrequency: 'weekly',
    size: 'medium',
    stock: 32,
    rating: 4.7,
    reviewCount: 198,
    features: ['Flowering Plant', 'Air Purifying', 'Low Light Tolerant', 'Humidity Loving'],
    careInstructions: {
      watering: 'Keep soil consistently moist but not waterlogged',
      sunlight: 'Low to medium indirect light, avoid direct sun',
      soil: 'Well-draining potting mix that retains some moisture',
      temperature: '68-85°F (20-29°C) preferred range',
      humidity: 'High humidity (40-60%) for best flowering',
      fertilizer: 'Light monthly feeding during growing season'
    },
    benefits: ['Beautiful white flowers', 'Excellent air purifier', 'Indicates water needs by drooping', 'Long-lasting blooms'],
    seasonalInfo: 'Blooms more frequently in spring/summer with proper care',
    potIncluded: true,
    deliveryTime: '2-3 days'
  },
  {
    id: 'indoor-004',
    name: 'Fiddle Leaf Fig',
    scientificName: 'Ficus lyrata',
    category: 'indoor',
    price: 1299,
    originalPrice: 1599,
    images: [
      'https://placehold.co/600x600?text=Tall+Fiddle+Leaf+Fig+with+large+violin+shaped+leaves+in+corner',
      'https://placehold.co/600x600?text=Close+up+of+Fiddle+Leaf+Fig+showing+detailed+leaf+texture',
      'https://placehold.co/600x600?text=Fiddle+Leaf+Fig+in+modern+minimalist+living+room+decor'
    ],
    description: 'The Fiddle Leaf Fig is the ultimate statement plant with its large, violin-shaped leaves. A designer favorite that creates dramatic impact in modern interiors.',
    careLevel: 'expert',
    lightRequirement: 'high',
    wateringFrequency: 'weekly',
    size: 'large',
    stock: 12,
    rating: 4.3,
    reviewCount: 167,
    features: ['Designer Plant', 'Large Statement Leaves', 'Tree-like Growth', 'Interior Design Favorite'],
    careInstructions: {
      watering: 'Water when top 2 inches of soil are dry, drain excess',
      sunlight: 'Bright, indirect light near south or east window',
      soil: 'Well-draining mix with perlite and peat moss',
      temperature: '65-75°F (18-24°C) stable temperature',
      humidity: 'Moderate humidity (30-50%)',
      fertilizer: 'Monthly feeding with diluted balanced fertilizer'
    },
    benefits: ['Dramatic architectural presence', 'Can grow 6+ feet tall', 'Long-lived with proper care', 'Increases property value'],
    seasonalInfo: 'May drop leaves when moving or seasonal changes',
    potIncluded: true,
    deliveryTime: '5-7 days'
  },

  // Outdoor Plants
  {
    id: 'outdoor-001',
    name: 'Red Rose Bush',
    scientificName: 'Rosa rubiginosa',
    category: 'outdoor',
    price: 799,
    originalPrice: 899,
    images: [
      'https://placehold.co/600x600?text=Beautiful+red+rose+bush+in+full+bloom+with+multiple+flowers',
      'https://placehold.co/600x600?text=Close+up+of+vibrant+red+roses+showing+detailed+petals',
      'https://placehold.co/600x600?text=Rose+bush+in+garden+setting+with+green+foliage'
    ],
    description: 'Classic red rose bush that produces stunning, fragrant blooms throughout the growing season. Perfect for creating romantic garden spaces and cut flower arrangements.',
    careLevel: 'intermediate',
    lightRequirement: 'high',
    wateringFrequency: 'daily',
    size: 'large',
    stock: 15,
    rating: 4.8,
    reviewCount: 287,
    features: ['Fragrant Blooms', 'Cut Flowers', 'Multiple Blooms', 'Classic Beauty'],
    careInstructions: {
      watering: 'Deep watering 2-3 times per week, more in hot weather',
      sunlight: '6+ hours of direct morning sunlight daily',
      soil: 'Rich, well-draining soil with organic matter',
      temperature: 'Hardy in zones 5-9, protect in extreme cold',
      humidity: 'Good air circulation to prevent diseases',
      fertilizer: 'Regular feeding with rose-specific fertilizer'
    },
    benefits: ['Beautiful cut flowers', 'Attracts pollinators', 'Long blooming period', 'Classic garden appeal'],
    seasonalInfo: 'Blooms spring through fall, dormant in winter',
    potIncluded: false,
    deliveryTime: '4-5 days'
  },
  {
    id: 'outdoor-002',
    name: 'Jade Plant Succulent',
    scientificName: 'Crassula ovata',
    category: 'outdoor',
    price: 299,
    images: [
      'https://placehold.co/600x600?text=Healthy+jade+plant+with+thick+green+oval+leaves+in+terracotta+pot',
      'https://placehold.co/600x600?text=Mature+jade+plant+showing+tree+like+structure+and+branching',
      'https://placehold.co/600x600?text=Collection+of+jade+plants+in+outdoor+succulent+garden'
    ],
    description: 'Lucky Jade Plant is a popular succulent known for bringing good fortune. Features thick, glossy leaves and can develop into a miniature tree with proper care.',
    careLevel: 'beginner',
    lightRequirement: 'high',
    wateringFrequency: 'bi-weekly',
    size: 'small',
    stock: 45,
    rating: 4.9,
    reviewCount: 423,
    features: ['Good Luck Plant', 'Low Maintenance', 'Drought Tolerant', 'Long Lived'],
    careInstructions: {
      watering: 'Water deeply but infrequently, allow soil to dry',
      sunlight: 'Bright direct sunlight for 4-6 hours daily',
      soil: 'Cactus/succulent well-draining potting mix',
      temperature: 'Prefers 65-75°F, can tolerate light frost',
      humidity: 'Low humidity, good air circulation',
      fertilizer: 'Light feeding 2-3 times during growing season'
    },
    benefits: ['Symbol of prosperity', 'Very drought tolerant', 'Can live for decades', 'Easy propagation'],
    seasonalInfo: 'Active growth in spring/summer, may flower in winter',
    potIncluded: true,
    deliveryTime: '2-3 days'
  },
  {
    id: 'outdoor-003',
    name: 'Lavender Plant',
    scientificName: 'Lavandula angustifolia',
    category: 'outdoor',
    price: 449,
    images: [
      'https://placehold.co/600x600?text=Purple+lavender+plant+in+full+bloom+with+aromatic+flowers',
      'https://placehold.co/600x600?text=Lavender+field+showing+multiple+plants+with+purple+spikes',
      'https://placehold.co/600x600?text=Close+up+of+lavender+flowers+showing+detailed+purple+blooms'
    ],
    description: 'Aromatic Lavender plant produces beautiful purple flower spikes with an incredible fragrance. Perfect for herb gardens, aromatherapy, and attracting beneficial insects.',
    careLevel: 'intermediate',
    lightRequirement: 'high',
    wateringFrequency: 'weekly',
    size: 'medium',
    stock: 28,
    rating: 4.7,
    reviewCount: 312,
    features: ['Aromatic Flowers', 'Attracts Bees', 'Culinary Use', 'Natural Pest Deterrent'],
    careInstructions: {
      watering: 'Water moderately, allow soil to dry between waterings',
      sunlight: 'Full sun exposure for 6-8 hours daily',
      soil: 'Sandy, well-draining soil with good drainage',
      temperature: 'Hardy in zones 5-9, drought tolerant once established',
      humidity: 'Low humidity, avoid wet conditions',
      fertilizer: 'Light feeding in spring, avoid over-fertilizing'
    },
    benefits: ['Natural aromatherapy', 'Culinary and medicinal uses', 'Attracts pollinators', 'Natural insect repellent'],
    seasonalInfo: 'Blooms summer to early fall, evergreen in mild climates',
    potIncluded: true,
    deliveryTime: '3-4 days'
  },
  {
    id: 'outdoor-004',
    name: 'Aloe Vera Plant',
    scientificName: 'Aloe barbadensis miller',
    category: 'outdoor',
    price: 349,
    images: [
      'https://placehold.co/600x600?text=Large+aloe+vera+plant+with+thick+green+medicinal+leaves',
      'https://placehold.co/600x600?text=Aloe+vera+showing+gel+inside+cut+leaf+for+medicinal+use',
      'https://placehold.co/600x600?text=Aloe+vera+plants+in+desert+garden+landscape+setting'
    ],
    description: 'Medicinal Aloe Vera plant is famous for its healing gel inside the thick, fleshy leaves. A must-have plant for natural first aid and skincare.',
    careLevel: 'beginner',
    lightRequirement: 'high',
    wateringFrequency: 'bi-weekly',
    size: 'medium',
    stock: 38,
    rating: 4.9,
    reviewCount: 445,
    features: ['Medicinal Plant', 'Healing Gel', 'Drought Tolerant', 'Easy Propagation'],
    careInstructions: {
      watering: 'Deep but infrequent watering, let soil dry completely',
      sunlight: 'Bright indirect to direct sunlight',
      soil: 'Cactus/succulent mix with excellent drainage',
      temperature: '55-80°F, protect from frost',
      humidity: 'Low humidity preferred',
      fertilizer: 'Light feeding 2-3 times per year'
    },
    benefits: ['Natural healing gel for burns', 'Air purifying qualities', 'Easy to propagate', 'Low maintenance'],
    seasonalInfo: 'May produce orange flower spikes in spring',
    potIncluded: true,
    deliveryTime: '2-3 days'
  },
  {
    id: 'indoor-005',
    name: 'Spider Plant',
    scientificName: 'Chlorophytum comosum',
    category: 'indoor',
    price: 199,
    images: [
      'https://placehold.co/600x600?text=Spider+plant+with+long+green+and+white+striped+leaves+cascading',
      'https://placehold.co/600x600?text=Spider+plant+showing+baby+plantlets+hanging+from+mother+plant',
      'https://placehold.co/600x600?text=Spider+plant+in+hanging+basket+in+bright+indoor+setting'
    ],
    description: 'The Spider Plant is one of the easiest houseplants to grow and propagate. Features arching leaves and produces adorable baby plantlets that can be shared with friends.',
    careLevel: 'beginner',
    lightRequirement: 'medium',
    wateringFrequency: 'weekly',
    size: 'small',
    stock: 55,
    rating: 4.8,
    reviewCount: 389,
    features: ['Easy Propagation', 'Air Purifying', 'Pet Safe', 'Fast Growing'],
    careInstructions: {
      watering: 'Water when top inch of soil is dry',
      sunlight: 'Bright, indirect light - tolerates some direct sun',
      soil: 'Standard potting mix with good drainage',
      temperature: '65-75°F ideal, tolerates wide range',
      humidity: 'Average household humidity',
      fertilizer: 'Monthly feeding during growing season'
    },
    benefits: ['Excellent air purifier', 'Easy to share through babies', 'Very forgiving', 'Great for beginners'],
    seasonalInfo: 'Produces plantlets year-round with proper care',
    potIncluded: true,
    deliveryTime: '1-2 days'
  },
  {
    id: 'outdoor-005',
    name: 'Marigold Flowers',
    scientificName: 'Tagetes erecta',
    category: 'outdoor',
    price: 149,
    images: [
      'https://placehold.co/600x600?text=Bright+orange+and+yellow+marigold+flowers+in+full+bloom',
      'https://placehold.co/600x600?text=Marigold+garden+bed+with+colorful+orange+flowers',
      'https://placehold.co/600x600?text=Close+up+of+single+marigold+flower+showing+detailed+petals'
    ],
    description: 'Vibrant Marigold flowers bring instant color to any garden with their bright orange and yellow blooms. Known for their pest-repelling properties and easy care.',
    careLevel: 'beginner',
    lightRequirement: 'high',
    wateringFrequency: 'daily',
    size: 'small',
    stock: 67,
    rating: 4.6,
    reviewCount: 234,
    features: ['Pest Repellent', 'Colorful Blooms', 'Easy Care', 'Companion Plant'],
    careInstructions: {
      watering: 'Regular watering, avoid waterlogged soil',
      sunlight: 'Full sun for best flowering',
      soil: 'Any well-draining garden soil',
      temperature: 'Annual flower, plant after last frost',
      humidity: 'Average outdoor humidity',
      fertilizer: 'Light feeding monthly for continuous blooms'
    },
    benefits: ['Natural pest deterrent', 'Continuous blooming', 'Edible flowers', 'Attracts beneficial insects'],
    seasonalInfo: 'Annual flower blooming spring through frost',
    potIncluded: false,
    deliveryTime: '1-2 days'
  }
];

// Helper functions for filtering and searching
export const getPlantsByCategory = (category: 'indoor' | 'outdoor'): Plant[] => {
  return plantsData.filter(plant => plant.category === category);
};

export const getFeaturedPlants = (count: number = 6): Plant[] => {
  return plantsData
    .filter(plant => plant.rating >= 4.6)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, count);
};

export const getPlantById = (id: string): Plant | undefined => {
  return plantsData.find(plant => plant.id === id);
};

export const searchPlants = (query: string, filters?: any): Plant[] => {
  let filtered = plantsData;

  // Filter by search query
  if (query) {
    const searchTerm = query.toLowerCase();
    filtered = filtered.filter(plant => 
      plant.name.toLowerCase().includes(searchTerm) ||
      plant.scientificName.toLowerCase().includes(searchTerm) ||
      plant.description.toLowerCase().includes(searchTerm) ||
      plant.features.some(feature => feature.toLowerCase().includes(searchTerm))
    );
  }

  // Apply additional filters
  if (filters) {
    if (filters.category) {
      filtered = filtered.filter(plant => plant.category === filters.category);
    }
    if (filters.careLevel) {
      filtered = filtered.filter(plant => plant.careLevel === filters.careLevel);
    }
    if (filters.lightRequirement) {
      filtered = filtered.filter(plant => plant.lightRequirement === filters.lightRequirement);
    }
    if (filters.priceRange) {
      filtered = filtered.filter(plant => 
        plant.price >= filters.priceRange.min && plant.price <= filters.priceRange.max
      );
    }
    if (filters.size) {
      filtered = filtered.filter(plant => plant.size === filters.size);
    }
    if (filters.inStock) {
      filtered = filtered.filter(plant => plant.stock > 0);
    }
  }

  return filtered;
};