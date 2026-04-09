export default {
  title: 'Page Templates/Internal',
  parameters: {
    layout: 'fullscreen',
    html: {
      root: '#storybook-root',
    },
  },
  argTypes: {
    username: {
      name: 'User Name',
      description: 'Name of user to be displayed in the Universal Header',
      type: { name: 'string', required: true },
    },
    isLoggedIn: {
      name: 'User Log In',
      description: 'Display Universal Header controls for user log in/out',
      type: { name: 'boolean' },
    },
    search: {
      description: 'determines if the search field is rendered',
      control: 'boolean'
    },
    searchMethod: {
      description: 'set the method attribute on the form for search',
      control: 'text',
      if:{ arg: 'search'}
    },
    searchAction: {
      description: 'set the action attribute on the form for search',
      control: 'text',
      if:{ arg: 'search'}
    }
  },
  args: {
    username: 'Johnathan Smithington',
    hashid: 'HASHIDX',
    isLoggedIn: true,
    navItems: [
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
        }
      ]
    },
    {
      label: 'Nav Item 2',
      name: 'Nav Item 2',
      href: './?path=/story/components-application-header--application-header#',
    },
    {
      label: 'Nav Item 3',
      name: 'Nav Item 3',
      href: './?path=/story/components-application-header--application-header#',
    },
  ] 
  },
};


function initThemeSwitcher() {
  const ThemeSegement = document.querySelector('cbp-segmented-button-group#darkmode') as HTMLCbpSegmentedButtonGroupElement
  const AppComponent = document.querySelector('cbp-app') as HTMLCbpAppElement;
  const ThemeSpan = document.querySelector('#darkmodeText') as HTMLSpanElement
  ThemeSegement.addEventListener('buttonClick', (e: any) => {
    let value = e.detail.value;
    AppComponent.theme = value;
    if(e.detail.value == 'light'){
      ThemeSpan.innerText = "Light mode active.";
    }else if(e.detail.value == 'dark'){
      ThemeSpan.innerText = "Dark mode active.";
    }else{
      ThemeSpan.innerText = "Device settings will determine light or dark mode.";
    }
  })
}




