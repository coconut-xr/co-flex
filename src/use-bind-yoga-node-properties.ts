import { FlexNode, YogaNodeProperties } from "co-yoga"
import { useMemo } from "react"
import { FlexNodeContext } from "."

const emptyObjectFunction = () => ({})

export function useBindFlexNodeProperties(
    node: FlexNode,
    requestLayoutCalculation: FlexNodeContext["requestLayoutCalculation"],
    properties: YogaNodeProperties
): void {
    const prev = useMemo<{
        node?: FlexNode
        requestLayoutCalculation?: FlexNodeContext["requestLayoutCalculation"]
        properties?: YogaNodeProperties
    }>(emptyObjectFunction, [])

    if (
        prev.node === node &&
        prev.properties === properties &&
        prev.requestLayoutCalculation === requestLayoutCalculation
    ) {
        return
    }

    let changed = false

    const prevProperties: YogaNodeProperties | undefined = prev.properties
    const propertyEntries = Object.entries(properties)
    if (prevProperties == null) {
        changed = true
        for (const [key, value] of propertyEntries) {
            node.setProperty(key as any, value)
        }
    } else {
        for (const [key, value] of Object.entries(properties)) {
            if (value != prevProperties[key as keyof YogaNodeProperties]) {
                node.setProperty(key as any, value)
                changed = true
            }
            delete prevProperties[key as keyof YogaNodeProperties]
        }
        for (const [key] of Object.entries(prevProperties)) {
            node.setProperty(key as any, undefined)
            changed = true
        }
    }

    prev.properties = properties
    prev.node = node
    prev.requestLayoutCalculation = requestLayoutCalculation

    if (changed) {
        requestLayoutCalculation()
    }
}
