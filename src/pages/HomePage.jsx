import React, { useState, useEffect } from 'react';
import { Search, SortAsc, SortDesc, Calendar, DollarSign } from 'lucide-react';
import EventCard from '../components/EventCard';
import events from '../data/events';

const HomePage = () => {
  const [filteredEvents, setFilteredEvents] = useState(events);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState('');

  useEffect(() => {
    let results = [...events];

    // Filter by search term (title or location)
    if (searchTerm) {
      results = results.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort events
    if (sortType === 'price-asc') {
      results.sort((a, b) => a.price - b.price);
    } else if (sortType === 'price-desc') {
      results.sort((a, b) => b.price - a.price);
    } else if (sortType === 'date-asc') {
      results.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortType === 'date-desc') {
      results.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    setFilteredEvents(results);
  }, [searchTerm, sortType]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Upcoming Events</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover and book tickets for the most exciting events happening in your area.
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-between mb-8 space-y-4 md:space-y-0">
        {/* Search bar */}
        <div className="relative w-full md:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600 transition duration-150 ease-in-out"
          />
        </div>

        {/* Sort options */}
        <div className="flex space-x-2">
          <button
            onClick={() => setSortType('price-asc')}
            className={`flex items-center px-3 py-2 rounded-md ${
              sortType === 'price-asc'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            } transition-colors`}
          >
            <DollarSign className="h-4 w-4 mr-1" />
            <SortAsc className="h-4 w-4" />
          </button>

          <button
            onClick={() => setSortType('price-desc')}
            className={`flex items-center px-3 py-2 rounded-md ${
              sortType === 'price-desc'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            } transition-colors`}
          >
            <DollarSign className="h-4 w-4 mr-1" />
            <SortDesc className="h-4 w-4" />
          </button>

          <button
            onClick={() => setSortType('date-asc')}
            className={`flex items-center px-3 py-2 rounded-md ${
              sortType === 'date-asc'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            } transition-colors`}
          >
            <Calendar className="h-4 w-4 mr-1" />
            <SortAsc className="h-4 w-4" />
          </button>

          <button
            onClick={() => setSortType('date-desc')}
            className={`flex items-center px-3 py-2 rounded-md ${
              sortType === 'date-desc'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            } transition-colors`}
          >
            <Calendar className="h-4 w-4 mr-1" />
            <SortDesc className="h-4 w-4" />
          </button>
        </div>
      </div>

      {filteredEvents.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">No events found matching your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;