import * as THREE from 'three'
import { forwardRef, useEffect } from 'react'
import { Canvas, ThreeElements, useFrame, useThree } from '@react-three/fiber'
import { Html, useGLTF, SoftShadows, ScrollControls, useScroll, useTexture } from '@react-three/drei'
import useRefs from 'react-use-refs'
import { GroupProps } from '@react-three/fiber'
import { HtmlProps } from '@react-three/drei/web/Html'

const rsqw = (t, delta = 0.1, a = 1, f = 1 / (2 * Math.PI)) => (a / Math.atan(1 / delta)) * Math.atan(Math.sin(2 * Math.PI * t * f) / delta)

export default function App() {
  return (
    <div className='absolute inset-0'> 
      <Canvas  className='pb-[30vh] lg:pb-0' shadows dpr={[1, 2]} camera={{ position: [0, -3.2, 40], fov: 12 }}>
        <ScrollControls  pages={5}>
          <Composition />
        </ScrollControls>
      </Canvas>
    </div>
  )
}

function Composition({ ...props }) {
  const scroll = useScroll()
  const { width, height } = useThree((state) => state.viewport)
  const [group, mbp16, mbp14, keyLight, stripLight, fillLight, left, right] = useRefs<THREE.Group>()
  const [textureRed, textureBlue] = useTexture(['/oh.jpg', '/oh2.jpg'])

  useFrame((state, delta) => {
    const r1 = scroll.range(0 / 4, 1 / 4)
    const r2 = scroll.range(1 / 4, 1 / 4)
    const r3 = scroll.visible(4 / 5, 1 / 5)
    mbp16.current.rotation.x = Math.PI - (Math.PI / 2) * rsqw(r1) + r2 * 0.33
    mbp14.current.rotation.x = Math.PI - (Math.PI / 2) * rsqw(r1) - r2 * 0.39
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, (-Math.PI / 1.45) * r2, 4, delta)
    group.current.position.x = THREE.MathUtils.damp(group.current.position.x, (-width / 7) * r2, 4, delta)
    group.current.scale.x = group.current.scale.y = group.current.scale.z = THREE.MathUtils.damp(group.current.scale.z, 1 + 0.24 * (1 - rsqw(r1)), 4, delta)
    keyLight.current.position.set(0.25 + -15 * (1 - r1), 4 + 11 * (1 - r1), 3 + 2 * (1 - r1))
    left.current?.classList.toggle('show', r3)
    right.current?.classList.toggle('show', r3)
  })
  return (
    <>
      <spotLight position={[0, -width * 0.7, 0]} intensity={0.5} />
      <directionalLight ref={keyLight} castShadow intensity={3}>
        <orthographicCamera attachObject={['shadow', 'camera']} args={[-10, 10, 10, -10, 0.5, 30]} />
      </directionalLight>
      <group ref={group} position={[0, -height / 2.65, 0]} {...props}>
        <spotLight ref={stripLight} position={[width * 2.5, 0, width]} angle={0.19} penumbra={1} intensity={0.25} />
        <spotLight ref={fillLight} position={[0, -width / 2.4, -width * 2.2]} angle={0.2} penumbra={1} intensity={2} distance={width * 3} />
        <M1 ref={mbp16} texture={textureRed} scale={width / 67}>
          <Tag ref={left} position={[0, 10, 0]}  />
        </M1>
        <M1 ref={mbp14} texture={textureBlue} scale={width / 77} rotation={[0, Math.PI, 0]} position={[0, 0, -width / 2.625]}>
          {/* <Tag ref={right} position={[10, 14, 0]} head="up to" stat="3.7x" expl={`faster CPU\nperformance¹`} /> */}
        </M1>
      </group>
    </>
  )
}

/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: akshatmittal (https://sketchfab.com/akshatmittal)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/3d-models/2021-macbook-pro-14-m1-pro-m1-max-f6b0b940fb6a4286b18a674ef32af2d3
title: 2021 Macbook Pro 14" (M1 Pro / M1 Max)
*/
const M1 = forwardRef<THREE.Group, GroupProps>(({ texture, children, ...props }, ref) => {
  const { nodes, materials } = useGLTF('/mbp-v1-pipe.glb')
  return (
    <group {...props} dispose={null}>
      <group ref={ref} position={[0, -0.43, -11.35]} rotation={[Math.PI / 2, 0, 0]}>
        <mesh geometry={nodes.back_1.geometry} material={materials.blackmatte} />
        <mesh receiveShadow castShadow geometry={nodes.back_2.geometry} material={materials.aluminium} />
        <mesh geometry={nodes.matte.geometry}>
          <meshLambertMaterial map={texture} toneMapped={false} />
        </mesh>
      </group>
      {children}
      <mesh geometry={nodes.body_1.geometry} material={materials.aluminium} material-color="#aaaaaf" material-envMapIntensity={0.2} />
      <mesh geometry={nodes.body_2.geometry} material={materials.blackmatte} />
    </group>
  )
})
M1.displayName = "M1"

const Tag = forwardRef<HTMLDivElement, HtmlProps >(({  ...props }, ref) => {
  return (
    <Html ref={ref} className="data" center {...props}>
  <div className="flex flex-col gap-3 mx-auto items-center mt-8">
      <h1 className='whitespace-nowrap mx-auto block text-xl font-semibold tracking-[0.5em] lg:text-5xl lg:tracking-[1em] pl-[0.5em] lg:pl-[1em] mb-8 lg:mb-16 text-[#0a559c]'>탁월함을 넘어 감동으로</h1>

      <h2 className="font-bold text-2xl lg:text-4xl text-gray-800 mx-auto">
        ERROR
      </h2>
      <p
        className="lg:text-lg leading-relaxed text-slate-500 text-center mx-auto mb-8 max-w-[50ch]">
        Code:404
      </p>
    </div>
    </Html>
  )
})

Tag.displayName = "Tag"