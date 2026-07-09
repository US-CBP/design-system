import {computePosition, flip, offset, shift} from '../../../../node_modules/@floating-ui/dom'; 

//** Using Float UI, external documentation: https://floating-ui.com/ */

export interface floatUIProps {
    placement: 'top' | 'left' | 'bottom' | 'right',
    offset:{
        mainAxis?: number,
        crossAxis?: number,
        alignmentAxis?: number,    
    }
    flip: boolean,
    shift: boolean,
}

export const floatUI = (props: floatUIProps, referenceEl: HTMLElement, floatingEl: HTMLElement) => {
  
   let middleware = [];

    props.offset ? middleware.push(offset(props.offset)) : ``;
    props.flip ? middleware.push(flip()) : ``;
    props.shift ? middleware.push(shift()) : ``;

  computePosition(referenceEl, floatingEl, {
      placement: props.placement,
      middleware: middleware
    }).then(({x, y}) => {
      Object.assign(floatingEl.style, {
        left: `${x}px`,
        top: `${y}px`,
      });
  });
}