import { useRef, useEffect } from "react"
import { Node, YogaNode } from "yoga-layout-prebuilt"
import { capitalize, YogaNodeContext } from "."


export function useBindYogaNodeProperties(
    node: YogaNode,
    requestLayoutCalculation: YogaNodeContext["requestLayoutCalculation"],
    properties: Partial<YogaNodeProperties>
): void {
    const prevProps = useRef<Partial<YogaNodeProperties>>({})
    useEffect(() => {
        Object.freeze(properties)
        const prev: Partial<YogaNodeProperties> = prevProps.current
        for (const [key, value] of Object.entries(properties)) {
            if (value != null) {
                setValue(node, key as any, value)
                delete prev[key as keyof YogaNodeProperties]
            }
        }
        for (const [key, value] of Object.entries(prev)) {
            if (value != null) {
                //TODO: reset the value
            }
        }
        prevProps.current = { ...properties }
        requestLayoutCalculation()
    }, [
        node,
        requestLayoutCalculation,
        ...Object.entries(properties).reduce<Array<any>>((v1, v2) => v1.concat(v2), []),
    ])
}

function setValue<Key extends keyof YogaNodeProperties>(
    node: YogaNode,
    key: Key,
    value: YogaNodeProperties[Key]
): void {
    const fnName: `set${Capitalize<Key>}` = `set${capitalize(key)}`
    const func: Function = node[fnName]
    if (func == null) {
        throw `property "${key}" is not exisiting`
    }
    if (Array.isArray(value)) {
        func.call(node, ...value)
    } else {
        func.call(node, value)
    }
}
