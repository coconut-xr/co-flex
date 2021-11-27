import { useYogaNode, useFlexNodeContext, useYogaRootNode, FlexNodeContextProvider } from "co-flex"
import { YogaNodeProperties } from "co-yoga"
import React, { PropsWithChildren, useCallback, useState } from "react"
import { a, useSpring } from "@react-spring/web"

export function FlexDomSpring({
    children,
    index,
    ...props
}: PropsWithChildren<Partial<{ index?: number } & YogaNodeProperties>>) {
    const [style, api] = useSpring({ top: -1, left: -1, width: -1, height: -1 }, [])
    const context = useYogaNode(
        props,
        index ?? 0,
        useCallback(
            (node) => {
                const newStyle = {
                    width: node.getComputed("width"),
                    height: node.getComputed("height"),
                    left: node.getComputed("left"),
                    top: node.getComputed("top"),
                }
                if (style.width.get() === -1) {
                    api.set(newStyle)
                } else {
                    api.start(newStyle)
                }
            },
            [api]
        )
    )

    return (
        <FlexNodeContextProvider context={context}>
            <a.div style={{ border: "1px solid #000", position: "absolute", ...style }}>{children}</a.div>
        </FlexNodeContextProvider>
    )
}

export function FlexDomSpringRoot({ children, ...props }: PropsWithChildren<Partial<YogaNodeProperties>>) {
    const [style, api] = useSpring({ width: -1, height: -1, top: -1, left: -1 }, [])
    const context = useYogaRootNode(
        props,
        useCallback(
            (node) => {
                const newStyle = {
                    width: node.getComputed("width"),
                    height: node.getComputed("height"),
                    left: node.getComputed("left"),
                    top: node.getComputed("top"),
                }
                if (style.width.get() === -1) {
                    api.set(newStyle)
                } else {
                    api.start(newStyle)
                }
            },
            [api]
        ),
        10,
        1
    )
    return (
        <div style={{ width: global.window != null ? window.innerWidth : 300, height: 300, position: "relative" }}>
            <FlexNodeContextProvider context={context}>
                <a.div style={{ border: "1px solid #000", position: "absolute", ...style }}>
                    <div style={{ position: "relative" }}>{children}</div>
                </a.div>
            </FlexNodeContextProvider>
        </div>
    )
}
