import { Component, Element, Event, EventEmitter, Prop, Host, h } from '@stencil/core';
import { setCSSProps, createNamespaceKey } from '../../utils/utils';


/**
 * The Subnav Item component represents a single navigation link and can also be nested multiple levels to convey a site/navigation hierarchy.
 * 
 * @slot - The Subnav Item's children are placed in the default slot.
 * @slot - cbp-subnav-item-label - An optional slot in support of a label with markup. Replaces the `label` property if used.
 */

@Component({
  tag: 'cbp-subnav-item',
  styleUrl: 'cbp-subnav-item.scss',
})
export class CbpSubnavItem {

  private icon: string;
  private parent: boolean;
  private link: HTMLAnchorElement;
  private expandButton: HTMLCbpButtonElement;

  @Element() private host: HTMLCbpSubnavItemElement;

  /** Specifies the text label for the subnav item. */
  @Prop() label: string;

  /** Specifies the href for the Subnav Item anchor. */
  @Prop() href: string;

  /** Optionally specifies a unique `ID` for the menu, used to wire up the controls and accessibility features. */
  @Prop() uid: string = createNamespaceKey('cbp-subnav-item');

  /** Specifies a name used to associated Nav Items with Subnav Items. */
  @Prop({ reflect: true }) name: string;

  /** Specifies the current item within the collection of Subnav Items. */
  @Prop ({ reflect: true}) current: boolean = false;

  /** 
   * Specifies whether a Subnav Item with nested children is expanded or collapsed. 
   * Primarily used internally for user interactions.
   */
  @Prop({ reflect: true }) open: boolean = false;
  
  /** Specifies the context of the component as it applies to the visual design and whether it inverts when light/dark mode is toggled. Default behavior is "light-inverts" and does not have to be specified. */
  @Prop({ reflect: true }) context: "light-inverts" | "light-always" | "dark-inverts" | "dark-always";

  /** Supports adding inline styles as an object */
  @Prop() sx: any = {};


  // this event should not bubble since items can be nested
  @Event({
    eventName: 'toggleSubnavItem',
    bubbles: false,
  }) toggleSubnavItem: EventEmitter;

  handleToggleSubnavItem(e){
    this.open = !this.open;
    this.toggleSubnavItem.emit({
      host: this.host,
      open: this.open,
      nativeElement: this.expandButton?.querySelector('button'),
      nativeEvent: e
    });
  }

  // this event should not bubble since items can be nested
  @Event({
    eventName: 'subnavItemClick',
    bubbles: false,
  }) subnavItemClick: EventEmitter;
  handleSubnavClick(e){
    this.current=true;
    this.subnavItemClick.emit({
      host: this.host,
      nativeElement: this.link,
      nativeEvent: e
    })
  }

  componentWillLoad() {
    // Set the icon based on nesting level
    this.icon = this.host.closest('cbp-subnav-item cbp-subnav-item cbp-subnav-item') ? 'caret-down' : 'chevron-right';    
    // Is this subnav item a parent?
    this.parent =  !!this.host.querySelector('cbp-subnav-item');

    if (typeof this.sx == 'string') {
      this.sx = JSON.parse(this.sx) || {};
    }
    setCSSProps(this.host, {
      ...this.sx,
    });
  }

  componentDidLoad() {
    this.link=this.host.querySelector('a');
  }

  // TechDebt: routing to be implemented
  render() {
    return (
      <Host>
        <div>
          <cbp-button
            id={this.uid}
            tag="a"
            fill="outline"
            color="primary"
            href={this.href}
            aria-current={this.current ? "page" : "false"}
            context={this.context}
            onClick={e => this.handleSubnavClick(e)}
          >
            { !this.host.querySelector('[slot=cbp-subnav-item-label]') && this.label}
            <slot name="cbp-subnav-item-label" />
          </cbp-button>
          
          {this.parent && 
            <cbp-button
              fill="outline"
              color="primary"
              expanded={`${this.open}`}
              aria-labelledby={this.uid}
              context={this.context}
              ref={el => this.expandButton = el}
              onClick={e => this.handleToggleSubnavItem(e)}
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