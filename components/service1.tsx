"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import { motion, useInView } from "framer-motion";
import { useState, Suspense, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import * as THREE from "three";

const services = [
  {
    title: "Strategic Planning",
    description:
      "Comprehensive business strategy development and implementation roadmaps for sustainable growth.",
    shape: "target",
    color: "#3B82F6", // Blue
  },
  {
    title: "Process Optimization",
    description:
      "Streamline operations and boost efficiency with our proven process improvement methodologies.",
    shape: "gear",
    color: "#10B981", // Green
  },
  {
    title: "Growth Analytics",
    description:
      "Data-driven insights and performance metrics to accelerate your business growth trajectory.",
    shape: "chart",
    color: "#F59E0B", // Orange
  },
];

// Colored material configuration
const createColoredMaterial = (color: string) =>
  new THREE.MeshStandardMaterial({
    color: new THREE.Color(color),
    metalness: 0.8,
    roughness: 0.2,
    envMapIntensity: 1.5,
  });

function ColoredTarget({
  isVisible,
  isHovered,
  color,
}: {
  isVisible: boolean;
  isHovered: boolean;
  color: string;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);

  const material = createColoredMaterial(color);

  useFrame((state) => {
    if (groupRef.current && isVisible) {
      groupRef.current.rotation.z = state.clock.elapsedTime * 0.5;
      groupRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }

    if (ring1Ref.current && isVisible) {
      ring1Ref.current.rotation.z = state.clock.elapsedTime * 0.8;
    }

    if (ring2Ref.current && isVisible) {
      ring2Ref.current.rotation.z = -state.clock.elapsedTime * 0.6;
    }

    if (ring3Ref.current && isVisible) {
      ring3Ref.current.rotation.z = state.clock.elapsedTime * 1.2;
    }
  });

  return (
    <Float
      speed={isHovered ? 1.5 : 1}
      rotationIntensity={0.2}
      floatIntensity={0.3}
    >
      <group ref={groupRef} scale={isVisible ? 1.2 : 0}>
        <mesh ref={ring1Ref}>
          <torusGeometry args={[1.2, 0.15, 8, 32]} />
          <primitive object={material} />
        </mesh>
        <mesh ref={ring2Ref}>
          <torusGeometry args={[0.8, 0.12, 8, 32]} />
          <primitive object={material} />
        </mesh>
        <mesh ref={ring3Ref}>
          <torusGeometry args={[0.4, 0.1, 8, 32]} />
          <primitive object={material} />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.15, 16, 16]} />
          <primitive object={material} />
        </mesh>
        <mesh position={[0, 1.4, 0]} rotation={[0, 0, Math.PI]}>
          <coneGeometry args={[0.1, 0.3, 8]} />
          <primitive object={material} />
        </mesh>
      </group>
    </Float>
  );
}

