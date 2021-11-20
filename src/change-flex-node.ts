import { FlexNode } from "co-yoga"

export class ChangeFlexNode extends FlexNode {
    constructor(precision: number, private readonly onChange: (node: FlexNode) => void) {
        super(precision)
    }
    calculateLayout() {
        super.calculateLayout()
        this.afterCalculation()
    }
    protected afterCalculation() {
        this.onChange(this)
        this.commitedChildren.forEach((children) => {
            if (children instanceof ChangeFlexNode) {
                children.afterCalculation()
            }
        })
    }
}
