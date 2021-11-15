import { YogaNode, Node } from "yoga-layout-prebuilt"
import { capitalize } from "."

const defaultNode = Node.create()

const defaultCache = new Map<keyof YogaNodeProperties, YogaNodeProperties[keyof YogaNodeProperties]>()

function getValue<Key extends keyof YogaNodeProperties>(node: YogaNode, key: Key): YogaNodeProperties<Key> {}

function getDefault<Key extends keyof YogaNodeProperties>(key: Key) {
    let result = defaultCache.get(key)
    if (result == null) {
        result = getValue(defaultNode, key)
        defaultCache.set(key, result)
    }
    return result as YogaNodeProperties<Key>
}

export type YogaNodeProperties = {
    [S in Uncapitalize<FilterSet<keyof YogaNode>>]: GetSetType<YogaNode[`set${Capitalize<S>}`]>
}

export type FilterSet<Name extends string> = Name extends `set${infer PropertyName}` ? PropertyName : never
export type GetSetType<Fn extends Function> = Fn extends (...parameters: infer PropertiesType) => any
    ? PropertiesType["length"] extends 1
        ? PropertiesType[0]
        : PropertiesType
    : never

export class FlexNode {
    private readonly node: YogaNode
    private readonly children: Set<FlexNode> = new Set([])
    public index: number | undefined

    constructor(private readonly onCalc: () => void) {
        this.node = Node.create()
    }

    destroy(): void {
        this.node.free()
    }

    commitChanges() {
        //TODO
        this.children.forEach((child) => {})
    }

    onCalculated(): void {
        this.onCalc()
        this.children.forEach((child) => child.onCalc())
    }

    insertChild(node: FlexNode): void {
        this.children.add(node)
    }

    removeChild(node: FlexNode): void {
        this.children.delete(node)
    }

    setValue<Key extends keyof YogaNodeProperties>(key: Key, value: YogaNodeProperties[Key] | undefined): void {
        const fnName: `set${Capitalize<Key>}` = `set${capitalize(key)}`
        const func: Function = this.node[fnName]
        if (func == null) {
            throw `property "${key}" is not exisiting`
        }
        if (value == null) {
            func.call(this.node)
        } else {
            func.call(this.node, value)
        }
    }
}
