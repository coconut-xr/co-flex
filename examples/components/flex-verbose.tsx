import { useYogaNode, useYogaRootNode, FlexNodeContextProvider, ChangeFlexNode } from "co-flex"
import { FlexNode, YogaNodeProperties } from "co-yoga"
import React, { PropsWithChildren, useCallback, useMemo, useState } from "react"

const precision = 0.01

class VerboseNode extends ChangeFlexNode {
    constructor(precision: number, private setSize: (layout: { width: number; height: number }) => void) {
        super(precision)
    }

    onChange(node: this, parentNode: this | undefined): void {
        this.setSize({
            width: node.getComputed("width"),
            height: node.getComputed("height"),
        })
    }
}

export function FlexVerbose({ children, ...props }: PropsWithChildren<Partial<YogaNodeProperties>>) {
    const [{ width, height }, setSize] = useState({ width: 0, height: 0 })
    const node = useMemo(() => new VerboseNode(precision, setSize), [setSize])

    const context = useYogaNode(node, props, 0)

    return (
        <FlexNodeContextProvider context={context}>
            <p>
                {width} x {height}
            </p>
            <div style={{ marginLeft: 10 }}>{children}</div>
        </FlexNodeContextProvider>
    )
}

export function FlexVerboseRoot({ children, ...props }: PropsWithChildren<Partial<YogaNodeProperties>>) {
    const [{ width, height }, setSize] = useState({ width: 0, height: 0 })
    const node = useMemo(() => new VerboseNode(precision, setSize), [setSize])
    const context = useYogaRootNode(node, props)
    return (
        <FlexNodeContextProvider context={context}>
            <p>
                {width} x {height}
            </p>
            <div style={{ marginLeft: 10 }}>{children}</div>
        </FlexNodeContextProvider>
    )
}
