import { useYogaNode, useYogaRootNode, FlexNodeContextProvider, ChangeFlexNode } from "co-flex"
import { FlexNode, YogaNodeProperties } from "co-yoga"
import React, { PropsWithChildren, useMemo } from "react"
import { a, SpringRef, SpringValue, useSpring, useSpringRef } from "@react-spring/web"

const precision = 1

class DomSpringNode extends ChangeFlexNode {
    constructor(
        precision: number,
        private width: SpringValue<number>,
        private api: SpringRef<{
            width: number
            height: number
            left: number
            top: number
        }>
    ) {
        super(precision)
    }

    onChange(node: this, parentNode: this | undefined): void {
        const newStyle = {
            width: node.getComputed("width"),
            height: node.getComputed("height"),
            left: node.getComputed("left"),
            top: node.getComputed("top"),
        }

        if (this.width.get() === -1) {
            this.api.set(newStyle)
        } else {
            this.api.start(newStyle)
        }
    }
}

export function FlexDomSpring({
    children,
    index,
    ...props
}: PropsWithChildren<Partial<{ index?: number } & YogaNodeProperties>>) {
    const [style, api] = useSpring({ top: -1, left: -1, width: -1, height: -1 }, [])
    const node = useMemo(() => new DomSpringNode(precision, style.width, api), [style.width, api])
    const context = useYogaNode(node, props, index ?? 0)

    return (
        <FlexNodeContextProvider context={context}>
            <a.div style={{ border: "1px solid #000", position: "absolute", ...style }}>{children}</a.div>
        </FlexNodeContextProvider>
    )
}

export function FlexDomSpringRoot({ children, ...props }: PropsWithChildren<Partial<YogaNodeProperties>>) {
    const [style, api] = useSpring({ width: -1, height: -1, top: -1, left: -1 }, [])
    const node = useMemo(() => new DomSpringNode(precision, style.width, api), [style.width, api])
    const context = useYogaRootNode(node, props, 10)
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
