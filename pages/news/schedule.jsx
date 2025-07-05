import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import Footer from '../../components/Footer';
import Link from 'next/link';
import { Calendar as CalendarIcon, Clock, Tag, Info, ChevronLeft, ChevronRight, Plus, X } from 'lucide-react';

export default function NewsSchedulePage() {
  const calendarRef = useRef(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentWeek, setCurrentWeek] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Helper functions for calendar
  const getWeekDays = (date) => {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Adjust for Sunday
    const monday = new Date(date.setDate(diff));
    
    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const nextDay = new Date(monday);
      nextDay.setDate(monday.getDate() + i);
      weekDays.push(nextDay);
    }
    return weekDays;
  };
  
  const formatTimeForDisplay = (hours, minutes) => {
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };
  
  const getHourPositionPercentage = (hour, minute) => {
    // 24 hours in a day, convert to percentage
    return ((hour + minute / 60) / 24) * 100;
  };
  
  const formatDayHeader = (date) => {
    const options = { weekday: 'short', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };
  
  const navigateWeek = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + (direction * 7));
    setCurrentDate(newDate);
  };
  
  // Calendar event data structure - empty array as all events have been removed
  const calendarEvents = [];
  
  // Use the calendar events as the upcoming events
  const [upcomingEvents, setUpcomingEvents] = useState(calendarEvents);
  
  // Function to handle adding new events - removed as per request

  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // Event form state variables removed
  const [showEventForm, setShowEventForm] = useState(false); // Keeping this but not using it
  
  // All events have been removed

  // Initialize calendar and update current time indicator
  useEffect(() => {
    // Set up the week days based on current date
    const weekDays = getWeekDays(new Date(currentDate));
    setCurrentWeek(weekDays);
    
    // Simulating API call
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [currentDate]);
  
  // Separate useEffect for time updates to avoid unnecessary week recalculations
  useEffect(() => {
    // Update current time immediately
    setCurrentTime(new Date());
    
    // Update time indicator every minute
    const timeIndicatorInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Every minute
    
    return () => clearInterval(timeIndicatorInterval);
  }, []);

  // Define filteredEvents as an empty array since we've removed all events
  const filteredEvents = [];

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Calendar event helpers - simplified since we've removed all events
  const getEventsForDay = (date) => {
    return []; // Return empty array as all events have been removed
  };
  
  const getEventPosition = (event) => {
    // This function is kept for compatibility but won't be used
    const [hours, minutes] = event?.time?.split(':').map(Number) || [0, 0];
    return getHourPositionPercentage(hours, minutes);
  };
  
  const getCurrentTimePosition = () => {
    return getHourPositionPercentage(
      currentTime.getUTCHours(),
      currentTime.getUTCMinutes()
    );
  };

  // These functions are kept for compatibility but won't be used since all events are removed
  const getImportanceColor = (importance) => {
    switch(importance) {
      case 'high': return 'bg-red-600 text-white';
      case 'medium': return 'bg-yellow-600 text-white';
      case 'low': return 'bg-green-600 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };
  
  const getImportanceLabel = (importance) => {
    switch(importance) {
      case 'high': return 'High Impact';
      case 'medium': return 'Medium Impact';
      case 'low': return 'Low Impact';
      default: return 'Unknown';
    }
  };
  
  const getEventBackground = (importance) => {
    switch(importance) {
      case 'high': return 'border-red-500 bg-red-900/70 text-white';
      case 'medium': return 'border-yellow-500 bg-yellow-900/70 text-white';
      case 'low': return 'border-green-500 bg-green-900/70 text-white';
      default: return 'border-gray-500 bg-gray-900/70 text-white';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white">
      <Head>
        <title>Crypto News Schedule & Upcoming Events | 1ewis.com</title>
        <meta 
          name="description" 
          content="Stay ahead with our comprehensive schedule of upcoming cryptocurrency events, network upgrades, hard forks, and important announcements in the crypto world." 
        />
        <meta name="keywords" content="crypto events, bitcoin halving, ethereum upgrade, crypto calendar, blockchain events, cryptocurrency schedule" />
        <link rel="canonical" href="https://1ewis.com/news/schedule" />
      </Head>
      
      <main className="pt-28 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Hero Section */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-violet-400 to-indigo-400">
              Crypto News Schedule
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Stay ahead of the curve with our comprehensive calendar of upcoming cryptocurrency events,
              network upgrades, and important announcements.
            </p>
          </motion.div>
        </section>
        
        {/* Filter Controls */}
        <section className="mb-8">
          <div className="flex flex-wrap gap-3 justify-center">
            <button 
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-full transition-all ${filter === 'all' ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
            >
              All Events
            </button>
            <button 
              onClick={() => setFilter('high')}
              className={`px-4 py-2 rounded-full transition-all ${filter === 'high' ? 'bg-red-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
            >
              High Impact
            </button>
            <button 
              onClick={() => setFilter('medium')}
              className={`px-4 py-2 rounded-full transition-all ${filter === 'medium' ? 'bg-yellow-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
            >
              Medium Impact
            </button>
            <button 
              onClick={() => setFilter('low')}
              className={`px-4 py-2 rounded-full transition-all ${filter === 'low' ? 'bg-green-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
            >
              Low Impact
            </button>
          </div>
        </section>
        
        {/* Calendar Schedule Section */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8 border-b border-gray-800 pb-4">
            <h2 className="text-2xl font-bold">Weekly Schedule (UTC)</h2>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => navigateWeek(-1)}
                className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-gray-300">
                {currentWeek.length > 0 && `${formatDate(currentWeek[0])} - ${formatDate(currentWeek[6])}`}
              </span>
              <button 
                onClick={() => navigateWeek(1)}
                className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
          ) : (
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg overflow-hidden">
              {/* Calendar Header - Days of Week */}
              <div className="grid grid-cols-7 border-b border-gray-800">
                {currentWeek.map((day, index) => (
                  <div 
                    key={index} 
                    className={`p-3 text-center font-medium ${new Date().toDateString() === day.toDateString() ? 'bg-purple-900/20 text-purple-300' : ''}`}
                  >
                    {formatDayHeader(day)}
                  </div>
                ))}
              </div>
              
              {/* Calendar Body */}
              <div className="grid grid-cols-7 relative" ref={calendarRef} style={{ height: '600px' }}>
                {/* Time indicators */}
                <div className="absolute left-0 w-full h-full">
                  {/* Hour markers - 24 hours from 00:00 to 23:00 */}
                  {Array.from({ length: 25 }).map((_, i) => {
                    const hour = i % 24;
                    const isFullHour = i < 24; // Don't show the last marker label (it's just for the grid)
                    
                    return (
                      <div 
                        key={i} 
                        className="border-t border-gray-800/50 absolute w-full text-xs text-gray-500"
                        style={{ top: `${(i / 24) * 100}%` }}
                      >
                        {isFullHour && (
                          <span className="absolute -top-2.5 -left-1 bg-gray-900 px-1">
                            {formatTimeForDisplay(hour, 0)}
                          </span>
                        )}
                      </div>
                    );
                  })}
                  
                  {/* Additional minor hour markers (every 3 hours) */}
                  {[3, 6, 9, 15, 18, 21].map((hour) => (
                    <div 
                      key={`minor-${hour}`} 
                      className="border-t border-gray-800/30 absolute w-full"
                      style={{ top: `${(hour / 24) * 100}%` }}
                    />
                  ))}
                  
                  {/* AM/PM indicators */}
                  <div className="absolute right-1 top-[12.5%] text-xs text-gray-500 font-medium">AM</div>
                  <div className="absolute right-1 top-[62.5%] text-xs text-gray-500 font-medium">PM</div>
                  
                  {/* Current time indicator (green line) */}
                  <div 
                    className="absolute w-full h-1 bg-green-500 z-20 shadow-[0_0_8px_rgba(34,197,94,0.6)]"
                    style={{ top: `${getCurrentTimePosition()}%` }}
                  >
                    <div className="absolute -left-1 -top-2 w-4 h-4 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                    <div className="absolute -right-1 -top-2 w-4 h-4 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 -top-7 bg-green-900 text-green-300 px-2 py-1 rounded text-xs font-mono shadow-lg border border-green-500">
                      {`${currentTime.getUTCHours().toString().padStart(2, '0')}:${currentTime.getUTCMinutes().toString().padStart(2, '0')} UTC`}
                    </div>
                  </div>
                </div>
                
                {/* Days columns - no events displayed */}
                {currentWeek.map((day, dayIndex) => {
                  const isToday = new Date().toDateString() === day.toDateString();
                  
                  return (
                    <div 
                      key={dayIndex} 
                      className={`relative h-full border-r border-gray-800 ${isToday ? 'bg-purple-900/10' : ''}`}
                    >
                      {/* No events to display */}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          
          {/* Legend */}
          <div className="mt-6 flex flex-wrap gap-4 justify-center">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-300">Current Time (UTC)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-400 rounded-full mr-2"></div>
              <span className="text-sm text-gray-300">High Impact</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></div>
              <span className="text-sm text-gray-300">Medium Impact</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
              <span className="text-sm text-gray-300">Low Impact</span>
            </div>
          </div>
          
          {/* Event Details */}
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4 border-b border-gray-800 pb-2">Event Details</h3>
            <div className="space-y-4">
              <div className="text-center py-8 bg-gray-900/50 rounded-lg border border-gray-800">
                <p className="text-gray-400">No events currently scheduled. Check back later.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Subscribe Section */}
        <section className="bg-gradient-to-r from-purple-900/30 to-indigo-900/30 rounded-xl p-8 border border-purple-500/20">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Never Miss an Important Event</h2>
            <p className="text-gray-300 mb-6">
              Subscribe to our newsletter to receive timely notifications about upcoming crypto events and breaking news.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-grow px-4 py-3 bg-gray-900 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-md transition-all duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
