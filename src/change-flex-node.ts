import { FlexNode } from "co-yoga"

export abstract class ChangeFlexNode extends FlexNode {
    abstract onChange(node: this, parentNode: FlexNode | undefined): void

    calculateLayout() {
        super.calculateLayout()
        this.afterCalculation(undefined)
    }

    protected afterCalculation(parentNode: this | undefined) {
        this.onChange(this, parentNode)
        this.processChildren()
    }

    protected processChildren(): void {
        for (const child of this.children) {
            child.afterCalculation(this)
        }
    }
}
