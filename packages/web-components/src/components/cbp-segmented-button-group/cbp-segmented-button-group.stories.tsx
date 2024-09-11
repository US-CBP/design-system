export default {
  title: 'Components/Segmented Button Group',
  tags: ['autodocs'],
  argTypes: {
    buttons: {
      name: 'Buttons',
      description: 'Configure various aspects of the buttons within the segmented button group.',
      control: 'object',
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
    return `<cbp-button type="button" value="${value}" ${pressed == true ? 'pressed' : ''} ${disabled == true ? 'disabled' : ''} variant="${variant ? variant : 'default'}">${label}</cbp-button>`;
  });
  return html.join('');
}

const Template = ({ buttons, multiple, accessibilityText, disabled, sx }) => {
  return ` 
        <cbp-segmented-button-group
          ${multiple ? `multiple=${multiple}` : ''}
          ${accessibilityText ? `accessibility-text=${accessibilityText}` : ''}
          ${disabled ? `disabled=${disabled}` : ''}
          ${sx ? `sx=${JSON.stringify(sx)}` : ''}
        >
          ${generateButtons(buttons)}
        </cbp-segmented-button-group>
      `;
};

export const SegmentedButtonGroup = Template.bind({});
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

const IconTemplate = ({ buttons, multiple, accessibilityText, disabled, sx }) => {
  return ` 
        <cbp-segmented-button-group
          ${multiple ? `multiple=${multiple}` : ''}
          ${accessibilityText ? `accessibility-text=${accessibilityText}` : ''}
          ${disabled ? `disabled=${disabled}` : ''}
          ${sx ? `sx=${JSON.stringify(sx)}` : ''}
        >
          ${generateButtons(buttons)}
        </cbp-segmented-button-group>
      `;
};

export const SegmentedButtonGroupIcons = IconTemplate.bind({});
SegmentedButtonGroupIcons.args = {
  buttons: [
    {
      label: '<cbp-icon name="user"></cbp-icon>',
      value: '1',
      pressed: false,
      disabled: false,
      variant: "square"
    },
    {
      label: '<cbp-icon name="pen-to-square"></cbp-icon>',
      value: '2',
      pressed: false,
      disabled: false,
      variant: "square"
    },
    {
      label: '<cbp-icon name="filter"></cbp-icon>',
      value: '3',
      pressed: false,
      disabled: false,
      variant: "square"
    },
  ],
};
