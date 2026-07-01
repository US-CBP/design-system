import { Element, Component, Host, h } from '@stencil/core';
import {computePosition, flip} from '../../../../../node_modules/@floating-ui/dom';

@Component({
  tag: 'float-ui',
  styleUrl: 'float-ui.scss',
})


export class FloatUi {

  private button;
  private tooltip;

  @Element() private host: HTMLElement;

  computePos(){
    computePosition(this.button, this.tooltip, {
      placement: 'bottom',
      middleware: [flip()],
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
      console.log('Window height:', window.innerHeight);
      console.log('Window width:', window.innerWidth);
      this.computePos  
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
