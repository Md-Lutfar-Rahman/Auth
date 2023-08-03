import { useState, useEffect } from 'react';

const PixelGrid = () => {
  const [pixels, setPixels] = useState(2000);

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const windowHeight = window.innerHeight;

    // Check if user has scrolled to the bottom of the page
    if (scrollTop + windowHeight >= scrollHeight) {
      // Load the next set of 500 pixels, capped at 100000
      setPixels((prevPixels) => Math.min(prevPixels + 500, 100000));
    }
  };

  useEffect(() => {
    // Add scroll event listener when the component mounts
    window.addEventListener('scroll', handleScroll);

    // Remove the scroll event listener when the component unmounts
    return () => window.removeEventListener('scroll', handleScroll);
  }, []); // The empty dependency array ensures the effect runs only once on mount

  const renderPixels = () => {
    const renderedPixels = [];
    for (let i = 0; i < pixels; i++) {
      renderedPixels.push(<div key={i} className="w-6 h-6 bg-black m-1"></div>);
    }
    return renderedPixels;
  };

  return (
    <div className="w-full">
      <div className="flex flex-wrap justify-center">
        {renderPixels()}
      </div>
    </div>
  );
};

export default PixelGrid;
