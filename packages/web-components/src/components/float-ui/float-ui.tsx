import { Element, Component, Host, h } from '@stencil/core';
import {computePosition, flip} from '../../../../../node_modules/@floating-ui/dom';

@Component({
  tag: 'float-ui',
  styleUrl: 'float-ui.scss',
})

//Documentation: https://floating-ui.com/docs/tutorial

export class FloatUi {

  private button;
  private tooltip;

  @Element() private host: HTMLElement;

  computePos(){
    computePosition(this.button, this.tooltip, {
      placement: 'bottom',
      middleware: [flip()], //secret sauce: is kinda working in example but needs expanded args & more testing 
    }).then(({x, y}) => {
      Object.assign(this.tooltip.style, {
        left: `${x}px`,
        top: `${y}px`,
      });
    });
  }

  componentDidLoad(){
    this.button = this.host.querySelector('#button');
    this.tooltip = this.host.querySelector('#tooltip');
    
    this.computePos()
  }

  componentDidRender(){
    window.addEventListener('resize', () => {
      this.computePos()
      });
  }

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
