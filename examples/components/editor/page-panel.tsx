import { VirtualBase } from "co-virtualize"
import React from "react"
import { HierarchyPanel } from "./hierarchy-panel"
import { NodePanel } from "./node-panel"
import { NodeRenderer } from "./node-renderer"
import { State, useStore } from "./state"

function getMainNodeId(s: State): string | undefined {
    return s.pages[s.selectedPage]?.mainNodeId
}

export function PagePanel() {
    const mainNodeId = useStore(getMainNodeId)
    if (mainNodeId == null) {
        return null
    }
    return (
        <div className="flex-grow-1 overflow-hidden d-flex flex-row">
            <HierarchyPanel />
            <div className="flex-grow-1 position-relative align-items-center justify-content-center overflow-auto">
                <VirtualBase>
                    <NodeRenderer id={mainNodeId} root />
                </VirtualBase>
            </div>
            <NodePanel />
        </div>
    )
}
