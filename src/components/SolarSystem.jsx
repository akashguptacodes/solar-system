import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars, PerspectiveCamera } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import Planet from "./Planet";

const planets = [
  { name: "Mercury", color: "#c0c0c0", distance: 4, size: 0.3 },
  { name: "Venus", color: "#e0b084", distance: 6, size: 0.6 },
  { name: "Earth", color: "#3f8efc", distance: 8, size: 0.65 },
  { name: "Mars", color: "#ff4500", distance: 10, size: 0.5 },
  { name: "Jupiter", color: "#ffb347", distance: 13, size: 1.1 },
  { name: "Saturn", color: "#fceea7", distance: 16, size: 1.0 },
  { name: "Uranus", color: "#7df9ff", distance: 19, size: 0.9 },
  { name: "Neptune", color: "#4169e1", distance: 22, size: 0.9 },
];

const SolarSystem = ({ speeds, isPaused }) => {
  return (
    <Canvas
      shadows
      gl={{ antialias: true, physicallyCorrectLights: true }}
      style={{ background: "black" }}
    >
      <PerspectiveCamera makeDefault position={[0, 20, 40]} fov={65} />
      <OrbitControls enablePan={false} enableZoom={true} />

      <Stars radius={100} depth={50} count={10000} factor={4} saturation={0} fade />

      <ambientLight intensity={0.4} />
      <pointLight position={[0, 0, 0]} intensity={3} distance={100} decay={2} color={"orange"} />
      <pointLight position={[0, 0, 0]} intensity={1} distance={50} color={"white"} />

      {/* Sun */}
      <mesh>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial
          color={"#fdb813"}
          emissive={"#fdb813"}
          emissiveIntensity={4}
          metalness={0.1}
          roughness={0.3}
          toneMapped={false}
        />
      </mesh>

      {/* Planets */}
      {planets.map((p) => (
        <Planet key={p.name} {...p} speed={speeds[p.name]} isPaused={isPaused} />
      ))}

      <EffectComposer>
        <Bloom intensity={1.5} radius={0.9} luminanceThreshold={0.2} luminanceSmoothing={0.025} />
      </EffectComposer>
    </Canvas>
  );
};

export default SolarSystem;