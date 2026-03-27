export default {
    title: 'Components/Tooltip',
    tags: ['new'],
    argTypes: {
        uid: {
            description: 'A unique `id` applied to the dialog and referenced by the control.',
            control: 'text',
          },
        open: {
            description: 'toggle the open prop for the tooltip',
            control: 'boolean'
        },
        alignment: {
            description: 'Sets where the the tooltip will align to the control.',
            control: 'select',
            options: ["top-left", "top-center", "top-right", "right-top", "right-center", "right-bottom", "bottom-left", "bottom-center", "bottom-right", "left-top", "left-center", "left-bottom"]
        },
        context : {
            control: 'select',
            options: [ "light-inverts", "light-always", "dark-inverts", "dark-always"]
        },
        sx: {
            description: 'Supports adding inline styles as an object of key-value pairs comprised of CSS properties and values. Values should reference design tokens when possible.',
            control: 'object',
        },
    },
    parameters: { layout: 'centered'}
  };

const Template = ({ open, uid, alignment, title, content, tooltipControl, context, sx }) => {
    return ` 
        <cbp-tooltip
            ${open ? `open` : ''}
            ${uid ? `uid=${uid}` : ''}
            alignment=${alignment}
            ${context && context != 'light-inverts' ? `context="${context}"` : ''}
            ${sx ? `sx='${JSON.stringify(sx)}'` : ''}
            >  
            
                ${tooltipControl}
            
            <div slot="cbp-tooltip-content">
                <div style='font-weight: var(--cbp-font-weight-bold)'>${title}</div>
                <div>${content}</div>
            </div>
        </cbp-tooltip>
    `;
};
  
export const Tooltip = Template.bind({});
  
Tooltip.args = {
    uid: 'tooltip',
    alignment: 'top-left',
    title: 'Test Tooltip Title',
    content: 'Stub text for tooltip.',
    tooltipControl: '<cbp-icon name="user" accessibility-text="User"></cbp-icon>',
}

const DefinitionTemplate = ({ open, uid, alignment, title, content, tooltipControl, context, sx }) => {
    return ` 
        <cbp-tooltip
            ${open ? `open` : ''}
            ${uid ? `uid=${uid}` : ''}
            alignment=${alignment}
            variant=definition
            ${context && context != 'light-inverts' ? `context="${context}"` : ''}
            ${sx ? `sx='${JSON.stringify(sx)}'` : ''}

            >  
            
            ${tooltipControl}
            
            <div slot="cbp-tooltip-content">
                <div style='font-weight: var(--cbp-font-weight-bold)'>${title}</div>
                <div>${content}</div>
            </div>
        </cbp-tooltip>
    `;
};

export const DefinitionTooltip = DefinitionTemplate.bind({});
  
DefinitionTooltip.args = {
    uid: 'tooltip',
    alignment: 'top-left',
    title: 'Test Definition Tooltip Title',
    content: 'Stub text for definition tooltip.',
    tooltipControl: `TASPD`,
}
