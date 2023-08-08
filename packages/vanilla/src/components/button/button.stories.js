export default {
  title: 'Patterns/Button',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    element: {
      name: 'Semantic Element',
      description: 'The semantic element rendered; even when visually styled like a button, it is important to use links for navigation and buttons for submitting forms and on-page UI actions.',
      defaultValue: 'button',
      control: 'radio',
      options: [
        'button',
        'anchor (link)'
      ]
    },
    type: {
      name: 'Button Type',
      description: 'The `type` attribute of the button. (not valid for anchors/links)',
      defaultValue: 'button',
      control: 'radio',
      options: [
        'submit',
        'reset',
        'button'
      ]
    },
    ariaLabel: {
      name: 'ARIA Label',
      description: 'The accessible label when the link does not contain text or it is not sufficiently and uniquely descriptive.',
      type: 'string'
    },
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

const Template = ({ element, variant, color, fill, label, disabled, type, ariaLabel }) => {
  const el = (element == 'button') ? 'button' : 'a';
  return (element=='button') ?
    ` 
      <button
        class="${variant === 'default' ? 'cbp-btn' : 'cbp-btn-square'} ${setBtnFill(color, fill)}"
        type=${type}
        ${disabled ? "disabled" : ''}
        ${ariaLabel ? 'aria-label="'+ariaLabel+'"' : ''}
      >
        <i class="fas fa-clipboard-check"></i>${variant === 'default' ? label : ''}
      </button>
    `
    : `  
      <a
        ${disabled ? 'role="link" aria-disabled="true"' : 'href="#"'}
        class="${variant === 'default' ? 'cbp-btn' : 'cbp-btn-square'} ${setBtnFill(color, fill)}"
        ${ariaLabel ? 'aria-label="'+ariaLabel+'"' : ''}
      >
        <i class="fas fa-clipboard-check"></i>${variant === 'default' ? label : ''}
      </a>
    `
}

const FloatingActionTemplate = ({ element, color, disabled, type, ariaLabel }) => {
  const el = (element == 'button') ? 'button' : 'a';
  return (element=='button') ?
  `
    <button 
      class="cbp-btn cbp-btn__${color}-float"
      type=${type}
      ${ariaLabel ? 'aria-label="'+ariaLabel+'"' : ''}
      ${disabled ? "disabled='true'" : ''}
    >
      <i class="fas fa-arrow-up"></i>
    </button>
  `
  : `  
      <a
        ${disabled ? 'role="link" aria-disabled="true"' : 'href="#"'}
        class="cbp-btn cbp-btn__${color}-float"
        ${ariaLabel ? 'aria-label="'+ariaLabel+'"' : ''}
      >
      <i class="fas fa-arrow-up"></i>
      </a>
    `
}

const CTATemplate = ({ element, label, disabled, type, ariaLabel }) => {
  const el = (element == 'button') ? 'button' : 'a';
  return (element=='button') ?
  `
    <button
      class="cbp-btn-cta cbp-btn__primary"
      type=${type}
      ${ariaLabel ? 'aria-label="'+ariaLabel+'"' : ''}
      ${disabled ? "disabled='true'" : ''}
    >
      <i class="fas fa-clipboard-check"></i>${label}
    </button>
  `
  : `  
      <a
        ${disabled ? 'role="link" aria-disabled="true"' : 'href="#"'}
        class="cbp-btn-cta cbp-btn__primary"
        ${ariaLabel ? 'aria-label="'+ariaLabel+'"' : ''}
      >
        <i class="fas fa-clipboard-check"></i>${label}
      </a>
    `
}


export const Default = Template.bind({});
Default.args = {
  element: 'button',
  variant: 'default',
  color: 'primary',
  fill: 'solid',
  label: 'Default',
  type: 'button',
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
  }
}

export const FloatingActionButton = FloatingActionTemplate.bind({});
FloatingActionButton.args = {
  element: 'button',
  color: 'primary',
  type: 'button',
  ariaLabel: 'back to top',
};
FloatingActionButton.argTypes = {
  element: 'button',
  color: {
    name: 'Button Color',
    description: 'The floating action button is reserved for actions that must be accessible above all other content because of the nature of what they do.',
    control: 'radio',
    options: [
      'primary',
      'secondary'
    ]
  }
}
FloatingActionButton.storyName = 'Floating Action';

export const CTAButton = CTATemplate.bind({});
CTAButton.args = {
  element: 'button',
  label: 'Call-To-Action',
  type: 'button',
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