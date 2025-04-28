import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, Calendar, User } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase/config';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

// SuccessPage component handles booking confirmation and saving booking to Firestore
const SuccessPage = () => {
  // Get cart items, total price, and clearCart function from CartContext
  const { cartItems, totalPrice, clearCart } = useCart();
  // Get current user from AuthContext
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // State to track if booking has been saved to Firestore
  const [bookingSaved, setBookingSaved] = useState(false);
  // Ref to prevent double booking
  const bookingAttempted = useRef(false);

  useEffect(() => {
    // Redirect to home if no cart items or user is not logged in and booking not already saved
    if ((cartItems.length === 0 || !currentUser) && !bookingSaved) {
      navigate('/');
      return;
    }

    // Save booking to Firestore only once
    if (!bookingAttempted.current && cartItems.length > 0 && currentUser) {
      bookingAttempted.current = true;
      const saveBooking = async () => {
        try {
          // Prepare booking data
          const bookingData = {
            userId: currentUser.uid,
            userEmail: currentUser.email,
            items: cartItems,
            totalAmount: totalPrice,
            date: serverTimestamp(),
          };
          // Save booking to Firestore
          await addDoc(collection(db, 'bookings'), bookingData);
          // Clear cart after successful booking
          clearCart();
          setBookingSaved(true);
        } catch (error) {
          console.error('Error saving booking:', error);
        }
      };
      saveBooking();
    }
  }, [cartItems, totalPrice, clearCart, currentUser, navigate, bookingSaved]);

  // Render booking confirmation UI
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      <div className="bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Booking Confirmed!</h1>
        <p className="text-lg text-gray-600 mb-8">
          Thank you for your purchase. We've sent a confirmation email to your inbox.
        </p>
        <div className="mb-8 inline-flex items-center justify-center p-4 bg-purple-50 rounded-lg">
          <Calendar className="h-6 w-6 text-purple-600 mr-2" />
          <span className="font-medium text-purple-800">
            View your tickets and booking details in your profile
          </span>
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/"
            className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-md transition-colors"
          >
            Browse More Events
          </Link>
          <Link
            to="/profile"
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold rounded-md transition-colors flex items-center justify-center"
          >
            <User className="h-5 w-5 mr-2" />
            Go to My Profile
          </Link>
        </div>
      </div>
      <div className="mt-8 text-center text-gray-500">
        <p>If you have any questions about your booking, please contact our support team.</p>
      </div>
    </div>
  );
};

export default SuccessPage;