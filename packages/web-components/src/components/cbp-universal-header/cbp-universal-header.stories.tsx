export default {
  title: 'Components/Universal Header',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    //root: '#custom-root'
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
  return `
      <cbp-universal-header
        ${logoSrcLg ? `logo-src-lg=${logoSrcLg}` : ''}
        ${logoSrcSm ? `logo-src-sm=${logoSrcSm}` : ''}
      >
        <ul>
          ${
            isLoggedIn
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
    `;
};

export const UniversalHeader = UniversalHeaderTemplate.bind({});
UniversalHeader.args = {
  username: 'John Smithington',
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
