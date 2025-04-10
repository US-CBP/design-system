import { Component, Element, Event, EventEmitter, Watch, Prop, Host, h } from '@stencil/core';
import { setCSSProps } from '../../utils/utils';


/**
 * @slot - The Subnav-item's children, will be expanded/collapsed based on the toggle.
 * @slot - icon - used to populate the subnav-item icon if user has set it
 */

@Component({
  tag: 'cbp-subnav-item',
  styleUrl: 'cbp-subnav-item.scss',
})
export class CbpSubnavItem {

  private icon: string;
  private parent: boolean;
  @Element() host: HTMLElement;

  /** Specifies the current subnav-item */
  @Prop ({ reflect: true}) current: boolean

  /** Specifies the label for the subnav item */
  @Prop () label: string;

  /** Specifies the href passed to the button prop*/
  @Prop() href: string;

  /** used to style icon based on open/hide state */
  @Prop({ reflect: true }) open: boolean 
  
  /** Specifies the context of the component as it applies to the visual design and whether it inverts when light/dark mode is toggled. Default behavior is "light-inverts" and does not have to be specified. */
  @Prop({ reflect: true }) context: "light-inverts" | "light-always" | "dark-inverts" | "dark-always";

  /** Supports adding inline styles as an object */
  @Prop() sx: any = {};

  componentWillLoad() {
    this.icon = this.host.closest('cbp-subnav-item cbp-subnav-item cbp-subnav-item') ? 'caret-down' : 'chevron-right';    
    this.parent =  !!this.host.querySelector('cbp-subnav-item');

    if (typeof this.sx == 'string') {
      this.sx = JSON.parse(this.sx) || {};
    }
    setCSSProps(this.host, {
      ...this.sx,
    });
  }

  @Event() toggleSubnavClick: EventEmitter;
  toggleSubnav(){
    this.open = !this.open;
    this.toggleSubnavClick.emit({
      host: this.host,
      open: this.open,
    });

  }

  @Watch('current')
  watchCurrentHandler() {
    this.toggleSubnav();
  }

  /**
   * Tech debt: routing to be implemented
   */
  render() {
    return (
      <Host>
        <div>
          <cbp-button
            tag="a"
            fill="outline"
            color="primary"
            href={this.href}
            aria-current={this.current}
            context={this.context}
          >
            { !this.host.querySelector('[slot=cbp-subnav-item-label]') && this.label}
            <slot name="cbp-subnav-item-label" />
          </cbp-button>
          {this.parent && 
          <cbp-button
            type="button"
            fill="outline"
            color="primary"
            context={this.context}
            onClick={() => this.toggleSubnav()}
          >
            <cbp-icon name={this.icon}></cbp-icon>  
          </cbp-button>
          }
        </div>

        {this.parent && 
          <section>
            <slot />
          </section>
        }
      </Host>
    );
  }
}