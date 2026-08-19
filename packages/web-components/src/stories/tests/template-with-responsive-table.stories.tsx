export default {
  title: 'Test/Template with Responsive Table',
  parameters: {
    layout: 'fullscreen',
    html: {
      root: '#storybook-root',
    },
    chromatic: { disableSnapshot: true }
  },
};


/*
function generateCards(numberOfCards) {
  let html=''
  for (let i=0; i<numberOfCards; i++) {
    html+= `
      <cbp-card>
        <cbp-typography
          tag="h2"
          variant="heading-md"
          slot="cbp-card-title"
          id="card-heading-${i}"
        >
          Card Title
        </cbp-typography>

        <p>Here is an example of some body text for this card.</p>

        <cbp-tabs>
          <cbp-tab name="tab1-${i}">Tab 1</cbp-tab>
          <cbp-tab name="tab2-${i}">Tab 2 is longer</cbp-tab>
          <cbp-tab name="tab3-${i}" selected>Tab 3</cbp-tab>
          <cbp-tab name="tab4-${i}">Tab 4</cbp-tab>
        </cbp-tabs>

        <cbp-tab-panel name="tab1-${i}">
          Tab 1.  
          Tab content here. Tab content here. Tab content here. Tab content here. Tab content here. Tab content here. Tab content here. Tab content here. Tab content here. Tab content here. Tab content here. Tab content here. 
        </cbp-tab-panel>

        <cbp-tab-panel name="tab2-${i}">
          Tab 2. 
          Tab content here. Tab content here. Tab content here. Tab content here. Tab content here. Tab content here. 
        </cbp-tab-panel>

        <cbp-tab-panel name="tab3-${i}">
          Tab 3.
          Tab content here. Tab content here. Tab content here. Tab content here. Tab content here. Tab content here. Tab content here. Tab content here. Tab content here. Tab content here. Tab content here. Tab content here. 
        </cbp-tab-panel>
        
        <cbp-tab-panel name="tab4-${i}">
          Tab 4.
          Tab content here. Tab content here. Tab content here. Tab content here. Tab content here. Tab content here. Tab content here. Tab content here. Tab content here. Tab content here. Tab content here. Tab content here. Tab content here. Tab content here. Tab content here. Tab content here. Tab content here. Tab content here. Tab content here. Tab content here. 

        </cbp-tab-panel>

      </cbp-card>
    `
  }
  return html;
}
*/


function generateStructuredListItems(rows) {
  let html:string[] = [];
  for( let i=0; i<rows ; i++) {
    let row: string = `
      <cbp-structured-list-item>
        Structured List item ${i} Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        <!--<a href="#">http://www.somereallylongnonbreakinglink.com</a>-->
      </cbp-structured-list-item>
    `;
    html = [...html, row]
  }
  return html.join('');
}


function generateTableHeaders(columns) {
  let headers:string[] = [];
  // loop over rows
  for( let i=0; i<columns ; i++) {
    let header = `
        <th>
          Header ${i+1}
        </th>
      `;
      headers = [...headers, header]
  }
  return `<tr>${headers.join('')}</tr>`;
}


function generateTableData(columns,rows) {
  let html:string[] = [];
  // loop over rows
  for( let i=0; i<rows ; i++) {
    let cells:string[] = [];
    // loop over columns/cells
    for( let j=0; j<columns ; j++) {
      let cell: string = `
        <td>
          Row ${i+1} Column ${j+1}
        </td>
      `;
      cells = [...cells, cell]
    }
    let row = `
          <tr>
            ${cells.join('')}
          </tr>
    `;
    html = [...html, row];
  }
  return html.join('');
}



