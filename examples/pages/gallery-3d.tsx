import { Layout } from "../components/flex-three-spring-virtualized"
import {
    createContext,
    MutableRefObject,
    PropsWithChildren,
    ReactNode,
    RefObject,
    Suspense,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react"
import { useVirtual, VirtualBase, VirtualProps } from "co-virtualize"
import { YogaNodeProperties } from "co-yoga"
import { useSpring, a, SpringValue } from "@react-spring/three"
import { useYogaNode, useYogaRootNode, FlexNodeContextProvider } from "co-flex"
import { NextRouter, useRouter } from "next/dist/client/router"
import { Box, Environment, OrbitControls, PerspectiveCamera, Plane, Text, useGLTF } from "@react-three/drei"
import {
    Box3,
    BoxBufferGeometry,
    EdgesGeometry,
    Material,
    Mesh,
    Object3D,
    PlaneBufferGeometry,
    Vector3,
    Vector3Tuple,
} from "three"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useSVG } from "../components/svg"
import { useDrag } from "@use-gesture/react"

const OffsetContext = createContext<{ position?: Vector3Tuple }>(null as any)

const modelurls: Array<string> = [
    "/co-flex/models/2CylinderEngine.glb",
    "/co-flex/models/Avocado.glb",
    "/co-flex/models/Buggy.glb",
]

export default function Index() {
    const router = useRouter()
    if (!router.isReady) {
        return null
    }
    return (
        <Canvas
            style={{ touchAction: "none", width: "100vw", height: "100vh" }}
            gl={{ antialias: true }}
            dpr={global.window == null ? undefined : window.devicePixelRatio}>
            <Scene router={router} />
        </Canvas>
    )
}

const fov = 10
const near = 0.01
const fovInRadians = (fov * Math.PI) / 180

const distance = 1 / Math.tan(fovInRadians / 2)

function Scene({ router }: { router: NextRouter }) {
    const ratio = useThree((s) => s.size.width / s.size.height)
    return (
        <>
            <Suspense fallback={null}>
                <Environment preset="city" />
            </Suspense>
            <PerspectiveCamera fov={fov} near={near} makeDefault position={[0, 0, distance]} />
            <ambientLight intensity={0.1} />
            <group scale={2} position={[-ratio, 1, 0]}>
                <VirtualBase>
                    <ContainerRoot width={ratio} height={1} flexDirection="column">
                        <Suspense fallback={null}>
                            <Toolbar router={router} back={router.query.url != null} />
                        </Suspense>
                        {router.query.url == null ? (
                            <GridLayout router={router} />
                        ) : (
                            <Suspense fallback={null}>
                                <SingleLayout url={router.query.url as string} />
                            </Suspense>
                        )}
                    </ContainerRoot>
                </VirtualBase>
            </group>
        </>
    )
}

function GridLayout({ router }: { router: NextRouter }) {
    return (
        <Container index={1} flexDirection="row" flexWrap="wrap" flexGrow={1}>
            {modelurls.map((url, i) => (
                <Suspense key={url} fallback={null}>
                    <GridItem index={i} router={router} url={url} />
                </Suspense>
            ))}
        </Container>
    )
}

const planeGeometry = new PlaneBufferGeometry(1, 1)
planeGeometry.translate(0.5, -0.5, 0)

function Toolbar({ back, router }: { router: NextRouter; back: boolean }) {
    const backIcon = useSVG("/co-flex/back.svg")
    return (
        <Container index={0} height={0.08} width="100%" flexDirection="row" alignItems="center">
            {back && (
                <Container
                    marginLeft={0.03}
                    index={0}
                    width={0.02}
                    height={0.03}
                    content={(opacity) => (
                        <>
                            <mesh
                                geometry={planeGeometry}
                                visible={false}
                                onClick={(e) => {
                                    e.stopPropagation()
                                    router.back()
                                }}
                            />
                            <Normalized opacity={opacity} object={backIcon} />
                        </>
                    )}
                />
            )}
            <Container
                marginLeft={0.03}
                index={1}
                width={0.038}
                height={0.038}
                content={() => (
                    <Text anchorX={"left"} anchorY={"top"} color={0x0} fontSize={1}>
                        Gallery 3D
                    </Text>
                )}
            />
        </Container>
    )
}

const geometry = new EdgesGeometry(new BoxBufferGeometry(1, 1, 1))
geometry.translate(0.5, -0.5, -0.5)

function Normalized({
    opacity,
    object,
    rotation,
}: {
    rotation?: SpringValue<Vector3Tuple>
    opacity: SpringValue<number>
    object: Object3D
}) {
    const [moveToCenter, params] = useMemo(() => {
        object.traverse((o) => {
            if (o instanceof Mesh) {
                ;(o.material as Material).transparent = true
            }
        })
        boxHelper.setFromObject(object)

        boxHelper.getCenter(vec3Helper)
        const moveTocenter: Vector3Tuple = [-vec3Helper.x, -vec3Helper.y, -vec3Helper.z]

        boxHelper.getSize(vec3Helper)
        const scale: Vector3Tuple = [1 / vec3Helper.x, 1 / vec3Helper.y, vec3Helper.z === 0 ? 1 : 1 / vec3Helper.z]
        const position: Vector3Tuple = [
            (-boxHelper.min.x - moveTocenter[0]) * scale[0],
            (-boxHelper.max.y - moveTocenter[1]) * scale[1],
            (-boxHelper.max.z - moveTocenter[2]) * scale[2],
        ]
        return [
            moveTocenter,
            {
                position,
                scale,
            },
        ]
    }, [object])
    useFrame(() => {
        object.traverse((o) => {
            if (o instanceof Mesh) {
                ;(o.material as Material).opacity = opacity.get()
            }
        })
    })
    return (
        <group {...params}>
            <a.group rotation={rotation as any}>
                <group position={moveToCenter}>
                    <primitive object={object} />
                </group>
            </a.group>
        </group>
    )
}

