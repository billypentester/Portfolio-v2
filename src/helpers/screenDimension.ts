import { useState, useEffect } from 'react';

const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    // Only run this code on the client-side
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setWindowDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      // Set initial dimensions
      handleResize();

      // Add event listener for window resize
      window.addEventListener('resize', handleResize);

      // Clean up the event listener on component unmount
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []); // Empty dependency array ensures this runs once on mount

  return windowDimensions;
};

export default useWindowDimensions;