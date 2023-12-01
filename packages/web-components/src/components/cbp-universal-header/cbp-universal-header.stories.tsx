export default {
    title: 'Components/Universal Header',
    tags: ['autodocs'],
    parameters: {
      layout: 'fullscreen',
      root: '#custom-root'
    },
  };
  
  const UniversalHeaderTemplate = ({ username, isLoggedIn }) => {
    return `
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
    `;
  };
  
  export const UniversalHeader = UniversalHeaderTemplate.bind({});
  UniversalHeader.args = {
    username: 'John Smithington',
    isLoggedIn: true
  };
  UniversalHeader.argTypes = {
    username: {
      name: 'User Name',
      type: { name: 'string', required: true },
      description: 'Name of user to be displayed in the Universal Header'
    },
    isLoggedIn: {
      name: 'User Log In',
      type: { name: 'boolean' },
      description: 'Display Universal Header controls for user log in/out'
    }
  };
  