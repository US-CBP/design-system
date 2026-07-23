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
    arrow?: HTMLElement,
}

export const floatUI = (props: floatUIProps, referenceEl: HTMLElement, floatingEl: HTMLElement) => {

  let middleware = [
    props.offset? offset(props.offset) : undefined,
    props.flip ? flip() : undefined,
    props.shift ? shift() : undefined,
    props.arrow ? arrow({element: props.arrow, padding: 8}) : undefined,
  ]
  
  computePosition(referenceEl, floatingEl, {
      placement: props.placement,
      middleware: middleware
    }).then(({x, y, middlewareData, placement}) => {
      if(middlewareData.arrow){
        const {x, y} = middlewareData.arrow;
        
        Object.assign(props.arrow.style, {
          left: x != null ? `${x}px` : '',
          top: y != null ? `${y}px` : '',
        });

        props.arrow.setAttribute("data-placement", placement);
      }
      Object.assign(floatingEl.style, {
        left: `${x}px`,
        top: `${y}px`,
      });
  });
}