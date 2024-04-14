import { Route, Routes } from 'react-router-dom';

import { Home } from './pages/Home';
import './App.css';
import { AbountUs } from './pages/AboutUs';


function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<AbountUs />} />
    </Routes>
  )
}

export default App
