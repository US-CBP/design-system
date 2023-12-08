import { Component, Prop, Element, Host, h} from '@stencil/core';
import { setCSSProps } from '../../utils/utils';

@Component({
    tag: 'cbp-flex-item',
    styleUrl: 'cbp-flex-item.scss',
})
export class CbpFlexItem {

    @Element() host: HTMLElement;

    @Prop() alignSelf: "auto" | "stretch" | "flex-start" | "flex-end" | "center" | "baseline";
    @Prop() order: number;
    @Prop() flexGrow: number;
    @Prop() flexShrink: number;
    @Prop() flexBasis: number;
    /** Supports adding inline styles as an object */
    @Prop() sx: any = {};


    componentWillLoad() {
        if (typeof this.sx == "string") {
            this.sx = JSON.parse(this.sx) || {}
        }
        setCSSProps(this.host, {
            "align-self": this.alignSelf,
            "order": this.order,
            "flex-grow": this.flexGrow,
            "flex-shrink": this.flexShrink,
            "flex-basis": this.flexBasis,
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
