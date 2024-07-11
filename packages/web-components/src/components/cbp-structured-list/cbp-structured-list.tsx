import { Component, Prop, Element, Host, h } from '@stencil/core';
import { setCSSProps } from '../../utils/utils';

@Component({
  tag: 'cbp-structured-list',
  styleUrl: 'cbp-structured-list.scss'
})

/**
 * @slot - Only list items may be slotted within the default content.
 * @slot cbp-structured-list-header - Optional information such as number of results, filters, etc. are provided by the application and slotted into this named slot.
 * @slot cbp-structured-list-footer - Optional information and/or interactive elements are provided by the application and slotted into this named slot.
 */
export class CbpStructuredList {
  
  @Element() host: HTMLElement;

  /** 
   * Specifies an accessible label for the list as an `aria-label`, similar to a table `caption`. 
   * Since the structured list contains significant amount of data, it is advised to always specify a label describing the list.
   */
  @Prop() accessibilityText: string;

  /** References an `id` placed on the element slotted into the `cbp-structured-list-header` named slot to provide additional accessible context to the list label. */
  @Prop() headerId: string;

  /** Specifies whether the list is "striped,"" with even rows shaded. */
  @Prop({ reflect: true }) striped: boolean;

  /** Specifies whether the list items are selectable (via checkbox - provided by the application). */
  @Prop({ reflect: true }) selectable: boolean;

   /** Specifies the context of the component as it applies to the visual design and whether it inverts when light/dark mode is toggled. Default behavior is "light-inverts" and does not have to be specified. */
   @Prop({ reflect: true }) context: "light-inverts" | "light-always" | "dark-inverts" | "dark-always";
  
  /** Supports adding inline styles as an object */
  @Prop() sx: any = {};

  
  componentWillLoad() {
    if (typeof this.sx == 'string') {
      this.sx = JSON.parse(this.sx) || {};
    }
    setCSSProps(this.host, {
      ...this.sx,
    });
  }

  render() {
    return (
      <Host>
        <slot name="cbp-structured-list-header" />
 
        <div role="list"
          aria-label={this.accessibilityText}
          aria-describedby={this.headerId}
        >
          <slot />
        </div>
 
        <slot name="cbp-structured-list-footer" />
      </Host>
    );
  }

}
