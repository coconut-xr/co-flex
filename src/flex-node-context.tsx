import React, { createContext, useContext, useMemo } from "react"
import { FlexNode } from "co-yoga"

export type FlexNodeContext = {
    node: FlexNode
    precision: number
    requestLayoutCalculation: () => void
}

const FlexNodeContext = createContext<FlexNodeContext>(null as any)

export function FlexNodeContextProvider({
    children,
    newNode,
    context,
}: React.PropsWithChildren<{ newNode?: FlexNode; context: FlexNodeContext }>) {
    const ctx = useMemo(() => (newNode == null ? context : { ...context, node: newNode }), [newNode, context])
    return <FlexNodeContext.Provider value={ctx}> {children}</FlexNodeContext.Provider>
}

export function useFlexNodeContext(): FlexNodeContext {
    const context = useContext(FlexNodeContext)
    if (context == null) {
        throw `unable to find flex context. Missing a FlexNodeContextProvider.`
    }
    return context
}
