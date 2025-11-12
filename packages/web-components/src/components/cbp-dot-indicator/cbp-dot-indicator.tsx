import { Component, Element, Event, EventEmitter, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'cbp-dot-indicator',
  styleUrl: 'cbp-dot-indicator.scss'
})
export class CbpDotIndicator {

  @Element() host: HTMLElement;

  private selectedIndex: number = 0; // index of the selected indicator
  private focusIndex: number = 0; // index of the focused indicator, used for keyboard nav

  /** the currently active dot */
  @Prop() current: number = 0;

  /** unit of measure for what the dot indicator is measuring */
  @Prop() itemName: string = 'Item';

  /** Length of index dot-indicator is tracking */
  @Prop() items: number;

  /** Custom event emitted when the Dot-indicator changes active indicator*/
  @Event() navigateCollection: EventEmitter;

  setIndexActive(index) {
    if (index >= this.items) {
      index = 0;
    } else if (index < 0) {
      index = this.items - 1;
    }

    this.selectedIndex = this.focusIndex = index;
    this.current = index;

    this.navigateCollection.emit({
      host: this.host,
      item: this.current
    })
  }

  generateIndicator() {
    let dots: HTMLButtonElement[] = [];
    for (let x = 0; x < this.items; x++) {
      let newIndicator: HTMLButtonElement =
        <button
          aria-label={(x + 1) + " of " + this.items + " " + this.itemName}
          aria-selected={x == this.current ? "true" : "false"}
          tabindex={x == this.current ? "0" : "-1"}
          onClick={() => this.setIndexActive(x)}
        >
          <span></span>
        </button>;
      dots = [...dots, newIndicator]
    }

    return dots
  }

  keyboardNav(key) {
    const l = this.items - 1;
    const n = {
      Home: 0,
      ArrowLeft: -1 < this.focusIndex + -1 ? this.focusIndex + -1 : l,
      ArrowRight: l + 1 > this.focusIndex + 1 ? this.focusIndex + 1 : 0,
      End: l,
      Tab: this.focusIndex = this.selectedIndex, // reset the focusIndex when tabbing out of the dot-indicator
    }[key];
    if (n !== undefined && key !== 'Tab') {
      this.focusIndex = n;
      let focusedIndicator = this.host.querySelectorAll(`.dot-indicators-container button`)[this.focusIndex] as HTMLElement;
      focusedIndicator.focus();
    }
  }


  render() {
    return (
      <Host
      >
        <cbp-button
          fill="ghost"
          color="secondary"
          variant="square"
          accessibilityText={this.itemName + " back"}
          onClick={() => { this.setIndexActive(this.selectedIndex - 1) }}
        >
          <cbp-icon name="angle-down" rotate={90}></cbp-icon>
        </cbp-button>

        <div class="dot-indicators-container"
          onKeyDown={({ key }) => {
            this.keyboardNav(key);
          }}
        >
          {this.generateIndicator()}
        </div>

        <cbp-button
          fill="ghost"
          color="secondary"
          variant="square"
          accessibilityText={this.itemName + " forward"}
          onClick={() => { this.setIndexActive(this.selectedIndex + 1) }}
        >
          <cbp-icon name="angle-down" rotate={270}></cbp-icon>
        </cbp-button>
      </Host>
    );
  }
}
