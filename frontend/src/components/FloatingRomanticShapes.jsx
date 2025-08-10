import React from "react";

const NUM_SHAPES = 40;
const shapes = ["heart", "star", "sparkle"];

const FloatingRomanticShapes = () => {
  const elements = [];

  for (let i = 0; i < NUM_SHAPES; i++) {
    const shapeType = shapes[Math.floor(Math.random() * shapes.length)];
    const style = {
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDuration: `${5 + Math.random() * 7}s`,
      animationDelay: `${Math.random() * 5}s`,
      fontSize: `${10 + Math.random() * 20}px`,
      opacity: 0.5 + Math.random() * 0.5,
      zIndex: 0,
    };

    let element;

    if (shapeType === "star") {
      // Using Unicode star ★
      element = (
        <div
          key={i}
          className={`floating-shape star`}
          style={{ ...style, position: "absolute" }}
        >
          ★
        </div>
      );
    } else {
      // For heart and sparkle, use div shapes
      element = (
        <div
          key={i}
          className={`floating-shape ${shapeType}`}
          style={{ ...style, position: "absolute", animationName: "floatUp" }}
        />
      );
    }

    elements.push(element);
  }

  return <div className="floating-bg">{elements}</div>;
};

export default FloatingRomanticShapes;
