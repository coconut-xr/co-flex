import { useYogaNode, useYogaRootNode, FlexNodeContextProvider, ChangeFlexNode } from "co-flex"
import { FlexNode, YogaNodeProperties } from "co-yoga"
import React, {
    createContext,
    PropsWithChildren,
    useContext,
    useMemo,
    useRef,
    useState,
} from "react"
import { a, useSpring } from "@react-spring/web"
import { useVirtual, VirtualProps } from "co-virtualize"

const precision = 1

const OffsetContext = createContext<{ zIndex?: number; left?: number; top?: number }>(null as any)

class DomSpringVirtualizedNode extends ChangeFlexNode {
    constructor(precision: number, private setLayout: (layout: Layout) => void) {
        super(precision)
    }

    onChange(node: this, parentNode: this | undefined): void {
        this.setLayout({
            width: node.getComputed("width"),
            height: node.getComputed("height"),
            left: node.getComputed("left"),
            top: node.getComputed("top"),
        })
    }
}

export function FlexDomSpringVirtualized({
    id,
    children,
    index,
    render,
    ...props
}: PropsWithChildren<Partial<{ render: boolean; id?: string; index?: number } & YogaNodeProperties>>) {
    const [layout, setLayout] = useState<Layout>({})
    const offset = useContext(OffsetContext)
    const node = useMemo(() => new DomSpringVirtualizedNode(precision, setLayout), [setLayout])
    const context = useYogaNode(node, props, index ?? 0)

    const globalLayout = useMemo<Layout & { zIndex: number; render?: boolean }>(
        () => ({
            ...layout,
            zIndex: (offset.zIndex ?? 0) + 1,
            top: (offset.top ?? 0) + (layout.top ?? 0),
            left: (offset.left ?? 0) + (layout.left ?? 0),
            render,
        }),
        [offset, layout, render]
    )

    useVirtual(VirtualizedDiv, globalLayout, index, id)

    return (
        <FlexNodeContextProvider context={context}>
            <OffsetContext.Provider value={globalLayout}>{children}</OffsetContext.Provider>
        </FlexNodeContextProvider>
    )
}

export type Layout = { top?: number; left?: number; width?: number; height?: number }

export function FlexDomSpringVirtualizedRoot({ children, ...props }: PropsWithChildren<Partial<YogaNodeProperties>>) {
    const [layout, setLayout] = useState<Layout>({})
    const node = useMemo(() => new DomSpringVirtualizedNode(precision, setLayout), [setLayout])
    const context = useYogaRootNode(node, props, 10)
    return (
        <div>
            <FlexNodeContextProvider context={context}>
                <OffsetContext.Provider value={layout}>{children}</OffsetContext.Provider>
            </FlexNodeContextProvider>
        </div>
    )
}

export function VirtualizedDiv({
    destroy,
    controllerProps,
}: VirtualProps<Layout & { zIndex?: number; render?: boolean }>) {
    const layoutCache = useRef<Layout & { zIndex?: number; render?: boolean }>({})
    const { zIndex, render, ...layout } = useMemo(() => {
        if (controllerProps.length > 0 && controllerProps[0].width != null) {
            layoutCache.current = {
                ...controllerProps[0],
            }
        }
        return layoutCache.current
    }, [controllerProps])
    const [style] = useSpring(
        {
            ...layout,
            opacity: layout.width != null && controllerProps.length > 0 ? 1 : 0,
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
        <a.div
            style={{
                backgroundColor: "#fff",
                boxShadow: "0px 0px 20px rgba(0,0,0,0.2)",
                position: "absolute",
                zIndex,
                ...style,
            }}
        />
    )
}
