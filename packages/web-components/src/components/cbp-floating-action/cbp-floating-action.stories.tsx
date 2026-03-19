export default {
  title: 'Components/Floating Action',
  tags: ['beta'],
  argTypes: {
    top:{
        description: 'Set the top CSS property for the floating action',
        control: 'text' //TODO: is this correct control?
    },
    right:{
        description: 'Set the right CSS property for the floating action',
        control: 'text' //TODO: is this correct control?
    },
    bottom:{
        description: 'Set the bottom CSS property for the floating action',
        control: 'text' //TODO: is this correct control?
    },
    left:{
        description: 'Set the left CSS property for the floating action',
        control: 'text' //TODO: is this correct control?
    },
    additionalButton:{
        description: 'Render an additional button in the Floating Action',
        control: 'boolean'
    },
    sx: {
      description: 'Supports adding inline styles as an object of key-value pairs comprised of CSS properties and values. Values should reference design tokens when possible.',
      control: 'object',
    },
  },
  args: {
    // top:'',
    // left:'',
    bottom: '1rem',
    right:'1rem',
    additionalButton: false
  },
};

const Template = ({top, right, bottom, left, additionalButton }) => { //TODO: issue with spacing on top/right/bottom/left making render weird when using control
  return `
    <cbp-floating-action
        top=${top}
        right=${right}
        bottom=${bottom}
        left=${left}
    >
      <cbp-button
        color=primary 
        variant= circle
        accessibility-text= 'Floating action button'
      >
        <cbp-icon name="magnifying-glass"></cbp-icon>
      </cbp-button>

      ${additionalButton ?
      `<cbp-button
        color=secondary 
        variant= circle
        accessibility-text= 'Floating action button'
      >
        <cbp-icon name="circle-info"></cbp-icon>
      </cbp-button>
      ` : ``}
    </cbp-floating-action>
    `;
};

export const floatingActionContainer = Template.bind({});