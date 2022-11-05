import { FlexNode } from "co-yoga"

export type FlexNodeOnChange<T> = (
    node: FlexNode<T>,
    parentNode: FlexNode<T> | undefined,
    processChildren: () => void
) => void

export class ChangeFlexNode<T> extends FlexNode<T> {
    constructor(precision: number, private readonly onChange: FlexNodeOnChange<T>, data: T) {
        super(precision, data)
    }

    calculateLayout() {
        super.calculateLayout()
        this.afterCalculation(undefined)
    }

    protected afterCalculation(parentNode: FlexNode<T> | undefined) {
        this.onChange(this, parentNode, this.processChildren.bind(this))
    }

    private processChildren(): void {
        for (const child of this.commitedChildren) {
            if (child instanceof ChangeFlexNode) {
                child.afterCalculation(this)
            }
        }
    }
}
