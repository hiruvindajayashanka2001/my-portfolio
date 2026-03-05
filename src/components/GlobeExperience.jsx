import { useRef, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Lat/lng to 3D sphere point
const latLngToVec3 = (lat, lng, radius) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
};

// Major cities / points of interest
const POINTS = [
  { lat: 7.8731,   lng: 80.7718  }, // Sri Lanka 🇱🇰
  { lat: 51.5074,  lng: -0.1278  }, // London
  { lat: 40.7128,  lng: -74.006  }, // New York
  { lat: 35.6762,  lng: 139.6503 }, // Tokyo
  { lat: 48.8566,  lng: 2.3522   }, // Paris
  { lat: -33.8688, lng: 151.2093 }, // Sydney
  { lat: 37.7749,  lng: -122.419 }, // San Francisco
  { lat: 55.7558,  lng: 37.6173  }, // Moscow
  { lat: 1.3521,   lng: 103.8198 }, // Singapore
  { lat: 28.6139,  lng: 77.209   }, // New Delhi
  { lat: 39.9042,  lng: 116.4074 }, // Beijing
  { lat: -23.5505, lng: -46.6333 }, // São Paulo
  { lat: 19.4326,  lng: -99.1332 }, // Mexico City
  { lat: 6.5244,   lng: 3.3792   }, // Lagos
  { lat: 52.52,    lng: 13.405   }, // Berlin
];

// Arc connections from Sri Lanka to other cities
const ARCS = [
  [0, 1], [0, 2], [0, 3], [0, 8], [0, 9],
  [1, 6], [3, 10], [8, 10], [4, 15 - 9],
];

const GlobeDots = ({ radius }) => {
  const points = useMemo(() => {
    return POINTS.map((p) => latLngToVec3(p.lat, p.lng, radius));
  }, [radius]);

  return (
    <>
      {points.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[i === 0 ? 0.028 : 0.018, 8, 8]} />
          <meshStandardMaterial
            color={i === 0 ? "#e879f9" : "#a855f7"}
            emissive={i === 0 ? "#e879f9" : "#7c3aed"}
            emissiveIntensity={i === 0 ? 3 : 1.5}
            roughness={0}
            metalness={0.2}
          />
        </mesh>
      ))}
    </>
  );
};

const GlobeArcs = ({ radius }) => {
  const arcs = useMemo(() => {
    return ARCS.map(([fromIdx, toIdx]) => {
      if (!POINTS[fromIdx] || !POINTS[toIdx]) return null;
      const from = latLngToVec3(POINTS[fromIdx].lat, POINTS[fromIdx].lng, radius);
      const to = latLngToVec3(POINTS[toIdx].lat, POINTS[toIdx].lng, radius);
      const mid = from.clone().add(to).multiplyScalar(0.5).normalize().multiplyScalar(radius * 1.35);

      const curve = new THREE.QuadraticBezierCurve3(from, mid, to);
      const points = curve.getPoints(60);
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      return geometry;
    }).filter(Boolean);
  }, [radius]);

  return (
    <>
      {arcs.map((geo, i) => (
        <line key={i} geometry={geo}>
          <lineBasicMaterial
            color="#a855f7"
            transparent
            opacity={0.35}
            linewidth={1}
          />
        </line>
      ))}
    </>
  );
};

const PulsingRing = ({ radius }) => {
  const ringRef = useRef();
  const sriLankaPos = latLngToVec3(7.8731, 80.7718, radius);

  useFrame(({ clock }) => {
    if (ringRef.current) {
      const scale = 1 + Math.sin(clock.getElapsedTime() * 2) * 0.4;
      ringRef.current.scale.setScalar(scale);
      ringRef.current.material.opacity = 0.6 - Math.sin(clock.getElapsedTime() * 2) * 0.4;
    }
  });

  return (
    <mesh ref={ringRef} position={sriLankaPos}>
      <ringGeometry args={[0.04, 0.06, 32]} />
      <meshBasicMaterial color="#e879f9" transparent opacity={0.6} side={THREE.DoubleSide} />
    </mesh>
  );
};

const Globe = () => {
  const globeRef = useRef();
  const glowRef = useRef();
  const RADIUS = 1.8;

  // Sphere dot texture
  const dotTexture = useMemo(() => {
    const size = 512;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, size, size);

    const dotSize = 2.5;
    const gap = 14;
    const rows = Math.floor(size / gap);

    for (let row = 0; row < rows; row++) {
      const lat = (row / rows) * Math.PI;
      const circumference = Math.sin(lat);
      const cols = Math.max(1, Math.floor(rows * circumference));

      for (let col = 0; col < cols; col++) {
        const x = (col / cols) * size;
        const y = (row / rows) * size;

        ctx.beginPath();
        ctx.arc(x, y, dotSize, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(168, 85, 247, 0.55)";
        ctx.fill();
      }
    }

    return new THREE.CanvasTexture(canvas);
  }, []);

  useFrame((_, delta) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += delta * 0.12;
    }
  });

  return (
    <group ref={globeRef}>
      {/* Core sphere with dot texture */}
      <mesh>
        <sphereGeometry args={[RADIUS, 64, 64]} />
        <meshStandardMaterial
          map={dotTexture}
          transparent
          opacity={0.95}
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>

      {/* Inner glow sphere */}
      <mesh>
        <sphereGeometry args={[RADIUS * 0.98, 32, 32]} />
        <meshStandardMaterial
          color="#1e0533"
          transparent
          opacity={0.6}
          roughness={1}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Outer atmosphere glow */}
      <mesh>
        <sphereGeometry args={[RADIUS * 1.08, 32, 32]} />
        <meshStandardMaterial
          color="#7c3aed"
          transparent
          opacity={0.06}
          side={THREE.BackSide}
          roughness={1}
        />
      </mesh>

      <GlobeDots radius={RADIUS * 1.01} />
      <GlobeArcs radius={RADIUS * 1.01} />
      <PulsingRing radius={RADIUS * 1.01} />
    </group>
  );
};

export default Globe;