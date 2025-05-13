import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const CustomDesign = () => {
  const [text, setText] = useState("");
  const [color, setColor] = useState("#007bff");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [fontSize, setFontSize] = useState(16);
  const [svgFillColor, setSvgFillColor] = useState("#000000");

  const mountRef = useRef(null);
  const modelRef = useRef(null);
  const textMeshRef = useRef(null);
  const rendererRef = useRef(null);
  const frameIdRef = useRef(null);
  const controlsRef = useRef(null);
  const cameraRef = useRef(null);
  const sceneRef = useRef(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(bgColor);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      45,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1, 3);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    currentMount.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controlsRef.current = controls;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    const loader = new GLTFLoader();
    loader.load(
      "/button.glb",
      (gltf) => {
        const model = gltf.scene;
        modelRef.current = model;
        model.scale.set(0.6, 0.6, 0.6);
        model.traverse((child) => {
          if (child.isMesh) {
            child.material = child.material.clone();
            child.material.color.set(svgFillColor);
            child.material.needsUpdate = true;
          }
        });
        scene.add(model);
        addOrUpdateTextMesh(text, color, fontSize, scene);
      },
      undefined,
      (error) => {
        console.error("Error loading model:", error);
      }
    );

    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);
      if (modelRef.current) {
        modelRef.current.rotation.y += 0.01;
      }
      controls.update();
      renderer.render(scene, camera);
    };

    renderer.setClearColor(new THREE.Color(bgColor), 1);
    animate();

    return () => {
      cancelAnimationFrame(frameIdRef.current);
      controls.dispose();
      renderer.dispose();
      currentMount.removeChild(renderer.domElement);
    };
  }, [bgColor, svgFillColor]);

  const addOrUpdateTextMesh = (text, color, fontSize, scene) => {
    if (textMeshRef.current) {
      scene.remove(textMeshRef.current);
      textMeshRef.current.geometry.dispose();
      textMeshRef.current.material.dispose();
      textMeshRef.current = null;
    }

    if (!text) return;

    const canvas = document.createElement("canvas");
    const size = 512;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, size, size);
    ctx.font = `${fontSize * 10}px Arial`;
    ctx.fillStyle = color;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, size / 2, size / 2);

    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
    const geometry = new THREE.PlaneGeometry(1.5, 1.5);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 0.8, 0);
    mesh.rotation.x = -0.3;
    scene.add(mesh);
    textMeshRef.current = mesh;
  };

  useEffect(() => {
    if (sceneRef.current) {
      addOrUpdateTextMesh(text, color, fontSize, sceneRef.current);
    }
  }, [text, color, fontSize]);

  useEffect(() => {
    if (modelRef.current) {
      modelRef.current.traverse((child) => {
        if (child.isMesh) {
          child.material.color.set(svgFillColor);
          child.material.needsUpdate = true;
        }
      });
    }
  }, [svgFillColor]);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      "Custom design submitted: " +
      JSON.stringify({ text, color, bgColor, fontSize, svgFillColor })
    );
  };

  return (
    <div className="max-w-5xl mx-auto my-8 font-sans">
      <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">
        Custom Design Tool
      </h1>
      <p className="text-center text-gray-600 mb-5 max-w-xl mx-auto">
        Use this tool to create a button with custom text, colors, and font
        size. The live preview updates instantly!
      </p>
      <div className="flex flex-col lg:flex-row justify-between items-center gap-10 p-6 bg-white rounded-lg">
        <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md">
          <div>
            <label
              htmlFor="text"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Button Text
            </label>
            <input
              type="text"
              id="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Colors
            </label>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label
                  htmlFor="color"
                  className="block text-xs text-gray-500 mb-1"
                >
                  Text Color
                </label>
                <input
                  type="color"
                  id="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-full h-10 cursor-pointer"
                />
              </div>
              <div>
                <label
                  htmlFor="bgColor"
                  className="block text-xs text-gray-500 mb-1"
                >
                  Background
                </label>
                <input
                  type="color"
                  id="bgColor"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-full h-10 cursor-pointer"
                />
              </div>
              <div>
                <label
                  htmlFor="svgFillColor"
                  className="block text-xs text-gray-500 mb-1"
                >
                  Button Color
                </label>
                <input
                  type="color"
                  id="svgFillColor"
                  value={svgFillColor}
                  onChange={(e) => setSvgFillColor(e.target.value)}
                  className="w-full h-10 cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div>
            <label
              htmlFor="fontSize"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Font Size (px)
            </label>
            <input
              type="number"
              id="fontSize"
              value={fontSize}
              min="8"
              max="72"
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Submit Design
          </button>
        </form>

        <div className="">
          <h2 className="text-lg font-medium text-gray-900 mb-4">3D Preview</h2>
          <div
            ref={mountRef}
            className="relative w-80  aspect-square rounded-md border border-gray-200 overflow-hidden"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default CustomDesign;
