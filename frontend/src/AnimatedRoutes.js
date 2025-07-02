import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import APODContent from './components/APOD/APODContent';
import MarsRover from './pages/MarsRover';
import EPIC from './pages/EPIC';

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<APODContent />} />
        <Route path="/mars" element={<MarsRover />} />
        <Route path="/epic" element={<EPIC />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;