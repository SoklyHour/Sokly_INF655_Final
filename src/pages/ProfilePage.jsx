// Imports React, hooks, icons, context, navigation, Firestore, and a booking history component
import React, { useState, useEffect } from 'react';
import { User, Mail, LogOut, Ticket, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase/config';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import BookingHistoryItem from '../components/BookingHistoryItem';

// ProfilePage component displays user info and booking history
const ProfilePage = () => {
  // Get current user and logout function from AuthContext
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  // State for bookings, loading, and error
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user's bookings from Firestore on mount or when user changes
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        if (!currentUser) return;

        setIsLoading(true);

        const bookingsRef = collection(db, 'bookings');
        let q;

        // Try to order bookings by date, fallback if index is missing
        try {
          q = query(
            bookingsRef,
            where('userId', '==', currentUser.uid),
            orderBy('date', 'desc')
          );
          const querySnapshot = await getDocs(q);
          const bookingsList = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setBookings(bookingsList);
        } catch (firestoreError) {
          // Fallback if Firestore index is missing
          if (
            firestoreError.code === 'failed-precondition' ||
            firestoreError.message?.includes('index')
          ) {
            q = query(
              bookingsRef,
              where('userId', '==', currentUser.uid)
            );
            const querySnapshot = await getDocs(q);
            const bookingsList = querySnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            }));
            setBookings(bookingsList);
          } else {
            throw firestoreError;
          }
        }
      } catch (err) {
        // Handle errors
        console.error('Error fetching bookings:', err);
        setError('Failed to load booking history');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, [currentUser]);

  // Handle user logout
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  // Render profile and booking history UI
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile header */}
      <div className="bg-gradient-to-r from-purple-700 to-indigo-800 rounded-lg shadow-lg p-6 mb-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl font-bold leading-7 text-white sm:text-3xl sm:leading-9 sm:truncate">
              My Profile
            </h1>
          </div>
          <div className="mt-4 flex md:mt-0 md:ml-4">
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-purple-700 bg-white hover:bg-gray-100 focus:outline-none"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main content: user info and booking history */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* User info card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6">
              <div className="flex items-center">
                <div className="h-16 w-16 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center text-white">
                  <User className="h-8 w-8" />
                </div>
                <div className="ml-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {currentUser?.email.split('@')[0] || 'User'}
                  </h2>
                  <p className="text-sm text-gray-500">Member since {currentUser?.metadata.creationTime?.split(' ')[0] || 'today'}</p>
                </div>
              </div>
              <div className="mt-6 border-t border-gray-200 pt-4">
                <div className="flex items-center text-gray-700 mb-2">
                  <Mail className="h-5 w-5 text-gray-400 mr-2" />
                  <span>{currentUser?.email}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Booking history card */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
              <div className="flex items-center">
                <Ticket className="h-5 w-5 text-purple-600 mr-2" />
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Booking History
                </h3>
              </div>
            </div>

            <div className="px-4 py-5 sm:p-6">
              {/* Loading, error, empty, or bookings list */}
              {isLoading ? (
                <div className="flex justify-center items-center h-48">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
                </div>
              ) : error ? (
                <div className="bg-red-50 p-4 rounded-md flex items-start">
                  <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 mr-2" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              ) : bookings.length === 0 ? (
                <div className="text-center py-12">
                  <Ticket className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings yet</h3>
                  <p className="text-gray-500 max-w-md mx-auto">
                    You haven't made any bookings yet. Browse our events and book your first ticket!
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {bookings.map(booking => (
                    <BookingHistoryItem key={booking.id} booking={booking} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;