import React, { useState } from "react";
import { CarouselItem } from "./CarouselItem";

export const Carousel = () => {

  const [activeIndex, setActiveIndex] = useState(0);
  const items = [
    {
      icon: require("../images/carousal1.png"),
    },
    {
      icon: require("../images/carousal2.png"),
    },
    {
      icon: require("../images/carousal3.png"),
    },
  ];

  const updateIndex = (newIndex) => {
    if (newIndex < 0) {
      newIndex = 0;
    } else if (newIndex >= items.length) {
      newIndex = items.length - 1;
    }
    setActiveIndex(newIndex);
  };
  return (
    <div className="carousel">
      <div
        id="inner"
        style={{ transform: `translate(-${activeIndex * 100}%)`
     }}
      >
        {items?.map((item) => {
          return <CarouselItem item={item} width={"100%"} />;
        })}
      </div>
      
      <div className="carousel-buttons">
        <button
          className="button-arrow"
          onClick={() => {
            updateIndex(activeIndex - 1);
          }}
        >
          <span className="material-symbols-outlined">backward</span>{" "}
        </button>
        <div className="indicators">
          {items?.map((item, index) => {
            return (
              <button
                className="indicator-buttons"
                onClick={() => {
                  updateIndex(index);
                }}
              >
                <span
                  className={`material-symbols-outlined ${
                    index === activeIndex
                      ? "indicator-symbol-active"
                      : "indicator-symbol"
                  }`}
                >
                  .
                </span>
              </button>
            );
          })}
        </div>
        <button
          className="button-arrow"
          onClick={() => {
            updateIndex(activeIndex + 1);
          }}
        >
          <span className="material-symbols-outlined">forward</span>
        </button>
      </div>
    </div>
  );
};