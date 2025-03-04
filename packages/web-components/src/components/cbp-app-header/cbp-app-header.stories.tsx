export default {
  title: 'Components/Application Header',
  tags: ['beta'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    sx: {
      description: 'Supports adding inline styles as an object of key-value pairs comprised of CSS properties and values. Values should reference design tokens when possible.',
      control: 'object',
    },
  },
};

function generateNavItems(navItems){
  const html =  navItems.map(({html, selected}) => {
      return `<cbp-nav-item ${selected ? 'selected' : ''}> ${html}</cbp-nav-item>`;
    }
  );
  return html.join('');
}


const Template = ({ navItems,  sx }) => {
  return ` 
      <cbp-app-header
        ${sx ? `sx=${JSON.stringify(sx)}` : ''}
      >
        ${generateNavItems(navItems)}
      </cbp-app-header>
      `;
};

export const ApplicationHeader = Template.bind({});

ApplicationHeader.args = {
    navItems: [
      {
        html: ` <cbp-button
                  tag='a'
                  fill="ghost"
                  color="secondary"
                  href='./?path=/story/components-application-header--application-header#'
                >
                  Application Name
                </cbp-button>`,
        selected: true
      },{
        html: ` <cbp-button
                  tag='a'
                  fill="ghost"
                  color="secondary"
                  href='./?path=/story/components-application-header--application-header#'
                >
                  Single Nav Item 1
                </cbp-button>`,
          selected: false,
      },
      {
        html: ` <cbp-button
                  tag='a'
                  fill="ghost"
                  color="secondary"
                  href='./?path=/story/components-application-header--application-header#'
                >
                  Single Nav Item 2
                </cbp-button>`,
        selected: false
      },
    ]
};