import React, { Suspense, useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { ContactShadows, Environment, useGLTF, OrbitControls } from "@react-three/drei"
import { HexColorPicker } from "react-colorful"
import { proxy, useSnapshot } from "valtio"
import Picker from "./Picker"



function Shirt({ state }) {
    const ref = useRef()
    const snap = useSnapshot(state)
    const { nodes, materials } = useGLTF("./hoodie.glb")

    // useFrame((state) => {
    //     const t = state.clock.getElapsedTime()
    //     ref.current.rotation.z = 0.03 - (1 + Math.sin(t / 1.5)) / 20
    //     ref.current.rotation.x = Math.cos(t / 4) / 8
    //     ref.current.rotation.y = Math.sin(t / 4) / 8
    //     ref.current.position.y = (1 + Math.sin(t / 1.5)) / 10
    // })

    // Cursor showing current color
    const [hovered, set] = useState(null)
    useEffect(() => {
        const cursor = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><g filter="url(#filter0_d)"><path d="M29.5 47C39.165 47 47 39.165 47 29.5S39.165 12 29.5 12 12 19.835 12 29.5 19.835 47 29.5 47z" fill="${snap.items[hovered]}"/></g><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/><text fill="#000" style="white-space:pre" font-family="Inter var, sans-serif" font-size="10" letter-spacing="-.01em"><tspan x="35" y="63">${hovered}</tspan></text></g><defs><clipPath id="clip0"><path fill="#fff" d="M0 0h64v64H0z"/></clipPath><filter id="filter0_d" x="6" y="8" width="47" height="47" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy="2"/><feGaussianBlur stdDeviation="3"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow"/><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"/></filter></defs></svg>`
        const auto = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/></svg>`
        if (hovered) {
            document.body.style.cursor = `url('data:image/svg+xml;base64,${btoa(cursor)}'), auto`
            return () => (document.body.style.cursor = `url('data:image/svg+xml;base64,${btoa(auto)}'), auto`)
        }
        else {
            document.body.style.cursor = null;
        }
    }, [hovered])

    return (
        <group
            ref={ref}
            dispose={null}
            onPointerOver={(e) => (e.stopPropagation(), set(e.object.material.name))}
            onPointerOut={(e) => e.intersections.length === 0 && set(null)}
            onPointerMissed={() => (state.current = null)}
            onClick={(e) => (e.stopPropagation(), (state.current = e.object.material.name))}>
            <group rotation={[Math.PI / 2, 0, 0]} position={[0, -5.25, 0]}>
                <mesh scale={4} material-color={snap.items.front} geometry={nodes['model002_1'].geometry} material={materials.front} />
                <mesh scale={4} material-color={snap.items.back} geometry={nodes['model002_2'].geometry} material={materials.back} />
                <mesh scale={4} material-color={snap.items.hood} geometry={nodes['model002_3'].geometry} material={materials.hood} />
            </group>


        </group>
    )
}

// function Picker() {
//     const snap = useSnapshot(state)
//     const [col, setCol] = useState()

//     const handleColorPicker = (color) => {
//         state.items[snap.current] = color;
//         console.log(color, "col")
//         setCol(prev => ({ ...prev, [snap.current]: color }))
//     }
//     console.log(col)


//     const getLocalItems = () => {
//         let tcolor = localStorage.getItem('Colors')


//         if (tcolor) {
//             return JSON.parse(localStorage.getItem('Colors'));
//         }
//         else {
//             return [];
//         }
//     }

//     const [tshirtColors, setTshirtColors] = useState(getLocalItems())

//     let element = {
//         tname: 'Hoodie',
//         col
//     }

//     const addColors = () => {
//         setTshirtColors([...tshirtColors, element])
//     }

//     //Adding data to local storage

//     useEffect(() => {
//         localStorage.setItem('Colors', JSON.stringify(tshirtColors))
//     }, [tshirtColors]);

//     return (
//         <div style={{
//             display: snap.current ? "block" : "block",
//             position: 'absolute',
//             top: '230px',
//             right: '185px'
//         }}>
//             <HexColorPicker className="picker" color={snap.items[snap.current]} onChange={(color) => handleColorPicker(color)} onClick={addColors} />
//             <h5 style={{
//                 color: '#000',
//                 textTransform: 'capitalize'
//             }}>{snap.current} {(state.items[snap.current])}</h5>
//         </div>
//     )
// }

const Hoodie = ({ state }) => {
    return (
        <>
            <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 4], fov: 50 }} style={{ height: '500px' }}>
                <ambientLight intensity={0.8} />
                <spotLight intensity={0.5} angle={0.1} penumbra={1} position={[10, 15, 10]} castShadow />
                <Suspense fallback={null}>
                    <Shirt state={state} />
                    {/* <Environment preset="city" /> */}
                    {/* <ContactShadows rotation-x={Math.PI / 2} position={[0, -0.2, -1.5]} opacity={0.25} width={10} height={10} blur={1.5} far={0.8} /> */}
                </Suspense>
                <OrbitControls minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} enableZoom={false} enablePan={false} />
            </Canvas>
            {/* <Picker state={state} tshirtname='Hoodie' /> */}

        </>
    )
}

export default Hoodie;