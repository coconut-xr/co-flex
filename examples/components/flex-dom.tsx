import { useYogaNode, useYogaNodeContext, useYogaRootNode, YogaNodeContextProvider, YogaNodeProperties } from "co-flex"
import React, { PropsWithChildren, useCallback, useState } from "react"

export function FlexDom({
    children,
    index,
    ...props
}: PropsWithChildren<Partial<{ index?: number } & YogaNodeProperties>>) {
    const [style, setLayout] = useState({ top: 0, left: 0, width: 0, height: 0 })
    const context = useYogaNodeContext()
    const node = useYogaNode(
        props,
        index ?? 0,
        useCallback(
            (getLayoutValue) =>
                setLayout({
                    width: getLayoutValue("width"),
                    height: getLayoutValue("height"),
                    left: getLayoutValue("left"),
                    top: getLayoutValue("top"),
                }),
            [setLayout]
        )
    )

    return (
        <YogaNodeContextProvider newParent={node} context={context}>
            <div style={{ border: "1px solid #000", position: "absolute", ...style }}>
                <div style={{ position: "relative" }}>{children}</div>
            </div>
        </YogaNodeContextProvider>
    )
}

export function FlexDomRoot({ children, ...props }: PropsWithChildren<Partial<YogaNodeProperties>>) {
    const [style, setLayout] = useState({ top: 0, left: 0, width: 0, height: 0 })
    const context = useYogaRootNode(
        props,
        useCallback(
            (getLayoutValue) =>
                setLayout({
                    width: getLayoutValue("width"),
                    height: getLayoutValue("height"),
                    left: getLayoutValue("left"),
                    top: getLayoutValue("top"),
                }),
            [setLayout]
        ),
        global.window != null ? window.innerWidth : 300,
        300
    )
    return (
        <div style={{ width: global.window != null ? window.innerWidth : 300, height: 300, position: "relative" }}>
            <YogaNodeContextProvider context={context}>
                <div style={{ border: "1px solid #000", position: "absolute", ...style }}>
                    <div style={{ position: "relative" }}>{children}</div>
                </div>
            </YogaNodeContextProvider>
        </div>
    )
}
