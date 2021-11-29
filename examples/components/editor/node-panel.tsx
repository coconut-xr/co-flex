import { propertyMap, YogaNodeProperties } from "co-yoga"
import React, { useCallback } from "react"
import { EnumInput } from "./enum-input"
import { useStore } from "./state"
import { ValueInput } from "./value-input"

const propertyMapEntries = Object.entries(propertyMap)

export function NodePanel() {
    const deleteNode = useStore((s) => s.deleteNode)
    const addChild = useStore((s) => s.addNode)
    return (
        <div className="overflow-auto p-3 border-start d-flex flex-column overflow-auto">
            <div className="mx-3 d-flex flex-row">
                <button onClick={addChild} className="flex-grow-1 btn btn-outline-primary me-3">
                    Add Child
                </button>
                <button onClick={deleteNode} className="flex-grow-1 btn btn-outline-danger">
                    Delete
                </button>
            </div>
            {propertyMapEntries.map(([name, propertyInfo]) => (
                <PropertyInput key={name} name={name} propertyInfo={propertyInfo} />
            ))}
        </div>
    )
}

function PropertyInput({
    name,
    propertyInfo,
}: {
    name: string
    propertyInfo: typeof propertyMap[keyof typeof propertyMap]
}) {
    const setNodeProperty = useStore((s) => s.setNodeProperty)
    const onChange = useCallback((val) => setNodeProperty(name as any, val), [setNodeProperty, name])
    const value = useStore((s) => {
        const selectedPage = s.pages[s.selectedPage]
        if (selectedPage == null) {
            return undefined
        }
        const selectedNode = selectedPage.nodes[selectedPage.selectedNode]
        if (selectedNode == null) {
            return undefined
        }
        return selectedNode.properties[name as keyof typeof propertyMap]
    })
    if (propertyInfo.type === "enum") {
        return <EnumInput value={value} onChange={onChange} name={name} propertyInfo={propertyInfo} />
    } else {
        return <ValueInput value={value} onChange={onChange} name={name} propertyInfo={propertyInfo} />
    }
}
