import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ThreeJSBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 60;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // Primary particles (teal)
    const primaryCount = window.innerWidth < 768 ? 200 : 450;
    const primaryGeometry = new THREE.BufferGeometry();
    const primaryPositions = new Float32Array(primaryCount * 3);
    for (let i = 0; i < primaryCount; i++) {
      primaryPositions[i * 3 + 0] = (Math.random() - 0.5) * 160;
      primaryPositions[i * 3 + 1] = (Math.random() - 0.5) * 90;
      primaryPositions[i * 3 + 2] = (Math.random() - 0.5) * 100;
    }
    primaryGeometry.setAttribute('position', new THREE.BufferAttribute(primaryPositions, 3));

    const primaryMaterial = new THREE.PointsMaterial({ 
      color: 0x64ffda, 
      size: 1.2, 
      transparent: true, 
      opacity: 0.6 
    });
    const primaryPoints = new THREE.Points(primaryGeometry, primaryMaterial);
    scene.add(primaryPoints);

    // Secondary particles (blue-gray)
    const secondaryCount = window.innerWidth < 768 ? 150 : 300;
    const secondaryGeometry = new THREE.BufferGeometry();
    const secondaryPositions = new Float32Array(secondaryCount * 3);
    for (let i = 0; i < secondaryCount; i++) {
      secondaryPositions[i * 3 + 0] = (Math.random() - 0.5) * 140;
      secondaryPositions[i * 3 + 1] = (Math.random() - 0.5) * 80;
      secondaryPositions[i * 3 + 2] = (Math.random() - 0.5) * 80;
    }
    secondaryGeometry.setAttribute('position', new THREE.BufferAttribute(secondaryPositions, 3));

    const secondaryMaterial = new THREE.PointsMaterial({ 
      color: 0x8892b0, 
      size: 0.8, 
      transparent: true, 
      opacity: 0.4 
    });
    const secondaryPoints = new THREE.Points(secondaryGeometry, secondaryMaterial);
    scene.add(secondaryPoints);

    let rafId = 0;
    let t = 0;
    const animate = () => {
      t += 0.003;
      primaryPoints.rotation.z += 0.0005;
      primaryPoints.rotation.y += 0.0003;
      secondaryPoints.rotation.z -= 0.0008;
      secondaryPoints.rotation.x += 0.0002;
      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onResize);

    const onVisibility = () => {
      if (document.hidden) cancelAnimationFrame(rafId);
      else animate();
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(rafId);
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      renderer.dispose();
      primaryGeometry.dispose();
      secondaryGeometry.dispose();
      primaryMaterial.dispose();
      secondaryMaterial.dispose();
    };
  }, []);

  return <div ref={mountRef} className="fixed inset-0 -z-10" />;
};
