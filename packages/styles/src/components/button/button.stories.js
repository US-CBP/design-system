export default {
  title: 'Patterns/Button',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    label: {
      name: 'Button Label',
      description: 'Label text in the `<button>` element and used to describe the action when clicked.',
      control: 'text'
    },
    square: {
      name: 'Square Button',
      description: 'Square button type holds an icon only with no text. `aria-label` attribute will need to be added to the `<button>` element for accessibility. Styling not applied to **CTA** Button Type',
      control: 'boolean'
    },
    disabled: {
      name: 'Disabled',
      description: 'When `[disabled="true"]` attribute is present, specifies that the button should be disabled. A disabled button is unusable and un-clickable.',
      control: 'boolean'
    },
    ariaLabel: { 
      name: 'Aria Label Attribute',
      description: 'When a button displays an icon without a label, `aria-label` should be set to define the accessible label.',
      control: 'text'
    }
  }
};

const setBtnFill = (color, fill) => {
  const btnColor = `cbp-btn__${color}`

  if (fill === 'solid') {
    return btnColor;
  } else {
    return `${btnColor}-${fill}`
  }
}

const Template = ({ square, color, fill, label, disabled, ariaLabel, type }) => (
  `
    <button
      class="${square ? 'cbp-btn-square' : 'cbp-btn'} ${setBtnFill(color, fill)}"
      type=${type}
      ${disabled ? "disabled='true'" : ''}
      ${square ? `aria-label=${ariaLabel}` : ''}
    >
      <i class="fas fa-clipboard-check"></i>
      ${square ? '' : label}
    </button>
  `
);

const FloatingActionTemplate = ({ color, disabled, ariaLabel }) => (
  `
    <button 
      class="cbp-btn cbp-btn__${color}-float"
      type="button"
      aria-label="${ariaLabel}"
      ${disabled ? "disabled='true'" : ''}
    >
      <i class="fas fa-arrow-up"></i>
    </button>
  `
)

export const Default = Template.bind({});
Default.args = {
  color: 'primary',
  fill: 'solid',
  label: 'Default',
  square: false,
  type: 'button',
  disabled: false,
  ariaLabel: ''
};
Default.argTypes = {
  color: {
    name: 'Button Color',
    description: '`primary` is generally the dominant action among their peer buttons, `secondary` is the most common to appear but is not the dominant action over its peers, `danger` can indicate an action that cannot easily be undone.',
    control: 'radio',
    options: [
      'primary',
      'secondary',
      'danger'
    ]
  },
  fill: {
    name: 'Button Fill',
    description: 'Displays button fill in the overall button hierarchy. Available options are: `Solid`, `Outline`, `Ghost`, and `Call-to-Action (CTA)` (Only available in `primary` color).',
    control: 'select',
    options: [
      'solid',
      'outline',
      'ghost',
      'cta',
    ],
  },
  type: {
    name: 'Button Type Attribute',
    description: 'The `type` attribute sets the default behavior of the button',
    defaultValue: 'button',
    control: 'radio',
    options: [
      'submit',
      'reset',
      'button'
    ]
  }
}

export const FloatingActionButton = FloatingActionTemplate.bind({});
FloatingActionButton.args = {
  color: 'primary',
  ariaLabel: 'back to top',
  disabled: false
};
FloatingActionButton.argTypes = {
  color: {
    name: 'Button Color',
    description: 'The floating action button is reserved for actions that must be accessible above all other content because of the nature of what they do.',
    control: 'radio',
    options: [
      'primary',
      'secondary'
    ]
  },
  label: {
    table: {
      disable: true
    }
  },
  square: {
    table: {
      disable: true
    }
  }
}
FloatingActionButton.storyName = 'Floating Action';