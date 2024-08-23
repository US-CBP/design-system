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
  },
};

const InternalTemplate = ({ isLoggedIn, username }) => {
  return ` 
    <cbp-skip-nav></cbp-skip-nav>

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
              <cbp-hide
                hide-at="max-width: 64em"
                sx='{"margin-left":"var(--cbp-space-2x)"}'
              >App Directory</cbp-hide>
            </cbp-button>
          </li>
          <li>
            <cbp-button color="secondary" fill="ghost" context="dark-always">
              <cbp-icon name="comment"></cbp-icon>  
              <cbp-hide
                visually-hide-at="max-width: 64em"
                sx='{"margin-left":"var(--cbp-space-2x)"}'
              >Feedback</cbp-hide>
            </cbp-button>
          </li>
          <li>
            <cbp-button color="secondary" fill="ghost" context="dark-always">
              <cbp-icon name="user"></cbp-icon>
              <cbp-hide
                visually-hide-at="max-width: 64em"
                sx='{"margin-left":"var(--cbp-space-2x)"}'
              >${username}</cbp-hide>
            </cbp-button>
          </li>
          `
          : `
          <li>
            <cbp-button tag="a" href="#" color="secondary" fill="ghost" context="dark-always">
            <cbp-icon name="right-to-bracket" sx='{"margin-right":"var(--cbp-space-2x)"}'></cbp-icon>
            Login
            </cbp-button>
          </li>
          `
        }
        </ul>
      </cbp-universal-header>

      <cbp-app-header>
        <a slot="cbp-home" href="/" class="nav-home">Application Name</a>
      </cbp-app-header>
    </header>

    <cbp-container sx='{"padding":"1rem var(--cbp-responsive-spacing-outer)"}'>
      <main id="main" tabindex="-1">
        <cbp-typography tag="h1" divider="underline" sx='{"margin-bottom":"var(--cbp-space-5x)"}'>
          Page Title
        </cbp-typography>

        <p>Main content here.</p>

        </main>
    </cbp-container>

    <cbp-footer data-cbp-container-context="dark">
      <nav slot="cbp-footer-nav">
        <cbp-flex role="list" breakpoint="37.5rem">
          <cbp-flex-item role="list-item">
            <cbp-button tag="a" href="#" color="secondary" fill="ghost" context="dark-always">App Overview</cbp-button>
          </cbp-flex-item>
          <cbp-flex-item role="list-item">
            <cbp-button tag="a" href="#" color="secondary" fill="ghost" context="dark-always">Trainings</cbp-button>
          </cbp-flex-item>
          <cbp-flex-item role="list-item">
            <cbp-button tag="a" href="#" color="secondary" fill="ghost" context="dark-always">FAQs</cbp-button>
          </cbp-flex-item>
          <cbp-flex-item role="list-item">
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
  `;
};

export const Internal = InternalTemplate.bind({});


const Internal2ColumnTemplate = ({ isLoggedIn, username, contentGridSize, sidebarGridSize, gridBreakpoint }) => {
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
                <cbp-hide
                  hide-at="max-width: 64em"
                  sx='{"margin-left":"var(--cbp-space-2x)"}'
                >App Directory</cbp-hide>
              </cbp-button>
            </li>
            <li>
              <cbp-button color="secondary" fill="ghost" context="dark-always">
                <cbp-icon name="comment"></cbp-icon>  
                <cbp-hide
                  visually-hide-at="max-width: 64em"
                  sx='{"margin-left":"var(--cbp-space-2x)"}'
                >Feedback</cbp-hide>
              </cbp-button>
            </li>
            <li>
              <cbp-button color="secondary" fill="ghost" context="dark-always">
                <cbp-icon name="user"></cbp-icon>
                <cbp-hide
                  visually-hide-at="max-width: 64em"
                  sx='{"margin-left":"var(--cbp-space-2x)"}'
                >${username}</cbp-hide>
              </cbp-button>
            </li>
            `
            : `
            <li>
              <cbp-button tag="a" href="#" color="secondary" fill="ghost" context="dark-always">
              <cbp-icon name="right-to-bracket" sx='{"margin-right":"var(--cbp-space-2x)"}'></cbp-icon>
              Login
              </cbp-button>
            </li>
            `
          }
          </ul>
        </cbp-universal-header>

        <cbp-app-header>
          <a slot="cbp-home" href="/" class="nav-home">Application Name</a>
        </cbp-app-header>
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

      <cbp-footer data-cbp-container-context="dark">
        <nav slot="cbp-footer-nav">
          <cbp-flex role="list" breakpoint="37.5rem">
            <cbp-flex-item role="list-item">
              <cbp-button tag="a" href="#" color="secondary" fill="ghost" context="dark-always">App Overview</cbp-button>
            </cbp-flex-item>
            <cbp-flex-item role="list-item">
              <cbp-button tag="a" href="#" color="secondary" fill="ghost" context="dark-always">Trainings</cbp-button>
            </cbp-flex-item>
            <cbp-flex-item role="list-item">
              <cbp-button tag="a" href="#" color="secondary" fill="ghost" context="dark-always">FAQs</cbp-button>
            </cbp-flex-item>
            <cbp-flex-item role="list-item">
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




/*
const ExternalTemplate = () => {
  return ` 
        TODO
        `;
};

export const External = ExternalTemplate.bind({});
*/
