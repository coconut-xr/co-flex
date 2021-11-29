import { useCallback } from "react"
import { State, useStore } from "./state"

function getMainNodeId(s: State): string | undefined {
    return s.pages[s.selectedPage]?.mainNodeId
}

export function HierarchyPanel() {
    const mainNodeId = useStore(getMainNodeId)
    if (mainNodeId == null) {
        return null
    }
    return (
        <div className="d-flex py-2 flex-column border-end">
            <HierarchyItem intend={0} id={mainNodeId} />
        </div>
    )
}

function HierarchyItem({ id, intend }: { intend: number; id: string }) {
    const selectNode = useStore((s) => s.selectNode)
    const onClick = useCallback(() => selectNode(id), [selectNode, id])
    const isSelected = useStore((s) => {
        const page = s.pages[s.selectedPage]
        return page?.selectedNode === id
    })
    const nodeData = useStore((s) => {
        const page = s.pages[s.selectedPage]
        return page?.nodes[id]
    })

    if (nodeData == null) {
        return null
    }

    return (
        <div className="d-flex flex-column">
            <span
                className={`${isSelected ? "bg-primary text-light" : ""} pe-2 pointer`}
                style={{ paddingLeft: `${intend + 0.5}em` }}
                onClick={onClick}>
                {id}
            </span>
            <div>
                {nodeData.children.map((childId) => (
                    <HierarchyItem intend={intend + 1} id={childId} />
                ))}
            </div>
        </div>
    )
}
