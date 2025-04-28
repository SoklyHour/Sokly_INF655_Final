import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import EventDetailsPage from './pages/EventDetailsPage';
import CartPage from './pages/CartPage';
import SuccessPage from './pages/SuccessPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';
import ProtectedRoute from './components/ProtectedRoute';

// App component sets up global providers, routing, and layout
function App() {
  return (
    // Provide authentication context to the app
    <AuthProvider>
      {/* Provide cart context to the app */}
      <CartProvider>
        {/* Set up React Router */}
        <Router>
          <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Navigation bar at the top */}
            <Navbar />
            {/* Main content area with route-based rendering */}
            <main className="flex-grow">
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/event/:eventId" element={<EventDetailsPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                {/* Protected routes (require authentication) */}
                <Route 
                  path="/success" 
                  element={
                    <ProtectedRoute>
                      <SuccessPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/profile" 
                  element={
                    <ProtectedRoute>
                      <ProfilePage />
                    </ProtectedRoute>
                  } 
                />
              </Routes>
            </main>
            {/* Footer at the bottom */}
            <footer className="bg-gray-800 text-white py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <div className="mb-4 md:mb-0">
                    <p className="text-sm">&copy; 2025 SoklyTicket. All rights reserved.</p>
                  </div>
                  <div className="flex space-x-6">
                    <a href="#" className="text-gray-400 hover:text-white">Terms</a>
                    <a href="#" className="text-gray-400 hover:text-white">Privacy</a>
                    <a href="#" className="text-gray-400 hover:text-white">Contact</a>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;