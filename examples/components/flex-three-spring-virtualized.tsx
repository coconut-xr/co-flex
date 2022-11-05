import { useYogaNode, useYogaRootNode, FlexNodeContextProvider, FlexNodeOnChange } from "co-flex"
import { YogaNodeProperties } from "co-yoga"
import React, { FC, PropsWithChildren, useCallback, useMemo, useRef, useState } from "react"
import { a, useSpring } from "@react-spring/three"
import { useVirtual, VirtualProps } from "co-virtualize"
import { BoxGeometry, Vector3Tuple } from "three"

type NodeData = { x: number; y: number; z: number }

function createInitData(): NodeData {
    return {
        x: 0,
        y: 0,
        z: 0,
    }
}

const onChangeFactory: (setLayout: ((layout: Layout) => void) | undefined) => FlexNodeOnChange<NodeData> =
    (setLayout) => (node, parentNode, processChildren) => {
        const nodeData = node.data
        nodeData.x = node.getComputed("left")
        nodeData.y = node.getComputed("top")
        nodeData.z = 0
        if (parentNode != null) {
            nodeData.x += parentNode.data.x
            nodeData.y += parentNode.data.y
            nodeData.z += parentNode.data.z
        }
        setLayout &&
            setLayout({
                position: [nodeData.x, nodeData.y, nodeData.z],
                scale: [node.getComputed("width"), node.getComputed("height"), depth],
            })
        nodeData.z += depth
        processChildren()
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
    const context = useYogaNode<NodeData>(
        props,
        index ?? 0,
        useMemo(() => onChangeFactory(setLayout), []),
        createInitData
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
    const context = useYogaRootNode<NodeData>(
        props,
        useMemo(() => onChangeFactory(undefined), []),
        createInitData,
        10,
        0.01
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
