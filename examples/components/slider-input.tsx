import { useState } from "react"

export function SliderInput({ children }: { children: (value: number) => JSX.Element }) {
    const [value, setValue] = useState(1)
    return (
        <>
            <input min={0} max={1} step={0.1} value={value} onChange={(e) => setValue(e.target.valueAsNumber)} type="range" />
            {children(value)}
        </>
    )
}