const InternalTemplate: any = ({ isLoggedIn, username, hashid, navItems, search, searchMethod, searchAction, }) => {

  setTimeout(() => {
    initThemeSwitcher();

    // Prevent anchors from navigating away
    let anchors = document.querySelectorAll('cbp-universal-header a,cbp-app-header a,cbp-subnav a,cbp-footer a');
    anchors.forEach(anchor => {
      anchor.addEventListener('click', function(e) { e.preventDefault(); })
    });
  }, 500);
  
  return ` 
    <cbp-skip-nav></cbp-skip-nav>
    <cbp-flex
      direction="column"
      sx='{"min-height":"100vh"}'
    >
      <cbp-universal-header
        logo-src-lg="./assets/images/cbp-header-logo.svg"
        logo-src-sm="./assets/images/cbp-seal.svg"
      >
        <ul>
        ${ isLoggedIn
          ? `
          <li>
            <cbp-button tag="a" href="#" color="secondary" fill="ghost" context="dark-always">
              <cbp-icon name="book"></cbp-icon>
              <cbp-hide visually-hide-at="max-width: 64em">App Directory</cbp-hide>
            </cbp-button>
          </li>
          <li>
            <cbp-button color="secondary" fill="ghost" context="dark-always">
              <cbp-icon name="comment"></cbp-icon>  
              <cbp-hide visually-hide-at="max-width: 64em">Feedback</cbp-hide>
            </cbp-button>
          </li>
          <li>
            <cbp-button color="secondary" fill="ghost" context="dark-always" controls="userPref" target-prop="open">
              <cbp-icon name="user"></cbp-icon>
              <cbp-hide visually-hide-at="max-width: 64em">${hashid}</cbp-hide>
            </cbp-button>
          </li>
          `
          : `
          <li>
            <cbp-button tag="a" href="#" color="secondary" fill="ghost" context="dark-always">
            <cbp-icon name="right-to-bracket"></cbp-icon>
            Login
            </cbp-button>
          </li>
          `
        }
        </ul>
      </cbp-universal-header>

      <cbp-app-header
        subnav-drawer-id="appheaderdrawer"
        ${search ? `search` : ``}
        ${searchMethod ? `search-method=${searchMethod}` : ``}
        ${searchAction ? `search-action=${searchAction}` : ``}
      >
        ${generateNavItems(navItems, "appheaderdrawer")}
      </cbp-app-header>

      <cbp-container sx='{"flex-grow":"1","padding":"1rem var(--cbp-responsive-spacing-outer)"}'>
        <main id="main" tabindex="-1">
          <cbp-typography tag="h1" divider="underline" sx='{"margin-bottom":"var(--cbp-space-5x)"}'>
            Page Title
          </cbp-typography>

          <p>Main content here.</p>

          </main>
      </cbp-container>

      <cbp-footer>
        <nav slot="cbp-footer-nav" aria-label="Footer Navigation">
          <cbp-flex role="list" breakpoint="37.5rem">
            <cbp-flex-item role="listitem">
              <cbp-button tag="a" href="#" color="secondary" fill="ghost" context="dark-always">App Overview</cbp-button>
            </cbp-flex-item>
            <cbp-flex-item role="listitem">
              <cbp-button tag="a" href="#" color="secondary" fill="ghost" context="dark-always">Trainings</cbp-button>
            </cbp-flex-item>
            <cbp-flex-item role="listitem">
              <cbp-button tag="a" href="#" color="secondary" fill="ghost" context="dark-always">FAQs</cbp-button>
            </cbp-flex-item>
            <cbp-flex-item role="listitem">
              <cbp-button tag="a" href="#" color="secondary" fill="ghost" context="dark-always">Release Notes</cbp-button>
            </cbp-flex-item>
          </cbp-flex>
        </nav>

        <section>
          <cbp-typography tag="span" variant="heading-md" context="dark-always" sx='{"margin-bottom":"var(--cbp-space-2x)"}'>Application Support</cbp-typography>
          <p><em>This application is maintained by The Office of Information Technology: <abbr title="Targeting and Analysis Systems Program Directorate">TASPD</abbr>.</em></p>
          <cbp-flex gap="var(--cbp-space-4x)" wrap="wrap">
            <span>Having an issue?</span>
            <span>Email: <cbp-link href="mailto:somebody@example.com" context="dark-always">this-application-support@abc.def.gov</cbp-link></span>
            <span>CBP Helpdesk: <cbp-link href="tel:555-555-5555" context="dark-always">(555) 555-5555</cbp-link></span>
          </cbp-flex>
        </section>
      </cbp-footer>

     ${renderDrawer(navItems, 'appheaderdrawer', true)}
     ${renderUserPref(username)}
    </cbp-flex>
  `;
};

export const Internal = InternalTemplate.bind({});


