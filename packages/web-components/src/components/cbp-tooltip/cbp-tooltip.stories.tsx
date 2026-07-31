export default {
  title: 'Content/Tooltip',
  tags: ['beta'],
  argTypes: {
    control: {
      name: 'control (slotted)',
      control: 'text',
    },
    title: {
      name: 'title (slotted)',
      control: 'text',
    },
    content: {
      name: 'content (slotted)',
      control: 'text',
    },
    uid: {
      description: 'A unique `id` applied to the dialog and referenced by the control.',
      control: 'text',
    },
    open: {
      description: 'toggle the open prop for the tooltip',
      control: 'boolean',
    },
    height: {
      description: 'Specifies a custom CSS height for the dialog',
      control: 'text'
    },
    width: {
      description: 'Specifies a custom CSS width for the dialog',
      control: 'text'
    },
    position: {
      description: 'Sets where the the tooltip will align to the control.',
      control: 'select',
      options: [
        "top-start",
        "top",
        "top-end",
        "right-start",
        "right",
        "right-end",
        "bottom-start",
        "bottom",
        "bottom-end",
        "left-start",
        "left",
        "left-end"
      ],
    },

    context: {
      control: 'select',
      options: ['light-inverts', 'light-always', 'dark-inverts', 'dark-always'],
    },
    sx: {
      description: 'Supports adding inline styles as an object of key-value pairs comprised of CSS properties and values. Values should reference design tokens when possible.',
      control: 'object',
    },
  },
  parameters: { layout: 'centered' },
};

const Template = ({ open, height, width, uid, position, title, content, control, context, sx }) => {
  return ` 
    <cbp-tooltip
      ${open ? 'open' : ''}
      ${height ? `height="${height}"` : ''}
      ${width ? `width="${width}"` : ''}
      ${uid ? `uid="${uid}"` : ''}
      ${position ? `position="${position}"` : ''}
      ${context && context != 'light-inverts' ? `context="${context}"` : ''}
      ${sx ? `sx='${JSON.stringify(sx)}'` : ''}
    >  
      ${control}
      <div slot="cbp-tooltip-content">
        <div style="font-weight: var(--cbp-font-weight-bold)">${title}</div>
        <div>${content}</div>
      </div>
    </cbp-tooltip>
  `;
};

export const Tooltip: any = Template.bind({});

Tooltip.args = {
  control: '<cbp-icon name="user" accessibility-text="User"></cbp-icon>',
  title: 'Test Tooltip Title',
  content: 'Stub text for tooltip.',
  uid: 'tooltip',
};

const DefinitionTemplate = ({ open, uid, position, title, content, control, context, sx }) => {
  return ` 
    <cbp-tooltip
      ${open ? 'open' : ''}
      ${uid ? `uid="${uid}"` : ''}
      ${position ? `position="${position}"` : ''}
      variant="definition"
      ${context && context != 'light-inverts' ? `context="${context}"` : ''}
      ${sx ? `sx='${JSON.stringify(sx)}'` : ''}

    >  
      ${control}
      <div slot="cbp-tooltip-content">
        <div style="font-weight: var(--cbp-font-weight-bold)">${title}</div>
        <div>${content}</div>
      </div>
    </cbp-tooltip>
  `;
};

export const DefinitionTooltip: any = DefinitionTemplate.bind({});
DefinitionTooltip.args = {
  control: `TASPD`,
  title: 'Test Definition Tooltip Title',
  content: 'Stub text for definition tooltip.',
  uid: 'tooltip',
};
