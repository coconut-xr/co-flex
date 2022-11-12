import { useYogaNode, useYogaRootNode, FlexNodeContextProvider, ChangeFlexNode } from "co-flex"
import { FlexNode, YogaNodeProperties } from "co-yoga"
import React, { PropsWithChildren, useCallback, useMemo, useState } from "react"

const precision = 1

type Layout = { top: number; left: number; width: number; height: number }

class DomNode extends ChangeFlexNode {
    constructor(precision: number, private setLayout: (layout: Layout) => void) {
        super(precision)
    }

    onChange(node: this, parentNode: this | undefined): void {
        this.setLayout({
            width: node.getComputed("width"),
            height: node.getComputed("height"),
            left: node.getComputed("left"),
            top: node.getComputed("top"),
        })
    }
}

export function FlexDom({
    children,
    index,
    ...props
}: PropsWithChildren<Partial<{ index?: number } & YogaNodeProperties>>) {
    const [style, setLayout] = useState({ top: 0, left: 0, width: 0, height: 0 })
    const node = useMemo(() => new DomNode(precision, setLayout), [setLayout])
    const context = useYogaNode(node, props, index ?? 0)

    return (
        <FlexNodeContextProvider context={context}>
            <div style={{ border: "1px solid #000", position: "absolute", ...style }}>
                <div style={{ position: "relative" }}>{children}</div>
            </div>
        </FlexNodeContextProvider>
    )
}

export function FlexDomRoot({ children, ...props }: PropsWithChildren<Partial<YogaNodeProperties>>) {
    const [style, setLayout] = useState({ top: 0, left: 0, width: 0, height: 0 })
    const node = useMemo(() => new DomNode(precision, setLayout), [setLayout])
    const context = useYogaRootNode(node, props, 10)
    return (
        <div style={{ width: 300, height: 300, position: "relative" }}>
            <FlexNodeContextProvider context={context}>
                <div style={{ border: "1px solid #000", position: "absolute", ...style }}>{children}</div>
            </FlexNodeContextProvider>
        </div>
    )
}
