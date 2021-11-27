import { propertyMap } from "co-yoga"
import { FilterType } from "."

export function EnumInput({
    name,
    propertyInfo,
    onChange,
}: {
    name: string
    propertyInfo: FilterType<typeof propertyMap[keyof typeof propertyMap], "enum">
    onChange: (value: string) => void
}) {
    return (
        <div className="m-3 form-group">
            <label>{name}</label>
            <select
                onChange={(e) => onChange(e.target.value)}
                defaultValue={propertyInfo.default}
                className="form-control">
                {Object.keys(propertyInfo.enumMap).map((name) => (
                    <option key={name}>{name}</option>
                ))}
            </select>
        </div>
    )
}
