export default {
    title: 'Components/Action Bar',
    tags: ['autodocs'],
    argTypes: {
    
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