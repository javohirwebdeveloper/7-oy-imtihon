import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const Carousel = ({ products }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchPosition, setTouchPosition] = useState(null);
  const carouselRef = useRef();

  const visibleCards = 5;

  useEffect(() => {
    const preventTouch = (e) => {
      const touch = e.touches[0];
      if (touchPosition !== null) {
        const diff = touchPosition - touch.clientX;
        if (diff > 5) {
          goToNext();
        } else if (diff < -5) {
          goToPrevious();
        }
      }
    };

    const touchWrapper = carouselRef.current;
    touchWrapper.addEventListener("touchmove", preventTouch);
    return () => {
      if (touchWrapper) {
        touchWrapper.removeEventListener("touchmove", preventTouch);
      }
    };
  }, [touchPosition]);

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    setTouchPosition(touch.clientX);
  };

  const handleTouchMove = (e) => {
    const touch = e.touches[0];
    if (touchPosition !== null) {
      setTouchPosition(touch.clientX);
    }
  };

  const handleTouchEnd = () => {
    setTouchPosition(null);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - visibleCards : products.length - visibleCards
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < products.length - visibleCards ? prevIndex + visibleCards : 0
    );
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        ref={carouselRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="flex gap-4 overflow-hidden"
      >
        {products
          .slice(currentIndex, currentIndex + visibleCards)
          .map((product, index) => (
            <Link
              key={index}
              to={`/product/${product.id}`}
              className="flex flex-col  justify-center w-1/5"
            >
              <img src={product.image} alt={product.title} className="w-full" />
              <h3 className="text-lg font-semibold">{product.title}</h3>
              <p className="text-green-600 font-bold">${product.price}</p>
            </Link>
          ))}
      </div>
      <div className="flex mt-4 space-x-2">
        {Array.from(
          { length: Math.ceil(products.length / visibleCards) },
          (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index * visibleCards)}
              className={`h-2 w-2 rounded-full ${
                currentIndex >= index * visibleCards &&
                currentIndex < (index + 1) * visibleCards
                  ? "bg-green-600"
                  : "bg-gray-300"
              }`}
            />
          )
        )}
      </div>
    </div>
  );
};

export default Carousel;
