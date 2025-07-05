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
  
  // Calendar event data structure
  const calendarEvents = [
    // Monday, June 30, 2025
    {
      id: 1,
      title: 'Fed Interest Rate Decision',
      date: '2025-06-30',
      time: '14:00',
      category: 'Macro',
      importance: 'high',
      description: 'Federal Reserve announces interest rate decision with significant impact on crypto markets.'
    },
    {
      id: 2,
      title: 'BTC Options Expiry',
      date: '2025-06-30',
      time: '08:00',
      category: 'Bitcoin',
      importance: 'medium',
      description: 'Monthly Bitcoin options contracts expire, potentially causing market volatility.'
    },
    
    // Tuesday, July 1, 2025
    {
      id: 3,
      title: 'Ethereum Protocol Upgrade',
      date: '2025-07-01',
      time: '10:30',
      category: 'Ethereum',
      importance: 'high',
      description: 'Major Ethereum network upgrade implementing new EIPs and protocol improvements.'
    },
    {
      id: 4,
      title: 'Crypto Regulation Hearing',
      date: '2025-07-01',
      time: '16:00',
      category: 'Regulation',
      importance: 'high',
      description: 'Senate Banking Committee hearing on proposed cryptocurrency regulations.'
    },
    
    // Wednesday, July 2, 2025
    {
      id: 5,
      title: 'Solana Ecosystem Conference',
      date: '2025-07-02',
      time: '09:00',
      category: 'Conference',
      importance: 'medium',
      description: 'Annual Solana ecosystem conference with project announcements and developer workshops.'
    },
    {
      id: 6,
      title: 'DeFi Protocol Token Launch',
      date: '2025-07-02',
      time: '13:00',
      category: 'DeFi',
      importance: 'medium',
      description: 'Launch of a new decentralized finance protocol token with initial liquidity pools.'
    },
    
    // Thursday, July 3, 2025
    {
      id: 7,
      title: 'US Employment Report',
      date: '2025-07-03',
      time: '08:30',
      category: 'Macro',
      importance: 'medium',
      description: 'Monthly US employment report release with potential market impact.'
    },
    {
      id: 8,
      title: 'Binance Quarterly Token Burn',
      date: '2025-07-03',
      time: '11:00',
      category: 'Exchange',
      importance: 'medium',
      description: 'Binance quarterly BNB token burn event affecting token supply.'
    },
    
    // Friday, July 4, 2025
    {
      id: 9,
      title: 'US Markets Closed - Independence Day',
      date: '2025-07-04',
      time: '00:00',
      category: 'Market',
      importance: 'low',
      description: 'US financial markets closed for Independence Day holiday.'
    },
    
    // Saturday, July 5, 2025
    {
      id: 10,
      title: 'Bitcoin Miami Hackathon',
      date: '2025-07-05',
      time: '10:00',
      category: 'Bitcoin',
      importance: 'low',
      description: '48-hour Bitcoin development hackathon with prizes for innovative projects.'
    },
    {
      id: 11,
      title: 'NFT Art Exhibition Launch',
      date: '2025-07-05',
      time: '18:00',
      category: 'NFT',
      importance: 'low',
      description: 'Virtual NFT art exhibition featuring prominent crypto artists.'
    },
    
    // Sunday, July 6, 2025
    {
      id: 12,
      title: 'Crypto Market Weekly Open',
      date: '2025-07-06',
      time: '23:00',
      category: 'Market',
      importance: 'medium',
      description: 'Weekly crypto market open, often with increased volatility.'
    },
    {
      id: 13,
      title: 'Layer 2 Protocol Launch',
      date: '2025-07-06',
      time: '15:00',
      category: 'Scaling',
      importance: 'high',
      description: 'Major Ethereum Layer 2 scaling solution mainnet launch.'
    }
  ];
  
  // Use the calendar events as the upcoming events
  const [upcomingEvents, setUpcomingEvents] = useState(calendarEvents);
  
  // Function to handle adding new events
  const handleAddEvent = (e) => {
    e.preventDefault();
    
    // Format the time to ensure it's in the correct format (HH:MM)
    const formattedTime = newEvent.time;
    
    // Create a new event object
    const event = {
      id: upcomingEvents.length + 1,
      title: newEvent.title,
      date: newEvent.date,
      time: formattedTime,
      category: newEvent.category,
      importance: newEvent.importance,
      description: newEvent.description
    };
    
    // Add the new event to the events array
    setUpcomingEvents([...upcomingEvents, event]);
    
    // Reset the form
    setNewEvent({
      title: '',
      date: '',
      time: '',
      category: '',
      importance: 'medium',
      description: ''
    });
    
    // Close the form
    setShowEventForm(false);
  };

  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showEventForm, setShowEventForm] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    time: '',
    category: '',
    importance: 'medium',
    description: ''
  });

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

  const filteredEvents = filter === 'all' 
    ? upcomingEvents 
    : upcomingEvents.filter(event => event.importance === filter);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Calendar event helpers
  const getEventsForDay = (date) => {
    // Format date to YYYY-MM-DD for comparison
    const dateString = date.toISOString().split('T')[0];
    return upcomingEvents.filter(event => event.date === dateString);
  };
  
  const getEventPosition = (event) => {
    // Parse the time (e.g., "14:00 UTC") to get hours and minutes
    const timeMatch = event.time.match(/(\d+):(\d+)/);
    if (!timeMatch) return 0;
    
    const hours = parseInt(timeMatch[1], 10);
    const minutes = parseInt(timeMatch[2], 10);
    
    // Calculate position as percentage of the day (24 hours)
    return ((hours + minutes / 60) / 24) * 100;
  };
  
  const getCurrentTimePosition = () => {
    // Get current UTC time from the state
    const utcHours = currentTime.getUTCHours();
    const utcMinutes = currentTime.getUTCMinutes();
    
    // Calculate position as percentage of the day (24 hours)
    return ((utcHours + utcMinutes / 60) / 24) * 100;
  };

  const getImportanceColor = (importance) => {
    switch(importance) {
      case 'high': return 'bg-red-500/20 text-red-400';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400';
      case 'low': return 'bg-green-500/20 text-green-400';
      default: return 'bg-blue-500/20 text-blue-400';
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
                
                {/* Days columns with events */}
                {currentWeek.map((day, dayIndex) => {
                  const dayEvents = getEventsForDay(day);
                  const isToday = new Date().toDateString() === day.toDateString();
                  
                  return (
                    <div 
                      key={dayIndex} 
                      className={`relative h-full border-r border-gray-800 ${isToday ? 'bg-purple-900/10' : ''}`}
                    >
                      {dayEvents.map((event) => {
                        const topPosition = getEventPosition(event);
                        
                        return (
                          <div 
                            key={event.id}
                            className={`absolute left-1 right-1 p-2 rounded-md text-xs ${getImportanceColor(event.importance)} border border-current z-10`}
                            style={{ 
                              top: `${topPosition}%`,
                              minHeight: '40px'
                            }}
                          >
                            <div className="font-medium">{event.time}</div>
                            <div className="font-bold truncate">{event.title}</div>
                            <div className="truncate">{event.category}</div>
                          </div>
                        );
                      })}
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
          
          {/* Add Event Button */}
          <div className="mt-8 flex justify-end">
            <button
              onClick={() => setShowEventForm(true)}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-all duration-300"
            >
              <Plus size={18} />
              Add Event
            </button>
          </div>
          
          {/* Event Form Modal */}
          {showEventForm && (
            <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gray-900 border border-gray-800 rounded-lg p-6 w-full max-w-lg"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Add New Event</h3>
                  <button 
                    onClick={() => setShowEventForm(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    <X size={20} />
                  </button>
                </div>
                
                <form onSubmit={handleAddEvent} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Event Title</label>
                    <input
                      type="text"
                      value={newEvent.title}
                      onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                      className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Date</label>
                      <input
                        type="date"
                        value={newEvent.date}
                        onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                        className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Time (24h)</label>
                      <input
                        type="time"
                        value={newEvent.time}
                        onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                        className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Category</label>
                      <input
                        type="text"
                        value={newEvent.category}
                        onChange={(e) => setNewEvent({...newEvent, category: e.target.value})}
                        className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Importance</label>
                      <select
                        value={newEvent.importance}
                        onChange={(e) => setNewEvent({...newEvent, importance: e.target.value})}
                        className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                    <textarea
                      value={newEvent.description}
                      onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                      rows="3"
                      className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    ></textarea>
                  </div>
                  
                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowEventForm(false)}
                      className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md transition-colors"
                    >
                      Add Event
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
          
          {/* Event Details */}
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-4 border-b border-gray-800 pb-2">Event Details</h3>
            <div className="space-y-4">
              {filteredEvents.length === 0 ? (
                <div className="text-center py-8 bg-gray-900/50 rounded-lg border border-gray-800">
                  <p className="text-gray-400">No events found matching your filter.</p>
                </div>
              ) : (
                filteredEvents.map((event) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 hover:border-purple-500/30 transition-all duration-300"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                      <div>
                        <h4 className="text-lg font-bold">{event.title}</h4>
                        <div className="flex flex-wrap gap-3 text-sm text-gray-400 mt-1">
                          <div className="flex items-center">
                            <CalendarIcon className="w-4 h-4 mr-1" />
                            {formatDate(event.date)}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {event.time}
                          </div>
                          <div className="flex items-center">
                            <Tag className="w-4 h-4 mr-1" />
                            {event.category}
                          </div>
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${getImportanceColor(event.importance)}`}>
                        {getImportanceLabel(event.importance)}
                      </div>
                    </div>
                    <div className="mt-3 text-gray-300">
                      <p>{event.description}</p>
                    </div>
                  </motion.div>
                ))
              )}
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
