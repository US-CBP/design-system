export default {
  title: 'Components/Segmented Button Group',
  tags: ['autodocs'],
  argTypes: {
    buttons: {
      name: 'Buttons',
      description: 'Configure various aspects of the buttons within the segmented button group.',
      control: 'object'
    },
    multiple: {
      description: 'Specifies whether multiple buttons may remain pressed at the same time. Defaults to false (only a single button in the group may be in a pressed state).',
      control: 'boolean',
    },
    accessibilityText: {
      description:
        'Accessibility text is applied as an `aria-label` to the group to add context to its purpose.',
      type: 'string',
    },
    sx: {
      description: 'Supports adding inline styles as an object of key-value pairs comprised of CSS properties and values. Values should reference design tokens when possible.',
      control: 'object',
    },
  },
};


function generateButtons(buttons) {
  const html = buttons.map(({ label, value, selected, disabled}) => {
    return `<cbp-button type="button" value="${value}" ${selected==true ? 'aria-pressed="true"' : ''} ${disabled==true ? 'disabled' : ''}>${label}</cbp-button>`
  })
  return html.join("")
};


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
        label: "Small",
        value: "sm",
        selected: false,
        disabled: false
      },
      {
        label: "Medium",
        value: "md",
        selected: false,
        disabled: false
      },
      {
        label: "Large",
        value: "lg",
        selected: false,
        disabled: false
      }
    ],
};