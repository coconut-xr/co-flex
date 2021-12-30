import { SpringValue } from "@react-spring/three"
import { GroupProps, useFrame, useLoader, useThree } from "@react-three/fiber"
import React, { useEffect } from "react"
import { useMemo } from "react"
import {
    Box3,
    BufferGeometry,
    Color,
    DoubleSide,
    Group,
    Material,
    Mesh,
    MeshBasicMaterial,
    Object3D,
    ShapeBufferGeometry,
    Vector3,
} from "three"
import { SVGLoader, SVGResultPaths } from "three-stdlib"

export function useSVG(url: string): Object3D {
    const data = useLoader(SVGLoader, url)
    return useMemo(() => {
        const paths = prepareSVGPaths(data.paths)
        const result = new Group()
        for (const path of paths) {
            path.bufferGeometry.scale(1, -1, 1)
            result.add(new Mesh(path.bufferGeometry, path.material))
        }
        return result
    }, [data.paths])
}

export type SVGPreparedPath = {
    bufferGeometry: BufferGeometry
    material: Material
}

export function prepareSVGPaths(paths: Array<SVGResultPaths>): Array<SVGPreparedPath> {
    return paths.reduce((result, path) => result.concat(prepareSVGPath(path)), [] as Array<SVGPreparedPath>)
}

export function prepareSVGPath(path: SVGResultPaths): Array<SVGPreparedPath> {
    const preparedPaths: Array<SVGPreparedPath> = []

    const strokeColor = path.userData?.style.stroke
    if (strokeColor !== undefined && strokeColor !== "none") {
        const storkeMaterial = new MeshBasicMaterial({
            color: new Color().setStyle(strokeColor),
            opacity: path.userData?.style.strokeOpacity,
            transparent: path.userData?.style.strokeOpacity < 1,
            side: DoubleSide,
            depthWrite: false,
        })

        preparedPaths.push(
            ...path.subPaths.map((subPath) => ({
                bufferGeometry: SVGLoader.pointsToStroke(subPath.getPoints(), path.userData?.style),
                material: storkeMaterial,
            }))
        )
    }

    const fillColor = path.userData?.style.fill
    if (fillColor !== undefined && fillColor !== "none") {
        const fillMaterial = new MeshBasicMaterial({
            color: new Color().setStyle(fillColor),
            opacity: path.userData?.style.fillOpacity,
            transparent: path.userData?.style.fillOpacity < 1,
            side: DoubleSide,
            depthWrite: false,
        })

        preparedPaths.push(
            ...path.toShapes(true).map((shape) => ({
                bufferGeometry: new ShapeBufferGeometry(shape),
                material: fillMaterial,
            }))
        )
    }

    return preparedPaths
}
