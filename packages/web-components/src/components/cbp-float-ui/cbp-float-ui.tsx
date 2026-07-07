import { Component, Element, Host, h, Prop } from '@stencil/core';
import {computePosition, flip, offset, shift, arrow} from '../../../../../node_modules/@floating-ui/dom';

@Component({
  tag: 'cbp-float-ui',
  styleUrl: 'cbp-float-ui.scss',
})
export class CbpFloatUi {

  //external documentation: https://floating-ui.com/

  private referenceEl;
  private floatingEl;
  private arrowIndicator;

  @Element() private host: HTMLElement;

  /**Specifies the preferred position for the element to float in relation to the reference */
  @Prop({reflect: true}) position: 'top' | 'left' | 'bottom' | 'right'

  /**Specifices offset in px for the element from the reference*/
  @Prop({reflect: true}) offset: number; //TODO: should also accept (mainAxis, crossAxis, alignmentAxis) to further customize placement

  /**Determines if the element will vertically flip in instances of overflow */
  @Prop({reflect: true}) flip: boolean

  /**Determines if the element will horizontally shift in instances of overflow */
  @Prop({reflect: true}) shift: boolean

  /**Determines if the element will have a visible arrow to the reference */
  @Prop({reflect: true}) arrow: boolean

  computePos(){
    let middleware = [];

    this.offset ? middleware.push(offset(this.offset)) : ``;
    this.flip ? middleware.push(flip()) : ``;
    this.shift ? middleware.push(shift()) : ``;
    this.arrow ? middleware.push(arrow({element: this.arrowIndicator})) : ``;

    // console.log('middleware: ', middleware, this.host); //TODO: local testing, remove
    
    computePosition(this.referenceEl, this.floatingEl, {
      placement: this.position,
      middleware: middleware
    // }).then(({x, y}) => {
    }).then(({middlewareData}) =>{
      console.log('middlewareData: ', middlewareData);
      if (middlewareData.arrow) {
        const {x, y} = middlewareData.arrow;

        Object.assign(this.arrowIndicator.style, {
          left: `${x}px`,
          top: `${y}px`,
        });

      }
    })
      
      //TODO: arrow placement needs to be calculated here, see https://floating-ui.com/docs/arrow

      // Object.assign(this.floatingEl.style, {
      //   left: `${x}px`,
      //   top: `${y}px`,
      // });
    // });

// computePosition(referenceEl, floatingEl, {
//   middleware: [arrow({element: arrowEl})],
// }).then(({middlewareData}) => {
//   if (middlewareData.arrow) {
//     const {x, y} = middlewareData.arrow;
 
//     Object.assign(arrowEl.style, {
//       left: x != null ? `${x}px` : '',
//       top: y != null ? `${y}px` : '',
//     });
//   }
// });


  }

  componentDidLoad(){
    this.referenceEl = this.host.children.item(0);
    this.floatingEl = this.host.children.item(this.host.children.length - 1);

    this.arrowIndicator = this.host.querySelector('#arrow');
    // console.log('Elements: ', this.container, this.child); //TODO: local testing, remove

    this.computePos()
  }

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
