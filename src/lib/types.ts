// TypeScript type definitions for Green Homes Plant E-commerce App

export interface Plant {
  id: string;
  name: string;
  scientificName: string;
  category: 'indoor' | 'outdoor';
  price: number;
  originalPrice?: number;
  images: string[];
  description: string;
  careLevel: 'beginner' | 'intermediate' | 'expert';
  lightRequirement: 'low' | 'medium' | 'high';
  wateringFrequency: 'daily' | 'weekly' | 'bi-weekly' | 'monthly';
  size: 'small' | 'medium' | 'large';
  stock: number;
  rating: number;
  reviewCount: number;
  features: string[];
  careInstructions: {
    watering: string;
    sunlight: string;
    soil: string;
    temperature: string;
    humidity: string;
    fertilizer: string;
  };
  benefits: string[];
  seasonalInfo: string;
  potIncluded: boolean;
  deliveryTime: string;
}

export interface CartItem {
  plant: Plant;
  quantity: number;
  selectedSize?: string;
  potOption?: boolean;
}

export interface Cart {
  items: CartItem[];
  total: number;
  itemCount: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  addresses: Address[];
  wishlist: string[];
  orders: Order[];
}

export interface Address {
  id: string;
  type: 'home' | 'office' | 'other';
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: string;
  deliveryDate?: string;
  shippingAddress: Address;
  paymentMethod: string;
  trackingNumber?: string;
}

export interface Review {
  id: string;
  plantId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
  images?: string[];
}

export interface FilterOptions {
  category?: 'indoor' | 'outdoor';
  careLevel?: 'beginner' | 'intermediate' | 'expert';
  lightRequirement?: 'low' | 'medium' | 'high';
  priceRange?: {
    min: number;
    max: number;
  };
  size?: 'small' | 'medium' | 'large';
  inStock?: boolean;
  rating?: number;
}

export interface SearchFilters extends FilterOptions {
  query?: string;
  sortBy?: 'price-low' | 'price-high' | 'rating' | 'name' | 'newest';
}

// Cart Context Types
export interface CartContextType {
  cart: Cart;
  addToCart: (plant: Plant, quantity?: number, options?: { size?: string; potOption?: boolean }) => void;
  removeFromCart: (plantId: string) => void;
  updateQuantity: (plantId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;
}

// Form Types
export interface LoginForm {
  email: string;
  password: string;
}

export interface SignupForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
}

export interface CheckoutForm {
  shippingAddress: Omit<Address, 'id'>;
  paymentMethod: 'credit-card' | 'debit-card' | 'upi' | 'cod';
  cardDetails?: {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    cardholderName: string;
  };
  specialInstructions?: string;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PlantSearchResponse {
  plants: Plant[];
  totalCount: number;
  page: number;
  totalPages: number;
  filters: FilterOptions;
}