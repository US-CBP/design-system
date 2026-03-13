import { Component, Element, Prop, Event, EventEmitter, Host, h } from '@stencil/core';
import { debounce } from '../../utils/utils';

/**
 * The Resize Observer component is a wrapper that implements a resizeObserver to detect changes to its size,
 * typically to compare to an immediate child that is wrapping a collection of variable-sized elements 
 * (e.g., links, tabs, etc.), in order to implement responsive functionality that cannot be accomplished 
 * with a media query or container query.
 * 
 * @slot - any markup or content may be placed in the default slot. 
 */
@Component({
  tag: 'cbp-resize-observer',
  styleUrl: 'cbp-resize-observer.scss'
})
export class CbpResizeObserver {

  private observer: ResizeObserver;
  private observedEl: Element
 
  @Element() private host: HTMLElement;

  /**
   * The number of milliseconds to debounce the event emitter. Defaults to 0.
   * While the native resize observer is very performant, the calculations within its handler function may
   * not be, and performance may benefit from debouncing this event emitter.
   */
  @Prop() debounce: number = 0;

  /** A custom event emitted when the component is resized to give new values for size of component. */
  @Event() resized!: EventEmitter;
  

  async getCurrentSize() {
    return this.getClientRect();
  }
  getClientRect() {
    return this.host.getBoundingClientRect();
  }


  componentDidLoad() {
    // Initialize the resizeObserver on the host element
    this.observedEl = this.host;
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
    this.observer = new ResizeObserver( debounce( ([{ contentRect }]) => {
      const {width, height, top, bottom, left, right, x, y} = contentRect;

      const customEvent = {
        host: this.host,
        width: width,
        height: height,
        top: top,
        bottom: bottom,
        left: left,
        right: right,
        x: x,
        y: y
      }

      this.resized.emit(customEvent);
    } , this.debounce)
  );


    // Observe the element
    this.observer.observe(this.observedEl);
  }

  disconnectedCallback(){
    // remove the ResizeObserver if the component is removed from the DOM
    if (this.observer) {
      this.observer.unobserve(this.observedEl);
    }
  }

  render() {
    return (
      <Host>
        <slot />
      </Host>
    );
  }
}
