import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import deerImage from "../assets/deer.png";

const DeerParticles = ({ visible }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!visible) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    // Create scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio); // For high-DPI screens
    containerRef.current.appendChild(renderer.domElement);

    // Create texture loader and load deer image
    const textureLoader = new THREE.TextureLoader();
    const deerTexture = textureLoader.load(deerImage);

    // Create particle system
    const geometry = new THREE.BufferGeometry();
    const count = 1000;
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);

    for (let i = 0; i < count * 3; i++) {
      positions[i] = Math.random() * 2000 - 1000;
    }

    for (let i = 0; i < count; i++) {
      scales[i] = Math.random() * 10 + 5; // Vary particle sizes
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("scale", new THREE.BufferAttribute(scales, 1));

    const material = new THREE.PointsMaterial({
      size: 50, // Base size of particles
      map: deerTexture,
      alphaTest: 0.5,
      transparent: true,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    camera.position.z = 500;

    const animate = () => {
      requestAnimationFrame(animate);
      particles.rotation.x += 0.001;
      particles.rotation.y += 0.001;
      renderer.render(scene, camera);
    };

    animate();

    // Handle resizing
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      containerRef.current.removeChild(renderer.domElement);
    };
  }, [visible]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed", // Fixed positioning to cover the background
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1, // Ensure it's behind other content
      }}
    />
  );
};

export default DeerParticles;
