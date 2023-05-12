import React, { useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import Nav from './components/Nav.jsx';
import Pets from './pages/Pets.jsx';
import About from './pages/About.jsx';

function App() {
  // clear out token from local-storage when user leaves the app
  useEffect(() => {
    return () => {
      localStorage.clear();
    };
  }, []);

  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<div>Go login...</div>} />
        <Route path="/pets" element={<Pets />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
