import React from "react";
import Particles from "react-tsparticles";

const BackgroundParticles = () => {
  return (
    <Particles
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
      }}
      options={{
        fpsLimit: 60,
        interactivity: {
          detectsOn: "canvas",
          events: {
            onHover: {
              enable: true,
              mode: "repulse",
            },
            resize: true,
          },
          modes: {
            repulse: {
              distance: 100,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: "#ff66cc",
          },
          move: {
            direction: "none",
            enable: true,
            outMode: "bounce",
            random: true,
            speed: 1,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 30,
          },
          opacity: {
            value: 0.7,
          },
          shape: {
            type: "char",
            character: {
              value: ["❤", "💕", "❣️", "💖"],
              font: "Arial",
              style: "",
              weight: "400",
              fill: true,
            },
          },
          size: {
            value: 20,
            random: { enable: true, minimumValue: 10 },
          },
        },
        detectRetina: true,
      }}
    />
  );
};

export default BackgroundParticles;
