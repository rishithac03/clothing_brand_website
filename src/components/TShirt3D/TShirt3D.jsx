import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import './TShirt3D.css';

/**
 * Real 3D T-Shirt Component with Spotlight and Smooth 360° Drag
 * 
 * Features:
 * - Studio Spotlight shining down on the streetwear t-shirt
 * - Continuous slow, steady 360° rotation animation without wobbling
 * - Smooth interactive drag to inspect from any angle
 * - Minimalist "drag to view 360°" indicator line
 * - Zero clutter: no front/back buttons
 */
const TShirt3D = ({
  modelPath = '/models/maaya_red_tshirt_front_back.glb',
  autoRotateSpeed = 1.4,
  onModelBounds,
}) => {
  const mountRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 520;
    let height = container.clientHeight || 560;
    let loadedModel = null;

    // 1. Scene setup
    const scene = new THREE.Scene();

    // 2. Camera setup - positioned for clean frontal view
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0.05, 4.2);

    // 3. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // 4. OrbitControls - Handles 360 drag + auto-rotation smoothly
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, -0.12, 0);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false; // Keep hero scale steady
    controls.enablePan = false;
    controls.minPolarAngle = Math.PI / 2.8; // Restrict vertical flip
    controls.maxPolarAngle = Math.PI / 1.75;
    controls.rotateSpeed = 0.8;
    controls.autoRotate = true; // Smooth built-in 360 auto rotation
    controls.autoRotateSpeed = autoRotateSpeed;

    // 5. Studio Lighting - Realistic Warm Studio Spotlight System
    // Soft ambient light for natural base illumination
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.15);
    scene.add(ambientLight);

    // Warm overhead spotlight (authentic 3000K warm showroom light)
    const spotLight = new THREE.SpotLight(0xffeedb, 3.6);
    spotLight.position.set(0, 5.0, 1.8);
    spotLight.angle = Math.PI / 4.0;
    spotLight.penumbra = 0.85;
    spotLight.decay = 1.3;
    spotLight.distance = 15;
    scene.add(spotLight);

    // Front directional key light with gentle warm tint
    const keyLight = new THREE.DirectionalLight(0xfff8f0, 1.5);
    keyLight.position.set(2, 2.5, 3.5);
    scene.add(keyLight);

    // Back fill to ensure the back print is illuminated cleanly
    const backFill = new THREE.DirectionalLight(0xfff6ed, 1.35);
    backFill.position.set(0, 1.8, -3.5);
    scene.add(backFill);

    // Subtle crimson rim light accentuating streetwear silhouette
    const rimLight = new THREE.DirectionalLight(0xab1f26, 0.75);
    rimLight.position.set(-2.5, 2.0, -2);
    scene.add(rimLight);

    // 6. T-Shirt Model Group (Pivot at center, offset lower so spotlight is visible)
    const tshirtGroup = new THREE.Group();
    tshirtGroup.position.set(0, -0.28, 0);
    scene.add(tshirtGroup);
    spotLight.target = tshirtGroup;

    const reportModelBounds = () => {
      if (!loadedModel) return;

      scene.updateMatrixWorld(true);
      camera.updateMatrixWorld();

      const modelBounds = new THREE.Box3().setFromObject(loadedModel);
      const projectedBounds = {
        left: width,
        top: height,
        right: 0,
        bottom: 0,
      };

      for (const x of [modelBounds.min.x, modelBounds.max.x]) {
        for (const y of [modelBounds.min.y, modelBounds.max.y]) {
          for (const z of [modelBounds.min.z, modelBounds.max.z]) {
            const projectedPoint = new THREE.Vector3(x, y, z).project(camera);
            const screenX = ((projectedPoint.x + 1) / 2) * width;
            const screenY = ((1 - projectedPoint.y) / 2) * height;
            projectedBounds.left = Math.min(projectedBounds.left, screenX);
            projectedBounds.top = Math.min(projectedBounds.top, screenY);
            projectedBounds.right = Math.max(projectedBounds.right, screenX);
            projectedBounds.bottom = Math.max(projectedBounds.bottom, screenY);
          }
        }
      }

      onModelBounds?.({
        left: projectedBounds.left,
        top: projectedBounds.top,
        width: projectedBounds.right - projectedBounds.left,
        height: projectedBounds.bottom - projectedBounds.top,
      });
    };

    // 7. Load GLB Model via GLTFLoader
    const loader = new GLTFLoader();
    loader.load(
      modelPath,
      (gltf) => {
        const model = gltf.scene;

        // Auto-center the real model perfectly so it pivots cleanly without wobble
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        model.position.x -= center.x;
        model.position.y -= center.y;
        model.position.z -= center.z;

        // Scale proportionally to fit 3D viewport (sleek & fits comfortably inside spotlight)
        const maxDim = Math.max(size.x, size.y, size.z);
        const targetSize = 1.75;
        const scale = targetSize / maxDim;
        model.scale.setScalar(scale);

        // Ensure materials display with optimal texture fidelity & double sided
        model.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            if (child.material) {
              child.material.side = THREE.DoubleSide;
              if (child.material.map) {
                child.material.map.anisotropy = renderer.capabilities.getMaxAnisotropy();
                child.material.map.needsUpdate = true;
              }
              child.material.needsUpdate = true;
            }
          }
        });

        tshirtGroup.add(model);
        loadedModel = model;
        reportModelBounds();
        setIsLoading(false);
      },
      undefined,
      (error) => {
        console.error('Error loading GLB model:', error);
        setIsLoading(false);
      }
    );

    // 8. Animation Loop - Driven cleanly by OrbitControls
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      controls.update(); // Smoothly rotates 360 & handles damping
      renderer.render(scene, camera);
    };

    animate();

    // 9. Resize Handler
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      reportModelBounds();
    };

    window.addEventListener('resize', handleResize);

    // 10. Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      controls.dispose();
      renderer.dispose();
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [modelPath, autoRotateSpeed, onModelBounds]);

  return (
    <div className="tshirt-3d-wrapper">
      {/* Warm, Minimal & Realistic Studio Spotlight Rig */}
      <div className="tshirt-spotlight-rig" aria-hidden="true">
        <div className="spotlight-origin-glow" />
        <div className="spotlight-warm-beam" />
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="tshirt-loading-overlay">
          <div className="loading-spinner" />
          <span className="loading-text">LOADING 3D STREETWEAR...</span>
        </div>
      )}

      {/* 3D WebGL Canvas Viewport */}
      <div
        ref={mountRef}
        className="tshirt-canvas-container"
        title="Drag with mouse or touch to rotate 360 degrees"
      />

      {/* Minimalist Line: "drag to view 360 degree view" */}
      <div className="tshirt-drag-hint-line">
        <span className="drag-line-dash" />
        <span className="drag-line-text">drag to view 360 degree view</span>
        <span className="drag-line-dash" />
      </div>
    </div>
  );
};

export default TShirt3D;
