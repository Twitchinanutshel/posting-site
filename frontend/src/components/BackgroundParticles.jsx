import Particles from "react-tsparticles";

function BackgroundParticles() {
  return (
    <Particles
      options={{
        particles: {
          number: { value: 30 },
          shape: {
            type: "heart"
          },
          size: { value: 10 },
          move: {
            direction: "top",
            speed: 2,
            outMode: "out"
          },
          opacity: { value: 0.7 }
        }
      }}
    />
  );
}

export default BackgroundParticles;
