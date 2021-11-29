import { propertyMap } from "co-yoga"
import { useCallback, useState } from "react"
import { FilterType } from "."

export function ValueInput({
    name,
    propertyInfo,
    onChange,
    value,
}: {
    value: any
    name: string
    propertyInfo: FilterType<typeof propertyMap[keyof typeof propertyMap], "value">
    onChange: (value: number | string | undefined) => void
}) {
    const setValue = useCallback(
        (val: string) => {
            if (propertyInfo.autoUnit && val == "auto") {
                onChange(val)
                return
            }
            const float = parseFloat(val)
            if (isNaN(float)) {
                return
            }
            if (propertyInfo.percentUnit && val.includes("%")) {
                onChange(`${float}%`)
                return
            }
            onChange(float)
        },
        [propertyInfo, onChange]
    )

    return (
        <div className="m-3 form-group d-flex flex-column">
            <label>{name}</label>
            <input
                onChange={(e) => setValue(e.target.value)}
                value={value ?? propertyInfo.default ?? ""}
                className="form-control"
            />
            <button className="btn btn-outline-secondary mt-2" onClick={() => onChange(undefined)}>
                reset
            </button>
            {propertyInfo.autoUnit && (
                <button className="btn btn-outline-secondary mt-2" onClick={() => onChange("auto")}>
                    auto
                </button>
            )}
        </div>
    )
}
