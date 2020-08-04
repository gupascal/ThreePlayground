import React, { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from 'react-three-fiber'
import { Html, MapControls, Stats } from 'drei'
import { EffectComposer, DepthOfField, SMAA, Pixelation } from 'react-postprocessing'
import { Fog } from 'three';

// function Keen() {
//   const { nodes, materials } = useLoader(GLTFLoader, "/scene.gltf")
//   return (
//     <group position={[0, -7, 0]} rotation={[-Math.PI / 2, 0, 0]} dispose={null}>
//       <mesh material={materials["Scene_-_Root"]} geometry={nodes.mesh_0.geometry} castShadow receiveShadow />
//     </group>
//   )
// }


function Box(props) {
    // This reference will give us direct access to the mesh
    const mesh = useRef()
  
    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)
  
    // Rotate mesh every frame, this is outside of React without overhead
    useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01))
  
    return (
      <mesh
        {...props}
        ref={mesh}
        scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
        onClick={(e) => setActive(!active)}
        onPointerOver={(e) => setHover(true)}
        onPointerOut={(e) => setHover(false)}>
        <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
        <meshStandardMaterial attach="material" color={hovered ? 'hotpink' : 'orange'} />
      </mesh>
    )
  }
  
function Scene() {
    return (
        <Canvas className="MainScene">
            <Stats/>
            
            <ambientLight />
            <directionalLight position={[10, 10, 10]}/>
            <MapControls/>
            <Box position={[-1.2, 0, 0]} />
            <Box position={[1.2, 0, 0]} />

            <Suspense fallback={<Html>loading..</Html>}>
              {/* <Keen /> */}
              <EffectComposer>
                {/* <SMAA edgeDetection={0.1} /> */}
                <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={2} height={480} />
                {/* <Pixelation granularity="3" /> */}
              </EffectComposer>
            </Suspense>
        </Canvas>
    );
}

export default Scene;
