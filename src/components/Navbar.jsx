import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { ShoppingCart, User, Menu, X } from 'lucide-react';

// Navbar component displays the top navigation bar
const Navbar = () => {
  const { currentUser, logout } = useAuth(); // Get current user and logout function from auth context
  const { cartItems } = useCart(); // Get cart items from cart context
  const navigate = useNavigate(); // For navigation after logout
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu

  // Handle user logout
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      setIsMenuOpen(false);
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo section */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              {/* Logo text */}
              <span className="font-bold text-2xl text-white">SoklyTicket</span>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Events link */}
            <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-purple-500 transition-colors">
              Events
            </Link>
            {/* Cart link with item count */}
            <Link to="/cart" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-purple-500 transition-colors relative">
              <ShoppingCart className="h-5 w-5 inline-block" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </Link>
            {/* Authenticated user menu */}
            {currentUser ? (
              <>
                <Link to="/profile" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-purple-500 transition-colors">
                  <User className="h-5 w-5 inline-block mr-1" />
                  Profile
                </Link>
                <button 
                  onClick={handleLogout}
                  className="px-3 py-2 rounded-md text-sm font-medium bg-purple-800 hover:bg-purple-900 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              // Login link for guests
              <Link 
                to="/login" 
                className="px-3 py-2 rounded-md text-sm font-medium bg-purple-800 hover:bg-purple-900 transition-colors"
              >
                Login
              </Link>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-purple-500 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-purple-700">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {/* Events link */}
            <Link 
              to="/" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-purple-500"
              onClick={() => setIsMenuOpen(false)}
            >
              Events
            </Link>
            {/* Cart link with item count */}
            <Link 
              to="/cart" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-purple-500 relative"
              onClick={() => setIsMenuOpen(false)}
            >
              <ShoppingCart className="h-5 w-5 inline-block mr-2" />
              Cart
              {cartItems.length > 0 && (
                <span className="ml-2 bg-orange-500 text-white text-xs rounded-full px-2 py-1">
                  {cartItems.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </Link>
            {/* Authenticated user menu */}
            {currentUser ? (
              <>
                <Link 
                  to="/profile" 
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-purple-500"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="h-5 w-5 inline-block mr-2" />
                  Profile
                </Link>
                <button 
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium bg-purple-800 hover:bg-purple-900"
                >
                  Logout
                </button>
              </>
            ) : (
              // Login link for guests
              <Link 
                to="/login" 
                className="block px-3 py-2 rounded-md text-base font-medium bg-purple-800 hover:bg-purple-900"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;