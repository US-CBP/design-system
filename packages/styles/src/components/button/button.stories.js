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
    }
  }
};

const setBtnType = (color, type) => {
  const btnColor = `cbp-btn__${color}`

  if (type) {
    return `${btnColor}-${type}`
  }

  return btnColor;
}

const Template = ({ square, color, type, label, disabled }) => (
  `
    <button
      class="${square ? 'cbp-btn-square' : 'cbp-btn'} ${setBtnType(color, type)}"
      type="button"
      ${disabled ? "disabled='true'" : ''}
      ${square ? "aria-label='accessible-label'" : ''}
    >
      <i class="fas fa-clipboard-check"></i>
      ${square ? '' : label}
    </button>
  `
);

const FloatingActionTemplate = ({ color, disabled }) => (
  `
    <button 
      class="cbp-btn cbp-btn__${color}-float"
      type="button"
      aria-label="back to top"
      ${disabled ? "disabled='true'" : ''}
    >
      <i class="fas fa-arrow-up"></i>
    </button>
  `
)

export const Primary = Template.bind({});
Primary.args = {
  color: 'primary',
  type: '',
  label: 'Primary',
  square: false
};
Primary.argTypes = {
  color: {
    table: {
      disable: true
    }
  },
  type: {
    name: 'Button Type',
    description: 'Displays button type in the overall button hierarchy. Available options are: `Solid (empty option)`, `Outline`, `Ghost`, and `Call-to-Action (CTA)`.',
    control: 'select',
    options: [
      '',
      'outline',
      'ghost',
      'cta',
    ],
  }
}

export const Secondary = Template.bind({});
Secondary.args = {
  color: 'secondary',
  type: '',
  label: 'Secondary',
  square: false
};
Secondary.argTypes = {
  color: {
    table: {
      disable: true
    }
  },
  type: {
    name: 'Button Type',
    description: 'Displays button type in the overall button hierarchy. Available options are: `Solid (empty option)`, `Outline` and `Ghost`.',
    control: 'select',
    options: [
      '',
      'outline',
      'ghost'
    ],
  }
}

export const Danger = Template.bind({});
Danger.args = {
  color: 'danger',
  type: '',
  label: 'Danger',
  square: false
};
Danger.argTypes = {
  color: {
    control: { type: 'text' },
    table: {
      disable: true
    }
  },
  type: {
    name: 'Button Type',
    description: 'Displays button type in the overall button hierarchy. Available options are: `Solid (empty option)`, `Outline` and `Ghost`.',
    control: 'select',
    options: [
      '',
      'outline',
      'ghost',
    ],
  }
}

export const FloatingActionButton = FloatingActionTemplate.bind({});
FloatingActionButton.args = {
  color: 'primary'
};
FloatingActionButton.argTypes = {
  color: {
    name: 'Color',
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