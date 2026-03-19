export default {
  title: 'Components/Floating Action',
  tags: ['beta'],
  argTypes: {
    alignment : {
      description: 'Determines the alignment of the Floating Action Container',
      control: 'select',
      options: ['bottom-left', 'bottom-right', 'top-left', 'top-right']
    },
    additionalButton:{
        description: 'Render an additional button in the Floating Action',
        control: 'boolean'
    }
  },
  args: {
    alignment: 'bottom-right',
    additionalButton: false
  },
};

const Template = ({ alignment, additionalButton }) => { 
  return `
    <cbp-floating-action
        alignment= ${alignment}
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