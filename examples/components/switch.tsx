import { VirtualBase } from "co-virtualize"
import React, { useState } from "react"

export function Switch({ a, b }: { a: JSX.Element; b: JSX.Element }) {
    const [isA, setA] = useState(true)
    return (
        <>
            <button onClick={() => setA(!isA)}>Switch</button>
            <div style={{ height: 300, position: "relative" }}>
                <VirtualBase>{isA ? a : b}</VirtualBase>
            </div>
        </>
    )
}