const Internal2ColumnTemplate: any = ({ isLoggedIn, username, hashid, navItems, search, searchMethod, searchAction, contentGridSize, sidebarGridSize, gridBreakpoint }) => {
  
  setTimeout(() => {
    initThemeSwitcher();

    // Prevent anchors from navigating away
    let anchors = document.querySelectorAll('cbp-universal-header a,cbp-app-header a,cbp-subnav a,cbp-footer a');
    anchors.forEach(anchor => {
      anchor.addEventListener('click', function(e) { e.preventDefault(); })
    });
  }, 500);
  
  return ` 
    <cbp-skip-nav></cbp-skip-nav>
    <cbp-flex
      direction="column"
      sx='{"min-height":"100vh"}'
    >
      <cbp-universal-header
        logo-src-lg="./assets/images/cbp-header-logo.svg"
        logo-src-sm="./assets/images/cbp-seal.svg"
      >
        <ul>
        ${ isLoggedIn
          ? `
          <li>
            <cbp-button tag="a" href="#" color="secondary" fill="ghost" context="dark-always">
              <cbp-icon name="book"></cbp-icon>
              <cbp-hide visually-hide-at="max-width:64em">App Directory</cbp-hide>
            </cbp-button>
          </li>
          <li>
            <cbp-button color="secondary" fill="ghost" context="dark-always">
              <cbp-icon name="comment"></cbp-icon>  
              <cbp-hide visually-hide-at="max-width:64em">Feedback</cbp-hide>
            </cbp-button>
          </li>
          <li>
            <cbp-button color="secondary" fill="ghost" context="dark-always" controls="userPref" target-prop="open">
              <cbp-icon name="user"></cbp-icon>
              <cbp-hide visually-hide-at="max-width:64em">${hashid}</cbp-hide>
            </cbp-button>
          </li>
          `
          : `
          <li>
            <cbp-button tag="a" href="#" color="secondary" fill="ghost" context="dark-always">
            <cbp-icon name="right-to-bracket"></cbp-icon>
            Login
            </cbp-button>
          </li>
          `
        }
        </ul>
      </cbp-universal-header>

      <cbp-app-header
        subnav-drawer-id="appheaderdrawer"
        ${search ? `search` : ``}
        ${searchMethod ? `search-method=${searchMethod}` : ``}
        ${searchAction ? `search-action=${searchAction}` : ``}
      >
        ${generateNavItems(navItems, "appheaderdrawer")}
      </cbp-app-header>
      
      <cbp-grid
        grid-template-columns="${contentGridSize} ${sidebarGridSize}"
        gap="var(--cbp-space-7x)"
        breakpoint="${gridBreakpoint}"
        sx='{
          "padding":"1rem var(--cbp-responsive-spacing-outer)",
          "flex-grow":"2"
        }'
      >
        <main id="main" tabindex="-1">
          <cbp-typography tag="h1" divider="underline" sx='{"margin-bottom":"var(--cbp-space-5x)"}'>
            Page Title
          </cbp-typography>

          <p>Main content here.</p>
        </main>

        <cbp-panel
          aria-labelledby="sidebarpanelheader"
          role="complementary"
        >
          <cbp-typography
            slot="cbp-panel-header"
            tag="h2"
            variant="heading-lg"
            id="sidebarpanelheader"
          >
            Sidebar Header
          </cbp-typography>
          <p>Sidebar Content</p>

        </cbp-panel>
      </cbp-grid>

      <cbp-footer>
        <nav slot="cbp-footer-nav" aria-label="Footer Navigation">
          <cbp-flex role="list" breakpoint="37.5rem">
            <cbp-flex-item role="listitem">
              <cbp-button tag="a" href="#" color="secondary" fill="ghost" context="dark-always">App Overview</cbp-button>
            </cbp-flex-item>
            <cbp-flex-item role="listitem">
              <cbp-button tag="a" href="#" color="secondary" fill="ghost" context="dark-always">Trainings</cbp-button>
            </cbp-flex-item>
            <cbp-flex-item role="listitem">
              <cbp-button tag="a" href="#" color="secondary" fill="ghost" context="dark-always">FAQs</cbp-button>
            </cbp-flex-item>
            <cbp-flex-item role="listitem">
              <cbp-button tag="a" href="#" color="secondary" fill="ghost" context="dark-always">Release Notes</cbp-button>
            </cbp-flex-item>
          </cbp-flex>
        </nav>

        <section>
          <cbp-typography tag="span" variant="heading-md" context="dark-always" sx='{"margin-bottom":"var(--cbp-space-2x)"}'>Application Support</cbp-typography>
          <p><em>This application is maintained by The Office of Information Technology: <abbr title="Targeting and Analysis Systems Program Directorate">TASPD</abbr>.</em></p>
          <cbp-flex gap="var(--cbp-space-4x)" wrap="wrap">
            <span>Having an issue?</span>
            <span>Email: <cbp-link href="mailto:somebody@example.com" context="dark-always">this-application-support@abc.def.gov</cbp-link></span>
            <span>CBP Helpdesk: <cbp-link href="tel:555-555-5555" context="dark-always">(555) 555-5555</cbp-link></span>
          </cbp-flex>
        </section>
      </cbp-footer>

      
      ${renderDrawer(navItems, 'appheaderdrawer', true)}
      ${renderUserPref(username)}
    </cbp-flex>
  `;
};

