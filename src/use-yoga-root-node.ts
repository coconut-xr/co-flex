import { YogaNodeProperties } from "co-yoga"
import { useCallback, useEffect, useMemo, useRef } from "react"
import { useBindFlexNodeProperties, FlexNodeContext, ChangeFlexNode, FlexNodeOnChange } from "."

export function useYogaRootNode<T>(
    properties: YogaNodeProperties,
    onChange: FlexNodeOnChange<T>,
    dataFactory: () => T,
    ups = 10,
    precision = 0.01
) {
    const node = useMemo(
        () => new ChangeFlexNode(precision, onChange, dataFactory()),
        [precision, onChange, dataFactory]
    )
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
