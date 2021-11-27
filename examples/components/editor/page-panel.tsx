import { VirtualBase } from "co-virtualize"
import React from "react"
import { NodePanel } from "./node-panel"
import { NodeRenderer } from "./node-renderer"
import { PageData, State, useStore } from "./state"

function selectMainPage(s: State): PageData | undefined {
    return s.pages[s.selectedPage]
}

function selectMainNodeId(s: State): string | undefined {
    return s.pages[s.selectedPage]?.mainNodeId
}

function getSelectedNodeId(s: State): string | undefined {
    return s.pages[s.selectedPage]?.selectedNode
}

export function PagePanel() {
    const page = useStore(selectMainPage)
    const mainNodeId = useStore(selectMainNodeId)
    const selectedNodeId = useStore(getSelectedNodeId)
    if (page == null || mainNodeId == null) {
        return null
    }
    return (
        <div className="flex-grow-1 overflow-hidden d-flex flex-row">
            <div className="flex-grow-1 position-relative align-items-center justify-content-center">
                <VirtualBase>
                    <NodeRenderer id={mainNodeId} root />
                </VirtualBase>
            </div>
            {selectedNodeId && <NodePanel root id={selectedNodeId} />}
        </div>
    )
}
