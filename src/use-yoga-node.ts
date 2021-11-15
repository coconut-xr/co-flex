import { useEffect, useMemo } from "react"
import { YogaNode } from "yoga-layout"
import { BoundGetLayoutValue, useBindYogaNodeProperties, useYogaNodeContext, YogaNodeProperties } from "."

export function useYogaNode(
    properties: Partial<YogaNodeProperties>,
    index: number,
    onChange: (getLayoutValue: BoundGetLayoutValue) => void
): YogaNode {
    const context = useYogaNodeContext()
    const [node, addChild, removeChild, destroy] = useMemo(() => context.createNode(onChange), [context, onChange])
    useBindYogaNodeProperties(node, context.requestLayoutCalculation, properties)
    useEffect(() => {
        context.addChild(node, index)
        return () => context.removeChild(node)
    }, [node, context, index])
    useEffect(() => destroy, [destroy])
    return node
}
