'use client';

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Plant, Cart, CartItem, CartContextType } from '@/lib/types';

// Cart Actions
type CartAction =
  | { type: 'ADD_TO_CART'; payload: { plant: Plant; quantity: number; options?: { size?: string; potOption?: boolean } } }
  | { type: 'REMOVE_FROM_CART'; payload: { plantId: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { plantId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: Cart };

// Initial cart state
const initialCart: Cart = {
  items: [],
  total: 0,
  itemCount: 0
};

// Cart reducer function
const cartReducer = (state: Cart, action: CartAction): Cart => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { plant, quantity, options } = action.payload;
      const existingItemIndex = state.items.findIndex(
        item => item.plant.id === plant.id && 
        item.selectedSize === options?.size &&
        item.potOption === options?.potOption
      );

      let newItems: CartItem[];
      
      if (existingItemIndex >= 0) {
        // Update existing item quantity
        newItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Add new item
        const newItem: CartItem = {
          plant,
          quantity,
          selectedSize: options?.size,
          potOption: options?.potOption || false
        };
        newItems = [...state.items, newItem];
      }

      return calculateCartTotals({ ...state, items: newItems });
    }

    case 'REMOVE_FROM_CART': {
      const newItems = state.items.filter(item => item.plant.id !== action.payload.plantId);
      return calculateCartTotals({ ...state, items: newItems });
    }

    case 'UPDATE_QUANTITY': {
      const { plantId, quantity } = action.payload;
      
      if (quantity <= 0) {
        return cartReducer(state, { type: 'REMOVE_FROM_CART', payload: { plantId } });
      }

      const newItems = state.items.map(item =>
        item.plant.id === plantId
          ? { ...item, quantity }
          : item
      );

      return calculateCartTotals({ ...state, items: newItems });
    }

    case 'CLEAR_CART': {
      return initialCart;
    }

    case 'LOAD_CART': {
      return action.payload;
    }

    default:
      return state;
  }
};

// Helper function to calculate cart totals
const calculateCartTotals = (cart: Cart): Cart => {
  const total = cart.items.reduce((sum, item) => {
    let itemPrice = item.plant.price * item.quantity;
    // Add pot cost if selected (assuming 10% extra for pot)
    if (item.potOption) {
      itemPrice += item.plant.price * 0.1 * item.quantity;
    }
    return sum + itemPrice;
  }, 0);

  const itemCount = cart.items.reduce((count, item) => count + item.quantity, 0);

  return {
    ...cart,
    total: Math.round(total * 100) / 100, // Round to 2 decimal places
    itemCount
  };
};

// Create Context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Cart Provider Component
interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialCart);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('greenHomes-cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: parsedCart });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('greenHomes-cart', JSON.stringify(cart));
  }, [cart]);

  // Cart actions
  const addToCart = (plant: Plant, quantity: number = 1, options?: { size?: string; potOption?: boolean }) => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: { plant, quantity, options }
    });
  };

  const removeFromCart = (plantId: string) => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: { plantId }
    });
  };

  const updateQuantity = (plantId: string, quantity: number) => {
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { plantId, quantity }
    });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getCartTotal = () => cart.total;

  const getCartItemCount = () => cart.itemCount;

  // Context value
  const contextValue: CartContextType = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemCount
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

// Export context for advanced usage
export { CartContext };