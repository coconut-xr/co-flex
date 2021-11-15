import React, { createContext, useCallback, useContext, useEffect, useMemo } from "react"
import { YogaEdge, YogaNode } from "yoga-layout-prebuilt"
import { capitalize } from "."
import { ExtendedNode } from "./flex-node"

export type FilterGetComputed<T, Name extends keyof T> = Name extends `getComputed${infer PropertyName}`
    ? T[Name] extends (...args: Array<any>) => number
        ? PropertyName
        : never
    : never
export type GetParams<T, Key extends keyof T> = T[Key] extends (...args: infer Params) => number
    ? Params extends []
        ? []
        : [edge: YogaEdge]
    : never

export type LayoutKeys = Uncapitalize<FilterGetComputed<YogaNode, keyof YogaNode>>

export type BoundGetLayoutValue = <Key extends LayoutKeys>(
    key: Key,
    ...params: GetParams<YogaNode, `getComputed${Capitalize<Key>}`>
) => number

export function getLayoutValue<Key extends LayoutKeys>(
    node: YogaNode,
    precision: number,
    key: Key,
    ...params: GetParams<YogaNode, `getComputed${Capitalize<Key>}`>
) {
    const func = node[`getComputed${capitalize(key)}`]
    if (func == null) {
        throw `layout value "${key}" is not exisiting`
    }
    return func.call(node, ...params) * precision
}

export type YogaNodeContext = {
    addChild(node: YogaNode, index: number): void
    removeChild(node: YogaNode): void
    createNode(onCalculated: (getLayoutValue: BoundGetLayoutValue) => void): ExtendedNode
    requestLayoutCalculation: () => void
}

const YogaNodeContext = createContext<YogaNodeContext>(null as any)

export function YogaNodeContextProvider({
    children,
    newParent,
    context,
}: React.PropsWithChildren<{ newParent?: YogaNode; context: YogaNodeContext }>) {
    const ctx = useMemo(
        () => (newParent == null ? context : { ...context, parentNode: newParent }),
        [newParent, context]
    )
    return <YogaNodeContext.Provider value={ctx}> {children}</YogaNodeContext.Provider>
}

export function useYogaNodeContext(): YogaNodeContext {
    const context = useContext(YogaNodeContext)
    if (context == null) {
        throw `unable to find yoga context. Missing a YogaNodeContextProvider.`
    }
    return context
}
