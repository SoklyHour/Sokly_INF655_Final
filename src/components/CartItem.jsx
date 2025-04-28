import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

// CartItem component displays a single item in the cart
const CartItem = ({ item }) => {
  // Get cart update and remove functions from context
  const { updateQuantity, removeFromCart } = useCart();
  // Destructure item properties
  const { id, title, price, quantity, thumbnail } = item;

  // Increase ticket quantity
  const handleIncrement = () => {
    updateQuantity(id, quantity + 1);
  };

  // Decrease ticket quantity or remove item if only one left
  const handleDecrement = () => {
    if (quantity > 1) {
      updateQuantity(id, quantity - 1);
    } else {
      removeFromCart(id);
    }
  };

  return (
    // Main container for the cart item
    <div className="flex flex-col sm:flex-row items-center border-b border-gray-200 py-4 animate-fadeIn">
      {/* Event thumbnail */}
      <div className="w-full sm:w-24 h-24 mb-4 sm:mb-0 mr-0 sm:mr-4">
        <img 
          src={thumbnail} 
          alt={title} 
          className="w-full h-full object-cover rounded-md"
        />
      </div>
      
      {/* Event title and price per ticket */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-purple-600 font-bold">${price.toFixed(2)} per ticket</p>
      </div>
      
      {/* Quantity controls */}
      <div className="flex items-center mt-4 sm:mt-0">
        <button 
          onClick={handleDecrement}
          className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
          aria-label="Decrease quantity"
        >
          <Minus className="h-5 w-5 text-gray-600" />
        </button>
        
        <span className="mx-3 w-8 text-center font-medium">{quantity}</span>
        
        <button 
          onClick={handleIncrement}
          className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
          aria-label="Increase quantity"
        >
          <Plus className="h-5 w-5 text-gray-600" />
        </button>
      </div>
      
      {/* Total price and remove button */}
      <div className="ml-4 text-right">
        <p className="text-lg font-bold">${(price * quantity).toFixed(2)}</p>
        <button 
          onClick={() => removeFromCart(id)}
          className="text-red-500 hover:text-red-700 transition-colors mt-1 flex items-center justify-end"
          aria-label="Remove from cart"
        >
          <Trash2 className="h-4 w-4 mr-1" />
          <span className="text-sm">Remove</span>
        </button>
      </div>
    </div>
  );
};

export default CartItem;