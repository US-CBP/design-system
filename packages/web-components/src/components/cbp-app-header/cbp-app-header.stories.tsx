export default {
  title: 'Components/Application Header',
  tags: ['beta'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    drawerid: {
      description: 'A unique `id` applied to the drawer and referenced by the control.',
      control: 'text',
    },
    sx: {
      description: 'Supports adding inline styles as an object of key-value pairs comprised of CSS properties and values. Values should reference design tokens when possible.',
      control: 'object',
    },
  },
};

function generateNavItems(items, drawerid){
  const html =  items.map(({ label, name, href, current, children}) => {
    if(!children){
      return `<cbp-nav-item name="${name}" ${current ? 'selected' : ''}>  <cbp-button tag='a' href=${href} fill="ghost" color="secondary">${label}</cbp-button></cbp-nav-item>`;
    } else {
      return `<cbp-nav-item name="${name}" ${current ? 'selected' : ''}>  <cbp-button tag='button' fill="ghost" color="secondary" target-prop="open" controls=${drawerid}>${label} <cbp-icon name="chevron-right" rotate="90"></cbp-icon></cbp-button></cbp-nav-item>`;
    }
       }
  );
  return html.join('');
}


function generateSubnav(items){
  const html = items.map(({ icon, label, name, href, children, current }) => {
      return `<cbp-subnav-item label="${label}" name="${name}" href=${href} ${current? `current=${current}` : ``}  >${icon ? `<span slot="cbp-subnav-item-label">${icon} ${label}</span>` : ``} ${children? generateSubnav(children) : ``}</cbp-subnav-item>`;
  });
      return html.join('');
}


const Template = ({ drawerid, items, sx }) => {  
  
  // document.addEventListener('click', function(e) { e.preventDefault(); }); //TODO: remove before push
  setTimeout(() => {
    let anchors = document.querySelectorAll('cbp-app-header a, cbp-subnav a');
    anchors.forEach(anchor => {
      anchor.addEventListener('click', function(e) { e.preventDefault(); })
    });
  }, 1000

  )

  return ` 
      <cbp-app-header
        ${sx ? `sx=${JSON.stringify(sx)}` : ''}
      >
       ${generateNavItems(items, drawerid)}
      </cbp-app-header>
      
      <cbp-drawer
        ${drawerid ? `uid=${drawerid}` : ''}
        >
          <cbp-panel
            aria-labelledby="panelheader"
            role="complementary"
          >
            <cbp-typography
              slot="cbp-panel-header"
              tag="h3"
              variant="heading-lg"
              id="panelheader"
            >
              Application Name
            </cbp-typography>

            <cbp-form-field
              label='Search'
            >
              <cbp-form-field-wrapper>
                <input
                  type="search"
                  name="search"
                />
                <span slot="cbp-form-field-attached-button">
                  <cbp-button
                    type="submit"
                    fill="solid"
                    color="secondary"
                    variant="square"
                    accessibility-text="Search"
                  >
                    <cbp-icon name="magnifying-glass" size="1rem"></cbp-icon>
                  </cbp-button>
                </span>
              </cbp-form-field-wrapper>
            </cbp-form-field>

            <cbp-subnav
              accessibility-text="Application Subnav"
              store="true"
            >
              ${generateSubnav(items)}
            </cbp-subnav>
          </cbp-panel>
        </cbp-drawer>  
      `;
};


export const ApplicationHeader = Template.bind({});
ApplicationHeader.args = {
  drawerid: 'navDrawer',
  items: [
      {
        label: 'Application Name',
        name: 'Application Name',
        href: './?path=/story/components-application-header--application-header#',
        current: true
      },
      {
        label: 'App Item #1',
        name: 'App Item #1',
        href: './?path=/story/components-application-header--application-header#',
        children: [
          {
            label: 'App Item #1-1',
            name: 'App Item #1-1',
            href: './?path=/story/components-application-header--application-header#',
          },
          {
            label: 'App Item #1-2',
            name: 'App Item #1-2',
            href: './?path=/story/components-application-header--application-header#',
            children: [
              {
                label: 'App Item #1-2-1',
                name: 'App Item #1-2-1',
                href: './?path=/story/components-application-header--application-header#',
                children: [
                  {
                    label: 'App Item #1-2-1-1',
                    name: 'App Item #1-2-1-1',
                    href: './?path=/story/components-application-header--application-header#',
                  },
                  {
                    label: 'App Item #1-2-1-2',
                    name: 'App Item #1-2-1-2',
                    href: './?path=/story/components-application-header--application-header#',
                  },
                  {
                    label: 'App Item #1-2-1-3',
                    name: 'App Item #1-2-1-3',
                    href: './?path=/story/components-application-header--application-header#',
                  }
                ]
              },{
                label: 'App Item #1-2-2',
                name: 'App Item #1-2-2',
                href: './?path=/story/components-application-header--application-header#',
              }
            ]
          }
        ]
      },
      {
        label: 'App Item #2',
        name: 'App Item #2',
        href: './?path=/story/components-application-header--application-header#',
        children: [
          {
            label: 'App Item #2-1',
            name: 'App Item #2-1',
            href: './?path=/story/components-application-header--application-header#',
          },    
          {
            label: 'App Item #2-2',
            name: 'App Item #2-2',
            href: './?path=/story/components-application-header--application-header#',
          },
          {
            label: 'App Item #2-3',
            name: 'App Item #2-3',
            href: './?path=/story/components-application-header--application-header#',
          },
        ]
      },
      {
        label: 'App Item #3',
        name: 'App Item #3',
        href: './?path=/story/components-application-header--application-header#',
      },
  ] 
}