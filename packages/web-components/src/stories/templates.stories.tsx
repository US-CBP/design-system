export default {
  title: 'Patterns/Page Templates',
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
  },
  args: {
    username: 'HASHIDX',
    isLoggedIn: true,
    appHeaderItems: [
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
  },
};

const InternalTemplate = ({ isLoggedIn, username, appHeaderItems }) => {
  return ` 
    <cbp-skip-nav></cbp-skip-nav>
    <cbp-flex
      direction="column"
      sx='{"min-height":"100vh"}'
    >
      <header>
        <cbp-universal-header
          logo-src-lg="./assets/images/cbp-header-logo.svg"
          logo-src-sm="./assets/images/cbp-seal.svg"
        >
          <ul>
          ${ isLoggedIn
            ? `
            <li>
              <cbp-button color="secondary" fill="ghost" context="dark-always">
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
              <cbp-button color="secondary" fill="ghost" context="dark-always">
                <cbp-icon name="user"></cbp-icon>
                <cbp-hide visually-hide-at="max-width: 64em">${username}</cbp-hide>
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
          subnav-drawer-id='appHeaderDrawer'
        >
        ${generateNavItems(appHeaderItems)}
        </cbp-app-header>
        
     ${renderDrawer(appHeaderItems, 'appHeaderDrawer', false)}
      </header>

      <cbp-container sx='{"flex-grow":"1","padding":"1rem var(--cbp-responsive-spacing-outer)"}'>
        <main id="main" tabindex="-1">
          <cbp-typography tag="h1" divider="underline" sx='{"margin-bottom":"var(--cbp-space-5x)"}'>
            Page Title
          </cbp-typography>

          <p>Main content here.</p>

          </main>
      </cbp-container>

      <cbp-footer>
        <nav slot="cbp-footer-nav">
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
          <cbp-flex role="list">
        </nav>

        <section>
          <cbp-typography tag="h6" variant="heading-md" context="dark-always" sx='{"margin-bottom":"var(--cbp-space-2x)"}'>Application Support</cbp-typography>
          <p><em>This application is maintained by The Office of Information Technology: <abbr title="Targeting and Analysis Systems Program Directorate">TASPD</abbr>.</em></p>
          <cbp-flex gap="var(--cbp-space-4x)" wrap="wrap">
            <span>Having an issue?</span>
            <span>Email: <cbp-link href="mailto:somebody@example.com" context="dark-always">this-application-support@abc.def.gov</cbp-link></span>
            <span>CBP Helpdesk: <cbp-link href="tel:555-555-5555" context="dark-always">(555) 555-5555</cbp-link></span>
          </cbp-flex>
        </section>
      </cbp-footer>
    </cbp-flex>
  `;
};

export const Internal = InternalTemplate.bind({});


const Internal2ColumnTemplate = ({ isLoggedIn, username, appHeaderItems, contentGridSize, sidebarGridSize, gridBreakpoint }) => {
  return ` 
    <cbp-skip-nav></cbp-skip-nav>
    <cbp-flex
      direction="column"
      sx='{"min-height":"100vh"}'
    >
      <header>
        <cbp-universal-header
          logo-src-lg="./assets/images/cbp-header-logo.svg"
          logo-src-sm="./assets/images/cbp-seal.svg"
        >
          <ul>
          ${ isLoggedIn
            ? `
            <li>
              <cbp-button color="secondary" fill="ghost" context="dark-always">
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
              <cbp-button color="secondary" fill="ghost" context="dark-always">
                <cbp-icon name="user"></cbp-icon>
                <cbp-hide visually-hide-at="max-width:64em">${username}</cbp-hide>
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
          subnav-drawer-id='appHeaderDrawer'
        >
        ${generateNavItems(appHeaderItems)}
        </cbp-app-header>
        
     ${renderDrawer(appHeaderItems, 'appHeaderDrawer', false)}
      </header>

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
          aria-labelledby="panelheader"
          role="complementary"
        >
          <cbp-typography
            slot="cbp-panel-header"
            tag="h3"
            variant="heading-lg"
            id="panelheader"
          >
            Sidebar Header
          </cbp-typography>
          <p>Sidebar Content</p>

        </cbp-panel>
      </cbp-grid>

      <cbp-footer>
        <nav slot="cbp-footer-nav">
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
          <cbp-flex role="list">
        </nav>

        <section>
          <cbp-typography tag="h6" variant="heading-md" context="dark-always" sx='{"margin-bottom":"var(--cbp-space-2x)"}'>Application Support</cbp-typography>
          <p><em>This application is maintained by The Office of Information Technology: <abbr title="Targeting and Analysis Systems Program Directorate">TASPD</abbr>.</em></p>
          <cbp-flex gap="var(--cbp-space-4x)" wrap="wrap">
            <span>Having an issue?</span>
            <span>Email: <cbp-link href="mailto:somebody@example.com" context="dark-always">this-application-support@abc.def.gov</cbp-link></span>
            <span>CBP Helpdesk: <cbp-link href="tel:555-555-5555" context="dark-always">(555) 555-5555</cbp-link></span>
          </cbp-flex>
        </section>
      </cbp-footer>
    </cbp-flex>
  `;
};

export const Internal2Column = Internal2ColumnTemplate.bind({});
Internal2Column.args = {
  contentGridSize: 'minmax(30rem, 3fr)',
  sidebarGridSize: 'minmax(15rem, 1fr)', 
  gridBreakpoint: '50rem'
}


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

function generateCards(numberOfCards) {
  let html=''
  for (let i=0; i<numberOfCards; i++) {
    html+= `
      <cbp-card variant="decision">
        <cbp-typography
          tag="h4"
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



const InternalCardsLayoutTemplate = ({ isLoggedIn, username, appHeaderItems, numberOfCards, cardMinWidth }) => {
  return ` 
    <cbp-skip-nav></cbp-skip-nav>
    <cbp-flex
      direction="column"
      sx='{"min-height":"100vh"}'
    >
      <header>
        <cbp-universal-header
          logo-src-lg="./assets/images/cbp-header-logo.svg"
          logo-src-sm="./assets/images/cbp-seal.svg"
        >
          <ul>
          ${ isLoggedIn
            ? `
            <li>
              <cbp-button color="secondary" fill="ghost" context="dark-always">
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
              <cbp-button color="secondary" fill="ghost" context="dark-always">
                <cbp-icon name="user"></cbp-icon>
                <cbp-hide visually-hide-at="max-width:64em">${username}</cbp-hide>
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
          subnav-drawer-id='appHeaderDrawer'
        >
        ${generateNavItems(appHeaderItems)}
        </cbp-app-header>
        
     ${renderDrawer(appHeaderItems, 'appHeaderDrawer', false)}
      </header>

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
        <nav slot="cbp-footer-nav">
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
          <cbp-flex role="list">
        </nav>

        <section>
          <cbp-typography tag="h6" variant="heading-md" context="dark-always" sx='{"margin-bottom":"var(--cbp-space-2x)"}'>Application Support</cbp-typography>
          <p><em>This application is maintained by The Office of Information Technology: <abbr title="Targeting and Analysis Systems Program Directorate">TASPD</abbr>.</em></p>
          <cbp-flex gap="var(--cbp-space-4x)" wrap="wrap">
            <span>Having an issue?</span>
            <span>Email: <cbp-link href="mailto:somebody@example.com" context="dark-always">this-application-support@abc.def.gov</cbp-link></span>
            <span>CBP Helpdesk: <cbp-link href="tel:555-555-5555" context="dark-always">(555) 555-5555</cbp-link></span>
          </cbp-flex>
        </section>
      </cbp-footer>
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
