import { propertyMap } from "co-yoga"
import { useCallback, useState } from "react"
import { FilterType } from "."

export function ValueInput({
    name,
    propertyInfo,
    onChange,
}: {
    name: string
    propertyInfo: FilterType<typeof propertyMap[keyof typeof propertyMap], "value">
    onChange: (value: number | string | undefined) => void
}) {
    const [value, setValue] = useState<
        | {
              type: "default" | "auto"
          }
        | {
              type: "points" | "percentage"
              value: number
          }
    >({
        type: "default",
    })

    const setType = useCallback(
        (type: "default" | "auto" | "points" | "default") => {
            if (type === "default") {
                onChange(undefined)
                setValue({ type: "default" })
            } else if (type === "auto") {
                onChange("auto")
                setValue({
                    type: "auto",
                })
            } else {
                onChange(0)
                setValue({
                    type,
                    value: 0,
                })
            }
        },
        [setValue]
    )

    const setNumber = useCallback(
        (val: string) =>
            setValue((value) => {
                if (value.type === "auto" || value.type === "default") {
                    return value
                }
                let float = parseFloat(val)
                if (isNaN(float)) {
                    float = 0
                }
                if (value.type === "percentage") {
                    onChange(`${float}%`)
                } else {
                    onChange(float)
                }
                return {
                    type: value.type,
                    value: float,
                }
            }),
        [setValue]
    )

    return (
        <div className="m-3 form-group">
            <label>{name}</label>
            <select onChange={(e) => setType(e.target.value as any)} value={value.type} className="form-control">
                <option>default</option>
                <option>points</option>
                <option>percentage</option>
                <option>auto</option>
            </select>
            {(value.type === "points" || value.type === "percentage") && (
                <input onChange={(e) => setNumber(e.target.value)} value={value.value} className="form-control" />
            )}
        </div>
    )
}
