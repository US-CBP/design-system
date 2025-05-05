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
  const html =  items.map(({ label, name, href, selected, children}) => {
    if(!children){
      // return `<cbp-nav-item name="${name}" ${selected ? 'selected' : ''}>  <cbp-button tag='a' onclick=${function(e){e.preventDefault()}} href=${href} fill="ghost" color="secondary">${label}</cbp-button></cbp-nav-item>`;
      return `<cbp-nav-item name="${name}" ${selected ? 'selected' : ''}>  <cbp-button tag='a' href=${href} fill="ghost" color="secondary">${label}</cbp-button></cbp-nav-item>`;
    } else {
      return `<cbp-nav-item name="${name}" ${selected ? 'selected' : ''}>  <cbp-button tag='button' fill="ghost" color="secondary" target-prop="open" controls=${drawerid}>${label} <cbp-icon name="chevron-right" rotate="90" sx='{"margin-left":"0.25rem"}'></cbp-icon></cbp-button></cbp-nav-item>`;
    }
       }
  );
  return html.join('');
}


function generateSubnav(items){
  const html = items.map(({ icon, label, name, href, open, children, current }) => {
      return `<cbp-subnav-item label="${label}" name="${name}" href=${href} ${current? `current=${current}` : ``} ${open? `open=${open}` : ``} >${icon ? `<span slot="cbp-subnav-item-label">${icon} ${label}</span>` : ``} ${children? generateSubnav(children) : ``}</cbp-subnav-item>`;
  });
      return html.join('');
}


const Template = ({ open, drawerid, items, sx }) => {  
  
  document.addEventListener('click', function(e) { e.preventDefault(); });

  return ` 
      <cbp-app-header
        ${sx ? `sx=${JSON.stringify(sx)}` : ''}
      >
       ${generateNavItems(items, drawerid)}
      

        <cbp-drawer
        ${open ? `open=${open}` : ''}
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
              accessibilitytext="Application Subnav"
            >
              ${generateSubnav(items)}
            </cbp-subnav>
          </cbp-panel>
        </cbp-drawer>
      </cbp-app-header>
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