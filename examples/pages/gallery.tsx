import { Layout } from "../components/flex-dom-spring-virtualized"
import {
    createContext,
    PropsWithChildren,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react"
import { useVirtual, VirtualBase, VirtualProps } from "co-virtualize"
import { YogaNodeProperties } from "co-yoga"
import { useSpring, a } from "@react-spring/web"
import { useYogaNode, useYogaRootNode, FlexNodeContextProvider, ChangeFlexNode } from "co-flex"
import { useRouter } from "next/dist/client/router"

const OffsetContext = createContext<{ zIndex?: number; left?: number; top?: number }>(null as any)

const imageUrls: Array<string> = [
    "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
    "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    "https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Zm9jdXN8ZW58MHx8MHx8&w=1000&q=80",
]

const imageMap: Map<string, HTMLImageElement> =
    global.document == null
        ? new Map()
        : new Map(
              imageUrls.map<[string, HTMLImageElement]>((url) => {
                  const img = document.createElement("img")
                  img.src = url
                  return [url, img]
              })
          )

export default function Index() {
    const router = useRouter()
    const [width, height] = useSize()
    return (
        <div
            style={{
                background: "#fff",
                overflow: "hidden",
                top: 0,
                right: 0,
                left: 0,
                bottom: 0,
                position: "absolute",
            }}>
            <VirtualBase>
                <ContainerRoot width={width} height={height} flexDirection="column">
                    <Toolbar back={router.query.url != null} />
                    {router.query.url == null ? <GridLayout /> : <SingleLayout url={router.query.url as string} />}
                </ContainerRoot>
            </VirtualBase>
        </div>
    )
}

function GridLayout() {
    return (
        <Container flexDirection="row" flexWrap="wrap" flexGrow={1}>
            {imageUrls.map((url) => (
                <GridItem key={url} url={url} />
            ))}
        </Container>
    )
}

function Toolbar({ back }: { back: boolean }) {
    const router = useRouter()
    return (
        <Container height={60} width="100%" flexDirection="row" alignItems="center">
            {back && (
                <Container
                    marginLeft={20}
                    index={0}
                    width={24}
                    height={24}
                    content={
                        <img
                            alt="back btn"
                            width="100%"
                            height="100%"
                            onClick={() => router.back()}
                            className="pointer"
                            src="/co-flex/back.svg"
                        />
                    }
                />
            )}
            <Container
                marginLeft={20}
                index={1}
                width={200}
                height={38}
                content={
                    <span style={{ fontSize: 26 }} className="mb-1">
                        Gallery
                    </span>
                }
            />
        </Container>
    )
}

function GridItem({ url }: { url: string }) {
    const ratio = useRatio(url)
    const router = useRouter()
    return (
        <Container
            id={url}
            content={
                <img
                    alt={url}
                    width="100%"
                    height="100%"
                    className="pointer"
                    onClick={() =>
                        router.push(
                            {
                                query: {
                                    url,
                                },
                            },
                            undefined,
                            {
                                shallow: true,
                            }
                        )
                    }
                    src={url}
                />
            }
            marginBottom={20}
            marginLeft={20}
            marginRight={20}
            marginTop={20}
            width={Math.round(150 * ratio)}
            aspectRatio={ratio}
        />
    )
}

function SingleLayout({ url }: { url: string }) {
    const ratio = useRatio(url)
    return (
        <Container
            marginBottom={20}
            marginLeft={20}
            marginRight={20}
            marginTop={20}
            flexDirection="row"
            justifyContent="center"
            flexGrow={1}>
            <Container
                flexShrink={1}
                id={url}
                content={<img alt={url} width="100%" height="100%" src={url} />}
                aspectRatio={ratio}
            />
        </Container>
    )
}

function useRatio(url: string): number {
    const img = imageMap.get(url)
    const [ratio, setRatio] = useState(img?.complete ? img?.naturalWidth / img?.naturalHeight : 1)
    useEffect(() => {
        if (img == null || img.complete) {
            return
        }
        const listener = () => setRatio(img.naturalWidth / img.naturalHeight)
        img.addEventListener("load", listener)
        return () => img.removeEventListener("load", listener)
    }, [])
    return ratio
}

function useSize(): [number, number] {
    const [size, setSize] = useState<[number, number]>(
        global.window == null ? [0, 0] : [window.innerWidth, window.innerHeight]
    )
    useEffect(() => {
        const listener = () => setSize([window.innerWidth, window.innerHeight])
        window.addEventListener("resize", listener)
        return () => window.removeEventListener("resize", listener)
    }, [])
    return size
}

const precision = 1

class GalleryNode extends ChangeFlexNode {
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

export function ContainerRoot({ children, ...props }: PropsWithChildren<Partial<YogaNodeProperties>>) {
    const [layout, setLayout] = useState<Layout>({})
    const node = useMemo(() => new GalleryNode(precision, setLayout), [setLayout])
    const context = useYogaRootNode(
        node,
        props,
        10
    )
    return (
        <FlexNodeContextProvider context={context}>
            <OffsetContext.Provider value={layout}>{children}</OffsetContext.Provider>
        </FlexNodeContextProvider>
    )
}

export function Container({
    id,
    children,
    index,
    content,
    ...props
}: PropsWithChildren<
    Partial<
        {
            content?: JSX.Element
            id?: string
            index?: number
        } & YogaNodeProperties
    >
>) {
    const [layout, setLayout] = useState<Layout>({})
    const offset = useContext(OffsetContext)
    const node = useMemo(() => new GalleryNode(precision, setLayout), [setLayout])
    const context = useYogaNode(
        node,
        props,
        index ?? 0
    )

    const globalLayout = useMemo<Layout & { zIndex: number; content?: JSX.Element }>(
        () => ({
            ...layout,
            zIndex: (offset.zIndex ?? 0) + 1,
            top: (offset.top ?? 0) + (layout.top ?? 0),
            left: (offset.left ?? 0) + (layout.left ?? 0),
            content,
        }),
        [offset, layout, content]
    )

    useVirtual(VirtualizedContainer, globalLayout, index, id)

    return (
        <FlexNodeContextProvider context={context}>
            <OffsetContext.Provider value={globalLayout}>{children}</OffsetContext.Provider>
        </FlexNodeContextProvider>
    )
}

export function VirtualizedContainer({
    destroy,
    controllerProps,
}: VirtualProps<Layout & { zIndex?: number; content?: JSX.Element }>) {
    const layoutCache = useRef<Layout & { zIndex?: number; content?: JSX.Element }>({})
    const { zIndex, content, ...layout } = useMemo(() => {
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
    if (content == null) {
        return null
    }

    return (
        <a.div
            style={{
                position: "absolute",
                zIndex,
                ...style,
            }}>
            {content}
        </a.div>
    )
}
