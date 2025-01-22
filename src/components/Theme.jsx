import React,{useState} from 'react'
import IconButton from '@mui/material/IconButton';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import './Theme.css';

const Theme = () => {
    const [mode, setMode] = useState('light');

     const toggleTheme = () => {
        setMode((prevMode) => (prevMode === 'dark' ? 'light' : 'dark')); // Toggle between dark and light
    };

  return (
    <div>
         <div className="icon-container">
    <IconButton onClick={toggleTheme} aria-label="toggle theme" style={{ marginBottom: '20px' }}>
      {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
    </IconButton>
  </div>
  </div>
  )
}

export default Theme