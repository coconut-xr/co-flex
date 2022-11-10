import { FlexNode } from "co-yoga"

export type FlexNodeOnChange<T> = (node: ChangeFlexNode<T>, parentNode: FlexNode<T> | undefined) => void

export class ChangeFlexNode<T> extends FlexNode<T> {
    constructor(precision: number, private readonly onChange: FlexNodeOnChange<T>, data: T) {
        super(precision, data)
    }

    calculateLayout() {
        super.calculateLayout()
        this.afterCalculation(undefined)
    }

    protected afterCalculation(parentNode: FlexNode<T> | undefined) {
        this.onChange(this, parentNode)
    }

    public processChildren(): void {
        for (const child of this.children) {
            if (child instanceof ChangeFlexNode) {
                child.afterCalculation(this)
            }
        }
    }
}
