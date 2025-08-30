import React, { useState, useEffect } from "react";

const ImageSlider = ({ images, interval = 5000 }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // Start the automatic slideshow when the component mounts
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    // Clean up the timer when the component unmounts
    return () => clearInterval(timer);
  }, [images, interval]);

  // Handle manual navigation
  const goToNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrevious = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="absolute inset-0 z-10">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
            index === currentImageIndex ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${image})` }}
        ></div>
      ))}

      <div className="absolute inset-0 flex items-center justify-between p-4 z-20">
        <button
          onClick={goToPrevious}
          className="p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75 transition"
        >
          &lt;
        </button>
        <button
          onClick={goToNext}
          className="p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75 transition"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default ImageSlider;
