export default {
  title: 'Controls/Segmented Button Group',
  tags: ['beta'],
  argTypes: {
    buttons: {
      name: 'Buttons (slotted)',
      description: 'Configure various aspects of the buttons within the segmented button group.',
      control: 'object',
    },
    name: {
      type: 'string'
    },
    value: {
      type: 'string'
    },
    multiple: {
      description: 'Specifies whether multiple buttons may remain pressed at the same time. Defaults to false (only a single button in the group may be in a pressed state).',
      control: 'boolean',
    },
    accessibilityText: {
      description: 'Accessibility text is applied as an `aria-label` to the group to add context to its purpose.',
      type: 'string',
    },
    sx: {
      description: 'Supports adding inline styles as an object of key-value pairs comprised of CSS properties and values. Values should reference design tokens when possible.',
      control: 'object',
    },
  },
};

function generateButtons(buttons) {
  const html = buttons.map(({ label, value, pressed, disabled, variant }) => {
    return `
      <cbp-button 
        value="${value}" 
        ${variant ? `variant="${variant}"` : ''}
        ${pressed == true ? `pressed="${pressed}"` : ''}
        ${disabled == true ? 'disabled' : ''}
      >
        ${label}
      </cbp-button>
    `;
  });
  return html.join('');
}

const Template = ({ buttons, name, value, multiple, accessibilityText, disabled, sx }) => {
  return ` 
    <cbp-segmented-button-group
      ${name ? `name="${name}"` : ''}
      ${value ? `value="${value}"` : ''}
      ${multiple ? 'multiple' : ''}
      ${accessibilityText ? `accessibility-text="${accessibilityText}"` : ''}
      ${disabled ? 'disabled' : ''}
      ${sx ? `sx='${JSON.stringify(sx)}'` : ''}
    >
      ${generateButtons(buttons)}
    </cbp-segmented-button-group>
  `;
};

export const SegmentedButtonGroup: any = Template.bind({});
SegmentedButtonGroup.args = {
  buttons: [
    {
      label: 'Small',
      value: 'sm',
      pressed: false,
      disabled: false,
    },
    {
      label: 'Medium',
      value: 'md',
      pressed: false,
      disabled: false,
    },
    {
      label: 'Large',
      value: 'lg',
      pressed: false,
      disabled: false,
    },
  ],
};


export const SegmentedButtonGroupIcons: any = Template.bind({});
SegmentedButtonGroupIcons.args = {
  buttons: [
    {
      label: '<cbp-icon name="user" accessibility-text="User"></cbp-icon>',
      value: '1',
      pressed: false,
      disabled: false,
      variant: "square"
    },
    {
      label: '<cbp-icon name="pen-to-square" accessibility-text="Edit"></cbp-icon>',
      value: '2',
      pressed: false,
      disabled: false,
      variant: "square"
    },
    {
      label: '<cbp-icon name="filter" accessibility-text="Filter"></cbp-icon>',
      value: '3',
      pressed: false,
      disabled: false,
      variant: "square"
    },
  ],
};
