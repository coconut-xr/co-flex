import { VirtualBase } from "co-virtualize"
import React, { useState } from "react"

export function DomSwitch({ a, b }: { a: JSX.Element; b: JSX.Element }) {
    const [isA, setA] = useState(true)
    return (
        <>
            <button className="btn btn-outline-primary" onClick={() => setA(!isA)}>Switch</button>
            <div style={{ height: 300, position: "relative" }}>
                <VirtualBase>{isA ? a : b}</VirtualBase>
            </div>
        </>
    )
}
