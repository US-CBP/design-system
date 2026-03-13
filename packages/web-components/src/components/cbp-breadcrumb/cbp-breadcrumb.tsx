import { Component, Prop, State, Element, Host, h } from '@stencil/core';
import { setCSSProps } from '../../utils/utils';

/**
 * Breadcrumbs give users an indicator of where they are within a site/application hierarchy, 
 * especially helpful when deeper within the site’s architecture. This component should wrap links 
 * representing the parent sections of the current page, but not including the current page.
 * 
 * @slot - The individual links making up the breadcrumbs are placed in the default slot.
 */
@Component({
  tag: 'cbp-breadcrumb',
  styleUrl: 'cbp-breadcrumb.scss',
})
export class CbpBreadcrumb {

  private nav: HTMLElement;
  private menu: HTMLCbpMenuElement;
  private ro: HTMLElement;
  private breadcrumbs: HTMLAnchorElement[] = []; // array of the actual anchors for building the responsive menu
  private children: HTMLElement[] = []; // array of immediate children for toggling hidden
  private sizeMap: object[] = [
    {
      size: "compact",
      width: undefined
    },
    {
      size: "medium",
      width: undefined
    },
    {
      size: "full",
      width: undefined
    }
  ];

  @Element() private host: HTMLElement;

  /** Specifies a character as a divider between breadcrumb links. Defaults to "/". */
  @Prop() divider: string;

  /** Specifies the context of the component as it applies to the visual design and whether it inverts when light/dark mode is toggled. Default behavior is "light-inverts" and does not have to be specified. */
  @Prop({ reflect: true }) context: "light-inverts" | "light-always" | "dark-inverts" | "dark-always";
  
  /** Supports adding inline styles as an object */
  @Prop() sx: any = {};

  @State() private menuItems: HTMLCbpMenuItemElement[] = [];
  @State() private sizeIndex = 2; // Default to full-width


  handleResize( width ) {
    // Get the width of the content (and update the sizeMap) before doing responsive adjustments.
    this.sizeMap[this.sizeIndex]['width'] = this.nav.getBoundingClientRect().width;

    // If the emitted size is less than the current mode's width, step down to the next responsive size
    if (this.sizeIndex > 0 && width <= this.sizeMap[this.sizeIndex]['width']) {
      this.resizeResponsive(this.sizeIndex - 1);
    }

    // If the emitted size is greater than than the next larger mode's width, move up to the next responsive size
    if (this.sizeIndex < 2 && width > this.sizeMap[this.sizeIndex+1]['width']) {
      this.resizeResponsive(this.sizeIndex + 1);
    }
  }

  resizeResponsive(mode){
    // switch to the specified mode
    switch (this.sizeMap[mode]['size']) {

      case "compact":
        this.children.forEach( (item, index) => {
          if (index > 0) {
            item.setAttribute('hidden','');
          }
        });
        this.menu.removeAttribute('hidden');
        break;

      case "medium":
        this.children.forEach( (item, index) => {
          if (index > 0 && index < (this.children.length - 2)) item.setAttribute('hidden','');
          else item.removeAttribute('hidden');
          // Set the flex order on the last breadcrumb so it's after the menu - does not need to be updated for other cases
          if (index == (this.children.length - 2)) item.style.setProperty('order', `${index}`);
        });
        this.menu.removeAttribute('hidden');
        break;

      case "full": 
        this.children.forEach( (item, index) => {
          if (index > 0) item.removeAttribute('hidden');
        });
        this.menu.setAttribute('hidden','');
        break;

      default:
        console.log(`cbp-breadcrumb - We should never see the default case... ${this.sizeMap[mode]['size']}.`);
    }
    
    this.sizeIndex=mode;
    
    // After changing modes, update the width for the current mode (just in case anything has changed)
    setTimeout(() => {
      this.sizeMap[mode]['width'] = this.nav.getBoundingClientRect().width;
      // from the middle state, make sure it doesn't need to go to the smallest mode if there's still overflow
      if (mode == 1 && this.ro.getBoundingClientRect().width <= this.nav.getBoundingClientRect().width) {
        this.resizeResponsive(this.sizeIndex - 1);
      }
    }, 200);
  }


  // TechDebt: this menu may or may not work with routing, depending on the implementation. Needs testing.
  createMenu(breadcrumbs) {
    let menuItems: HTMLCbpMenuItemElement[] = [];
    // Loop over the breadcrumb anchors to generate the menu items
    breadcrumbs.forEach( (item, index) => {
      let newItem: HTMLCbpMenuItemElement =
        <cbp-menu-item indentLevel={index}>
          <a href={`${item.href}`}>
            {index == 0 
              ? <cbp-flex gap="var(--cbp-space-1x)"><cbp-icon name="home"></cbp-icon>Home</cbp-flex>
              : item.textContent
            }
          </a>
        </cbp-menu-item>;
      menuItems = [...menuItems, newItem];
    });
    // Set them to the State to re-render
    this.menuItems = [...menuItems];
  }

  componentWillLoad() {
    if (typeof this.sx == 'string') {
      this.sx = JSON.parse(this.sx) || {};
    }
    setCSSProps(this.host, {
      "--cbp-breadcrumb-divider": this.divider ? `"${this.divider}"` : undefined,
      ...this.sx,
    });
  }
  
  componentDidLoad() {
    // Get the immediate children to toggle hidden
    this.children=Array.from(this.nav.querySelectorAll(':scope > *'));
    // Get the actual anchors for generating the responsive menu items
    this.breadcrumbs=Array.from(this.host.querySelectorAll('a[href]'));
    // Create responsive menu items from the breadcrumb links
    this.createMenu(this.breadcrumbs);
  }


  render() {
    return (
      <Host>
        <cbp-resize-observer 
          debounce={10}
          ref={el => this.ro = el}
          onResized={(e) => this.handleResize(e.detail.width)}
        >
          <nav 
            aria-label="Breadcrumb" 
            ref={el => this.nav = el}
          >
            <slot />
            
            <cbp-menu 
              hidden
              uid="cbp-breadcrumbs-menu"
              ref={el => this.menu = el}
            >
              <cbp-button
                fill="outline"
                color="secondary"
                target-prop="open"
                controls="cbp-breadcrumbs-menu"
                accessibilityText="Breadcrumbs Menu"
              >
                <cbp-icon
                  name="ellipsis-vertical"
                  rotate={90}
                />
              </cbp-button>

              {[...this.menuItems]}
            </cbp-menu>

          </nav>
        </cbp-resize-observer>
      </Host>
    );
  }
}