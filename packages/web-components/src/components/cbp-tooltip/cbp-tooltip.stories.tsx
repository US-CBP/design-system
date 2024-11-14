export default {
    title: 'Components/Tooltip',
    //tags: ['autodocs'],
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
  };

const Template = ({ open, uid, alignment, title, content, buttonContent, context, sx }) => {
return ` 
        <a href='#' style='display: inline-block; margin-left:40%; margin-top:20%'> item #1</a>
        <cbp-tooltip
            ${open ? `open` : ''}
            ${uid ? `uid=${uid}` : ''}
            alignment=${alignment}
            ${context && context != 'light-inverts' ? `context=${context}` : ''}
            ${sx ? `sx=${JSON.stringify(sx)}` : ``}

            >  
            <div>
                ${buttonContent}
            </div>
            <div slot="cbp-tooltip-content">
                <div style='font-weight: var(--cbp-font-weight-bold)'>${title}</div>
                <div>${content}</div>
            </div>
        </cbp-tooltip>
        <a href='#'> item #3</a>
    `;
};
  
export const Tooltip = Template.bind({});
  
Tooltip.args = {
    uid: 'tooltip',
    alignment: 'top-left',
    title: 'Test Tooltip Title',
    content: 'Stub text for tooltip.',
    buttonContent: '<cbp-icon name="user"></cbp-icon>',
    // sx:{
    //     "margin-left":"40%",
    //     "margin-top":"20%"
    // }   
}