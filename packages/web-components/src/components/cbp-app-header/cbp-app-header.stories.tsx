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
    store: {
      control: 'boolean'
    },
    sx: {
      description: 'Supports adding inline styles as an object of key-value pairs comprised of CSS properties and values. Values should reference design tokens when possible.',
      control: 'object',
    },
  },
  args: {
    store: true
  }
};

function generateNavItems(items, drawerid=undefined){
  const html =  items.map(({ label, name, href, current, children}, index) => {
    if(!children){
      return `
        <cbp-nav-item 
          ${name ? `name="${name}"` : ''} 
          ${index == 0 ? `slot="cbp-home"` : ''}
          ${current ? 'current' : ''}
        >
          <a href="${href}">
            ${label}
          </a>
        </cbp-nav-item>
      `;
    }
    else {
      return `
        <cbp-nav-item 
          ${name ? `name="${name}"` : ''} 
          ${current ? 'current' : ''}
        > 
          <cbp-button 
            fill="ghost" 
            color="secondary" 
            target-prop="open" 
            controls=${drawerid}
          >
            ${label}
            <cbp-icon name="chevron-right" rotate="90"></cbp-icon>
          </cbp-button>
        </cbp-nav-item>
      `;
    }
  });
  return html.join('');
}

function generateSubnav(items){
  const html = items.map(({ icon, label, name, href, children, current }) => {
      return `<cbp-subnav-item label="${label}" name="${name}" href=${href} ${current? 'current' : ''}  >${icon ? `<span slot="cbp-subnav-item-label">${icon} ${label}</span>` : ``} ${children? generateSubnav(children) : ``}</cbp-subnav-item>`;
  });
      return html.join('');
}

function renderDrawer(items, drawerid, store){

  if(items.length > 1){
    return `
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
              label="Search"
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
                    <cbp-icon name="magnifying-glass"></cbp-icon>
                  </cbp-button>
                </span>
              </cbp-form-field-wrapper>
            </cbp-form-field>

            <cbp-subnav
            ${store ? 'store' : ''}
            >
              ${generateSubnav(items)}
            </cbp-subnav>

          </cbp-panel>
        </cbp-drawer> 
    `;
  }else {
    return '';
  }
}
const Template = ({ drawerid, store, items, sx }) => {  
  
  // preventDefault on all links in the header and subnav
  setTimeout(() => {
    let anchors = document.querySelectorAll('cbp-app-header a');
    anchors.forEach(anchor => {
      anchor.addEventListener('click', function(e) { e.preventDefault(); })
    });
  }, 500);

  return ` 
    <cbp-app-header    
      ${drawerid ? `subnav-drawer-id=${drawerid}`: ``}
      ${sx ? `sx=${JSON.stringify(sx)}` : ''}
    >
      ${generateNavItems(items)}
    </cbp-app-header>
     ${renderDrawer(items, drawerid, store)}
  `;
};

/* 
    Test case for using flex to float additional content off to the right.

      <cbp-flex 
        align-items="center"
        justify-content="space-between"
        sx='{"width":"100%"}'
      >
        <div>
          ${generateNavItems(items)}
        </div>

        <div>
          <cbp-button>
            Right-aligned button
          </cbp-button>
        </div>
      </cbp-flex>
*/



export const ApplicationHeader = Template.bind({});
//ApplicationHeader.StoryName = "Application Header (Simple)"
ApplicationHeader.args = {
  drawerid: 'navDrawer',
  items: [
    {
      label: 'Application Name',
      href: './?path=/story/components-application-header--application-header#',
      current: true
    },
    {
      label: 'Nav Item 1',
      href: './?path=/story/components-application-header--application-header#',
    },
    {
      label: 'Nav Item 2',
      href: './?path=/story/components-application-header--application-header#',
    },
    {
      label: 'Nav Item 3',
      href: './?path=/story/components-application-header--application-header#',
    },
  ] 
}



const AppHeaderWithSubnavTemplate = ({ drawerid, store, items, sx }) => {  
  
  // preventDefault on all links in the header and subnav
  setTimeout(() => {
    let anchors = document.querySelectorAll('cbp-app-header a, cbp-subnav a');
    anchors.forEach(anchor => {
      anchor.addEventListener('click', function(e) { e.preventDefault(); })
    });
  }, 500);

  return ` 
      <cbp-app-header
        ${drawerid ? `subnav-drawer-id=${drawerid}`: ``}
        ${sx ? `sx=${JSON.stringify(sx)}` : ''}
      >
       ${generateNavItems(items, drawerid)}
      </cbp-app-header>
      
     ${renderDrawer(items, drawerid, store)}  
      `;
};


export const AppHeaderWithSubnav = AppHeaderWithSubnavTemplate.bind({});
AppHeaderWithSubnav.storyName = "Application Header with Sub-Nav"
AppHeaderWithSubnav.args = {
  drawerid: 'navDrawer',
  items: [
    {
      label: 'Application Name',
      name: 'Application Name',
      href: './?path=/story/components-application-header--application-header#',
      current: true
    },
    {
      label: 'Nav Item 1',
      name: 'Nav Item 1',
      href: './?path=/story/components-application-header--application-header#',
      children: [
        {
          label: 'Nav Item 1-1',
          name: 'Nav Item 1-1',
          href: './?path=/story/components-application-header--application-header#',
        },
        {
          label: 'Nav Item 1-2',
          name: 'Nav Item 1-2',
          href: './?path=/story/components-application-header--application-header#',
          children: [
            {
              label: 'Nav Item 1-2-1',
              name: 'Nav Item 1-2-1',
              href: './?path=/story/components-application-header--application-header#',
              children: [
                {
                  label: 'Nav Item 1-2-1-1',
                  name: 'Nav Item 1-2-1-1',
                  href: './?path=/story/components-application-header--application-header#',
                },
                {
                  label: 'Nav Item 1-2-1-2',
                  name: 'Nav Item 1-2-1-2',
                  href: './?path=/story/components-application-header--application-header#',
                },
                {
                  label: 'Nav Item 1-2-1-3',
                  name: 'Nav Item 1-2-1-3',
                  href: './?path=/story/components-application-header--application-header#',
                }
              ]
            },{
              label: 'Nav Item 1-2-2',
              name: 'Nav Item 1-2-2',
              href: './?path=/story/components-application-header--application-header#',
            }
          ]
        }
      ]
    },
    {
      label: 'Nav Item 2',
      name: 'Nav Item 2',
      href: './?path=/story/components-application-header--application-header#',
      children: [
        {
          label: 'Nav Item 2-1',
          name: 'Nav Item 2-1',
          href: './?path=/story/components-application-header--application-header#',
        },    
        {
          label: 'Nav Item 2-2',
          name: 'Nav Item 2-2',
          href: './?path=/story/components-application-header--application-header#',
        },
        {
          label: 'Nav Item 2-3',
          name: 'Nav Item 2-3',
          href: './?path=/story/components-application-header--application-header#',
        },
      ]
    },
    {
      label: 'Nav Item 3',
      name: 'Nav Item 3',
      href: './?path=/story/components-application-header--application-header#',
    },
  ] 
}