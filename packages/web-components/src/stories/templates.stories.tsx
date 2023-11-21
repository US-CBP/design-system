export default {
  title: 'Patterns/Page Templates',
  parameters: {
    layout: 'fullscreen',
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
    }
  },
  args: {
    username: 'John Smithington',
    isLoggedIn: true
  }
};

const InternalTemplate = ({isLoggedIn, username}) => {
  return ` 
    <cbp-skip-nav></cbp-skip-nav>
    <cbp-universal-header>
      <ul>
        ${isLoggedIn ? `
        <li>
          <cbp-button fill="ghost" accessibility-text="App Directory">
              App Directory
          </cbp-button>
        </li>
        <li>
          <cbp-button fill="ghost" accessibility-text="Feedback">
              Feedback
          </cbp-button>
        </li>
        <li>
          <cbp-button fill="ghost" accessibility-text=${username}>
              ${username}
          </cbp-button>
        </li>
        ` : `
        <li>
          <cbp-button tag="a" href="#" fill="ghost" accessibility-text="Login">
            Login
          </cbp-button>
        </li>
        `}
      </ul>
    </cbp-universal-header>

    <cbp-app-header>
      <a slot="cbp-home" href="/" class="nav-home">Application Name</a>
    </cbp-app-header>

    <cbp-container sx='{"padding":"1rem var(--cbp-responsive-spacing-outer)"}'>
      <main id="main">
        <p>Main content here.</p>
      </main>
    </cbp-container>

    <cbp-footer>
      <nav slot="cbp-footer-nav">
        <cbp-flex role="list">
          <cbp-flex-item role="list-item">
            <cbp-button tag="a" href="#" fill="ghost">App Overview</cbp-button>
          </cbp-flex-item>
          <cbp-flex-item role="list-item">
            <cbp-button tag="a" href="#" fill="ghost">Trainings</cbp-button>
          </cbp-flex-item>
          <cbp-flex-item role="list-item">
            <cbp-button tag="a" href="#" fill="ghost">FAQ's</cbp-button>
          </cbp-flex-item>
          <cbp-flex-item role="list-item">
            <cbp-button tag="a" href="#" fill="ghost">Release Notes</cbp-button>
          </cbp-flex-item>
        <cbp-flex role="list">
      </nav>

      <section>
        <h6>Application Support</h6>
        <p>This application is maintained by The Office of Information Technology: <abbr title="Targeting and Analysis Systems Program Directorate">TASPD</abbr>.</p>
        <cbp-flex gap="var(--cbp-space-4x)" wrap="wrap">
          <span>Having an issue?</span>
          <span>Email: <a href="#">this-application-support@abc.def.gov</a></span>
          <span>CBP Helpdesk: (555) 555-5555</span>
        </cbp-flex>
      </section>
    </cbp-footer>
  `;
};

export const Internal = InternalTemplate.bind({});

const ExternalTemplate = () => {
  return ` 
        TODO
        `;
};

export const External = ExternalTemplate.bind({});
