import { OrbitControls } from "@react-three/drei"
import { Canvas } from "@react-three/fiber"
import { VirtualBase } from "co-virtualize"
import React, { useState } from "react"

export function ThreeSwitch({ a, b }: { a: JSX.Element; b: JSX.Element }) {
    const [isA, setA] = useState(true)
    return (
        <>
            <button onClick={() => setA(!isA)}>Switch</button>
            <Canvas style={{ height: 300, width: 300 }}>
                <pointLight intensity={1.5} position={[1, 1, 1]} />
                <OrbitControls maxZoom={1} target={[0, 0, 0]} />
                <group position={[-0.5, -0.5, 0]}>
                    <VirtualBase>{isA ? a : b}</VirtualBase>
                </group>
            </Canvas>
        </>
    )
}
