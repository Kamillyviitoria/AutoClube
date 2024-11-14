import React, { useEffect, useRef, useState } from 'react';
import { useGLTF, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';


const CarModelViewer = ({
  modelUrl,
  bodyColor,
  wheelsColor,
  headlightsColor,
  seatsColor,
  scale = 1,
  glassOpacity = 0.2,
  brightness = 1,
  contrast = 1,
  autoRotate = false,
  cameraRef
}) => {
  const { scene } = useGLTF(modelUrl);
  const [loading, setLoading] = useState(true);
  const carRef = useRef();

  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;

          // Aplicar cores e configurações de acordo com cada modelo
          switch (modelUrl) {
            case '/models/car.glb':
              if (child.material.name === 'CAR_BODY_PAINT' || child.material.name === 'BODY_NUMBER_PAINT') {
                child.material.color.set(bodyColor);
              }
              if (child.material.name === 'TARMAC_WHEEL') {
                child.material.color.set(wheelsColor);
              }
              if (['LIGHTS_GLASS', 'LIGHTS_POD', 'LIGHTS_SATIN'].includes(child.material.name)) {
                child.material.color.set(headlightsColor);
              }
              if (child.material.name === 'CABIN') {
                child.material.color.set(seatsColor);
              }
              break;

            case '/models/car1.glb':
              if (child.material.name === 'CARBON_FIBER') {
                child.material.color.set(bodyColor);
              }
              if (child.material.name === 'TARMAC_WHEEL') {
                child.material.color.set(wheelsColor);
              }
              if (child.material.name === 'LIGHTS_GLASS') {
                child.material.color.set(headlightsColor);
              }
              if (child.material.name === 'CABIN') {
                child.material.color.set(seatsColor);
              }
              break;

            case '/models/car2.glb':
              if (['CARBON_FIBER', 'BODY_NUMBER_CARBON'].includes(child.material.name)) {
                child.material.color.set(bodyColor);
              }
              if (child.material.name === 'TARMAC_WHEEL') {
                child.material.color.set(wheelsColor);
              }
              if (['LIGHTS_GLASS', 'LIGHTS_POD'].includes(child.material.name)) {
                child.material.color.set(headlightsColor);
              }
              if (child.material.name === 'CABIN') {
                child.material.color.set(seatsColor);
              }
              break;

            case '/models/car3.glb': 
              if (child.material.name === 'CARBON_FIBER') {
                child.material.color.set(bodyColor);
              }
              if (child.material.name === 'TARMAC_WHEEL') {
                child.material.color.set(wheelsColor);
              }
              if (child.material.name === 'LIGHTS_GLASS') {
                child.material.color.set(headlightsColor);
              }
              if (child.material.name === 'CABIN') {
                child.material.color.set(seatsColor);
              }
              break;

            default:
              break;
          }
        }
      });
      setLoading(false);
    }
  }, [scene, modelUrl, bodyColor, wheelsColor, headlightsColor, seatsColor, glassOpacity]);

  return (
    <div style={{ width: '60vw', height: '60vh', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      {loading && (
        <div className="progress-bar" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '5px', background: '#ccc' }}>
          <div className="update-bar" style={{ height: '100%', width: '100%', background: '#ffffff' }}></div>
        </div>
      )}
      <Canvas
        shadows
        style={{ width: '100%', height: '100%' }}
        onCreated={({ scene, gl, camera }) => {
          gl.toneMappingExposure = brightness;
          cameraRef.current = camera;
        }}
      >
        <PerspectiveCamera makeDefault position={[0, 1.2, 2.5]} fov={50} near={0.1} far={100} />

        <ambientLight intensity={0.8 * contrast} />
        <directionalLight
          position={[0, 10, 5]}
          intensity={2}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-radius={30}
          shadow-bias={-0.002}
          penumbra={1}
        />
        <directionalLight 
          position={[0, 10, -5]}
          intensity={1.5}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-radius={30}
          penumbra={1}
        />
        <pointLight position={[3, 2, -1]} intensity={1.5} decay={2} />
        <pointLight position={[-3, 2, -1]} intensity={1.5} decay={2} />
        <spotLight position={[0, -1, 3]} intensity={0.8} angle={Math.PI / 4} penumbra={0.3} />

        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.4, 0]} receiveShadow>
          <planeGeometry args={[10, 10]} />
          <shadowMaterial opacity={0.5} />
        </mesh>

        <primitive ref={carRef} object={scene} scale={scale} position={[0, 0, 0]} />
        <OrbitControls autoRotate={autoRotate} />
      </Canvas>
    </div>
  );
};

export default CarModelViewer;
