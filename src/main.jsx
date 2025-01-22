import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { createClient } from '@supabase/supabase-js';
import { SessionContextProvider } from '@supabase/auth-helpers-react';

const supabase = createClient(
  "https://enzwrwwhmapkalndtija.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVuendyd3dobWFwa2FsbmR0aWphIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc0NTk4NzQsImV4cCI6MjA1MzAzNTg3NH0.hkZV82jCRUDakL7cn-0ZseMzN0_ez7CfUZm2b1zysPE" 
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SessionContextProvider supabaseClient={supabase}>
      <App />
    </SessionContextProvider>
  </StrictMode>,
)
