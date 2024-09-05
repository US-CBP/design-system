import { Component, Element, Prop, Host, h } from '@stencil/core';
import { setCSSProps } from '../../utils/utils';

@Component({
  tag: 'cbp-tabs',
  styleUrl: 'cbp-tabs.scss',
})

export class CbpTabs {

  private tabs: HTMLCbpTabElement[] = [];
  private selectedIndex: number = 0; // index of the selected tab
  private focusIndex: number = 0; // index of the focused tab, used for keyboard nav

  private observer: ResizeObserver;
  private observedEl: Element
  private wrapper: HTMLElement;
  private previousControl: HTMLElement;
  private nextControl: HTMLElement;
  
  @Element() host: HTMLElement;

  /** The accessible label of the tablist. Required unless `aria-labelledby` is specified on the host tag directly. */
  @Prop() accessibilityText: string;

  /** Specifies the context of the component as it applies to the visual design and whether it inverts when light/dark mode is toggled. Default behavior is "light-inverts" and does not have to be specified. */
  @Prop({ reflect: true }) context: 'light-inverts' | 'light-always' | 'dark-inverts' | 'dark-always';

  /** Supports adding inline styles as an object */
  @Prop() sx: any = {};

  initTabset() {
    // check for a default tab, otherwise set the first one active
    let activeTab = this.tabs[0];
    this.tabs.forEach(tab => {
      if (tab.selected === true) activeTab = tab;
    });
    this.setActiveTab(activeTab);
  }

  setActiveTab(activatedTab) {
    this.tabs.forEach((tab: HTMLCbpTabElement, index) => {
      let button = tab.querySelector('button');
      let panelid = tab.name;
      let panel: HTMLCbpTabPanelElement = document.querySelector(`#${panelid}`);

      if (!panel) {
        console?.warn(`Warning: cbp-tab does not reference valid tab panel with id ${panelid}`);
        return;
      }

      if (activatedTab == tab) {
        tab.selected = true;
        this.selectedIndex = this.focusIndex = index;
        panel.selected = true;
        button?.scrollIntoView({ behavior: "smooth", inline: 'start' }); // Do nothing if the button hasn't been fully rendered yet - this is desired behavior on initial load.
      } else {
        tab.selected = false;
        panel.selected = false;
      }
    });
  }

  keyboardNav(key) {
    const l = this.tabs.length - 1;
    const n = {
      Home: 0,
      ArrowLeft: -1 < this.focusIndex + -1 ? this.focusIndex + -1 : l,
      ArrowRight: l + 1 > this.focusIndex + 1 ? this.focusIndex + 1 : 0,
      End: l,
      Tab: this.focusIndex=this.selectedIndex, // reset the focusIndex when tabbing out of the tablist
    }[key];
    const d= (key == 'ArrowLeft') ?  'end' : 'start';
    if (n !== undefined && key !== 'Tab') {
      this.tabs[n].scrollIntoView({ behavior: "smooth", inline: d });
      setTimeout(() => {
        this.tabs[n].querySelector('button').focus();
      }, 20);
      this.focusIndex = n;
    }
  }

  responsiveNav(direction) {
    const l = this.tabs.length - 1;
    if(direction == 'next') {
      this.focusIndex = l + 1 > this.focusIndex + 1 ? this.focusIndex + 1 : 0;
      this.tabs[this.focusIndex].scrollIntoView({ behavior: "smooth", inline: "start" });
      setTimeout(() => {
        this.tabs[this.focusIndex].querySelector('button').focus();
      }, 20);
    }
    if(direction == 'previous') {
      this.focusIndex = -1 < this.focusIndex + -1 ? this.focusIndex + -1 : l;
      this.tabs[this.focusIndex].scrollIntoView({ behavior: "smooth", inline: "end" });
      setTimeout(() => {
        this.tabs[this.focusIndex].querySelector('button').focus();
      }, 20);
    }
  }

  componentWillLoad() {
    // get all children, taking into account nested tab sets
    this.tabs = Array.from(this.host.querySelectorAll('cbp-tab')).filter(tab => tab.closest('cbp-tabs') == this.host);

    // Attach event listeners to the child tabs
    this.tabs.forEach(tab => {
      tab.addEventListener('tabClicked', e => this.setActiveTab(e.detail.host));
    });

    if (typeof this.sx == 'string') {
      this.sx = JSON.parse(this.sx) || {};
    }
    setCSSProps(this.host, Object.assign({}, this.sx));
  }

  componentDidLoad() {
    this.initTabset();

    // Only set up a ResizeObserver if the checklist is specified as a horizontal mode (inline or series)
    this.observer = new ResizeObserver(([{ contentRect: { width } }]) => {
      // When using browser zoom, the numbers reported back are sometimes sub-pixel and trigger a flickering of the controls; adding +1 fixes this.
      if (width+1 > this.wrapper.scrollWidth) {
        this.previousControl.setAttribute('hidden','');
        this.nextControl.setAttribute('hidden','');
      }
      else {
        this.previousControl.removeAttribute('hidden');
        this.nextControl.removeAttribute('hidden');
      }
    });
      this.observedEl = this.host; //this.host.querySelector('uef-checklist>uef-input-styles');
      this.observer.observe(this.observedEl);
  }

  disconnectedCallback() {
    // remove the ResizeObserver if the component is removed from the DOM
    if (this.observer) {
      this.observer.unobserve(this.observedEl);
    }
  }

  render() {
    return (
      <Host
        role="tablist"
        aria-label={this.accessibilityText}
        onKeydown={({ key }) => {
          this.keyboardNav(key);
        }}
      >
        <cbp-button
          color="secondary"
          fill="outline"
          variant="square"
          width="3.5rem"
          height="3.5rem"
          context={this.context}
          onClick={ () => this.responsiveNav('previous')}
          ref={el => (this.previousControl = el)}
        >
          <button
            type="button"
            tabindex="-1"
            aria-label="Previous Tab"
            slot="cbp-button-custom"
          >
            <cbp-icon name="chevron-right" size="var(--cbp-space-5x)" rotate={180}></cbp-icon>
          </button>
        </cbp-button>

        <div
          class="cbp-tabs-wrapper"
          ref={el => (this.wrapper = el)}
        >
          <slot />
        </div>

        <cbp-button
          color="secondary"
          fill="outline"
          variant="square"
          width="3.5rem"
          height="3.5rem"
          context={this.context}
          onClick={ () => this.responsiveNav('next')}
          ref={el => (this.nextControl = el)}
        >
          <button
            type="button"
            tabindex="-1"
            aria-label="Next Tab"
            slot="cbp-button-custom"
          >
            <cbp-icon name="chevron-right" size="var(--cbp-space-5x)"></cbp-icon>
          </button>
        </cbp-button>
      </Host>
    );
  }
}
