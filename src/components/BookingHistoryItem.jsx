import React from 'react';
import { Calendar, MapPin, Ticket } from 'lucide-react';

// Component to display a single booking history item
const BookingHistoryItem = ({ booking }) => {
  // Destructure booking details
  const { id, date, items, totalAmount } = booking;
  
  // Format the booking date from Firestore timestamp to a readable string
  const bookingDate = new Date(date.seconds * 1000).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    // Card container for each booking
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4 hover:shadow-lg transition-shadow duration-300">
      {/* Header section with booking ID and date */}
      <div className="bg-purple-100 p-3 border-l-4 border-purple-600">
        <div className="flex justify-between items-center">
          <div className="text-sm text-purple-800">
            <span className="font-semibold">Booking ID:</span> {id.slice(0, 8)}
          </div>
          <div className="flex items-center text-purple-800">
            <Calendar className="h-4 w-4 mr-1" />
            <span className="text-sm">{bookingDate}</span>
          </div>
        </div>
      </div>
      
      {/* Main content: list of purchased tickets */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-2">Purchased Tickets</h3>
        
        <div className="space-y-3">
          {/* Loop through each ticket item in the booking */}
          {items.map((item, index) => (
            <div key={index} className="flex justify-between items-center border-b border-gray-100 pb-2">
              <div className="flex items-start">
                {/* Ticket icon */}
                <Ticket className="h-5 w-5 mr-2 text-purple-600 mt-1" />
                <div>
                  {/* Ticket title */}
                  <p className="font-medium text-gray-800">{item.title}</p>
                  {/* Ticket location */}
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span>{item.location}</span>
                  </div>
                </div>
              </div>
              {/* Ticket quantity and price */}
              <div className="text-right">
                <p className="font-medium">
                  {item.quantity} {item.quantity === 1 ? 'ticket' : 'tickets'}
                </p>
                <p className="text-sm text-gray-600">
                  ${ (item.price * item.quantity).toFixed(2) }
                </p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Total amount for the booking */}
        <div className="mt-4 pt-2 border-t border-gray-200 flex justify-between">
          <span className="font-bold text-gray-800">Total Amount:</span>
          <span className="font-bold text-purple-700">${totalAmount.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default BookingHistoryItem;