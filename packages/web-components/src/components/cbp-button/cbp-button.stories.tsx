export default {
  title: 'Patterns/Button',
  argTypes: {
    label: {
      name: 'Button Label',
      description: 'Label text in the `<button>` element and used to describe the action when clicked.',
      control: 'text'
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
    variant: {
      name: 'Button Variant',
      description: 'Choose button variant',
      control: 'radio',
      options: ['default', 'square']
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
    },
  }
};

const Template = ({ label, type }) => { 
  return ` 
      <cbp-button
        type=${type}
      >
        ${label}
      </cbp-button>
    `
}

export const Button = Template.bind({});
Button.args = {
  variant: 'default',
  color: 'primary',
  fill: 'solid',
  label: 'Default',
  type: 'button',
  ariaLabel: ''
};
