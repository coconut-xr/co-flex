import { useYogaNode, useYogaRootNode, FlexNodeContextProvider } from "co-flex"
import { YogaNodeProperties } from "co-yoga"
import React, { FC, PropsWithChildren, useCallback, useMemo, useRef, useState } from "react"
import { a, useSpring } from "@react-spring/three"
import { useVirtual, VirtualProps } from "co-virtualize"
import { BoxGeometry, Vector3Tuple } from "three"

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
    const context = useYogaNode<{ x: number; y: number; z: number }>(
        props,
        index ?? 0,
        useCallback((node, parentData) => {
            let x = node.getComputed("left")
            let y = node.getComputed("top")
            let z = 0
            if (parentData != null) {
                x += parentData.x
                y += parentData.y
                z += parentData.z
            }
            setLayout({
                position: [x, y, z],
                scale: [node.getComputed("width"), node.getComputed("height"), depth],
            })
            return {
                x,
                y,
                z: z + depth,
            }
        }, [])
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
    const context = useYogaRootNode<{ x: number; y: number; z: number }>(
        props,
        useCallback((node, parentData) => {
            let x = node.getComputed("left")
            let y = node.getComputed("top")
            let z = 0
            if (parentData != null) {
                x += parentData.x
                y += parentData.y
                z += parentData.z
            }
            return {
                x,
                y,
                z,
            }
        }, []),
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
