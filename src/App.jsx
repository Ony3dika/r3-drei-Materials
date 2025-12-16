import { Canvas } from "@react-three/fiber";
import {
  Environment,
  OrbitControls,
  Float,
  MeshWobbleMaterial,
  MeshDistortMaterial,
} from "@react-three/drei";
import { LayerMaterial, Gradient } from "lamina";
import * as THREE from "three";
import { useState } from "react";

const Orbs = [
  {
    index: 0,
    name: "Sphere",
    geometry: <sphereGeometry args={[2, 64, 32]} />,
    material: (
      <MeshWobbleMaterial
        factor={50}
        speed={0.1}
        roughness={0}
        metalness={4}
        anisotropy={0.6}
        color={"#ff587a"}
      />
    ),
    backgroundColor: "#fdcf8a",
    backdropColor: "#ff4d00",
  },
  {
    index: 1,
    name: "Anima",
    geometry: <torusKnotGeometry args={[1, 0.7, 500, 500]} />,
    material: (
      <MeshWobbleMaterial
        factor={32}
        speed={0.1}
        roughness={0}
        metalness={6}
        anisotropy={0.1}
        clearcoatRoughness={0}
        color={"#2a97a6"}
      />
    ),
    backgroundColor: "#93c5ca",
    // backdropColor: "#434e4f",
  },
  {
    index: 2,
    name: "Droplet",
    geometry: <icosahedronGeometry args={[2, 20]} />,
    material: (
      <MeshWobbleMaterial
        factor={10}
        speed={0.1}
        roughness={0}
        metalness={7}
        anisotropy={0.02}
        clearcoatRoughness={0}
        color={"#99aae6"}
      />
    ),

    backgroundColor: "#00c5ff",
    backdropColor: "#428493",
  },
  {
    index: 3,
    name: "Tetra",
    geometry: <icosahedronGeometry args={[2, 60]} />,
    material: (
      <MeshDistortMaterial
        distort={0.4}
        clearcoat={1}
        aoMapIntensity={1}
        anisotropy={0.5}
        metalness={5}
        color={"#a44bd7"}
      />
    ),

    backgroundColor: "#7600f0",
    backdropColor: "#1b0037",
  },
];

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const orbital = Orbs[currentIndex];
  const [bgColor, setBgColor] = useState(orbital.backgroundColor);

  const handleNext = () => {
    setCurrentIndex((prev) => {
      const nextIndex = (prev + 1) % Orbs.length;
      setBgColor(Orbs[nextIndex].backgroundColor);
      return nextIndex;
    });
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => {
      const nextIndex = (prev - 1 + Orbs.length) % Orbs.length;
      setBgColor(Orbs[nextIndex].backgroundColor);
      return nextIndex;
    });
  };

  return (
    <>
      <Canvas
        className='cursor-grab'
        camera={{
          position: [0, 2, 4],
          fov: 90,
        }}
      >
        <OrbitControls
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 1.8}
          enablePan={false}
        />
        <pointLight position={[4, 10, 5]} />
        {/* <pointLight position={[-4, -10, -5]} /> */}

        <Environment background>
          <mesh scale={100}>
            <sphereGeometry args={[1, 64, 64]} />
            <LayerMaterial side={THREE.BackSide}>
              <Gradient
                colorA={bgColor}
                colorB={orbital.backdropColor ? orbital.backdropColor : "white"}
                start={0}
                end={-1}
                axes='y'
              />
            </LayerMaterial>
          </mesh>
        </Environment>
        <axesHelper />

        <Float
          key={orbital.index}
          speed={2}
          rotationIntensity={4}
          floatIntensity={2}
        >
          <mesh position={[0, 0, 0]}>
            {orbital.geometry}
            {orbital.material}
          </mesh>
        </Float>
      </Canvas>

      <div className='absolute top-0 left-0 w-screen h-screen pointer-events-none flex justify-between items-center lg:px-10 px-2'>
        <p className='absolute lg:top-10 top-5 left-5 lg:text-3xl text-xl'>
          r3-drei materials
        </p>
        <p className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 xl:text-6xl text-2xl pointer-events-none font-semibold'>
          {orbital.name}
        </p>
        <button
          className='pointer-events-auto bg-[#ffffff1a] backdrop-blur-xl border border-[#ffffff33] rounded-full lg:w-14 w-10 lg:h-14 h-10 flex justify-center items-center cursor-pointer transition-all duration-150 ease-in-out text-white hover:scale-105 hover:bg-[#ffffff33] hover:border-[#ffffff66]'
          onClick={handlePrev}
        >
          <svg
            className='h-6 w-6 stroke-2'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M15.75 19.5L8.25 12l7.5-7.5'
            />
          </svg>
        </button>
        <button
          className='pointer-events-auto bg-[#ffffff1a] backdrop-blur-xl border border-[#ffffff33] rounded-full lg:w-14 w-10 lg:h-14 h-10 flex justify-center items-center cursor-pointer transition-all duration-150 ease-in-out text-white hover:scale-105 hover:bg-[#ffffff33] hover:border-[#ffffff66]'
          onClick={handleNext}
        >
          <svg
            className='h-6 w-6 stroke-2'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M8.25 4.5l7.5 7.5-7.5 7.5'
            />
          </svg>
        </button>
      </div>
    </>
  );
}

export default App;
