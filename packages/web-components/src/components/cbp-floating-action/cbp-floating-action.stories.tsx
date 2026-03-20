export default {
  title: 'Components/Floating Action',
  tags: ['beta'],
  argTypes: {
    top:{
        description: 'Set the top CSS property for the floating action',
        control: 'text'
    },
    right:{
        description: 'Set the right CSS property for the floating action',
        control: 'text'
    },
    bottom:{
        description: 'Set the bottom CSS property for the floating action',
        control: 'text'
    },
    left:{
        description: 'Set the left CSS property for the floating action',
        control: 'text'
    },
    sx: {
      description: 'Supports adding inline styles as an object of key-value pairs comprised of CSS properties and values. Values should reference design tokens when possible.',
      control: 'object',
    },
  },
  args: {
    top:``,
    left:``,
    bottom: `1.5rem`,
    right:`var(--cbp-responsive-spacing-outer)`,
    additionalButton: false
  },
};

const Template = ({top, right, bottom, left, sx}) => {
  return `
    <cbp-floating-action
        top="${top}"
        right="${right}"
        bottom="${bottom}"
        left="${left}"
        ${sx ? `sx='${JSON.stringify(sx)}'` : ''}
    >
      <cbp-button
        color=primary 
        variant= circle
        accessibility-text= 'Floating action button'
        sx='{"--cbp-button-height":"3.5rem"}'
      >
        <cbp-icon 
          name="magnifying-glass"
          size="1.5rem"
        ></cbp-icon>
       </cbp-button>
    </cbp-floating-action>
    `;
};

export const floatingActionContainer = Template.bind({});

const twoButtonTemplate = ({top, right, bottom, left, sx}) => {
  return `
    <cbp-floating-action
        top="${top}"
        right="${right}"
        bottom="${bottom}"
        left="${left}"
        ${sx ? `sx='${JSON.stringify(sx)}'` : ''}
    >
      <cbp-flex
        direction="column"
        gap="var(--cbp-space-4x)"
      >
        <cbp-button
        <cbp-button
          color=primary 
          variant= circle
          accessibility-text= 'Floating action button'
          sx='{"--cbp-button-height":"3.5rem"}'
        >
          <cbp-icon 
            name="magnifying-glass"
            size="1.5rem"
          ></cbp-icon>
        </cbp-button>
        <cbp-button
          color=secondary 
          variant= circle
          accessibility-text= 'Floating action button'
        <cbp-button
          color=primary 
          variant= circle
          accessibility-text= 'Floating action button'
          sx='{"--cbp-button-height":"3.5rem"}'
        >
          <cbp-icon name="circle-info"></cbp-icon>
        </cbp-button>
      </cbp-flex>
    </cbp-floating-action>
    `;
};

export const floatingActionTwoButton = twoButtonTemplate.bind({});