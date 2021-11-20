import { FlexNode, YogaNodeProperties } from "co-yoga"
import { useRef, useEffect } from "react"
import { FlexNodeContext } from "."

export function useBindFlexNodeProperties(
    node: FlexNode,
    requestLayoutCalculation: FlexNodeContext["requestLayoutCalculation"],
    properties: YogaNodeProperties
): void {
    const prevProps = useRef<Partial<YogaNodeProperties>>({})
    useEffect(() => {
        Object.freeze(properties)
        const prev: Partial<YogaNodeProperties> = prevProps.current
        for (const [key, value] of Object.entries(properties)) {
            if (value != prev[key as keyof YogaNodeProperties]) {
                console.log(`set ${key} = ${value}`)
                node.setProperty(key as any, value)
            }
            delete prev[key as keyof YogaNodeProperties]
        }
        for (const [key] of Object.entries(prev)) {
            console.log(`reset ${key}`)
            node.setProperty(key as any, undefined)
        }
        prevProps.current = { ...properties }
        requestLayoutCalculation()
    }, [
        node,
        requestLayoutCalculation,
        ...Object.entries(properties).reduce<Array<any>>((v1, v2) => v1.concat(v2), []),
    ])
}
