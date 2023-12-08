import { Component, Prop , Element, Host, h} from '@stencil/core';
import { setCSSProps } from '../../utils/utils';

@Component({
    tag: 'cbp-grid-item',
    styleUrl: 'cbp-grid-item.scss',
})
export class CbpGridItem {

    @Element() host: HTMLElement;

    @Prop() gridColumnStart: number | string;
    @Prop() gridColumnEnd: number | string;
    @Prop() gridRowStart: number | string;
    @Prop() gridRowEnd: number | string;
    @Prop() alignSelf: string;
    @Prop() justifySelf: string;
    /** Names the Grid Area for use with grid-template-area on the parent. */
    @Prop() gridArea: string;
    
    /** Supports adding inline styles as an object */
    @Prop() sx: any = {};


    componentWillLoad() {
        if (typeof this.sx == "string") {
            this.sx = JSON.parse(this.sx) || {}
        }
        setCSSProps(this.host, {
            "grid-column-start": this.gridColumnStart,
            "grid-column-end": this.gridColumnEnd,
            "grid-row-start": this.gridRowStart,
            "grid-row-end": this.gridRowEnd,
            "align-self": this.alignSelf,
            "justify-self": this.justifySelf,
            "grid-area": this.gridArea,
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
