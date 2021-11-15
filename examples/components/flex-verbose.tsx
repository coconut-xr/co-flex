import { useYogaNode, useYogaNodeContext, useYogaRootNode, YogaNodeContextProvider, YogaNodeProperties } from "co-flex"
import React, { PropsWithChildren, useCallback, useState } from "react"

export function FlexVerbose({ children, ...props }: PropsWithChildren<Partial<YogaNodeProperties>>) {
    const [{ width, height }, setSize] = useState({ width: 0, height: 0 })
    const context = useYogaNodeContext()
    const node = useYogaNode(
        props,
        0,
        useCallback(
            (getLayoutValue) =>
                setSize({
                    width: (getLayoutValue as any)("width"),
                    height: (getLayoutValue as any)("height"),
                }),
            [setSize]
        )
    )

    return (
        <YogaNodeContextProvider newParent={node} context={context}>
            <p>
                {width} x {height}
            </p>
            <div style={{ marginLeft: 10 }}>{children}</div>
        </YogaNodeContextProvider>
    )
}

export function FlexVerboseRoot({ children, ...props }: PropsWithChildren<Partial<YogaNodeProperties>>) {
    const [{ width, height }, setSize] = useState({ width: 0, height: 0 })
    const context = useYogaRootNode(
        props,
        useCallback(
            (getLayoutValue) =>
                setSize({
                    width: getLayoutValue("width"),
                    height: getLayoutValue("height"),
                }),
            [setSize]
        ),
        1,
        1
    )
    return (
        <YogaNodeContextProvider context={context}>
            <p>
                {width} x {height}
            </p>
            <div style={{ marginLeft: 10 }}>{children}</div>
        </YogaNodeContextProvider>
    )
}