function ColoredGear({
  isVisible,
  isHovered,
  color,
}: {
  isVisible: boolean;
  isHovered: boolean;
  color: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const material = createColoredMaterial(color);

  useFrame((state) => {
    if (meshRef.current && isVisible) {
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  const gearShape = new THREE.Shape();
  const outerRadius = 1.2;
  const innerRadius = 0.4;
  const teeth = 12;

  for (let i = 0; i < teeth * 2; i++) {
    const angle = (i / (teeth * 2)) * Math.PI * 2;
    const radius = i % 2 === 0 ? outerRadius : outerRadius * 0.8;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;

    if (i === 0) {
      gearShape.moveTo(x, y);
    } else {
      gearShape.lineTo(x, y);
    }
  }

  const innerHole = new THREE.Path();
  innerHole.absarc(0, 0, innerRadius, 0, Math.PI * 2, false);
  gearShape.holes.push(innerHole);

  return (
    <Float
      speed={isHovered ? 1.5 : 1}
      rotationIntensity={0.2}
      floatIntensity={0.3}
    >
      <mesh ref={meshRef} scale={isVisible ? 1.2 : 0}>
        <extrudeGeometry
          args={[
            gearShape,
            {
              depth: 0.3,
              bevelEnabled: true,
              bevelSize: 0.05,
              bevelThickness: 0.05,
            },
          ]}
        />
        <primitive object={material} />
      </mesh>
    </Float>
  );
}

function ColoredChart({
  isVisible,
  isHovered,
  color,
}: {
  isVisible: boolean;
  isHovered: boolean;
  color: string;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const material = createColoredMaterial(color);

  useFrame((state) => {
    if (groupRef.current && isVisible) {
      groupRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.4) * 0.2;
      groupRef.current.rotation.x =
        Math.cos(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <Float
      speed={isHovered ? 1.5 : 1}
      rotationIntensity={0.2}
      floatIntensity={0.3}
    >
      <group ref={groupRef} scale={isVisible ? 1.2 : 0}>
        <mesh position={[-0.6, -0.2, 0]}>
          <boxGeometry args={[0.3, 0.8, 0.3]} />
          <primitive object={material} />
        </mesh>
        <mesh position={[0, 0.1, 0]}>
          <boxGeometry args={[0.3, 1.4, 0.3]} />
          <primitive object={material} />
        </mesh>
        <mesh position={[0.6, 0.4, 0]}>
          <boxGeometry args={[0.3, 2, 0.3]} />
          <primitive object={material} />
        </mesh>
        <mesh position={[0, -0.8, 0]}>
          <boxGeometry args={[2, 0.1, 0.3]} />
          <primitive object={material} />
        </mesh>
        <mesh position={[0.8, 0.8, 0]} rotation={[0, 0, Math.PI / 4]}>
          <coneGeometry args={[0.2, 0.6, 3]} />
          <primitive object={material} />
        </mesh>
      </group>
    </Float>
  );
}

// Scene component
function Scene({
  shape,
  color,
  isVisible,
  isHovered,
}: {
  shape: string;
  color: string;
  isVisible: boolean;
  isHovered: boolean;
}) {
  return (
    <Suspense fallback={null}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <directionalLight position={[-5, -5, -5]} intensity={0.3} />
      <pointLight position={[0, 0, 3]} intensity={0.5} color={color} />

      {shape === "target" && (
        <ColoredTarget
          isVisible={isVisible}
          isHovered={isHovered}
          color={color}
        />
      )}
      {shape === "gear" && (
        <ColoredGear
          isVisible={isVisible}
          isHovered={isHovered}
          color={color}
        />
      )}
      {shape === "chart" && (
        <ColoredChart
          isVisible={isVisible}
          isHovered={isHovered}
          color={color}
        />
      )}

      <Environment preset="studio" />
    </Suspense>
  );
}

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{
        duration: 0.8,
        delay: index * 0.2,
        type: "spring",
        stiffness: 100,
      }}
      whileHover={{ y: -10, scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group cursor-pointer w-full max-w-md mx-auto"
    >
      <Card className="h-[500px] w-full overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-500 bg-white/90 backdrop-blur-sm">
        {/* 3D Canvas Section - Made bigger */}
        <div className="relative h-80 overflow-hidden bg-gradient-to-br from-gray-50 to-white">
          <Canvas
            camera={{ position: [0, 0, 6], fov: 45 }}
            dpr={[1, 2]}
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: "high-performance",
            }}
          >
            <Scene
              shape={service.shape}
              color={service.color}
              isVisible={isInView}
              isHovered={isHovered}
            />
          </Canvas>

          {/* Colored glow effect */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(to top, ${service.color}10, transparent)`,
            }}
            animate={
              isInView
                ? {
                    opacity: [0.3, 0.6, 0.3],
                  }
                : { opacity: 0 }
            }
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Content Section */}
        <CardContent className="p-8 h-32 flex flex-col justify-center text-center">
          <motion.h3
            className="text-2xl font-semibold mb-4 text-gray-800"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: index * 0.2 + 0.3 }}
          >
            {service.title}
          </motion.h3>

          <motion.p
            className="text-gray-600 leading-relaxed text-base"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: index * 0.2 + 0.5 }}
          >
            {service.description}
          </motion.p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function Service1() {
  const titleRef = useRef(null);
  const isTitleInView = useInView(titleRef, { once: true });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <motion.div
          ref={titleRef}
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={
            isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }
          }
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-light text-gray-800 mb-4">
            Our Consulting Services
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Transform your business with our expert consulting solutions
            designed to drive growth and innovation
          </p>
        </motion.div>

        {/* Cards Grid - Updated for bigger cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
