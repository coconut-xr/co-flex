import React, { useCallback, useMemo } from "react"
import { FlexDomSpringVirtualizedRoot, FlexDomSpringVirtualized } from "../flex-dom-spring-virtualized"
import { useStore } from "./state"

export function NodeRenderer({ id, root }: { id: string; root: boolean }) {
    const nodeData = useStore((s) => {
        const page = s.pages[s.selectedPage]
        return page?.nodes[id]
    })

    if (nodeData == null) {
        return null
    }

    const childrenNodes = nodeData.children.map((id) => <NodeRenderer key={id} root={false} id={id} />)

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
