export default {
    title: 'Components/Breadcrumb',
    tags: ['beta'],
    argTypes: {
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
  
    function generateBreadcrumbs(breadcrumbs, context){
      const html =  breadcrumbs.map(({text, href}) => {
          return ` / <cbp-link href=${href}  context=${context}> ${text}</cbp-link> `
        }
      );
      return html.join('');
    }

    const Template = ({ breadcrumbs, home, context, sx}) => {
        return ` 
            <cbp-breadcrumb
              ${context && context != 'light-inverts' ? `context=${context}` : ''}
              ${sx ? `sx=${JSON.stringify(sx)}` : ''}
            >
              <cbp-button
                tag="a"
                fill="ghost"
                color="primary"
                variant="square"
                context=${context}
                href=${home}
                accessibility-text="Home"
              >
                <cbp-icon
                  name="home"
                >
                </cbp-icon>
              </cbp-button>
              ${generateBreadcrumbs(breadcrumbs, context)}
            </cbp-breadcrumb>
          `;
      };
    
      export const Breadcrumb = Template.bind({});
        Breadcrumb.args = {
            breadcrumbs: [
              {
                text: 'Test',
                href: '#'
              },
              {
                text: 'Test 2',
                href: '#'
              },
            ], 
            home: '#'
        };