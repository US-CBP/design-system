import {computePosition, flip, offset, shift, arrow} from '@floating-ui/dom'; 

//** Using Float UI, external documentation: https://floating-ui.com/ */

export interface floatUIProps {
    placement:   | 'top'  | 'top-start'  | 'top-end'  | 'right'  | 'right-start'  | 'right-end'  | 'bottom'  | 'bottom-start'  | 'bottom-end'  | 'left'  | 'left-start'  | 'left-end',
    offset?:{
        mainAxis?: number,
        crossAxis?: number,
        alignmentAxis?: number,    
    }
    flip?: boolean,
    shift?: boolean,
    autoPlacement?: boolean, //TODO: this should be an obj similar to offset  => array<placement>
    arrow?: boolean,
}

export const floatUI = (props: floatUIProps, referenceEl: HTMLElement, floatingEl: HTMLElement) => {

  const arrowEl = floatingEl.querySelector('#arrow') as HTMLElement;

  let middleware = [
    props.offset? offset(props.offset) : undefined,
    props.flip ? flip() : undefined,
    props.shift ? shift() : undefined,
    // props.autoPlacement ? console.log('props.autoplacement: ', props.autoPlacement) : undefined,
    props.arrow ? arrow({element: arrowEl, padding: 8}) : undefined,
  ]

  // console.log('middleware: ', middleware) //TODO: testing, remove

  // computePosition(referenceEl, floatingEl, {
  //     placement: props.placement,
  //     middleware: middleware
  //   }).then(({x, y}) => {
  //     Object.assign(floatingEl.style, {
  //       left: `${x}px`,
  //       top: `${y}px`,
  //     });
  // });

  
  computePosition(referenceEl, floatingEl, {
      placement: props.placement,
      middleware: middleware
    }).then(({x, y, middlewareData}) => {
      if(middlewareData.arrow){
        const {x, y} = middlewareData.arrow;
        console.log('middlewareData.arrow: ', middlewareData.arrow, middlewareData); //TODO: local testing
        Object.assign(arrowEl.style, {
          left: x != null ? `${x}px` : '',
          top: y != null ? `${y}px` : '',
        });
      }
      Object.assign(floatingEl.style, {
        left: `${x}px`,
        top: `${y}px`,
      });
  });
}