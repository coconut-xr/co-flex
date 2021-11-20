import { useYogaNode, useFlexNodeContext, useYogaRootNode, FlexNodeContextProvider } from "co-flex"
import { YogaNodeProperties } from "co-yoga"
import React, { PropsWithChildren, useCallback, useState } from "react"

export function FlexDom({
    children,
    index,
    ...props
}: PropsWithChildren<Partial<{ index?: number } & YogaNodeProperties>>) {
    const [style, setLayout] = useState({ top: 0, left: 0, width: 0, height: 0 })
    const context = useFlexNodeContext()
    const node = useYogaNode(
        props,
        index ?? 0,
        useCallback(
            (node) =>
                setLayout({
                    width: node.getComputed("width"),
                    height: node.getComputed("height"),
                    left: node.getComputed("left"),
                    top: node.getComputed("top"),
                }),
            [setLayout]
        )
    )

    return (
        <FlexNodeContextProvider newNode={node} context={context}>
            <div style={{ border: "1px solid #000", position: "absolute", ...style }}>
                <div style={{ position: "relative" }}>{children}</div>
            </div>
        </FlexNodeContextProvider>
    )
}

export function FlexDomRoot({ children, ...props }: PropsWithChildren<Partial<YogaNodeProperties>>) {
    const [style, setLayout] = useState({ top: 0, left: 0, width: 0, height: 0 })
    const context = useYogaRootNode(
        props,
        useCallback(
            (node) =>
                setLayout({
                    width: node.getComputed("width"),
                    height: node.getComputed("height"),
                    left: node.getComputed("left"),
                    top: node.getComputed("top"),
                }),
            [setLayout]
        ),
        10,
        1
    )
    return (
        <div style={{ width: 300, height: 300, position: "relative" }}>
            <FlexNodeContextProvider context={context}>
                <div style={{ border: "1px solid #000", position: "absolute", ...style }}>{children}</div>
            </FlexNodeContextProvider>
        </div>
    )
}