const boxHelper = new Box3()
const vec3Helper = new Vector3()

function GridItem({ url, router, index }: { index: number; router: NextRouter; url: string }) {
    const gltf = useGLTF(url)
    const scene = useMemo(() => gltf.scene.clone(true), [gltf.scene])
    const [ratio, widthDepthRatio] = useMemo(() => {
        boxHelper.setFromObject(scene)
        boxHelper.getSize(vec3Helper)
        return [vec3Helper.x / vec3Helper.y, vec3Helper.x / vec3Helper.z]
    }, [scene])
    return (
        <Container
            id={url}
            index={index}
            widthDepthRatio={widthDepthRatio}
            content={(opacity, rotation) => (
                <group
                    onClick={(e) => {
                        e.stopPropagation()
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
                    }}>
                    <Normalized rotation={rotation} opacity={opacity} object={scene} />
                </group>
            )}
            marginBottom={0.05}
            marginLeft={0.05}
            marginRight={0.05}
            marginTop={0.05}
            maxWidth={0.4 * ratio}
            flexShrink={1}
            aspectRatio={ratio}
        />
    )
}

function SingleLayout({ url }: { url: string }) {
    const gltf = useGLTF(url)
    const scene = useMemo(() => gltf.scene.clone(true), [gltf.scene])
    const [ratio, widthDepthRatio] = useMemo(() => {
        boxHelper.setFromObject(scene)
        boxHelper.getSize(vec3Helper)
        return [vec3Helper.x / vec3Helper.y, vec3Helper.x / vec3Helper.z]
    }, [scene])

    return (
        <Container
            index={1}
            marginBottom={0.05}
            marginLeft={0.05}
            marginRight={0.05}
            marginTop={0.05}
            flexDirection="row"
            justifyContent="center"
            flexGrow={1}>
            <Container
                widthDepthRatio={widthDepthRatio}
                flexShrink={1}
                id={url}
                rotate
                content={(opacity, rotation) => <Normalized rotation={rotation} opacity={opacity} object={scene} />}
                aspectRatio={ratio}
            />
        </Container>
    )
}

export function ContainerRoot({ children, ...props }: PropsWithChildren<Partial<YogaNodeProperties>>) {
    const [layout, setLayout] = useState<Layout>({})
    const context = useYogaRootNode(
        props,
        useCallback(
            (node) =>
                setLayout({
                    position: [node.getComputed("left"), -node.getComputed("top"), 0],
                    scale: [node.getComputed("width"), node.getComputed("height"), 1],
                }),
            []
        ),
        10,
        0.001
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
    widthDepthRatio,
    rotate,
    ...props
}: PropsWithChildren<
    Partial<
        {
            content?: (opacity: SpringValue<number>, rotation: SpringValue<Vector3Tuple>) => JSX.Element
            rotate: boolean
            widthDepthRatio: number
            id?: string
            index?: number
        } & YogaNodeProperties
    >
>) {
    const [layout, setLayout] = useState<Layout>({})
    const offset = useContext(OffsetContext)
    const context = useYogaNode(
        props,
        index ?? 0,
        useCallback(
            (node) => {
                const width = node.getComputed("width")
                const depth = widthDepthRatio == null ? 1 : width / widthDepthRatio
                setLayout({
                    position: [node.getComputed("left"), -node.getComputed("top"), 0],
                    scale: [width, node.getComputed("height"), depth],
                })
            },
            [widthDepthRatio]
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
                          layout.position[2] + offset.position[2],
                      ]
                    : undefined,
            content,
            rotate,
        }),
        [offset, content, layout, rotate]
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
}: VirtualProps<
    Layout & {
        zIndex?: number
        rotate?: boolean
        content?: (opacity: SpringValue<number>, rotation: SpringValue<Vector3Tuple>) => JSX.Element
    }
>) {
    const layoutCache = useRef<
        Layout & {
            rotate?: boolean
            content?: (opacity: SpringValue<number>, rotation: SpringValue<Vector3Tuple>) => JSX.Element
        }
    >({})
    const { content, rotate, ...layout } = useMemo(() => {
        if (controllerProps.length > 0 && controllerProps[0].position != null) {
            layoutCache.current = {
                ...controllerProps[0],
            }
        }
        return layoutCache.current
    }, [top, controllerProps])
    const [{ position, opacity, scale, rotation }] = useSpring(
        {
            rotation: [0, 0, 0] as Vector3Tuple,
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

    useDrag(
        ({ down, delta: [mx, my] }) => {
            if (down && rotate) {
                const x2 = (my / window.innerHeight) * 10
                const y2 = (mx / window.innerHeight) * 10
                const [x1, y1] = rotation.goal
                rotation.start([x1 + x2, y1 + y2, 0])
            }
        },
        {
            target: typeof window === "undefined" ? undefined : window,
        }
    )
    if (content == null) {
        return null
    }

    return (
        <a.group position={position} scale={scale}>
            {content(opacity, rotation)}
        </a.group>
    )
}
