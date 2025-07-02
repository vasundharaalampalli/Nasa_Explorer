import { useEffect } from 'react';

const StarsBackground = () => {
  useEffect(() => {
    const createStar = () => {
      const star = document.createElement('div');
      star.className = 'star absolute rounded-full bg-white dark:bg-yellow-200';
      
      // Random size between 1-3px
      const size = Math.random() * 2 + 1;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      
      // Random position
      star.style.left = `${Math.random() * 100}vw`;
      star.style.top = `${Math.random() * 100}vh`;
      
      // Random animation duration (5-15s)
      const duration = Math.random() * 10 + 5;
      star.style.animation = `twinkle ${duration}s infinite alternate`;
      
      document.getElementById('stars-container').appendChild(star);
    };

    // Create 100 stars
    for (let i = 0; i < 100; i++) {
      createStar();
    }

    return () => {
      document.getElementById('stars-container').innerHTML = '';
    };
  }, []);

  return (
    <div 
      id="stars-container" 
      className="fixed inset-0 overflow-hidden pointer-events-none z-0"
    />
  );
};

export default StarsBackground;