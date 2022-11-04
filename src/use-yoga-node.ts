import { FlexNode, YogaNodeProperties } from "co-yoga"
import { useEffect, useMemo } from "react"
import { ChangeFlexNode, FlexNodeContext, useBindFlexNodeProperties, useFlexNodeContext } from "."

export function useYogaNode<T>(
    properties: YogaNodeProperties,
    index: number,
    onChange: (node: FlexNode, parentData: T | undefined) => T
): FlexNodeContext {
    const context = useFlexNodeContext()
    const node = useMemo(() => new ChangeFlexNode(context.precision, onChange), [context.precision, onChange])
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
