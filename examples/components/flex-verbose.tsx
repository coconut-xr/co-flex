import { useYogaNode, useYogaRootNode, FlexNodeContextProvider } from "co-flex"
import { YogaNodeProperties } from "co-yoga"
import React, { PropsWithChildren, useCallback, useState } from "react"

const undefinedFactory = () => undefined

export function FlexVerbose({ children, ...props }: PropsWithChildren<Partial<YogaNodeProperties>>) {
    const [{ width, height }, setSize] = useState({ width: 0, height: 0 })

    const context = useYogaNode<undefined>(
        props,
        0,
        useCallback(
            (node, parentNode) => {
                setSize({
                    width: node.getComputed("width"),
                    height: node.getComputed("height"),
                })
                node.processChildren()
            },
            [setSize]
        ),
        undefinedFactory
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

export function FlexVerboseRoot({ children, ...props }: PropsWithChildren<Partial<YogaNodeProperties>>) {
    const [{ width, height }, setSize] = useState({ width: 0, height: 0 })
    const context = useYogaRootNode<undefined>(
        props,
        useCallback(
            (node, parentNode) => {
                setSize({
                    width: node.getComputed("width"),
                    height: node.getComputed("height"),
                })
                node.processChildren()
            },
            [setSize]
        ),
        undefinedFactory
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
