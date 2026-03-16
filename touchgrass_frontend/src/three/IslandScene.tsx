"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function GrassBlades({ count }: { count: number }) {

  const blades = useMemo(() => {

    const arr = [];

    for (let i = 0; i < count; i++) {

      arr.push({
        position: [
          (Math.random() - 0.5) * 3,
          0.35,
          (Math.random() - 0.5) * 3
        ],
        rotation: Math.random() * Math.PI
      });

    }

    return arr;

  }, [count]);

  return (
    <>
      {blades.map((blade, i) => (
        <mesh
          key={i}
          position={blade.position as any}
          rotation={[0, blade.rotation, 0]}
        >
          <coneGeometry args={[0.05, 0.4, 5]} />
          <meshStandardMaterial color="#2ecc71" />
        </mesh>
      ))}
    </>
  );
}

function FloatingIsland({ streak }: { streak: number }) {

  const islandRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (islandRef.current) {
      islandRef.current.rotation.y += 0.002;
    }
  });

  const grassScale = Math.min(1 + streak * 0.15, 3);
  const grassCount = Math.min(streak * 10, 120);

  return (
    <group ref={islandRef}>

      <mesh position={[0, -1, 0]}>
        <cylinderGeometry args={[2, 3, 1.5, 32]} />
        <meshStandardMaterial color="#5b4636" />
      </mesh>

      <mesh scale={[grassScale, 1, grassScale]}>
        <cylinderGeometry args={[2.1, 2.1, 0.5, 32]} />
        <meshStandardMaterial color="#4caf50" />
      </mesh>

      <GrassBlades count={grassCount} />

      {streak > 3 && (
        <mesh position={[0.8, 0.4, 0]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color="pink" />
        </mesh>
      )}

      {streak > 7 && (
        <mesh position={[0, 0.6, 0]}>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshStandardMaterial emissive="yellow" color="yellow" />
        </mesh>
      )}

    </group>
  );
}

export default function IslandScene({ streak }: { streak: number }) {

  return (

    <Canvas camera={{ position: [4, 3, 4] }}>

      <ambientLight intensity={0.7} />

      <directionalLight position={[5, 5, 5]} intensity={1} />

      <FloatingIsland streak={streak} />

      <OrbitControls enableZoom={false} />

    </Canvas>

  );

}