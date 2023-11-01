export default {
  title: 'Patterns/Button',
  tags: ['autodocs'],
  argTypes: {
    label: {
      name: 'label (slotted)',
      description: 'Label text in the `<button>` element and used to describe the action when clicked.',
      control: 'text'
    },
    type: {
      description: 'The `type` attribute of the button. (not valid for anchors/links)',
      defaultValue: 'button',
      control: 'radio',
      options: [
        'submit',
        'reset',
        'button'
      ]
    },
    fill: {
      description: 'Displays button fill in the overall button hierarchy. Available options are: `Solid`, `Outline` and `Ghost`.',
      control: 'select',
      options: [
        'solid',
        'outline',
        'ghost'
      ],
    },
    color: {
      description: '`primary` is generally the dominant action among their peer buttons, `secondary` is the most common to appear but is not the dominant action over its peers, `danger` can indicate an action that cannot easily be undone.',
      control: 'radio',
      options: [
        'primary',
        'secondary',
        'danger'
      ]
    },
    variant: {
      description: 'Choose button variant',
      control: 'radio',
      options: ['square', 'cta']
    },
    accessibilityText: {
      description: 'Accessibility text is applied as an `aria-label` and should be supplied when the button does not contain text or it is not sufficiently and uniquely descriptive.',
      type: 'string'
    },
    disabled: {
      description: 'Renders the button in a disabled state. A disabled button is non-interactive and unusable.',
      control: 'boolean'
    },
    sx: {
      description: 'Supports adding inline styles as an object.',
      control: 'object'
    },
    
  }
};

const Template = ({ label, type, fill, color, variant, accessibilityText, disabled, sx }) => { 
  return ` 
      <cbp-app>
      <cbp-button
        type="${type}"
        fill="${fill}"
        color="${color}"
        ${variant ? 'variant="'+variant+'"' : ''}
        ${accessibilityText ? 'accessibility-text="'+accessibilityText+'"' : ''}
        ${disabled ? 'disabled="'+disabled+'"' : ''}
        ${sx ? 'sx='+JSON.stringify(sx) : ''}
      >
        ${label}
      </cbp-button>
      </cbp-app>
    `
}

export const Button = Template.bind({});
Button.args = {
  label: 'Default',
  type: 'button',
  variant: 'default',
  color: 'primary',
  fill: 'solid',
};
