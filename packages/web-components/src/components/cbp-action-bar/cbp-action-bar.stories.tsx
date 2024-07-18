export default {
    title: 'Components/Action Bar',
    tags: ['autodocs'],
    argTypes: {
    
      actionBarContent:{
        name: 'Action Bar Content',
        description: 'Buttons, links, or action items to populate the action bar',
        control: 'string',
      },
      variant: {
        control: 'select',
        options: ['inline', 'sticky'],
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
  
  const Template = ({actionBarInfo, actionBarContent, variant}) => {
     return ` 
        <cbp-action-bar 
        ${variant ? `variant=${variant}` : ''}
        >
          <cbp-typography 
            slot='cbp-action-bar-info'
            tag='div'
          >
              ${actionBarInfo}
          </cbp-typography>
          ${actionBarContent}
        </cbp-action-bar>
      `;
  };

  export const ActionBar = Template.bind({});
      ActionBar.args = {
        actionBarInfo: `0 items selected.`,
        actionBarContent: ` <cbp-button fill="ghost" context="dark-inverts" accessibility-text="Action 1">Action 1</cbp-button>
                            <cbp-button fill="ghost" context="dark-inverts" accessibility-text="Action 2">Action 2</cbp-button>
                            `,
    };