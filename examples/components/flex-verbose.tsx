import { useYogaNode, useFlexNodeContext, useYogaRootNode, FlexNodeContextProvider } from "co-flex"
import { YogaNodeProperties } from "co-yoga"
import React, { PropsWithChildren, useCallback, useState } from "react"

export function FlexVerbose({ children, ...props }: PropsWithChildren<Partial<YogaNodeProperties>>) {
    const [{ width, height }, setSize] = useState({ width: 0, height: 0 })
    const context = useFlexNodeContext()
    const node = useYogaNode(
        props,
        0,
        useCallback(
            (node) =>
                setSize({
                    width: node.getComputed("width"),
                    height: node.getComputed("height"),
                }),
            [setSize]
        )
    )

    return (
        <FlexNodeContextProvider newNode={node} context={context}>
            <p>
                {width} x {height}
            </p>
            <div style={{ marginLeft: 10 }}>{children}</div>
        </FlexNodeContextProvider>
    )
}

export function FlexVerboseRoot({ children, ...props }: PropsWithChildren<Partial<YogaNodeProperties>>) {
    const [{ width, height }, setSize] = useState({ width: 0, height: 0 })
    const context = useYogaRootNode(
        props,
        useCallback(
            (node) =>
                setSize({
                    width: node.getComputed("width"),
                    height: node.getComputed("height"),
                }),
            [setSize]
        )
    )
    return (
        <FlexNodeContextProvider context={context}>
            <p>
                {width} x {height}
            </p>
            <div style={{ marginLeft: 10 }}>{children}</div>
        </FlexNodeContextProvider>
    )
}
