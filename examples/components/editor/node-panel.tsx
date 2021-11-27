import { propertyMap, YogaNodeProperties } from "co-yoga"
import React, { useCallback } from "react"
import { EnumInput } from "./enum-input"
import { useStore } from "./state"
import { ValueInput } from "./value-input"

const propertyMapEntries = Object.entries(propertyMap)

export function NodePanel({ id, root }: { id: string; root: boolean }) {
    return (
        <div className="overflow-auto p-3 border-start d-flex flex-column overflow-auto">
            <div className="mx-3 d-flex flex-row">
                <button className="flex-grow-1 btn btn-outline-primary me-3">Add Child</button>
                {!root && <button className="flex-grow-1 btn btn-outline-danger">Delete</button>}
            </div>
            {propertyMapEntries.map(([name, propertyInfo]) => (
                <PropertyInput key={name} id={id} name={name} propertyInfo={propertyInfo} />
            ))}
        </div>
    )
}

function PropertyInput({
    id,
    name,
    propertyInfo,
}: {
    id: string
    name: string
    propertyInfo: typeof propertyMap[keyof typeof propertyMap]
}) {
    const setNodeProperty = useStore((s) => s.setNodeProperty)
    const onChange = useCallback((val) => setNodeProperty(id, name as any, val), [id, name])
    if (propertyInfo.type === "enum") {
        return <EnumInput onChange={onChange} name={name} propertyInfo={propertyInfo} />
    } else {
        return <ValueInput onChange={onChange} name={name} propertyInfo={propertyInfo} />
    }
}
