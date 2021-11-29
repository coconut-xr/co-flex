import React from "react"
import { PagePanel } from "./page-panel"
import { State, useStore } from "./state"

export type FilterType<T, Type> = T extends { type: Type } ? T : never

function getPageIds(s: State): Array<string> {
    return Object.keys(s.pages)
}

function getSelectedPageId(s: State): string {
    return s.selectedPage
}

export function Editor() {
    const addPage = useStore((s) => s.addPage)
    const pageIds = useStore(getPageIds)

    return (
        <div style={{ width: "100vw", height: "100vh" }} className="overflow-hidden flex-grow-1 d-flex flex-column">
            <PagePanel />
            <div className="border-top flex-shrink-0 d-flex flex-row justify-content-center" style={{ height: 100 }}>
                {pageIds.map((pageId) => (
                    <PageItem id={pageId} />
                ))}
                <button
                    style={{ width: 192 }}
                    onClick={addPage}
                    className="btn btn-outline-primary m-3 d-flex align-items-center justify-content-center fs-1">
                    +
                </button>
            </div>
        </div>
    )
}

function PageItem({ id }: { id: string }) {
    const deletePage = useStore((s) => s.deletePage)
    const selectPage = useStore((s) => s.selectPage)
    const isSelected = useStore((s) => s.selectedPage === id)
    return (
        <div
            key={id}
            onClick={() => selectPage(id)}
            style={{ width: 192 }}
            className={`${
                isSelected ? "text-light bg-primary" : ""
            } m-3 p-3 d-flex align-items-center justify-content-center border rounded`}>
            {id}
            <button onClick={() => deletePage(id)} className="btn btn-danger">
                delete
            </button>
        </div>
    )
}
