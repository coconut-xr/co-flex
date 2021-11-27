import { YogaNodeProperties } from "co-yoga"
import create from "zustand"
import { combine } from "zustand/middleware"
import { v4 as uuid } from "uuid"

export type State = {
    pages: {
        [PageId in string]?: PageData
    }
    selectedPage: string
}

export type PageData = {
    selectedNode: string
    nodes: { [NodeId in string]?: NodeData }
    mainNodeId: string
}

export type NodeData = {
    index: number
    children: Array<string>
    properties: YogaNodeProperties
}

function createDefaultNode(index: number): NodeData {
    return {
        index,
        children: [],
        properties: {},
    }
}

function createDefaultPage(): PageData {
    const nodeId = uuid()
    return {
        mainNodeId: nodeId,
        selectedNode: nodeId,
        nodes: {
            [nodeId]: createDefaultNode(0),
        },
    }
}

const pageId = uuid()
const initialState: State = {
    pages: {
        [pageId]: createDefaultPage(),
    },
    selectedPage: pageId,
}

export const useStore = create(
    combine(initialState, (set, get) => ({
        selectPage: (pageId: string) => {
            set({
                selectedPage: pageId,
            })
        },
        addPage: () => {
            set({
                pages: {
                    ...get().pages,
                    [uuid()]: createDefaultPage(),
                },
            })
        },
        deletePage: (id: string) => {
            //TODO: make sure the main page is not deleted
            set({
                pages: Object.entries(get().pages).reduce(
                    (prev, [pageId, page]) =>
                        pageId === id
                            ? prev
                            : {
                                  ...prev,
                                  [pageId]: page,
                              },
                    {} as any
                ),
            })
        },
        selectNode: (id: string) => {
            const state = get()
            const selectedPage = state.pages[state.selectedPage]
            if (selectedPage == null) {
                return
            }
            set({
                pages: {
                    ...state.pages,
                    [state.selectedPage]: {
                        ...selectedPage,
                        selectedNode: id,
                    },
                },
            })
        },
        addNode: (parentId: string) => {
            const state = get()
            const selectedPage = state.pages[state.selectedPage]
            if (selectedPage == null) {
                return
            }
            const newNodeId = uuid()
            set({
                pages: {
                    ...state.pages,
                    [state.selectedPage]: {
                        ...selectedPage,
                        nodes: {
                            ...Object.entries(selectedPage.nodes)
                                .filter(filterNull)
                                .reduce(
                                    (prev, [nodeId, node]) => ({
                                        ...prev,
                                        [nodeId]:
                                            nodeId === parentId
                                                ? {
                                                      ...node,
                                                      children: [...node.children, newNodeId],
                                                  }
                                                : node,
                                    }),
                                    {} as any
                                ),
                            [newNodeId]: createDefaultNode(Object.keys(selectedPage.nodes).length),
                        },
                    },
                },
            })
        },
        deleteNode: (id: string) => {
            //TODO: update index
            const state = get()
            const selectedPage = state.pages[state.selectedPage]
            if (selectedPage == null) {
                return
            }
            set({
                pages: {
                    ...state.pages,
                    [state.selectedPage]: {
                        ...selectedPage,
                        nodes: {
                            ...Object.entries(selectedPage.nodes).reduce(
                                (prev, [nodeId, node]) =>
                                    nodeId === id
                                        ? prev
                                        : {
                                              ...prev,
                                              [nodeId]: node,
                                          },
                                {} as any
                            ),
                        },
                    },
                },
            })
        },
        setNodeProperty: <Name extends keyof YogaNodeProperties>(
            id: string,
            name: Name,
            value: YogaNodeProperties[Name]
        ) => {
            const state = get()
            const selectedPage = state.pages[state.selectedPage]
            if (selectedPage == null) {
                return
            }
            console.log(id, name, value)
            set({
                pages: {
                    ...state.pages,
                    [state.selectedPage]: {
                        ...selectedPage,
                        nodes: {
                            ...Object.entries(selectedPage.nodes)
                                .filter(filterNull)
                                .reduce(
                                    (prev, [nodeId, node]) => ({
                                        ...prev,
                                        [nodeId]:
                                            nodeId === id
                                                ? {
                                                      ...node,
                                                      properties: {
                                                          ...node.properties,
                                                          [name]: value,
                                                      },
                                                  }
                                                : node,
                                    }),
                                    {} as any
                                ),
                        },
                    },
                },
            })
        },
        changeNodeOrder: (id: string, by: number) => {
            //TODO:
        },
    }))
)

export function filterNull<T>(val: [string, T | undefined]): val is [string, T] {
    return val[1] != null
}
