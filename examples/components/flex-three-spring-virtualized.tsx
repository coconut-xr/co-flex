import { useYogaNode, useFlexNodeContext, useYogaRootNode, FlexNodeContextProvider } from "co-flex"
import { YogaNodeProperties } from "co-yoga"
import React, { createContext, PropsWithChildren, useCallback, useContext, useMemo, useRef, useState } from "react"
import { a, useSpring } from "@react-spring/three"
import { useVirtual, VirtualProps } from "co-virtualize"
import { BoxBufferGeometry, Vector3Tuple } from "three"

const OffsetContext = createContext<{ position?: Vector3Tuple }>(null as any)

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
    const offset = useContext(OffsetContext)
    const context = useFlexNodeContext()
    const node = useYogaNode(
        props,
        index ?? 0,
        useCallback(
            (node) =>
                setLayout({
                    position: [node.getComputed("left"), node.getComputed("top"), 0],
                    scale: [node.getComputed("width"), node.getComputed("height"), depth],
                }),
            []
        )
    )

    const globalLayout = useMemo<Layout>(
        () => ({
            ...layout,
            position:
                layout.position != null && offset.position != null
                    ? [
                          layout.position[0] + offset.position[0],
                          layout.position[1] + offset.position[1],
                          layout.position[2] + offset.position[2] + depth + (zOffset ?? 0),
                      ]
                    : undefined,
            render,
        }),
        [offset, zOffset, layout, render]
    )
    useVirtual(VirtualizedBox, globalLayout, index, id)

    return (
        <FlexNodeContextProvider newNode={node} context={context}>
            <OffsetContext.Provider value={globalLayout}>{children}</OffsetContext.Provider>
        </FlexNodeContextProvider>
    )
}

export type Layout = { position?: Vector3Tuple; scale?: Vector3Tuple }

const depth = 0.1

export function FlexThreeSpringVirtualizedRoot({ children, ...props }: PropsWithChildren<Partial<YogaNodeProperties>>) {
    const [layout, setLayout] = useState<Layout>({})
    const context = useYogaRootNode(
        props,
        useCallback(
            (node) =>
                setLayout({
                    position: [node.getComputed("left"), node.getComputed("top"), 0],
                    scale: [node.getComputed("width"), node.getComputed("height"), depth],
                }),
            []
        ),
        10,
        0.01
    )
    return (
        <FlexNodeContextProvider context={context}>
            <OffsetContext.Provider value={layout}>{children}</OffsetContext.Provider>
        </FlexNodeContextProvider>
    )
}

const geometry = new BoxBufferGeometry(1, 1, 1)
geometry.translate(0.5, 0.5, 0.5)

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
            <a.meshPhongMaterial toneMapped={false} transparent color={0xffffff} opacity={opacity} />
        </a.mesh>
    )
}
