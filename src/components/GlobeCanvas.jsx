import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { Suspense } from "react";
import Globe from "./GlobeExperience";

const GlobeCanvas = () => {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.3} />
          <directionalLight position={[5, 3, 5]} intensity={1.2} color="#ffffff" />
          <pointLight position={[-5, -3, -5]} intensity={0.5} color="#7c3aed" />
          <pointLight position={[0, 5, 0]} intensity={0.3} color="#a855f7" />

          {/* Stars background */}
          <Stars
            radius={100}
            depth={50}
            count={3000}
            factor={3}
            saturation={0}
            fade
            speed={0.5}
          />

          <Globe />

          {/* Allow gentle drag rotation */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate={false}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 1.5}
            rotateSpeed={0.4}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default GlobeCanvas;