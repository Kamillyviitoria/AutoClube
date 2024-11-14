'use client';

import React, { useState, useRef } from 'react';
import CarModelViewer from '../components/CarModelViewer';
import ColorPicker from '../components/ColorPicker';
import * as THREE from 'three';
import Footer from "@/app/components/Footer/Footer";
import Header from "@/app/components/Header/Header";

const Page = () => {
  const initialColors = {
    body: '#ff0000',
    wheels: '#000000',
    headlights: '#ffffff',
    seats: '#ffffff'
  };

  const [bodyColor, setBodyColor] = useState(initialColors.body);
  const [wheelsColor, setWheelsColor] = useState(initialColors.wheels);
  const [headlightsColor, setHeadlightsColor] = useState(initialColors.headlights);
  const [seatsColor, setSeatsColor] = useState(initialColors.seats);
  const [brightness, setBrightness] = useState(1);
  const [contrast, setContrast] = useState(1);
  const [autoRotate, setAutoRotate] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [modelUrl, setModelUrl] = useState('/models/car.glb');

  // Referência para a câmera
  const cameraRef = useRef();

  // Função para capturar e fazer o download da imagem
  const captureAndDownloadImage = () => {
    const scene = cameraRef.current ? cameraRef.current.parent : null;
    if (!scene) return;

    // Criando um renderer de alta resolução
    const renderer = new THREE.WebGLRenderer();
    const width = window.innerWidth * 2;
    const height = window.innerHeight * 2;

    renderer.setSize(width, height);

    // Corrige a proporção da câmera para manter o aspecto do modelo
    const aspect = width / height;
    cameraRef.current.aspect = aspect;
    cameraRef.current.updateProjectionMatrix();

    // Remover o fundo da cena (se necessário)
    renderer.setClearColor(0x000000, 0); 
    
    // Renderizando a cena com a câmera ajustada
    renderer.render(scene, cameraRef.current);

    const image = renderer.domElement.toDataURL('image/png');

    // Criando um link para download da imagem
    const link = document.createElement('a');
    link.href = image;
    link.download = 'car-image.png';
    link.click();
  };

  // Função para mudar o modelo e resetar as cores
  const changeCarModel = (modelName) => {
    setModelUrl(`/models/${modelName}.glb`);
    setBodyColor(initialColors.body);
    setWheelsColor(initialColors.wheels);
    setHeadlightsColor(initialColors.headlights);
    setSeatsColor(initialColors.seats);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header />

      <main style={{ flex: 1, padding: '20px', textAlign: 'center' }}>
        <h1>Personalize seu Carro</h1>

        {/* Renderiza o modelo GLB */}
        <CarModelViewer
          modelUrl={modelUrl}
          alt="Car"
          bodyColor={bodyColor}
          wheelsColor={wheelsColor}
          headlightsColor={headlightsColor}
          seatsColor={seatsColor}
          scale={zoom}
          brightness={brightness}
          contrast={contrast}
          autoRotate={autoRotate}
          cameraRef={cameraRef}
        />

        {/* Botões para mudar o modelo */}
        <div style={{ marginTop: '20px' }}>
          <button onClick={() => changeCarModel('car')} style={{ padding: '10px 20px', marginRight: '10px' }}>
            Modelo 1
          </button>
          <button onClick={() => changeCarModel('car1')} style={{ padding: '10px 20px', marginRight: '10px' }}>
            Modelo 2
          </button>
          <button onClick={() => changeCarModel('car2')} style={{ padding: '10px 20px', marginRight: '10px' }}>
            Modelo 3
          </button>
          <button onClick={() => changeCarModel('car3')} style={{ padding: '10px 20px' }}>
            Modelo 4
          </button>
        </div>

        {/* Seletor de cores */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', flexWrap: 'wrap' }}>
          <ColorPicker
            label="Carroceria"
            color={bodyColor}
            onChange={(e) => setBodyColor(e.target.value)}
          />
          <ColorPicker
            label="Rodas"
            color={wheelsColor}
            onChange={(e) => setWheelsColor(e.target.value)}
          />
          <ColorPicker
            label="Faróis"
            color={headlightsColor}
            onChange={(e) => setHeadlightsColor(e.target.value)}
          />
          <ColorPicker
            label="Bancos"
            color={seatsColor}
            onChange={(e) => setSeatsColor(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <div style={{ marginRight: '20px' }}>
            <label>Zoom:</label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={zoom}
              onChange={(e) => setZoom(e.target.value)}
            />
          </div>
        </div>

        {/* Botão para capturar a imagem */}
        <button
          onClick={captureAndDownloadImage}
          style={{ marginTop: '20px', padding: '10px 20px' }}
        >
          Baixar Imagem do Carro
        </button>
      </main>

      <Footer />
    </div>
  );
};

export default Page;
