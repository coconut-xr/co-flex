import { FlexNode, YogaNodeProperties } from "co-yoga"
import { useEffect, useMemo } from "react"
import { FlexNodeContext, useBindFlexNodeProperties, useFlexNodeContext } from "."

export function useYogaNode(node: FlexNode, properties: YogaNodeProperties, index: number): FlexNodeContext {
    const context = useFlexNodeContext()
    useBindFlexNodeProperties(node, context.requestLayoutCalculation, properties)
    useEffect(() => {
        context.node.insertChild(node)
        context.requestLayoutCalculation()
        return () => {
            context.node.removeChild(node)
            context.requestLayoutCalculation()
        }
    }, [node, context])
    useEffect(() => {
        node.index = index
        context.requestLayoutCalculation()
    }, [index, node, context])
    useEffect(() => node.destroy.bind(node), [node])
    return useMemo(() => ({ ...context, node }), [node, context])
}
