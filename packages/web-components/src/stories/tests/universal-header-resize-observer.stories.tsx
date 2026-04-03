export default {
  title: 'Test/Universal Header Resize Observer',
  parameters: {
    layout: 'fullscreen',
    chromatic: { disableSnapshot: true }
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


const UniversalHeaderResizeObserverTemplate: any = ({ logoSrcLg, logoSrcSm, username, isLoggedIn }) => {

  setTimeout(() => {
    // Cancel events on anchors to prevent navigating away from the story
    let anchors = document.querySelectorAll('cbp-universal-header a');
    anchors.forEach(anchor => {
      anchor.addEventListener('click', function(e) { e.preventDefault(); })
    });

    let ro = document.querySelector('cbp-universal-header cbp-resize-observer') as HTMLElement;
    ro.addEventListener('resized', function(e) {
      console.log('Resized: ', e);
    });

  }, 500);

  return `
      <cbp-universal-header
        ${logoSrcLg ? `logo-src-lg=${logoSrcLg}` : ''}
        ${logoSrcSm ? `logo-src-sm=${logoSrcSm}` : ''}
      >
        <cbp-resize-observer>
        <cbp-flex 
          align-items="center"
          justify-content="flex-end"
          sx='{"width":"100%"}'
        >
          ${ isLoggedIn
            ? `
          
              <cbp-flex-item>
                <cbp-button tag="a" href="#" color="secondary" fill="ghost" context="dark-always">
                  <cbp-icon name="book"></cbp-icon>
                  <cbp-hide>App Directory</cbp-hide>
                </cbp-button>
              </cbp-flex-item>

              <cbp-flex-item>
                <cbp-button color="secondary" fill="ghost" context="dark-always">
                  <cbp-icon name="comment"></cbp-icon>  
                  <cbp-hide>Feedback</cbp-hide>
                </cbp-button>
              </cbp-flex-item>

              <cbp-flex-item>
                <cbp-button
                  color="secondary"
                  fill="ghost"
                  context="dark-always"
                >
                  <cbp-icon name="user"></cbp-icon>
                  <cbp-hide>${username}</cbp-hide>
                </cbp-button>
              </cbp-flex-item>
            `
            : `
              <cbp-flex-item>
                <cbp-button tag="a" href="#" color="secondary" fill="ghost" context="dark-always">
                  <cbp-icon name="right-to-bracket"></cbp-icon>
                  Login
                </cbp-button>
              </cbp-flex-item>
            `
          }
        </cbp-flex>
        </cbp-resize-observer>
      </cbp-universal-header>
    `;
};


export const UniversalHeaderResizeObserver = UniversalHeaderResizeObserverTemplate.bind({});
UniversalHeaderResizeObserver.args = {
  logoSrcLg: "./assets/images/cbp-header-logo.svg",
  logoSrcSm: "./assets/images/cbp-seal.svg",
  username: 'HASHIDX',
  isLoggedIn: true,
};
UniversalHeaderResizeObserver.argTypes = {
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
