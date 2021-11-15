import { useYogaNode, useYogaNodeContext, useYogaRootNode, YogaNodeContextProvider, YogaNodeProperties } from "co-flex"
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
import { a, useSpring } from "@react-spring/web"
import { useVirtual, VirtualBase, VirtualProps } from "co-virtualize"

const OffsetContext = createContext<{ zIndex?: number; left?: number; top?: number }>(null as any)

export function FlexDomSpringVirtualized({
    id,
    children,
    index,
    ...props
}: PropsWithChildren<Partial<{ id?: string; index?: number } & YogaNodeProperties>>) {
    const [layout, setLayout] = useState<Layout>({})
    const offset = useContext(OffsetContext)
    const context = useYogaNodeContext()
    const node = useYogaNode(
        props,
        index ?? 0,
        useCallback(
            (getLayoutValue) =>
                setLayout({
                    width: getLayoutValue("width"),
                    height: getLayoutValue("height"),
                    left: getLayoutValue("left"),
                    top: getLayoutValue("top"),
                }),
            []
        )
    )

    const globalLayout = useMemo<Layout & { zIndex: number }>(
        () => ({
            ...layout,
            zIndex: (offset.zIndex ?? 0) + 1,
            top: (offset.top ?? 0) + (layout.top ?? 0),
            left: (offset.left ?? 0) + (layout.left ?? 0),
        }),
        [offset, layout]
    )
    useVirtual(VirtualizedDiv, globalLayout, index, id)

    return (
        <YogaNodeContextProvider newParent={node} context={context}>
            <OffsetContext.Provider value={globalLayout}>{children}</OffsetContext.Provider>
        </YogaNodeContextProvider>
    )
}

export type Layout = { top?: number; left?: number; width?: number; height?: number }

export function FlexDomSpringVirtualizedRoot({ children, ...props }: PropsWithChildren<Partial<YogaNodeProperties>>) {
    const [layout, setLayout] = useState<Layout>({})
    const context = useYogaRootNode(
        props,
        useCallback(
            (getLayoutValue) =>
                setLayout({
                    width: getLayoutValue("width"),
                    height: getLayoutValue("height"),
                    left: getLayoutValue("left"),
                    top: getLayoutValue("top"),
                }),
            []
        ),
        globalThis.window != null ? window.innerWidth : 300,
        300,
        10,
        1
    )
    return (
        <YogaNodeContextProvider context={context}>
            <OffsetContext.Provider value={layout}>{children}</OffsetContext.Provider>
        </YogaNodeContextProvider>
    )
}

export function VirtualizedDiv({
    connected,
    destroy,
    zIndex,
    index,
    width,
    height,
    left,
    top,
}: VirtualProps & Layout & { zIndex?: number }) {
    const layoutCache = useRef<Layout>({})
    const layout = useMemo(() => {
        if (connected && width != null) {
            layoutCache.current = {
                width,
                height,
                left,
                top,
            }
        }
        return layoutCache.current
    }, [width, height, left, top, connected])
    const [style] = useSpring(
        {
            ...layout,
            opacity: layout.width != null && connected ? 1 : 0,
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
        <a.div
            style={{
                backgroundColor: "#fff",
                boxShadow: "0px 0px 20px rgba(0,0,0,0.2)",
                zIndex,
                position: "absolute",
                ...style,
            }}
        />
    )
}
