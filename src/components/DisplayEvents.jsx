import React, { useEffect, useState } from 'react';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useNavigate } from 'react-router-dom'; // Assuming you are using react-router-dom
import './DisplayEvents.css';
import SignIn from './SignIn';
import IconButton from '@mui/material/IconButton';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const DisplayEvents = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]); // To store filtered events
  const [searchTerm, setSearchTerm] = useState(''); // Search term state
  const [startDate, setStartDate] = useState(''); // Start date filter
  const [endDate, setEndDate] = useState(''); // End date filter
 const [mode, setMode] = useState('light');

  const session = useSession();
  const supabase = useSupabaseClient();
  const navigate = useNavigate(); // For navigation

  async function signOut() {
    await supabase.auth.signOut();
  }
 const theme = createTheme({
    palette: {
      mode: mode === 'dark' ? 'dark' : 'light', // Toggle between dark and light mode
    },
  });

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'dark' ? 'light' : 'dark')); // Toggle between dark and light
  };


  async function fetchCalendarEvents() {
    if (!session) return;
    const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + session.provider_token,
      },
    });
    const data = await response.json();
    setEvents(data.items || []);
    setFilteredEvents(data.items || []); // Initially set filtered events to all events
  }

  useEffect(() => {
    fetchCalendarEvents();
  }, [session]);

  // Handle date filtering
  function filterEvents() {
    const filtered = events.filter((event) => {
      const eventStart = new Date(event.start.dateTime || event.start.date);
      const eventEnd = new Date(event.end.dateTime || event.end.date);

      if (startDate && new Date(startDate) > eventEnd) {
        return false; // Exclude events that end before the start date
      }

      if (endDate && new Date(endDate) < eventStart) {
        return false; // Exclude events that start after the end date
      }
      return true;
    });

    setFilteredEvents(filtered);
  }

  // Handle search filtering
  useEffect(() => {
    const searchFiltered = events.filter((event) =>
      (event.summary || '').toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEvents(searchFiltered);
  }, [searchTerm, events]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      
    
      {!session ? (
        <SignIn />
      ) : (
        <div className="table-container">
          <div className="icon-container1">
          <IconButton onClick={toggleTheme} aria-label="toggle theme" style={{ marginBottom: '20px' }}>
            {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </div>
        <button className="signout-button" onClick={() => signOut()}>
          Sign Out
        </button>
        <div>
          <h1>Upcoming Events</h1>

          {/* Search Bar and Add Event Button */}
          <div className="search-and-add">
            <input
              type="text"
              placeholder="Search events"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-bar"
            />
            <button className="add-event-button" onClick={() => navigate('/addevents')}>
              Add Event
            </button>
          </div>

          {/* Date Filter Inputs */}
          <div className="date-filters">
            <label>
              Start Date:
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </label>
            <label>
              End Date:
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </label>
            <button onClick={filterEvents}>Filter</button>
          </div>

          {/* Events Table */}
          <table>
            <thead>
              <tr>
                <th>Event Name</th>
                <th>Location</th>
                <th>Start Date</th>
                <th>End Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event) => (
                  <tr key={event.id}>
                    <td>{event.summary || 'No Title'}</td>
                    <td>{event.description || 'No Description'}</td>
                    <td>{new Date(event.start.dateTime || event.start.date).toLocaleString()}</td>
                    <td>{new Date(event.end.dateTime || event.end.date).toLocaleString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No events found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      )}
    </ThemeProvider>
  );
};

export default DisplayEvents;
