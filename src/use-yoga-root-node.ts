import { useCallback, useEffect, useMemo, useRef } from "react"
import { DIRECTION_LTR, Node, YogaDirection, YogaNode } from "yoga-layout-prebuilt"
import { BoundGetLayoutValue, getLayoutValue, useBindYogaNodeProperties, YogaNodeContext, YogaNodeProperties } from "."

export function useYogaRootNode(
    properties: Partial<YogaNodeProperties>,
    onChange: (getLayoutValue: BoundGetLayoutValue) => void,
    width: number,
    height: number,
    ups: number = 10,
    precision: number = 0.01, //TODO: no good idea since all values also have to bee calculated wth that precision, or is it???
    direction: YogaDirection = DIRECTION_LTR
) {
    const rootNode = useMemo(() => Node.create(), [])
    const dirtyRef = useRef(false)
    const callbackMap = useMemo<Map<YogaNode, (getLayoutValue: BoundGetLayoutValue) => void>>(
        () => new Map([[rootNode, onChange]]),
        []
    )
    const requestLayoutCalculation = useCallback(() => (dirtyRef.current = true), [])
    useBindYogaNodeProperties(rootNode, requestLayoutCalculation, properties)
    useEffect(() => {
        const calculate = () => {
            rootNode.calculateLayout(width / precision, height / precision, direction)
            callbackMap.forEach((callback, node) => callback(getLayoutValue.bind(null, node, precision) as any))
            dirtyRef.current = false
        }
        calculate()
        const ref = window.setInterval(() => {
            if (dirtyRef.current) {
                calculate()
            }
        }, 1000 / ups)
        return () => window.clearInterval(ref)
    }, [ups, width, precision, direction])
    const context = useMemo<YogaNodeContext>(
        () => ({
            parentNode: rootNode,
            createNode: (onChange) => {
                const node = Node.create()
                callbackMap.set(node, onChange)
                return node
            },
            destroyNode: (node) => {
                callbackMap.delete(node)
                node.free()
            },
            requestLayoutCalculation,
        }),
        [rootNode]
    )
    return context
}
