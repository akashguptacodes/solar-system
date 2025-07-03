import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";

const Planet = ({ name, color, distance, size, speed, isPaused }) => {
  const ref = useRef();
  const angleRef = useRef(Math.random() * Math.PI * 2);
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (!isPaused) {
      angleRef.current += speed;
    }
    const angle = angleRef.current;
    ref.current.position.x = Math.cos(angle) * distance;
    ref.current.position.z = Math.sin(angle) * distance;
  });

  return (
    <mesh
      ref={ref}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.6}
        roughness={0.3}
        metalness={0.1}
      />
      {hovered && (
        <Html center>
          <div
            style={{
              background: "rgba(0,0,0,0.6)",
              color: "white",
              padding: "2px 6px",
              borderRadius: "4px",
              fontSize: "12px"
            }}
          >
            {name}
          </div>
        </Html>
      )}
    </mesh>
  );
};

export default Planet;
