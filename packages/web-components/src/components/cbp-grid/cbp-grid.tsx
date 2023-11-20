import { Component, Prop , Element, Host, h} from '@stencil/core';
import { setCSSProps } from '../../utils/utils';

@Component({
    tag: 'cbp-grid',
    styleUrl: 'cbp-grid.scss'
})

export class MtlGrid {

    @Element() host: HTMLElement;

    @Prop({ reflect: true }) display: "grid" | "inline-grid" = "grid";

    @Prop() gridTemplateAreas: string;
    @Prop() gridTemplateColumns: "none" | string;
    @Prop() gridTemplateRows: "none" | string;

    @Prop() gridAutoFlow: "row" | "column";
    @Prop() gridAutoColumns: string;
    @Prop() gridAutoRows: string;

    @Prop() alignContent: string;
    @Prop() justifyContent: string;

    @Prop() alignItems: string;
    @Prop() justifyItems: string;

    @Prop() gap: string;
    @Prop() breakpoint: string;

    /** Supports adding inline styles as an object */
    @Prop() sx: any = {};

    
    componentWillLoad() {
        if (typeof this.sx == "string") {
            this.sx = JSON.parse(this.sx) || {}
        }
        setCSSProps(this.host, {
            "display": this.display,
            "grid-template-areas": this.gridTemplateAreas,
            "grid-template-columns": this.gridTemplateColumns,
            "grid-template-rows": this.gridTemplateRows,
            "grid-auto-flow": this.gridAutoFlow,
            "grid-auto-columns": this.gridAutoColumns,
            "grid-auto-rows": this.gridAutoRows,
            "align-content": this.alignContent,
            "justify-content": this.justifyContent,
            "align-items": this.alignItems,
            "justify-items": this.justifyItems,
            "grid-gap": this.gap,
            ...this.sx
        });
    }

    render() {
        return (
            <Host>
                <slot />
            </Host>
        );
    }
}
