import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the cart context
const CartContext = createContext();

// Custom hook to use the CartContext
export const useCart = () => {
  return useContext(CartContext);
};

// CartProvider component to wrap the app and provide cart state
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]); // Store cart items
  const [totalPrice, setTotalPrice] = useState(0); // Store total price

  // Load cart from localStorage on initial mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage and recalculate total when cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
    calculateTotal();
  }, [cartItems]);

  // Calculate total price of items in the cart
  const calculateTotal = () => {
    const total = cartItems.reduce((sum, item) => {
      return sum + (item.price * item.quantity);
    }, 0);
    setTotalPrice(total);
  };

  // Add an item to the cart
  const addToCart = (event, quantity = 1) => {
    const existingItemIndex = cartItems.findIndex(item => item.id === event.id);
    
    if (existingItemIndex >= 0) {
      // If item exists, update its quantity
      const updatedCart = [...cartItems];
      updatedCart[existingItemIndex].quantity += quantity;
      setCartItems(updatedCart);
    } else {
      // If item doesn't exist, add as new item
      setCartItems([...cartItems, { ...event, quantity }]);
    }
  };

  // Update the quantity of a specific item in the cart
  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    
    const updatedCart = cartItems.map(item => {
      if (item.id === id) {
        return { ...item, quantity };
      }
      return item;
    });
    
    setCartItems(updatedCart);
  };

  // Remove an item from the cart
  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
  };

  // Clear all items from the cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Value provided to context consumers
  const value = {
    cartItems,
    totalPrice,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};