import { useYogaNode, useYogaRootNode, FlexNodeContextProvider, ChangeFlexNode } from "co-flex"
import { YogaNodeProperties } from "co-yoga"
import React, { FC, PropsWithChildren, useMemo, useRef, useState } from "react"
import { a, useSpring } from "@react-spring/three"
import { useVirtual, VirtualProps } from "co-virtualize"
import { BoxGeometry, Vector3Tuple } from "three"

const precision = 0.01

class ThreeSpringVirtualizedNode extends ChangeFlexNode {
    data = {
        x: 0,
        y: 0,
        z: 0,
    }

    constructor(precision: number, private setLayout?: (layout: Layout) => void) {
        super(precision)
    }

    onChange(node: this, parentNode: this): void {
        const nodeData = node.data
        nodeData.x = node.getComputed("left")
        nodeData.y = node.getComputed("top")
        nodeData.z = 0
        if (parentNode != null) {
            nodeData.x += parentNode.data.x
            nodeData.y += parentNode.data.y
            nodeData.z += parentNode.data.z
        }
        this.setLayout &&
            this.setLayout({
                position: [nodeData.x, nodeData.y, nodeData.z],
                scale: [node.getComputed("width"), node.getComputed("height"), depth],
            })
        nodeData.z += depth
    }
}

export function FlexThreeSpringVirtualized({
    id,
    children,
    render,
    index,
    zOffset,
    ...props
}: PropsWithChildren<
    Partial<{ zOffset?: number; render?: boolean; id?: string; index?: number } & YogaNodeProperties>
>) {
    const [layout, setLayout] = useState<Layout>({})
    
    const node = useMemo(() => new ThreeSpringVirtualizedNode(precision, setLayout), [setLayout])
    const context = useYogaNode(
        node,
        props,
        index ?? 0
    )

    const globalLayout = useMemo<Layout>(
        () => ({
            ...layout,
            position:
                layout.position != null
                    ? [
                          layout.position[0],
                          layout.position[1],
                          layout.position[2] + (render ? depth : 0) + (zOffset ?? 0),
                      ]
                    : undefined,
            render,
        }),
        [zOffset, layout, render]
    )
    useVirtual(VirtualizedBox, globalLayout, index, id)

    return <FlexNodeContextProvider context={context}>{children}</FlexNodeContextProvider>
}

export type Layout = { position?: Vector3Tuple; scale?: Vector3Tuple }

const depth = 0.1

export function FlexThreeSpringVirtualizedRoot({ children, ...props }: PropsWithChildren<Partial<YogaNodeProperties>>) {
    const node = useMemo(() => new ThreeSpringVirtualizedNode(precision), [])
    const context = useYogaRootNode(
        node,
        props,
        10
    )
    return <FlexNodeContextProvider context={context}>{children}</FlexNodeContextProvider>
}

const geometry = new BoxGeometry(1, 1, 1)
geometry.translate(0.5, 0.5, 0.5)

const Material = a.meshPhongMaterial as FC<any>

export function VirtualizedBox({ controllerProps, destroy }: VirtualProps<Layout & { render?: boolean }>) {
    const layoutCache = useRef<Layout & { render?: boolean }>({})
    const { render, ...layout } = useMemo(() => {
        if (controllerProps.length > 0 && controllerProps[0].position != null) {
            layoutCache.current = {
                ...controllerProps[0],
            }
        }
        return layoutCache.current
    }, [top, controllerProps])
    const [{ position, opacity, scale }] = useSpring(
        {
            ...layout,
            opacity: layout.position != null && controllerProps.length > 0 ? 1 : 0,
            onRest: {
                opacity: (val) => {
                    if (val.value === 0) {
                        destroy()
                    }
                },
            },
        },
        [layout, controllerProps]
    )

    if (!render) {
        return null
    }

    return (
        <a.mesh geometry={geometry} position={position} scale={scale}>
            <Material toneMapped={false} transparent color={0xffffff} opacity={opacity} />
        </a.mesh>
    )
}
