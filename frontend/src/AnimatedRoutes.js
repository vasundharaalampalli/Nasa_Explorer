import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import APODContent from './components/APOD/APODContent';
import MarsRover from './pages/MarsRover';
import EPIC from './pages/EPIC';
import MarsContent from './components/MarsContent';
import EPICContent from './components/EPICContent';
import DataVisualization from './components/DataVisualization';

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<APODContent />} />
        <Route path="/mars" element={<MarsRover />} />
        <Route path="/epic" element={<EPIC />} />
        <Route path="/visualization" element={<DataVisualization />}/>
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;