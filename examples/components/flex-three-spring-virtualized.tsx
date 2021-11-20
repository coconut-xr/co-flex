import { useYogaNode, useFlexNodeContext, useYogaRootNode, FlexNodeContextProvider } from "co-flex"
import { YogaNodeProperties } from "co-yoga"
import React, {
    createContext,
    PropsWithChildren,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react"
import { a, useSpring } from "@react-spring/three"
import { useVirtual, VirtualBase, VirtualProps } from "co-virtualize"
import { BoxBufferGeometry, Vector3Tuple } from "three"
import { Canvas } from "@react-three/fiber"

const OffsetContext = createContext<{ position?: Vector3Tuple }>(null as any)

export function FlexThreeSpringVirtualized({
    id,
    children,
    index,
    ...props
}: PropsWithChildren<Partial<{ id?: string; index?: number } & YogaNodeProperties>>) {
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
            position: [
                (layout.position?.[0] ?? 0) + (offset.position?.[0] ?? 0),
                (layout.position?.[1] ?? 0) + (offset.position?.[1] ?? 0),
                (layout.position?.[2] ?? 0) + (offset.position?.[2] ?? 0) + depth,
            ],
        }),
        [offset, layout]
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

export function VirtualizedBox({ connected, destroy, index, position: p, scale: s }: VirtualProps & Layout) {
    const layoutCache = useRef<Layout>({})
    const layout = useMemo(() => {
        if (connected && p != null) {
            layoutCache.current = {
                position: p,
                scale: s,
            }
        }
        return layoutCache.current
    }, [p, s, top, connected])
    const [{ position, opacity, scale }] = useSpring(
        {
            ...layout,
            opacity: layout.position != null && connected ? 1 : 0,
            onRest: {
                opacity: (val) => {
                    if (val.value === 0) {
                        destroy()
                    }
                },
            },
        },
        [layout, connected]
    )

    return (
        <a.mesh geometry={geometry} position={position} scale={scale}>
            <a.meshPhongMaterial toneMapped={false} transparent color={0xffffff} opacity={opacity} />
        </a.mesh>
    )
}
