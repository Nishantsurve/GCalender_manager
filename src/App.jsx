import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import AddEvent from './components/AddEvent';
import DisplayEvents from './components/DisplayEvents';
import { ThemeProvider } from './components/ThemContext';
function App() {
  return (
    <ThemeProvider>
    <Router>
      <Routes>
        <Route path="/" element={<DisplayEvents />} />
        <Route path="/addevents" element={<AddEvent />} />
      </Routes>
    </Router>
    </ThemeProvider>
  );
}

export default App;
