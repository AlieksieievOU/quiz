import { useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { initGA } from './utils/analytics';
import Game from './Game';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import './App.css';

function App() {
  
  useEffect(() => {
    // Initialize GA for the app
    initGA();
  }, []);

  return (
    <Router>
      <RoutesWrapper />
    </Router>
  );
}

// Wrapper to use router hooks for tracking
function RoutesWrapper() {
  // Track page views on route change could be added here
  return (
    <Routes>
      <Route path="/" element={<Game />} />
      <Route path="/analytics" element={<AnalyticsDashboard />} />
    </Routes>
  );
}

export default App;
