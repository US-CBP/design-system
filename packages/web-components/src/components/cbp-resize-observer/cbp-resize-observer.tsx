import { Component, Element, Prop, Event, EventEmitter, Host, h } from '@stencil/core';

/**
 * @slot - any markup or content may be placed in the default slot. 
 */
@Component({
  tag: 'cbp-resize-observer',
  styleUrl: 'cbp-resize-observer.scss'
})
export class CbpResizeObserver {

  private observer: ResizeObserver;
  private observedEl: Element
  //private parentEl: HTMLElement;
  //private childEl: HTMLElement;

  @Element() host: HTMLElement;

  /** Optionally specify a selector with which to query the closest matching parent of the host tag to observe. */
  @Prop() parent: string;

  /** Optionally specify a selector with which to query the a child of the host tag to observe. */
  @Prop() child: string;

  /** A custom event emitted when the click event occurs for either a rendered button or anchor/link. */
  @Event() resized!: EventEmitter;
  

  async getCurrentSize() {
    return this.getClientRect();
  }
  getClientRect() {
    return this.host.getBoundingClientRect();
  }


  componentDidLoad() {
    // TODO: still need to figure out what comparisons are useful at this level - parent or children
    const children = this.host.children;
    this.observedEl = this.host; //this.host.querySelector(child) or this.host.closest(parent); ?
    /*
      ResizeObserver object structure:
        Entries[]: 
          Entries[0]: ResizeObserverEntry (I've never seen more than 1 entry...)
            borderBoxSize[]: ResizeObserverSize
            contentBoxSize[]: ResizeObserverSize
            contentRect: DOMRectReadOnly           <- this is what we want
              bottom
              height
              left
              right
              top
              width
              x
              y
            devicePixelContentBoxSize[]: ResizeObserverSize
            target
    */
    this.observer = new ResizeObserver(([{ contentRect }]) => {
      const {width, height, top, bottom, left, right, x, y} = contentRect;
      console.log('Resize Observer: ', width, height, children, children[0].getBoundingClientRect());

      // TODO: do comparisons, such as to check for overflow (against child? this depends what we're observing)
      // When using browser zoom, the numbers reported back are sometimes sub-pixel and trigger a flickering of the controls; adding +1 fixes this.
      /*
      if (width+1 > this.wrapper.scrollWidth) {
        //
      }
      else {
        //
      }
      */


      // TechDebt: should this be debounced?
      this.resized.emit({
        width: width,
        height: height,
        top: top,
        bottom: bottom,
        left: left,
        right: right,
        x: x,
        y: y
      });

    });
    this.observer.observe(this.observedEl);
  }

  disconnectedCallback(){
    this.observer.disconnect()
  }

  render() {
    return (
      <Host>
        <slot />
      </Host>
    );
  }

}
