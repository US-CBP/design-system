export default {
    title: 'Components/Breadcrumb',
    //tags: ['autodocs'],
    argTypes: {
 
    },
      args: {
      },
    };
  
    function generateBreadcrumbs(breadcrumbs){
      const html =  breadcrumbs.map(({text, href}) => {
          return ` / <cbp-link href=${href}> ${text}</cbp-link> `
        }
      );
      return html.join('');
    }

    const Template = ({ breadcrumbs, home}) => {
        return ` 
            <cbp-breadcrumb
              home=${home}
            >
              ${generateBreadcrumbs(breadcrumbs)}
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