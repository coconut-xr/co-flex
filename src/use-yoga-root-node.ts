import { FlexNode, YogaNodeProperties } from "co-yoga"
import { useCallback, useEffect, useMemo, useRef } from "react"
import { useBindFlexNodeProperties, FlexNodeContext } from "."

export function useYogaRootNode(node: FlexNode, properties: YogaNodeProperties, ups = 10) {
    const dirtyRef = useRef(false)
    const requestLayoutCalculation = useCallback(() => (dirtyRef.current = true), [])
    useBindFlexNodeProperties(node, requestLayoutCalculation, properties)
    useEffect(() => {
        const calculate = () => {
            node.calculateLayout()
            dirtyRef.current = false
        }
        calculate()
        const ref = window.setInterval(() => {
            if (dirtyRef.current) {
                calculate()
            }
        }, 1000 / ups)
        return () => window.clearInterval(ref)
    }, [ups, node])
    const context = useMemo<FlexNodeContext>(
        () => ({
            node,
            requestLayoutCalculation,
        }),
        [node]
    )
    return context
}
