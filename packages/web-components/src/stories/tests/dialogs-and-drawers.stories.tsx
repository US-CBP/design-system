export default {
  title: 'Test/Dialogs and Drawers',
  parameters: {
    chromatic: { disableSnapshot: true },
    layout: 'fullscreen',
    html: {
      root: '#storybook-root',
    },
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



const Template: any = () => {
  
  setTimeout(() => {
    initThemeSwitcher();

    // Prevent anchors from navigating away
    const Anchors = document.querySelectorAll('cbp-universal-header a,cbp-app-header a,cbp-subnav a,cbp-footer a');
    Anchors.forEach(anchor => {
      anchor.addEventListener('click', function(e) { e.preventDefault(); })
    });

    // Listen for button clicks on dialog to close it
    //const Dialog = document.querySelector('cbp-dialog');
    const ActionButtons = document.querySelectorAll('[slot="cbp-dialog-actions"] cbp-button');
    ActionButtons.forEach(button => {
      button.addEventListener('click', function(e) { 
        (e.target as HTMLElement).closest('cbp-dialog').closeDialog();
      });
    });



  }, 500);
  
  return ` 

<cbp-skip-nav></cbp-skip-nav>
<cbp-flex direction="column" sx='{"min-height":"100vh"}'>
  <cbp-universal-header logo-src-lg="./assets/images/cbp-header-logo.svg" logo-src-sm="./assets/images/cbp-seal.svg">
    <cbp-flex gap="var(--cbp-space-4x)">
    
      <cbp-flex-item>
        <cbp-button tag="a" href="#" color="secondary" fill="ghost" context="dark-always">
          <cbp-icon name="book"></cbp-icon>
          <cbp-hide visually-hide-at="max-width:64em">App Directory</cbp-hide>
        </cbp-button>
      </cbp-flex-item>
      <cbp-flex-item>
        <cbp-button color="secondary" fill="ghost" context="dark-always">
          <cbp-icon name="comment"></cbp-icon>  
          <cbp-hide visually-hide-at="max-width:64em">Feedback</cbp-hide>
        </cbp-button>
      </cbp-flex-item>
      <cbp-flex-item>
        <cbp-button color="secondary" fill="ghost" context="dark-always" controls="userPref" target-prop="open">
          <cbp-icon name="user"></cbp-icon>
          <cbp-hide visually-hide-at="max-width:64em">HASHIDX</cbp-hide>
        </cbp-button>
      </cbp-flex-item>
      
    </cbp-flex>
  </cbp-universal-header>

  <cbp-app-header sticky subnav-drawer-id="appheaderdrawer">
    
    <cbp-nav-item name="Application Name" slot="cbp-home" current>
      <a href="./?path=/story/components-application-header--application-header#">
        Application Name
      </a>
    </cbp-nav-item>
  
    <cbp-nav-item name="Nav Item 1"> 
      <cbp-button fill="ghost" color="secondary" target-prop="open" controls="appheaderdrawer">
        Nav Item 1
        <cbp-icon name="chevron-right" rotate="90"></cbp-icon>
      </cbp-button>
    </cbp-nav-item>
  
    <cbp-nav-item name="Nav Item 2">
      <a href="./?path=/story/components-application-header--application-header#">
        Nav Item 2
      </a>
    </cbp-nav-item>
  
    <cbp-nav-item name="Nav Item 3"> 
      <cbp-button fill="ghost" color="secondary" target-prop="open" controls="appheaderdrawer">
        Nav Item 3
        <cbp-icon name="chevron-right" rotate="90"></cbp-icon>
      </cbp-button>
    </cbp-nav-item>
  
  </cbp-app-header>
  
  <cbp-grid grid-template-columns="minmax(30rem, 3fr) minmax(15rem, 1fr)" gap="var(--cbp-space-7x)" breakpoint="50rem" sx='{
      "padding":"1rem var(--cbp-responsive-spacing-outer)",
      "flex-grow":"2"
    }'>
    <main id="main" tabindex="-1">
      <cbp-typography tag="h1" divider="underline" sx='{"margin-bottom":"var(--cbp-space-5x)"}'>
        Page Title
      </cbp-typography>

      <p>Main content here.</p>

      
   </main>

    <cbp-panel aria-labelledby="sidebarpanelheader" role="complementary">
      <cbp-typography slot="cbp-panel-header" tag="h2" variant="heading-lg" id="sidebarpanelheader">
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

  
  
<cbp-drawer uid="appheaderdrawer">
      <cbp-panel aria-labelledby="panelheader">
        <cbp-typography slot="cbp-panel-header" tag="h3" variant="heading-lg" id="panelheader">
          Application Name
        </cbp-typography>

        <cbp-form-field label="Search">
          <cbp-form-field-wrapper>
            <input type="search" name="search">
            <span slot="cbp-form-field-attached-button">
              <cbp-button type="submit" fill="solid" color="secondary" variant="square" accessibility-text="Search">
                <cbp-icon name="magnifying-glass"></cbp-icon>
              </cbp-button>
            </span>
          </cbp-form-field-wrapper>
        </cbp-form-field>

        <cbp-subnav accessibility-text="Application Name Navigation" store>
          <cbp-subnav-item label="Application Name" name="Application Name" href="./?path=/story/components-application-header--application-header#" current></cbp-subnav-item>
          <cbp-subnav-item label="Nav Item 1" name="Nav Item 1" href="./?path=/story/components-application-header--application-header#">
            <cbp-subnav-item label="Nav Item 1a" name="Nav Item 1-1" href="./?path=/story/components-application-header--application-header#"></cbp-subnav-item>
            <cbp-subnav-item label="Nav Item 1b" name="Nav Item 1-2" href="./?path=/story/components-application-header--application-header#"></cbp-subnav-item>
          </cbp-subnav-item>
          <cbp-subnav-item label="Nav Item 2" name="Nav Item 2" href="./?path=/story/components-application-header--application-header#"></cbp-subnav-item>
          <cbp-subnav-item label="Nav Item 3" name="Nav Item 3" href="./?path=/story/components-application-header--application-header#">
            <cbp-subnav-item label="Nav Item 3a" name="Nav Item 3a" href="./?path=/story/components-application-header--application-header#"></cbp-subnav-item>
            <cbp-subnav-item label="Nav Item 3b" name="Nav Item 3b" href="./?path=/story/components-application-header--application-header#"></cbp-subnav-item>
          </cbp-subnav-item>
        </cbp-subnav>

      </cbp-panel>
    </cbp-drawer> 

  
<cbp-drawer uid="userPref" position="right" accessibility-text="User Preference Drawer" sx='{
    "--cbp-drawer-close-button-color":"var(--cbp-color-white)"
  }'>
  <cbp-panel sx='{
        "--cbp-panel-header-color":"var(--cbp-color-white)",
        "--cbp-panel-header-color-dark": "var(--cbp-color-text-lighter)",
        "--cbp-panel-header-color-bg":"var(--cbp-color-branding-dhs-blue)",
        "--cbp-panel-header-color-bg-dark": "var(--cbp-color-branding-dhs-blue)",
        "--cbp-panel-header-color-bottom-border":"var(--cbp-color-gray-cool-40)"
        }'>
    <cbp-typography slot="cbp-panel-header" tag="h2" variant="heading-lg" id="userprefheader">      
      <cbp-icon name="user"></cbp-icon>
      User Preferences
    </cbp-typography>

    <cbp-typography tag="p" variant="heading-sm">
      Hello there,
    </cbp-typography>
    
    <cbp-typography tag="h3" variant="heading-lg">
      Johnathan Smithington
    </cbp-typography>
    
    <cbp-typography tag="p" variant="heading-xs">
      HASH ID: XXXXXXX
    </cbp-typography>
    <cbp-flex gap="1rem" sx='{"margin-block":"var(--cbp-space-3x)"}'>
      <cbp-button color="secondary">
        <cbp-icon name="arrow-right-from-bracket"></cbp-icon>
        logout
      </cbp-button>
      <cbp-flex-item align-self="center">
        <b>Not you?</b> Click here to Logout.
      </cbp-flex-item>
    </cbp-flex>

    <cbp-section sx='{
          "margin-block":"var(--cbp-space-3x)",
          "padding-block-start":"var(--cbp-space-4x)",
          "padding-block-end":"var(--cbp-space-3x)",
          "--cbp-section-color-border":"var(--cbp-color-gray-cool-20)",
          "--cbp-section-color-border-dark":"var(--cbp-color-gray-cool-60)",
          "--cbp-section-border-width":"var(--cbp-border-size-sm) 0"
        }'>
      <cbp-segmented-button-group id="darkmode" sx='{"margin-block-end":"var(--cbp-space-1x)"}'>
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

    <cbp-button color="secondary" target-prop="open" controls="dialog">
      Open Test Dialog
    </cbp-button>


  </cbp-panel>
</cbp-drawer>

<cbp-dialog uid="dialog">
  <cbp-typography id="dialog-title" slot="cbp-dialog-header" tag="h2" variant="heading-dialog" divider="underline">
    Dialog Title
  </cbp-typography>
  
  <cbp-typography slot="cbp-dialog-body" tag="div" variant="heading-xs">
    Here is an example of some body text for this dialog. Put more <a href="#">interactive elements</a> in here for testing.
  </cbp-typography>

  <cbp-button color="secondary" target-prop="open" controls="nesteddialog">
    Open Another Dialog
  </cbp-button>

  <div slot="cbp-dialog-actions">
    <cbp-button tag="button" fill="solid" color="tertiary" aria-describedby="dialog-title">Action 3</cbp-button>
    <cbp-button tag="button" fill="solid" color="secondary" aria-describedby="dialog-title">Action 2</cbp-button>
    <cbp-button tag="button" fill="solid" color="primary" aria-describedby="dialog-title">Action 1</cbp-button>
  </div>
</cbp-dialog>


<cbp-dialog uid="nesteddialog">
  <cbp-typography id="dialog-title" slot="cbp-dialog-header" tag="h2" variant="heading-dialog" divider="underline">
    Nested Dialog Title
  </cbp-typography>
  
  <cbp-typography slot="cbp-dialog-body" tag="div" variant="heading-xs">
    This dialog was opened from another dialog.
  </cbp-typography>

  <div slot="cbp-dialog-actions">
    <cbp-button tag="button" fill="solid" color="primary" aria-describedby="dialog-title">Close</cbp-button>
  </div>
</cbp-dialog>



</cbp-flex>

  `;
};

export const DialogsTest = Template.bind({});
DialogsTest.storyName="Dialogs and Drawers";
DialogsTest.args = {};