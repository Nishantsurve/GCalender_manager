import React, { useState } from 'react';
import { useSession, useSupabaseClient, useSessionContext } from '@supabase/auth-helpers-react';
import { toast, ToastContainer } from 'react-toastify'; // Import Toast
import IconButton from '@mui/material/IconButton';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import 'react-toastify/dist/ReactToastify.css'; // Import Toast CSS
import './AddEvent.css';
import SignIn from './SignIn'; // Import SignIn component

const AddEvent = () => {
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [mode, setMode] = useState('light'); // Manage theme mode (light or dark)

  const session = useSession(); // Get user session
  const supabase = useSupabaseClient();
  const { isLoading } = useSessionContext();

  const theme = createTheme({
    palette: {
      mode: mode === 'dark' ? 'dark' : 'light', // Toggle between dark and light mode
    },
  });

  if (isLoading) {
    return <></>;
  }

  async function signOut() {
    await supabase.auth.signOut();
    toast.info('You have successfully signed out.', {
      autoClose: 3000,
      closeOnClick: true,
    });
  }

  async function createCalendarEvent() {
    const event = {
      summary: eventName,
      description: eventDescription,
      start: {
        dateTime: start.toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      end: {
        dateTime: end.toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
    };
    try {
      const response = await fetch(
        'https://www.googleapis.com/calendar/v3/calendars/primary/events',
        {
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + session.provider_token,
          },
          body: JSON.stringify(event),
        }
      );

      if (response.ok) {
        toast.success('Event created successfully! Check your Google Calendar.', {
          autoClose: 3000,
          closeOnClick: true,
        });
      } else {
        const errorData = await response.json();
        console.error('Error creating event:', errorData);
        toast.error('Failed to create event. Please try again.', {
          autoClose: 3000,
          closeOnClick: true,
        });
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      toast.error('An unexpected error occurred. Please try again.', {
        autoClose: 3000,
        closeOnClick: true,
      });
    }
  }

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'dark' ? 'light' : 'dark')); // Toggle between dark and light
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastContainer />
      {/* Render SignIn component if session is not active */}
      {!session ? (
        <SignIn />
      ) : (
        // Render Event container if session is active
        <div className="Event">
          <div className="icon-container">
            <IconButton
              onClick={toggleTheme}
              aria-label="toggle theme"
              style={{ marginBottom: '20px' }}
            >
              {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </div>

          <button className="signout-button" onClick={() => signOut()}>
            Sign Out
          </button>

          <div className="header-container">
            <h2>Add Event</h2>
          </div>

          <p>Start of your event</p>
          <input
            type="datetime-local"
            value={start.toISOString().slice(0, 16)}
            onChange={(e) => setStart(new Date(e.target.value))}
          />

          <p>End of your event</p>
          <input
            type="datetime-local"
            value={end.toISOString().slice(0, 16)}
            onChange={(e) => setEnd(new Date(e.target.value))}
          />

          <p>Event name</p>
          <input
            type="text"
            placeholder="Enter event name"
            onChange={(e) => setEventName(e.target.value)}
          />

          <p>Event description</p>
          <input
            type="text"
            placeholder="Enter event description"
            onChange={(e) => setEventDescription(e.target.value)}
          />

          <hr />
          <button className="create-button" onClick={() => createCalendarEvent()}>
            Create Calendar Event
          </button>
        </div>
      )}
    </ThemeProvider>
  );
};

export default AddEvent;
