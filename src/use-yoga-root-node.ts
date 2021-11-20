import { FlexNode, YogaNodeProperties } from "co-yoga"
import { useCallback, useEffect, useMemo, useRef } from "react"
import { useBindFlexNodeProperties, FlexNodeContext, ChangeFlexNode } from "."

export function useYogaRootNode(
    properties: YogaNodeProperties,
    onChange: (node: FlexNode) => void,
    ups = 10,
    precision = 0.01
) {
    const node = useMemo(() => new ChangeFlexNode(precision, onChange), [precision, onChange])
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
            precision,
            requestLayoutCalculation,
        }),
        [node, precision]
    )
    return context
}
