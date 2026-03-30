export default {
  title: 'Layout and Structure/Universal Header',
  tags: ['beta'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    logoSrcLg: {
      description: 'The src to the large-viewport seal/branding.',
      control: 'text',
    },
    logoSrcSm: {
      description: 'The src to the small-viewport seal/branding.',
      control: 'text',
    },
  },
};


const UniversalHeaderTemplate = ({ logoSrcLg, logoSrcSm, username, isLoggedIn }) => {

  setTimeout(() => {
    // Cancel events on anchors to prevent navigating away from the story
    let anchors = document.querySelectorAll('cbp-universal-header a');
    anchors.forEach(anchor => {
      anchor.addEventListener('click', function(e) { e.preventDefault(); })
    });
  }, 500);

  return `
    <cbp-universal-header
      ${logoSrcLg ? `logo-src-lg=${logoSrcLg}` : ''}
      ${logoSrcSm ? `logo-src-sm=${logoSrcSm}` : ''}
    >
      <ul>
      ${isLoggedIn ? `
        <li>
          <cbp-button tag="a" href="#" color="secondary" fill="ghost" context="dark-always">
            <cbp-icon name="book"></cbp-icon>
            <cbp-hide visually-hide-at="max-width: 64em">
              App Directory
            </cbp-hide>
          </cbp-button>
        </li>

        <li>
          <cbp-button color="secondary" fill="ghost" context="dark-always">
            <cbp-icon name="comment"></cbp-icon>  
            <cbp-hide visually-hide-at="max-width: 64em">
              Feedback
            </cbp-hide>
          </cbp-button>
        </li>

        <li>
          <cbp-button
            color="secondary"
            fill="ghost"
            context="dark-always"
          >
            <cbp-icon name="user"></cbp-icon>
            <cbp-hide visually-hide-at="max-width: 64em">
              ${username}
            </cbp-hide>
          </cbp-button>
        </li>
      ` : `
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
  `;
};

export const UniversalHeader = UniversalHeaderTemplate.bind({});
UniversalHeader.args = {
  logoSrcLg: "./assets/images/cbp-header-logo.svg",
  logoSrcSm: "./assets/images/cbp-seal.svg",
  username: 'HASHIDX',
  isLoggedIn: true,
};
UniversalHeader.argTypes = {
  username: {
    name: 'User Name',
    type: { name: 'string', required: true },
    description: 'Name of user to be displayed in the Universal Header',
  },
  isLoggedIn: {
    name: 'User Log In',
    type: { name: 'boolean' },
    description: 'Display Universal Header controls for user log in/out',
  },
};
