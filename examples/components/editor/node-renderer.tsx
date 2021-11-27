import React, { useCallback, useMemo } from "react"
import { FlexDomSpringVirtualizedRoot, FlexDomSpringVirtualized } from "../flex-dom-spring-virtualized"
import { useStore } from "./state"

export function NodeRenderer({ id, root }: { id: string; root: boolean }) {
    const selectNode = useStore(useCallback((s) => s.selectNode.bind(null, id), [id]))
    const nodeData = useStore(
        useCallback(
            (s) => {
                const page = s.pages[s.selectedPage]
                return page?.nodes[id]
            },
            [id]
        )
    )

    if (nodeData == null) {
        return null
    }

    const childrenNodes = nodeData.children.map((id) => <NodeRenderer key={id} root={false} id={id} />)

    console.log(nodeData)

    if (root) {
        return (
            <FlexDomSpringVirtualizedRoot render {...nodeData.properties}>
                {childrenNodes}
            </FlexDomSpringVirtualizedRoot>
        )
    } else {
        return (
            <FlexDomSpringVirtualized render id={id} index={nodeData.index} {...nodeData.properties}>
                {childrenNodes}
            </FlexDomSpringVirtualized>
        )
    }
}
