import  { useEffect, useState } from "react";

const Pixel = () => {
  const [pixels, setPixels] = useState(500);

  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    const windowHeight = window.innerHeight;

    if (scrollTop + windowHeight >= scrollHeight) {
      setPixels((prevPixels) => Math.min(prevPixels + 500, 100000)); // Load the next set of 500 pixels
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []); // Add scroll event listener on component mount

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

export default Pixel;
