import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, DollarSign } from 'lucide-react';

// EventCard component displays a single event card with details and a link to the event page
const EventCard = ({ event }) => {
  // Destructure event properties
  const { id, title, date, location, price, thumbnail } = event;
  
  // Helper function to format the event date in a readable way
  const formatEventDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    // Card container
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      {/* Event Image Section */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={thumbnail} 
          alt={title} 
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
        />
        {/* Price Badge */}
        <div className="absolute top-0 right-0 bg-purple-600 text-white px-3 py-1 m-2 rounded-full">
          <DollarSign className="h-4 w-4 inline-block" />
          <span className="font-bold">{price}</span>
        </div>
      </div>
      
      {/* Event Details Section */}
      <div className="p-4">
        {/* Event Title */}
        <h3 className="text-xl font-bold text-gray-800 mb-2 truncate">{title}</h3>
        
        {/* Date Information */}
        <div className="flex items-center text-gray-600 mb-2">
          <Calendar className="h-4 w-4 mr-2" />
          <span className="text-sm">{formatEventDate(date)}</span>
        </div>
        
        {/* Location Information */}
        <div className="flex items-center text-gray-600 mb-4">
          <MapPin className="h-4 w-4 mr-2" />
          <span className="text-sm">{location}</span>
        </div>
        
        {/* View Details Button */}
        <Link 
          to={`/event/${id}`}
          className="block w-full text-center bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white py-2 rounded-md transition-colors duration-300"
          aria-label={`View details for ${title}`}
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default EventCard;