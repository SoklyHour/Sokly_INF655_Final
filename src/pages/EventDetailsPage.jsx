import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, MapPin, DollarSign, Clock, Ticket, ShoppingCart, Minus, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import events from '../data/events';

// EventDetailsPage displays details for a single event and allows ticket purchase
const EventDetailsPage = () => {
  const { eventId } = useParams(); // Get event ID from URL
  const navigate = useNavigate(); // For navigation
  const { addToCart } = useCart(); // Cart context
  const { currentUser } = useAuth(); // Auth context
  const [event, setEvent] = useState(null); // Event data
  const [quantity, setQuantity] = useState(1); // Ticket quantity
  const [isAdding, setIsAdding] = useState(false); // Add-to-cart animation state
  
  useEffect(() => {
    // Find the event with the matching ID
    const foundEvent = events.find(e => e.id === parseInt(eventId));
    
    if (foundEvent) {
      setEvent(foundEvent);
      // Update page title
      document.title = `${foundEvent.title} - SoklyTicket`;
    } else {
      // If event not found, redirect to home
      navigate('/');
    }
    
    // Cleanup function to reset title
    return () => {
      document.title = 'SoklyTicket';
    };
  }, [eventId, navigate]);
  
  // Show loading spinner if event is not loaded yet
  if (!event) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }
  
  // Increase ticket quantity
  const handleIncrement = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };
  
  // Decrease ticket quantity (minimum 1)
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };
  
  // Add tickets to cart with animation
  const handleAddToCart = () => {
    setIsAdding(true);
    setTimeout(() => {
      addToCart(event, quantity);
      setIsAdding(false);
    }, 600);
  };
  
  // Format event date
  const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  // Placeholder event time
  const formattedTime = '7:00 PM - 10:00 PM';
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Event image and overlay */}
        <div className="relative h-64 md:h-96">
          <img 
            src={event.thumbnail} 
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-6">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">{event.title}</h1>
            <div className="flex flex-wrap gap-3">
              <div className="bg-black/30 backdrop-blur-sm text-white px-3 py-1 rounded-full flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{formattedDate}</span>
              </div>
              <div className="bg-black/30 backdrop-blur-sm text-white px-3 py-1 rounded-full flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{event.location}</span>
              </div>
              <div className="bg-black/30 backdrop-blur-sm text-white px-3 py-1 rounded-full flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                <span>{formattedTime}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Event details and ticket purchase */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Event description and location */}
            <div className="md:col-span-2">
              <h2 className="text-xl font-bold text-gray-800 mb-4">About This Event</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">{event.description}</p>
              
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Location</h2>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-gray-500 mr-2 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-800">{event.location} Convention Center</h3>
                      <p className="text-gray-600">123 Event Street, {event.location}, USA</p>
                    </div>
                  </div>
                  {/* Placeholder for a map */}
                  <div className="mt-4 h-40 bg-gray-300 rounded-lg flex items-center justify-center">
                  {/*Google Maps iframe*/}
                    <iframe
                      title="Event Location"
                      width="100%"
                      height="100%"
                      style={{ border: 0, borderRadius: '0.5rem' }}
                      loading="lazy"
                      allowFullScreen
                      referrerPolicy="no-referrer-when-downgrade"
                      src={`https://www.google.com/maps?q=${encodeURIComponent(event.location)}&output=embed`}
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Ticket purchase sidebar */}
            <div>
              <div className="bg-gray-50 p-6 rounded-lg sticky top-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Tickets</h2>
                
                <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4">
                  {/* Price per ticket */}
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Price per ticket</span>
                    <div className="flex items-center font-bold text-purple-700">
                      <DollarSign className="h-4 w-4" />
                      <span>{event.price.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  {/* Quantity controls */}
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-600">Quantity</span>
                    <div className="flex items-center">
                      <button 
                        onClick={handleDecrement}
                        className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-4 w-4 text-gray-600" />
                      </button>
                      <span className="mx-3 w-8 text-center font-medium">{quantity}</span>
                      <button 
                        onClick={handleIncrement}
                        className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-4 w-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Total price */}
                  <div className="flex justify-between mb-6 pb-4 border-b border-gray-200">
                    <span className="font-bold text-gray-800">Total</span>
                    <div className="flex items-center font-bold text-purple-700 text-xl">
                      <DollarSign className="h-5 w-5" />
                      <span>{(event.price * quantity).toFixed(2)}</span>
                    </div>
                  </div>
                  
                  {/* Add to cart button */}
                  <button 
                    onClick={handleAddToCart}
                    className={`w-full flex items-center justify-center py-3 rounded-lg font-bold text-white transition-all ${
                      isAdding 
                        ? 'bg-green-600' 
                        : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700'
                    }`}
                  >
                    {isAdding ? (
                      <>
                        <Ticket className="h-5 w-5 mr-2 animate-bounce" />
                        Added to Cart!
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="h-5 w-5 mr-2" />
                        Add to Cart
                      </>
                    )}
                  </button>
                  
                  {/* Login prompt if not authenticated */}
                  {!currentUser && (
                    <p className="text-sm text-gray-600 mt-3 text-center">
                      You'll need to <a href="/login" className="text-purple-600 hover:underline">log in</a> to complete checkout
                    </p>
                  )}
                </div>
                
                {/* Ticket info note */}
                <div className="text-sm text-gray-600">
                  <p className="flex items-start mb-2">
                    <Ticket className="h-4 w-4 mr-2 mt-0.5 text-gray-500" />
                    <span>Tickets will be sent to your email after purchase.</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsPage;