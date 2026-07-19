import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, MeshDistortMaterial, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

function HeroShape({ settings }) {
  const mesh = useRef();
  useFrame((state, delta) => {
    if (!mesh.current) return;
    mesh.current.rotation.x += delta * settings.rotationSpeed * 0.3;
    mesh.current.rotation.y += delta * settings.rotationSpeed * 0.5;
    // subtle mouse parallax
    const { x, y } = state.pointer;
    mesh.current.position.x = THREE.MathUtils.lerp(mesh.current.position.x, x * 0.6, 0.04);
    mesh.current.position.y = THREE.MathUtils.lerp(mesh.current.position.y, y * 0.4, 0.04);
  });

  const geometry = useMemo(() => {
    switch (settings.heroShape) {
      case 'sphere': return <sphereGeometry args={[1.6, 64, 64]} />;
      case 'icosahedron': return <icosahedronGeometry args={[1.8, 1]} />;
      case 'octahedron': return <octahedronGeometry args={[1.9, 0]} />;
      case 'box': return <boxGeometry args={[2.2, 2.2, 2.2]} />;
      default: return <torusKnotGeometry args={[1.2, 0.38, 220, 32]} />;
    }
  }, [settings.heroShape]);

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={settings.floatIntensity}>
      <mesh ref={mesh}>
        {geometry}
        <MeshDistortMaterial
          color={settings.heroColor}
          metalness={0.9}
          roughness={0.15}
          distort={0.25}
          speed={2}
          wireframe={settings.wireframe}
        />
      </mesh>
    </Float>
  );
}

function Particles({ count, color }) {
  const points = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) arr[i] = (Math.random() - 0.5) * 22;
    return arr;
  }, [count]);

  useFrame((state, delta) => {
    if (points.current) points.current.rotation.y += delta * 0.02;
  });

  if (count === 0) return null;
  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color={color} transparent opacity={0.7} sizeAttenuation />
    </points>
  );
}

export default function Scene3D({ settings }) {
  const { scene } = settings.gltfModel ? useGLTF(settings.gltfModel) : { scene: null };

  return (
    <div className="hero-canvas">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1.4} color={settings.accentColor} />
        <pointLight position={[-5, -3, 2]} intensity={1.2} color={settings.heroColor} />
        {settings.showGltfModel && settings.gltfModel && scene ? (
          <primitive object={scene} rotation={[0, Math.PI / 2, 0]} scale={[2, 2, 2]} />
        ) : (
          <>
            <HeroShape settings={settings} />
            <Particles count={settings.particleCount} color={settings.particleColor} />
            {settings.showStars && <Stars radius={60} depth={40} count={2500} factor={4} fade speed={1} />}
          </>
        )}
      </Canvas>
    </div>
  );
}