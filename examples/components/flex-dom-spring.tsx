import { useYogaNode, useYogaNodeContext, useYogaRootNode, YogaNodeContextProvider, YogaNodeProperties } from "co-flex"
import React, { PropsWithChildren, useCallback, useState } from "react"
import { a, useSpring } from "@react-spring/web"

export function FlexDomSpring({
    children,
    index,
    ...props
}: PropsWithChildren<Partial<{ index?: number } & YogaNodeProperties>>) {
    const [style, api] = useSpring({ top: -1, left: -1, width: -1, height: -1 }, [])
    const context = useYogaNodeContext()
    const node = useYogaNode(
        props,
        index ?? 0,
        useCallback(
            (getLayoutValue) => {
                const newStyle = {
                    width: getLayoutValue("width"),
                    height: getLayoutValue("height"),
                    left: getLayoutValue("left"),
                    top: getLayoutValue("top"),
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
        <YogaNodeContextProvider newParent={node} context={context}>
            <a.div style={{ border: "1px solid #000", position: "absolute", ...style }}>
                <div style={{ position: "relative" }}>{children}</div>
            </a.div>
        </YogaNodeContextProvider>
    )
}

export function FlexDomSpringRoot({ children, ...props }: PropsWithChildren<Partial<YogaNodeProperties>>) {
    const [style, api] = useSpring({ width: -1, height: -1, top: -1, left: -1 }, [])
    const context = useYogaRootNode(
        props,
        useCallback(
            (getLayoutValue) => {
                const newStyle = {
                    width: getLayoutValue("width"),
                    height: getLayoutValue("height"),
                    left: getLayoutValue("left"),
                    top: getLayoutValue("top"),
                }
                if (style.width.get() === -1) {
                    api.set(newStyle)
                } else {
                    api.start(newStyle)
                }
            },
            [api]
        ),
        global.window != null ? window.innerWidth : 300,
        300
    )
    return (
        <div style={{ width: global.window != null ? window.innerWidth : 300, height: 300, position: "relative" }}>
            <YogaNodeContextProvider context={context}>
                <a.div style={{ border: "1px solid #000", position: "absolute", ...style }}>
                    <div style={{ position: "relative" }}>{children}</div>
                </a.div>
            </YogaNodeContextProvider>
        </div>
    )
}
