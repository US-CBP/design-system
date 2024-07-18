export default {
    title: 'Components/Action Bar',
    tags: ['autodocs'],
    argTypes: {
    
      actionBarContent:{
        name: 'Action Bar Content',
        description: 'Buttons, links, or action items to populate the action bar',
        control: 'text',
      },
      variant: {
        control: 'select',
        options: ['inline', 'floating'],
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
    args: {
    },
  };
  
  const Template = ({actionBarInfo, variant, context}) => {
     return ` 
        <cbp-action-bar 
        ${variant ? `variant=${variant}` : ''}
        ${context && context != 'light-inverts' ? `context=${context}` : ''}   
        >
          <cbp-typography 
            slot='cbp-action-bar-info'
            tag='div'
          >
              ${actionBarInfo}
          </cbp-typography>
            <cbp-button 
            ${context && context != 'light-inverts' ? `context=${context}` : ''}   
            fill="ghost"
            accessibility-text="Action 1"
            >
              Action 1
            </cbp-button>
            <cbp-button 
              ${context && context != 'light-inverts' ? `context=${context}` : ''}     
              fill="ghost"
              accessibility-text="Action 2"
            >
              Action 2
            </cbp-button>
        </cbp-action-bar>
      `;
  };

  export const ActionBar = Template.bind({});
      ActionBar.args = {
        actionBarInfo: `0 items selected.`,
      };

    /* todo: update the slot content to use the context of the parent
    not working due to arguements prop not be accessed
    ${Template.arguments.context && Template.arguments.context != 'light-inverts' ? `context=${Template.arguments.context}` : ''}   
    */