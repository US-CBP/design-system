export default {
  title: 'Patterns/Button',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    disabled: {
      name: 'Disabled',
      description: 'When `[disabled="true"]` attribute is present, specifies that the button should be disabled. A disabled button is unusable and un-clickable.',
      control: 'boolean'
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

const Template = ({ variant, color, fill, label, disabled, type, ariaLabel }) => (
  `
    <button
      class="${variant === 'default' ? 'cbp-btn' : 'cbp-btn-square'} ${setBtnFill(color, fill)}"
      type=${type}
      ${disabled ? "disabled='true'" : ''}
      ${variant === 'default' ? '' : 'aria-label=' + ariaLabel}
    >
      <i class="fas fa-clipboard-check"></i>${variant === 'default' ? label : ''}
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

const CTATemplate = ({ label, disabled, type }) => (
  `
    <button
      class="cbp-btn-cta cbp-btn__primary"
      type=${type}
      ${disabled ? "disabled='true'" : ''}
    >
      <i class="fas fa-clipboard-check"></i>${label}
    </button>
  `
);

export const Default = Template.bind({});
Default.args = {
  variant: 'default',
  color: 'primary',
  fill: 'solid',
  label: 'Default',
  type: 'button',
  disabled: false,
  ariaLabel: ''
};
Default.argTypes = {
  variant: {
    name: 'Button Variant',
    description: 'Choose button variant',
    control: 'radio',
    options: ['default', 'square']
  },
  label: {
    name: 'Button Label',
    description: 'Label text in the `<button>` element and used to describe the action when clicked.',
    control: 'text'
  },
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
    description: 'Displays button fill in the overall button hierarchy. Available options are: `Solid`, `Outline` and `Ghost`.',
    control: 'select',
    options: [
      'solid',
      'outline',
      'ghost'
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
  },
  ariaLabel: { 
    name: 'Aria Label Attribute',
    description: 'When a button displays an icon without a label, `aria-label` should be set to define the accessible label.',
    control: 'text'
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
  ariaLabel: { 
    name: 'Aria Label Attribute',
    description: 'When a button displays an icon without a label, `aria-label` should be set to define the accessible label.',
    control: 'text'
  }
}
FloatingActionButton.storyName = 'Floating Action';

export const CTAButton = CTATemplate.bind({});
CTAButton.args = {
  label: 'Call-To-Action',
  disabled: false
};
CTAButton.argTypes = {
  label: {
    name: 'Button Label',
    description: 'Label text in the `<button>` element and used to describe the action when clicked. There should be no more than one of these on any given page, **CTA buttons are not part of a group and should be the only option given**.',
    control: 'text'
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
  },
};
CTAButton.storyName = 'Call-To-Action';