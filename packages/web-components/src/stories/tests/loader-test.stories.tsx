export default {
  title: 'Test/Loader Animation test',
  parameters: {
    layout: 'fullscreen',
    chromatic: { disableSnapshot: true }
  },
  argTypes: {
    progressid: {
      description: 'A unique `id` applied to the dialog and referenced by the control.',
      control: 'text',
    },
    variant: {
      control: 'select',
      options: ['circular', 'linear'],
    },
    size: {
      control: 'select',
      options: ['large', 'small'],
    },
    label: {
      name: 'label (slotted)',
      control: 'text',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      if: { arg: 'variant', eq: 'circular' },
    },
    success: {
      control: 'boolean',
    },
    error: {
      control: 'boolean',
    },
    context: {
      control: 'select',
      options: ['light-inverts', 'light-always', 'dark-inverts', 'dark-always'],
    },
    sx: {
      description: 'Supports adding inline styles as an object of key-value pairs comprised of CSS properties and values. Values should reference design tokens when possible.',
      control: 'object',
    },
  },
};

const loaderAnimationTemplate: any = ({progressid, variant, label, size, orientation, success, error, context, sx }) => {
    var value=0; //value of the loader
    var max= 100; //max value of the loader
   setTimeout(()=>{
    var loader = document.querySelector('cbp-loader') as HTMLCbpLoaderElement;
    setInterval(() => {
        if(value <= max){
            value= value+10;
            loader.value = value;
        }
        else{
          value= 0;
        }
    }, 800);

   }, 500)
    
    return `
        <cbp-loader
        ${progressid ? `progressid="${progressid}"` : ''}
        ${variant ? `variant="${variant}"` : ``}
        ${size ? `size="${size}"` : ``}
        determinate
        value="${value}"
        max="${max}"
        ${orientation ? `orientation="${orientation}"` : ``}
        ${success ? 'success' : ''}
        ${error ? 'error' : ''}
        ${context && context != 'light-inverts' ? `context="${context}"` : ''}
        ${sx ? `sx=${JSON.stringify(sx)}` : ``}
        >
        ${success ? 'Success' : (error ? 'Error' : `${label}`)}
        </cbp-loader>
        
    `;
};


export const loaderAnimation = loaderAnimationTemplate.bind({});
loaderAnimation.args = {
    variant: 'linear',
    value: 25,
    max: 100,
    label: 'Uploading...',
};
// loaderAnimation.argTypes = {
// };
