import { FlexNode } from "co-yoga"

export class ChangeFlexNode<T> extends FlexNode {
    constructor(precision: number, private readonly onChange: (node: FlexNode, parentData: T | undefined) => T) {
        super(precision)
    }
    calculateLayout() {
        super.calculateLayout()
        this.afterCalculation(undefined)
    }
    protected afterCalculation(parentData: T | undefined) {
        const data = this.onChange(this, parentData)
        this.commitedChildren.forEach((children) => {
            if (children instanceof ChangeFlexNode) {
                children.afterCalculation(data)
            }
        })
    }
}
