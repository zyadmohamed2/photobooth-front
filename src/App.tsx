import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Welcome from './pages/Welcome';
import BackgroundSelect from './pages/BackgroundSelect';
import PhotoCapture from './pages/PhotoCapture';
import VisitorInfo from './pages/VisitorInfo';
import QRCode from './pages/QRCode';
import PhotoDisplay from './pages/PhotoDisplay';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/background" element={<BackgroundSelect />} />
        <Route path="/capture" element={<PhotoCapture />} />
        <Route path="/info" element={<VisitorInfo />} />
        <Route path="/qr" element={<QRCode />} />
        <Route path="/display" element={<PhotoDisplay />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;