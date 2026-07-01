export default {
  title: 'Content/Tooltip',
  tags: ['new'],
  argTypes: {
    uid: {
      description: 'A unique `id` applied to the dialog and referenced by the control.',
      control: 'text',
    },
    open: {
      description: 'toggle the open prop for the tooltip',
      control: 'boolean',
    },
    alignment: {
      description: 'Sets where the the tooltip will align to the control.',
      control: 'select',
      options: [
        'top-left',
        'top-center',
        'top-right',
        'right-top',
        'right-center',
        'right-bottom',
        'bottom-left',
        'bottom-center',
        'bottom-right',
        'left-top',
        'left-center',
        'left-bottom',
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

const Template = ({ open, uid, alignment, title, content, tooltipControl, context, sx }) => {

  return `
  <cbp-tooltip
      ${open ? 'open' : ''}
      ${uid ? `uid="${uid}"` : ''}
      ${alignment ? `alignment="${alignment}"` : ''}
      ${context && context != 'light-inverts' ? `context="${context}"` : ''}
      ${sx ? `sx='${JSON.stringify(sx)}'` : ''}
    >  
      ${tooltipControl}
      <div slot="cbp-tooltip-content">
        <div style="font-weight: var(--cbp-font-weight-bold)">${title}</div>
        <div>${content}</div>
      </div>
    </cbp-tooltip>
  `;
};

export const Tooltip = Template.bind({});

Tooltip.args = {
  uid: 'tooltip',
  title: 'Test Tooltip Title',
  content: 'Stub text for tooltip.',
  tooltipControl: '<cbp-icon name="user" accessibility-text="User"></cbp-icon>',
};

const DefinitionTemplate = ({ open, uid, alignment, title, content, tooltipControl, context, sx }) => {
  return ` 
    <cbp-tooltip
      ${open ? 'open' : ''}
      ${uid ? `uid="${uid}"` : ''}
      ${alignment ? `alignment="${alignment}"` : ''}
      variant="definition"
      ${context && context != 'light-inverts' ? `context="${context}"` : ''}
      ${sx ? `sx='${JSON.stringify(sx)}'` : ''}

    >  
      ${tooltipControl}
      <div slot="cbp-tooltip-content">
        <div style="font-weight: var(--cbp-font-weight-bold)">${title}</div>
        <div>${content}</div>
      </div>
    </cbp-tooltip>
  `;
};

export const DefinitionTooltip = DefinitionTemplate.bind({});
DefinitionTooltip.args = {
  uid: 'tooltip',
  title: 'Test Definition Tooltip Title',
  content: 'Stub text for definition tooltip.',
  tooltipControl: `TASPD`,
};


const testTemplate = ({}) => {
  //TODO: style tag is for proof of concept, remove & make into component styling
  return `
  <div style='height: 60rem;overflow: hidden;overflow-y: auto;padding-top: 30rem;'>
  <float-ui> 
    <style>
      #tooltip {
        width: max-content;
        position: absolute;
        top: 0;
        left: 0;
        background: #222;
        color: white;
        font-weight: bold;
        padding: 5px;
        border-radius: 4px;
        font-size: 90%;
      }
    </style>
    <button id="button" aria-describedby="tooltip">
      My button
    </button>
    <div id="tooltip" role="tooltip">My tooltip</div>
  </float-ui>
  </div>
  `;
};
export const testTooltip = testTemplate.bind({});

testTooltip.args = {
  uid: 'tooltip',
  title: 'Test Tooltip Title',
  content: 'Stub text for tooltip.',
  tooltipControl: '<cbp-icon name="user" accessibility-text="User"></cbp-icon>',
};