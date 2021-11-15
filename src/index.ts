export function capitalize<Key extends string>(key: Key) {
    return `${key.charAt(0).toUpperCase()}${key.slice(1)}` as Capitalize<Key>
}

export * from "./yoga-node-context"
export * from "./use-bind-yoga-node-properties"
export * from "./use-yoga-node"
export * from "./use-yoga-root-node"