export const Internal2Column = Internal2ColumnTemplate.bind({});
Internal2Column.args = {
  contentGridSize: 'minmax(30rem, 3fr)',
  sidebarGridSize: 'minmax(15rem, 1fr)', 
  gridBreakpoint: '50rem'
}


function generateNavItems(items, drawerid:string|undefined=undefined){
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
              accessibility-text="Application Name Navigation"
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

function renderUserPref(username) {
  return `

      <style>
      cbp-toggle#darkmode {
        --cbp-toggle-custom-icon-off: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" style="fill:rgb(92 72 9)" viewBox="0 0 512 512"><path d="M361.5 1.2c5 2.1 8.6 6.6 9.6 11.9L391 121l107.9 19.8c5.3 1 9.8 4.6 11.9 9.6s1.5 10.7-1.6 15.2L446.9 256l62.3 90.3c3.1 4.5 3.7 10.2 1.6 15.2s-6.6 8.6-11.9 9.6L391 391 371.1 498.9c-1 5.3-4.6 9.8-9.6 11.9s-10.7 1.5-15.2-1.6L256 446.9l-90.3 62.3c-4.5 3.1-10.2 3.7-15.2 1.6s-8.6-6.6-9.6-11.9L121 391 13.1 371.1c-5.3-1-9.8-4.6-11.9-9.6s-1.5-10.7 1.6-15.2L65.1 256 2.8 165.7c-3.1-4.5-3.7-10.2-1.6-15.2s6.6-8.6 11.9-9.6L121 121 140.9 13.1c1-5.3 4.6-9.8 9.6-11.9s10.7-1.5 15.2 1.6L256 65.1 346.3 2.8c4.5-3.1 10.2-3.7 15.2-1.6zM160 256a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zm224 0a128 128 0 1 0 -256 0 128 128 0 1 0 256 0z"/></svg>');

        --cbp-toggle-custom-icon-on: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" style="fill:rgb(254 230 133)" viewBox="0 0 640 640"><path d="M320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576C388.8 576 451.3 548.8 497.3 504.6C504.6 497.6 506.7 486.7 502.6 477.5C498.5 468.3 488.9 462.6 478.8 463.4C473.9 463.8 469 464 464 464C362.4 464 280 381.6 280 280C280 207.9 321.5 145.4 382.1 115.2C391.2 110.7 396.4 100.9 395.2 90.8C394 80.7 386.6 72.5 376.7 70.3C358.4 66.2 339.4 64 320 64z"/></svg>');
      }
    </style>


    <cbp-drawer
      uid= "userPref"    
      position= "right"
      accessibility-text= "User Preference Drawer"
      sx='{
        "--cbp-drawer-close-button-color":"var(--cbp-color-white)"
      }'
    >
      <cbp-panel
          sx='{
            "--cbp-panel-header-color":"var(--cbp-color-white)",
            "--cbp-panel-header-color-dark": "var(--cbp-color-text-lighter)",
            "--cbp-panel-header-color-bg":"var(--cbp-color-branding-dhs-blue)",
            "--cbp-panel-header-color-bg-dark": "var(--cbp-color-branding-dhs-blue)",
            "--cbp-panel-header-color-bottom-border":"var(--cbp-color-gray-cool-40)"
            }'
      >
        <cbp-typography
          slot="cbp-panel-header"
          tag="h2"
          variant="heading-lg"
          id="userprefheader"
        >      
          <cbp-icon name="user"></cbp-icon>
          User Preferences
        </cbp-typography>

        <cbp-typography
          tag="p"
          variant="heading-sm"
        >
          Hello there,
        </cbp-typography>
        
        <cbp-typography
          tag="h3"
          variant="heading-lg"
        >
          ${username}
        </cbp-typography>
        
        <cbp-typography
          tag="p"
          variant="heading-xs"
        >
          HASH ID: XXXXXXX
        </cbp-typography>
        <cbp-flex
          gap="1rem"
          sx='{"margin-block":"var(--cbp-space-3x)"}'
        >
          <cbp-button color="secondary">
            <cbp-icon name="arrow-right-from-bracket"></cbp-icon>
            logout
          </cbp-button>
          <cbp-flex-item
            align-self="center"
          >
            <b>Not you?</b> Click here to Logout.
          </cbp-flex-item>
        </cbp-flex>

        <cbp-section
          sx='{
              "margin-block":"var(--cbp-space-3x)",
              "padding-block-start":"var(--cbp-space-4x)",
              "padding-block-end":"var(--cbp-space-3x)",
              "--cbp-section-color-border":"var(--cbp-color-gray-cool-20)",
              "--cbp-section-color-border-dark":"var(--cbp-color-gray-cool-60)",
              "--cbp-section-border-width":"var(--cbp-border-size-sm) 0"
            }'
        >
          <cbp-segmented-button-group
            id="darkmode"
            sx='{"margin-block-end":"var(--cbp-space-1x)"}'
          >
            <cbp-button value="system" pressed="true">
              <cbp-icon name="computer"></cbp-icon>
              System
            </cbp-button>
            <cbp-button value="light">
              <cbp-icon name="sun"></cbp-icon>
              Light
            </cbp-button>
            <cbp-button value="dark">
              <cbp-icon name="moon"></cbp-icon>
              Dark
            </cbp-button>
          </cbp-segmented-button-group>

          <em id="darkmodeText">
            Device settings will determine light or dark mode.
          </em>

        </cbp-section>
      </cbp-panel>
    </cbp-drawer>
  `
}

function generateCards(numberOfCards) {
  let html=''
  for (let i=0; i<numberOfCards; i++) {
    html+= `
      <cbp-card variant="decision">
        <cbp-typography
          tag="h2"
          variant="heading-md"
          slot="cbp-card-title"
          id="card-heading-${i}"
        >
          Card Title
        </cbp-typography>

        <p>Here is an example of some body text for this decision card.</p>

        <div slot="cbp-card-actions">
          <cbp-button
            tag="button"
            fill="solid"
            color="secondary"
            context="undefined"
            aria-describedby="card-heading-${i}"
          >
            Action 2
          </cbp-button>
          <cbp-button
            tag="button"
            fill="solid"
            color="primary"
            context="undefined"
            aria-describedby="card-heading-${i}"
          >
            Action 1
          </cbp-button>
        </div>
      </cbp-card>
    `
  }
  return html;
}



const InternalCardsLayoutTemplate: any = ({ isLoggedIn, username, hashid, navItems, search, searchMethod, searchAction, numberOfCards, cardMinWidth }) => {
  
  setTimeout(() => {
    initThemeSwitcher();

    // Prevent anchors from navigating away
    let anchors = document.querySelectorAll('cbp-universal-header a,cbp-app-header a,cbp-subnav a,cbp-footer a');
    anchors.forEach(anchor => {
      anchor.addEventListener('click', function(e) { e.preventDefault(); })
    });
  }, 500);

  return ` 
    <cbp-skip-nav></cbp-skip-nav>
    <cbp-flex
      direction="column"
      sx='{"min-height":"100vh"}'
    >
      <cbp-universal-header
        logo-src-lg="./assets/images/cbp-header-logo.svg"
        logo-src-sm="./assets/images/cbp-seal.svg"
      >
        <ul>
        ${ isLoggedIn
          ? `
          <li>
            <cbp-button tag="a" href="#" color="secondary" fill="ghost" context="dark-always">
              <cbp-icon name="book"></cbp-icon>
              <cbp-hide visually-hide-at="max-width:64em">App Directory</cbp-hide>
            </cbp-button>
          </li>
          <li>
            <cbp-button color="secondary" fill="ghost" context="dark-always">
              <cbp-icon name="comment"></cbp-icon>  
              <cbp-hide visually-hide-at="max-width:64em">Feedback</cbp-hide>
            </cbp-button>
          </li>
          <li>
            <cbp-button color="secondary" fill="ghost" context="dark-always" controls="userPref" target-prop="open">
              <cbp-icon name="user"></cbp-icon>
              <cbp-hide visually-hide-at="max-width:64em">${hashid}</cbp-hide>
            </cbp-button>
          </li>
          `
          : `
          <li>
            <cbp-button tag="a" href="#" color="secondary" fill="ghost" context="dark-always">
            <cbp-icon name="right-to-bracket"></cbp-icon>
            Login
            </cbp-button>
          </li>
          `
        }
        </ul>
      </cbp-universal-header>

      <cbp-app-header
        subnav-drawer-id="appheaderdrawer"
        ${search ? `search` : ``}
        ${searchMethod ? `search-method=${searchMethod}` : ``}
        ${searchAction ? `search-action=${searchAction}` : ``}
      >
        ${generateNavItems(navItems, "appheaderdrawer")}
      </cbp-app-header>
        
      

      <cbp-container sx='{"padding":"1rem var(--cbp-responsive-spacing-outer)","flex-grow":"2"}'>
        <main id="main" tabindex="-1">
          <cbp-typography tag="h1" divider="underline" sx='{"margin-bottom":"var(--cbp-space-5x)"}'>
            Page Title
          </cbp-typography>

          <cbp-grid
            grid-template-columns="repeat(auto-fit, minmax(${cardMinWidth},1fr)"
            gap="var(--cbp-space-4x)"
          >
            ${generateCards(numberOfCards)}
          </cbp-grid>
        </main>
      </cbp-container>

      <cbp-footer>
        <nav slot="cbp-footer-nav" aria-label="Footer Navigation">
          <cbp-flex role="list" breakpoint="37.5rem">
            <cbp-flex-item role="listitem">
              <cbp-button tag="a" href="#" color="secondary" fill="ghost" context="dark-always">App Overview</cbp-button>
            </cbp-flex-item>
            <cbp-flex-item role="listitem">
              <cbp-button tag="a" href="#" color="secondary" fill="ghost" context="dark-always">Trainings</cbp-button>
            </cbp-flex-item>
            <cbp-flex-item role="listitem">
              <cbp-button tag="a" href="#" color="secondary" fill="ghost" context="dark-always">FAQs</cbp-button>
            </cbp-flex-item>
            <cbp-flex-item role="listitem">
              <cbp-button tag="a" href="#" color="secondary" fill="ghost" context="dark-always">Release Notes</cbp-button>
            </cbp-flex-item>
          </cbp-flex>
        </nav>

        <section>
          <cbp-typography tag="span" variant="heading-md" context="dark-always" sx='{"margin-bottom":"var(--cbp-space-2x)"}'>Application Support</cbp-typography>
          <p><em>This application is maintained by The Office of Information Technology: <abbr title="Targeting and Analysis Systems Program Directorate">TASPD</abbr>.</em></p>
          <cbp-flex gap="var(--cbp-space-4x)" wrap="wrap">
            <span>Having an issue?</span>
            <span>Email: <cbp-link href="mailto:somebody@example.com" context="dark-always">this-application-support@abc.def.gov</cbp-link></span>
            <span>CBP Helpdesk: <cbp-link href="tel:555-555-5555" context="dark-always">(555) 555-5555</cbp-link></span>
          </cbp-flex>
        </section>
      </cbp-footer>

      ${renderDrawer(navItems, 'appheaderdrawer', true)}
      ${renderUserPref(username)}
    </cbp-flex>
  `;
};

export const InternalCardsLayout = InternalCardsLayoutTemplate.bind({});
InternalCardsLayout.args = {
  numberOfCards: '15',
  cardMinWidth: '17rem'
}




/*
const ExternalTemplate = () => {
  return ` 
        TODO
        `;
};

export const External = ExternalTemplate.bind({});
*/
