import { Component, Element, Prop, Host, h } from '@stencil/core';
import { setCSSProps, doKeyboardNav, } from '../../utils/utils';

/**
 * Tabs are a common UI pattern of progressive disclosure mimicking the real world paradigm of tabbed 
 * folders, each with a label and containing their own set of contents. Tabs allow the user to navigate 
 * multiple views without leaving the page. This component wraps individual `cbp-tab` components.
 * 
 * @slot - Only `cbp-tab` components shall be slotted within the default slot.
 */
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
  private responsive: boolean = false;
  
  @Element() private host: HTMLElement;

  /** Determines the ortientation that the tabs are displayed*/
  @Prop({ reflect: true }) orientation: 'horizontal' | 'vertical' = 'horizontal'

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
    this.setActiveTab(activeTab, true);
  }

  setActiveTab(activatedTab, init=false) {
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
        // In responsive mode, scroll the item into view when selected; this is not desired on load, however.
        if(!init && this.responsive) {
          button?.scrollIntoView({  behavior: "instant", block: "nearest", inline: 'start' });
        }
      } 
      else {
        tab.selected = false;
        panel.selected = false;
      }
    });
  }

  keyboardNav(key) {
    let navKey;
    if(this.orientation == 'vertical'){
      navKey = ['ArrowDown',  'ArrowUp', 'Enter', 'Home', 'End'];
    }else{
      navKey = ['ArrowRight','ArrowLeft', 'Enter', 'Home', 'End'];
    }

    if (navKey.includes(key)) {
      this.focusIndex = doKeyboardNav(this.tabs, key, this.focusIndex);
      this.tabs[this.focusIndex].focus();
    }else if(key == 'Tab'){
      this.focusIndex = this.selectedIndex;
    }

    const d = (key == 'ArrowLeft') ?  'end' : 'start';
    if (this.focusIndex !== undefined && key !== 'Tab') {
      this.tabs[this.focusIndex].scrollIntoView({ behavior: "instant", block: "nearest", inline: d });
      setTimeout(() => {
        this.tabs[this.focusIndex].querySelector('button')?.focus();
      }, 20);
    }

  }

  responsiveNav(direction) {
    const l = this.tabs.length - 1;
    if(direction == 'next') {
      this.focusIndex = l + 1 > this.focusIndex + 1 ? this.focusIndex + 1 : 0;
      this.tabs[this.focusIndex].scrollIntoView({ behavior: "instant", block: "nearest", inline: "start" });
      setTimeout(() => {
        this.tabs[this.focusIndex].querySelector('button').focus();
      }, 20);
    }
    if(direction == 'previous') {
      this.focusIndex = -1 < this.focusIndex + -1 ? this.focusIndex + -1 : l;
      this.tabs[this.focusIndex].scrollIntoView({ behavior: "instant", block: "nearest", inline: "end" });
      setTimeout(() => {
        this.tabs[this.focusIndex].querySelector('button').focus();
      }, 20);
    }
  }

  componentWillLoad() {
    // get all children of this tab set, taking into account nested tab sets
    this.tabs = Array.from(this.host.querySelectorAll('cbp-tab')).filter(tab => tab.closest('cbp-tabs') == this.host);

    // Attach event listeners to the child tabs
    this.tabs.forEach(tab => {
      tab.addEventListener('tabClicked', e => this.setActiveTab(e.detail.host));
    });

    if (typeof this.sx == 'string') {
      this.sx = JSON.parse(this.sx) || {};
    }
    setCSSProps(this.host, {
      ...this.sx,
    });
  }

  componentDidLoad() {
    this.initTabset();

    // Set up a resize observer to compare the host (cbp-tabs) to its child wrapper (div.cbp-tabs-wrapper), looking for overflow.
    this.observer = new ResizeObserver(([{ contentRect: { width } }]) => {
      // When using browser zoom, the numbers reported back are sometimes sub-pixel and trigger a flickering 
      // of the controls; adding +1 fixes this.
      if (width+1 > this.wrapper.scrollWidth) {
        this.responsive=false;
        this.previousControl.setAttribute('hidden','');
        this.nextControl.setAttribute('hidden','');
      }
      // Show buttons when the container is too small to hold all the tabs
      else {
        this.responsive=true;
        this.previousControl.removeAttribute('hidden');
        this.nextControl.removeAttribute('hidden');
      }
    });
    this.observedEl = this.host;
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
            <cbp-icon name="chevron-right" size="var(--cbp-space-6x)" rotate={180}></cbp-icon>
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
            <cbp-icon name="chevron-right" size="var(--cbp-space-6x)"></cbp-icon>
          </button>
        </cbp-button>
      </Host>
    );
  }
}