const Template: any = () => {

  // Set up event handlers for logging and setting errors on files via the `status` prop.
  setTimeout(() => {
    const Button = document.querySelector('#live-region-test') as HTMLCbpButtonElement;
    const LiveRegion = document.querySelector('[slot=cbp-table-live-region]') as HTMLElement;
    //console.log(Dropdown, Button);

    Button.addEventListener('buttonClick', () => {
      console.log('Updating live region...');
      LiveRegion.innerText = "Page 1 of 5, sorted by Heading 1, ascending.";
    });
  }, 500);

  return ` 
<cbp-app> 
<cbp-skip-nav></cbp-skip-nav>
<cbp-flex direction="column" sx='{"min-height":"100vh"}'>
  <cbp-universal-header logo-src-lg="./assets/images/cbp-header-logo.svg" logo-src-sm="./assets/images/cbp-seal.svg">
    <cbp-flex gap="var(--cbp-space-4x)">
      <cbp-flex-item>
        <cbp-button tag="a" href="#" color="secondary" fill="ghost" context="dark-always">
          <cbp-icon name="book"></cbp-icon>
          <cbp-hide visually-hide-at="max-width: 64em">App Directory</cbp-hide>
        </cbp-button>
      </cbp-flex-item>
      <cbp-flex-item>
        <cbp-button color="secondary" fill="ghost" context="dark-always">
          <cbp-icon name="comment"></cbp-icon>  
          <cbp-hide visually-hide-at="max-width: 64em">Feedback</cbp-hide>
        </cbp-button>
      </cbp-flex-item>
      <cbp-flex-item>
        <cbp-button color="secondary" fill="ghost" context="dark-always" controls="userPref" target-prop="open">
          <cbp-icon name="user"></cbp-icon>
          <cbp-hide visually-hide-at="max-width: 64em">HASHIDX</cbp-hide>
        </cbp-button>
      </cbp-flex-item>
    </cbp-flex>
  </cbp-universal-header>

  <cbp-app-header subnav-drawer-id="appheaderdrawer">    
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
      <a href="./?path=/story/components-application-header--application-header#">
        Nav Item 3
      </a>
    </cbp-nav-item>
    </cbp-app-header>
  


  <!-- grid-template-columns="minmax(15rem, 1fr) minmax(30rem, 3fr)"  -->

  <cbp-grid 
      grid-template-columns="minmax(12rem, 1fr) 3fr" 
      gap="var(--cbp-space-7x)"
      breakpoint="5rem" 
      sx='{
        "padding":"1rem var(--cbp-responsive-spacing-outer)",
        "flex-grow":"2"
    }'>

    <div style="overflow-y: auto; height: 80vh">
      <cbp-typography slot="cbp-panel-header" tag="h2" variant="heading-lg" id="sidebarpanelheader">
        Sidebar Header
      </cbp-typography>
      
      <cbp-structured-list>
        ${generateStructuredListItems(20)}
      </cbp-structure-list>

      <!--
      <cbp-action-bar variant="sticky">
        <cbp-button fill="ghost">
          Action 1
        </cbp-button>
        <cbp-button fill="ghost" color="secondary">
          Action 2
        </cbp-button>
      </cbp-action-bar>
      -->
    </div>


    <main 
      id="main" 
      tabindex="-1" 
      style="overflow:auto"
    >
      <cbp-typography tag="h1" divider="underline" sx='{"margin-bottom":"var(--cbp-space-5x)"}'>
        Page Title
      </cbp-typography>

      
      <cbp-table debug>
        <cbp-button 
          id="live-region-test"
          color="primary"
          slot="cbp-table-toolbar"
        >
          Update Live Region
        </cbp-button>

        <span slot="cbp-table-live-region">Test</span>

        <table style="width:100%">
          <caption><cbp-hide visually-hide>Test Data</cbp-hide></caption>
          <thead>
            ${generateTableHeaders(10)}
          </thead>

          <tbody>
            ${generateTableData(10,10)}
          </tbody>
        </table>
      </cbp-table>
    </main>

    
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

        <cbp-subnav accessibility-text="Application Name Navigation" store="">
          <cbp-subnav-item label="Application Name" name="Application Name" href="./?path=/story/components-application-header--application-header#" current> </cbp-subnav-item><cbp-subnav-item label="Nav Item 1" name="Nav Item 1" href="./?path=/story/components-application-header--application-header#"> <cbp-subnav-item label="Nav Item 1-1" name="Nav Item 1-1" href="./?path=/story/components-application-header--application-header#"> </cbp-subnav-item><cbp-subnav-item label="Nav Item 1-2" name="Nav Item 1-2" href="./?path=/story/components-application-header--application-header#"> </cbp-subnav-item></cbp-subnav-item><cbp-subnav-item label="Nav Item 2" name="Nav Item 2" href="./?path=/story/components-application-header--application-header#"> </cbp-subnav-item><cbp-subnav-item label="Nav Item 3" name="Nav Item 3" href="./?path=/story/components-application-header--application-header#"> </cbp-subnav-item>
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
  </cbp-panel>
</cbp-drawer>

</cbp-flex>
</cbp-app>

  `;
};

export const TemplateTest = Template.bind({});
TemplateTest.storyName="Template with Responsive Table";
TemplateTest.args = {};
