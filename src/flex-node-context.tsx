import React, { createContext, useContext } from "react"
import { FlexNode } from "co-yoga"

export type FlexNodeContext = {
    node: FlexNode
    requestLayoutCalculation: () => void
}

const FlexNodeContext = createContext<FlexNodeContext>(null as any)

export function FlexNodeContextProvider({ children, context }: React.PropsWithChildren<{ context: FlexNodeContext }>) {
    return <FlexNodeContext.Provider value={context}>{children}</FlexNodeContext.Provider>
}

export function useFlexNodeContext(): FlexNodeContext {
    const context = useContext(FlexNodeContext)
    if (context == null) {
        throw `unable to find flex context. Missing a FlexNodeContextProvider.`
    }
    return context
}
