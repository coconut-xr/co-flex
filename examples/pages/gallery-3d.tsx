import { Layout } from "../components/flex-three-spring-virtualized"
import { createContext, PropsWithChildren, Suspense, useCallback, useContext, useMemo, useRef, useState } from "react"
import { useVirtual, VirtualBase, VirtualProps } from "co-virtualize"
import { YogaNodeProperties } from "co-yoga"
import { useSpring, a, SpringValue } from "@react-spring/three"
import { useYogaNode, useYogaRootNode, FlexNodeContextProvider, ChangeFlexNode } from "co-flex"
import { NextRouter, useRouter } from "next/dist/client/router"
import { Environment, PerspectiveCamera, Text, useGLTF } from "@react-three/drei"
import { Box3, BoxGeometry, EdgesGeometry, Material, Mesh, Object3D, PlaneGeometry, Vector3, Vector3Tuple } from "three"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useSVG } from "../components/svg"
import { useDrag } from "@use-gesture/react"

const modelurls: Array<string> = [
    "/co-flex/models/2CylinderEngine.glb",
    "/co-flex/models/Avocado.glb",
    "/co-flex/models/Buggy.glb",
]

export default function Index() {
    const router = useRouter()
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

const planeGeometry = new PlaneGeometry(1, 1)
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

const geometry = new EdgesGeometry(new BoxGeometry(1, 1, 1))
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

const precision = 0.001

class Gallery3dNode extends ChangeFlexNode {
    data = {
        x: 0,
        y: 0,
        z: 0,
    }

    constructor(precision: number, public widthDepthRatio?: number, private setLayout?: (layout: Layout) => void) {
        super(precision)
    }

    onChange(node: this, parentNode: this): void {
        const width = node.getComputed("width")
        const depth = this.widthDepthRatio == null ? 1 : width / this.widthDepthRatio

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
                position: [nodeData.x, -nodeData.y, nodeData.z],
                scale: [width, node.getComputed("height"), depth],
            })
    }
}

export function ContainerRoot({ children, ...props }: PropsWithChildren<Partial<YogaNodeProperties>>) {
    const node = useMemo(() => new Gallery3dNode(precision), [])
    const context = useYogaRootNode(node, props, 10)
    return <FlexNodeContextProvider context={context}>{children}</FlexNodeContextProvider>
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
    const node = useMemo(() => new Gallery3dNode(precision, widthDepthRatio, setLayout), [widthDepthRatio, setLayout])
    const context = useYogaNode(node, props, index ?? 0)

    const globalLayout = useMemo<Layout>(
        () => ({
            ...layout,
            content,
            rotate,
        }),
        [content, layout, rotate]
    )
    useVirtual(VirtualizedContainer, globalLayout, index, id)

    return <FlexNodeContextProvider context={context}>{children}</FlexNodeContextProvider>
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
