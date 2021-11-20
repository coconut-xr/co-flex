import { propertyMap, YogaNodeProperties } from "co-yoga"
import create from "zustand"
import { combine } from "zustand/middleware"

type State = {
    pages: {
        [PageId in string]: PageData
    }
    selectedPage: string
}

type PageData = {
    selectedNode: string
    nodes: { [NodeId in string]: NodeData }
}

type NodeData = {
    root: boolean
    index: number
    children: Array<string>
    properties: YogaNodeProperties
}

const initialState: State = {
    pages: {
        "0": {
            selectedNode: "0",
            nodes: {
                "0": {
                    root: true,
                    index: 0,
                    children: [],
                    properties: {},
                },
            },
        },
    },
    selectedPage: "0",
}

const useStore = create(
    combine(initialState, (set, get) => ({
        addPage: () => {},
        deletePage: () => {},
    }))
)

export default function Editor() {
    return (
        <div style={{ width: "100vw", height: "100vh" }} className="overflow-hidden d-flex flex-column">
            <div className="border-top flex-shrink-0 d-flex flex-row justify-content-center" style={{ height: 100 }}>
                <div
                    style={{ width: 192 }}
                    className="m-3 d-flex align-items-center justify-content-center border rounded">
                    #1
                </div>
                <button
                    style={{ width: 192 }}
                    className="btn btn-outline-primary m-3 d-flex align-items-center justify-content-center fs-1">
                    +
                </button>
            </div>
        </div>
    )
}

function selectMainPage(s: State): PageData | undefined {
    return s.pages[s.selectedPage]
}

function PageEditorPanel() {
    const page = useStore(selectMainPage)
    if (page == null) {
        return null
    }
    return (
        <div className="flex-grow-1 d-flex flex-row overflow-hidden">
            <div className="flex-grow-1 overflow-auto">
                {Object.entries(page.nodes).map(([id, { children, index, properties, root }]) => )}
            </div>
            <NodeEditorPanel root id="" />
        </div>
    )
}

function 

const propertyMapEntries = Object.entries(propertyMap)

function NodeEditorPanel({ id, root }: { id: string; root: boolean }) {
    return (
        <div className="p-3 border-start d-flex flex-column overflow-auto">
            <div className="mx-3 d-flex flex-row">
                <button className="flex-grow-1 btn btn-outline-primary me-3">Add Child</button>
                {!root && <button className="flex-grow-1 btn btn-outline-danger">Delete</button>}
            </div>
            {propertyMapEntries.map(([name, propertyInfo]) =>
                propertyInfo.type === "enum" ? (
                    <NodeEditorEnumInput key={name} name={name} propertyInfo={propertyInfo} />
                ) : (
                    <NodeEditorValueInput key={name} name={name} propertyInfo={propertyInfo} />
                )
            )}
        </div>
    )
}

function NodeEditorValueInput({
    name,
    propertyInfo,
}: {
    name: string
    propertyInfo: FilterType<typeof propertyMap[keyof typeof propertyMap], "value">
}) {
    return (
        <div className="m-3 form-group">
            <label>{name}</label>
            <input defaultValue={propertyInfo.default ?? ""} className="form-control" />
        </div>
    )
}

function NodeEditorEnumInput({
    name,
    propertyInfo,
}: {
    name: string
    propertyInfo: FilterType<typeof propertyMap[keyof typeof propertyMap], "enum">
}) {
    return (
        <div className="m-3 form-group">
            <label>{name}</label>
            <select defaultValue={propertyInfo.default} className="form-control">
                {Object.keys(propertyInfo.enumMap).map((name) => (
                    <option key={name}>{name}</option>
                ))}
            </select>
        </div>
    )
}

type FilterType<T, Type> = T extends { type: Type } ? T : never
