import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, AlertCircle, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import CartItem from '../components/CartItem';

// CartPage component displays the user's shopping cart and checkout summary
const CartPage = () => {
  const { cartItems, totalPrice, clearCart } = useCart(); // Get cart state and actions
  const { currentUser } = useAuth(); // Get current user
  const navigate = useNavigate(); // For navigation
  const [isProcessing, setIsProcessing] = useState(false); // Track checkout processing state
  
  // Handle checkout button click
  const handleCheckout = () => {
    if (!currentUser) {
      // Redirect to login if not authenticated
      navigate('/login');
      return;
    }
    setIsProcessing(true);
    // Simulate processing time before navigating to success page
    setTimeout(() => {
      navigate('/success');
    }, 1500);
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header with back link and title */}
      <div className="flex items-center mb-6">
        <Link to="/" className="text-purple-600 hover:text-purple-800 flex items-center">
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span>Continue Shopping</span>
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 ml-4">Your Shopping Cart</h1>
      </div>
      
      {/* If cart is empty, show empty state */}
      {cartItems.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <div className="flex justify-center mb-4">
            <ShoppingCart className="h-16 w-16 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Looks like you haven't added anything to your cart yet.</p>
          <Link 
            to="/"
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-md transition-colors"
          >
            Browse Events
          </Link>
        </div>
      ) : (
        // If cart has items, show cart and summary
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart items section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-800">
                  Cart Items ({cartItems.reduce((total, item) => total + item.quantity, 0)})
                </h2>
                <button 
                  onClick={clearCart}
                  className="text-red-500 hover:text-red-700 text-sm font-medium"
                >
                  Clear All
                </button>
              </div>
              
              <div className="divide-y divide-gray-200">
                {cartItems.map(item => (
                  <div key={item.id} className="p-4">
                    <CartItem item={item} />
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Order summary section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow sticky top-6">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800">Order Summary</h2>
              </div>
              
              <div className="p-4 space-y-4">
                {/* Subtotal */}
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${totalPrice.toFixed(2)}</span>
                </div>
                {/* Booking fee (static) */}
                <div className="flex justify-between">
                  <span className="text-gray-600">Booking Fee</span>
                  <span className="font-medium">$0.00</span>
                </div>
                {/* Total */}
                <div className="border-t border-gray-200 pt-4 flex justify-between">
                  <span className="font-semibold text-gray-800">Total</span>
                  <span className="font-bold text-xl text-purple-700">${totalPrice.toFixed(2)}</span>
                </div>
                {/* Login required alert if not authenticated */}
                {!currentUser && (
                  <div className="flex items-start p-3 bg-yellow-50 rounded-md">
                    <AlertCircle className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-yellow-800">Login Required</h3>
                      <p className="text-sm text-yellow-700">
                        Please <Link to="/login" className="underline font-medium">login</Link> or <Link to="/signup" className="underline font-medium">create an account</Link> to complete your purchase.
                      </p>
                    </div>
                  </div>
                )}
                {/* Checkout button */}
                <button 
                  onClick={handleCheckout}
                  disabled={isProcessing}
                  className={`w-full py-3 rounded-md font-semibold text-white transition-colors ${
                    isProcessing
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700'
                  }`}
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                      Processing...
                    </div>
                  ) : (
                    'Proceed to Checkout'
                  )}
                </button>
                {/* Terms and privacy note */}
                <p className="text-xs text-gray-500 text-center mt-2">
                  By proceeding, you agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;