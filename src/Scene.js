import React, { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame, useLoader, useThree } from 'react-three-fiber'
import { Html, MapControls, Stats, Sky, PerspectiveCamera } from 'drei'
import { EffectComposer, DepthOfField, SMAA, Pixelation, Depth, SSAO } from 'react-postprocessing'
import { BlendFunction } from 'postprocessing'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';


function Environment() {
  const gltf = useLoader(GLTFLoader, "%PUBLIC_URL%/sample/low_poly_winter_scene/scene.gltf")

  gltf.scene.traverse( function( node ) {
    if ( node.isMesh ) {
      node.castShadow = true;
      node.receiveShadow = true;
    }
  });

  return (
    <primitive object={gltf.scene} dispose={null} />
  )
}


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
        <Canvas className="MainScene" shadowMap>
            <Stats/>
            <Sky/>
            <ambientLight />
            <directionalLight position={[10, 10, 10]} castShadow/>
            <MapControls/>
            <PerspectiveCamera makeDefault position={[4, 4, 8]} />

            <Box position={[-1.2, 0, 0]} />
            <Box position={[1.2, 0, 0]} />

            <Suspense fallback={<Html>loading..</Html>}>
              <Environment />
              <EffectComposer>
                {/* <Depth/> */}
                {/* <SSAO samples={30} rings={4} scale={4.5} bias={2.5}/> */}
                <DepthOfField
                  focusDistance={0.007}
                  focalLength={0.02}
                  bokehScale={8.0}
                  blendFunction={BlendFunction.NORMAL} />
              </EffectComposer>
            </Suspense>
        </Canvas>
    );
}

export default Scene;
