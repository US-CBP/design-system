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

      <cbp-toast id="cbp-toast-1" open icon="circle-info">  
        <div slot="cbp-toast-icon">
          <cbp-icon name="circle-info"></cbp-icon>
        </div>
        <div slot="cbp-toast-title">Test Toast Title</div>
        Notification Description - A rule you are following just fired.
        <div slot="cbp-toast-buttons">
        
      <cbp-button fill="ghost" color="secondary" name="dismiss" context="dark-inverts">
      dismiss
      </cbp-button>

        
      <cbp-button fill="ghost" color="secondary" name="default" context="dark-inverts">
      default
      </cbp-button>

        </div>
      </cbp-toast>

      <br />

      <cbp-menu uid="menuId">
        <cbp-button fill="outline" color="secondary" target-prop="open" controls="menuId">   
          <cbp-icon name="bars"></cbp-icon>     
          Menu
        </cbp-button>

        <cbp-menu-item slot="cbp-menu-items">
          <a href="#">Option 1</a>
        </cbp-menu-item>
        <cbp-menu-item slot="cbp-menu-items">
          <a href="#">Option 2</a>
        </cbp-menu-item>
        <cbp-menu-item slot="cbp-menu-items">
          <a href="#">Option 3 is longer</a>
        </cbp-menu-item>
        <cbp-menu-item slot="cbp-menu-items">
          <a href="#">Option 4</a>
        </cbp-menu-item>
      </cbp-menu>
      
      <br />

      <cbp-form-field label="Listbox Example" name="insert-field-name" description="This listbox has a default list of suggestions supplied; typing is not required but filters the list further.">
        <cbp-listbox items='[{"label":"Afghanistan"},{"label":"Albania"},{"label":"Algeria"},{"label":"Andaman Islands"},{"label":"Andorra"},{"label":"Angola"},{"label":"Anguilla"},{"label":"Annobon Island"},{"label":"Antigua"},{"label":"Antigua and Barbuda"},{"label":"Argentina"},{"label":"Armenia"},{"label":"Aruba"},{"label":"Ascension Island"},{"label":"Australia"},{"label":"Austria"},{"label":"Azerbaijan"},{"label":"Azores"},{"label":"Bahamas"},{"label":"Bahrain"},{"label":"Balearic Islands"},{"label":"Bangladesh"},{"label":"Barbados"},{"label":"Barbuda"},{"label":"Basse Terre"},{"label":"Belarus"},{"label":"Belau"},{"label":"Belgium"},{"label":"Belize"},{"label":"Benin"},{"label":"Bermuda"},{"label":"Bhutan"},{"label":"Bolivia"},{"label":"Bonaire"},{"label":"Bosnia and Herzegovina"},{"label":"Bosnia-Herzegovina"},{"label":"Botswana"},{"label":"Brazil"},{"label":"British Virgin Islands"},{"label":"Brunei"},{"label":"Bulgaria"},{"label":"Burkina Faso"},{"label":"Burma"},{"label":"Burundi"},{"label":"Byelarus"},{"label":"Cabinda"},{"label":"Caicos Islands"},{"label":"Cambodia"},{"label":"Cameroon"},{"label":"Canada"},{"label":"Canary Islands"},{"label":"Canton Islands"},{"label":"Cape Verde"},{"label":"Carriacou"},{"label":"Castelrosse Islands"},{"label":"Cayman Islands"},{"label":"Central African Rep"},{"label":"Chad"},{"label":"Channel Islands"},{"label":"Chile"},{"label":"China"},{"label":"Christmas Island"},{"label":"Cocos Islands"},{"label":"Colombia"},{"label":"Comoros"},{"label":"Congo"},{"label":"Cook Islands"},{"label":"Corsica"},{"label":"Costa Rica"},{"label":"Crete"},{"label":"Croatia"},{"label":"Cuba"},{"label":"Curacao"},{"label":"Cyprus"},{"label":"Czech Republic"},{"label":"Dem Rep of Congo"},{"label":"Denmark"},{"label":"Diego Garcia"},{"label":"Djibouti"},{"label":"Dodecanese Islands"},{"label":"Dominica"},{"label":"Dominican Republic"},{"label":"East Timor"},{"label":"Easter Island"},{"label":"Ecuador"},{"label":"Egypt"},{"label":"Eire"},{"label":"El Salvador"},{"label":"England"},{"label":"Equatorial Guinea"},{"label":"Eritrea"},{"label":"Estonia"},{"label":"Ethiopia"},{"label":"Falkland Islands"},{"label":"Faroe Islands"},{"label":"Fernando de Noronha"},{"label":"Fiji"},{"label":"Finland"},{"label":"France"},{"label":"French Guiana"},{"label":"French Polynesia"},{"label":"French West Indies"},{"label":"Gabon"},{"label":"Gambia"},{"label":"Georgia"},{"label":"Germany"},{"label":"Ghana"},{"label":"Gibraltar"},{"label":"Grand Cayman Island"},{"label":"Grand Terre"},{"label":"Grand Turk"},{"label":"Great Britain"},{"label":"Greece"},{"label":"Greenland"},{"label":"Grenada"},{"label":"Grenadine Islands"},{"label":"Guadeloupe"},{"label":"Guatemala"},{"label":"Guinea"},{"label":"Guinea-Bissau"},{"label":"Guyana"},{"label":"Haiti"},{"label":"Honduras"},{"label":"Hong Kong"},{"label":"Hungary"},{"label":"Iceland"},{"label":"India"},{"label":"Indonesia"},{"label":"Iran"},{"label":"Iraq"},{"label":"Ireland"},{"label":"Ireland, Republic of"},{"label":"Isle of Man"},{"label":"Israel"},{"label":"Italy"},{"label":"Jamaica"},{"label":"Jan Mayen Island"},{"label":"Japan"},{"label":"Jerusalem"},{"label":"Jordan"},{"label":"Kampuchea"},{"label":"Kazakhstan"},{"label":"Kenya"},{"label":"Kiribati"},{"label":"Kuwait"},{"label":"Kyrgyzstan"},{"label":"Laos"},{"label":"Latvia"},{"label":"Lebanon"},{"label":"Lesotho"},{"label":"Liberia"},{"label":"Libya"},{"label":"Liechtenstein"},{"label":"Lithuania"},{"label":"Little Cayman Island"},{"label":"Luxembourg"},{"label":"Macao"},{"label":"Macedonia"},{"label":"Madagascar"},{"label":"Madeira Islands"},{"label":"Malawi"},{"label":"Malaysia"},{"label":"Maldives"},{"label":"Mali"},{"label":"Malta"},{"label":"Marshall Islands"},{"label":"Martinique"},{"label":"Mauritania"},{"label":"Mauritius"},{"label":"Mexico"},{"label":"Micronesia"},{"label":"Midway Island"},{"label":"Miquelon Island"},{"label":"Moldova"},{"label":"Monaco"},{"label":"Mongolia"},{"label":"Montenegro"},{"label":"Montserrat"},{"label":"Morocco"},{"label":"Mozambique"},{"label":"Myanmar"},{"label":"Namibia"},{"label":"Nauru"},{"label":"Nepal"},{"label":"Netherlands"},{"label":"Netherlands Antilles"},{"label":"Nevis"},{"label":"New Caldonia"},{"label":"New Caledonia"},{"label":"New Guinea"},{"label":"New Hebrides"},{"label":"New Zealand"},{"label":"Nicaragua"},{"label":"Nicobar Islands"},{"label":"Niger"},{"label":"Nigeria"},{"label":"North Korea"},{"label":"Northern Ireland"},{"label":"Norway"},{"label":"Okinawa"},{"label":"Oman"},{"label":"Pagalu"},{"label":"Pakistan"},{"label":"Palau"},{"label":"Panama"},{"label":"Papua New Guinea"},{"label":"Paraguay"},{"label":"Peru"},{"label":"Petit Martinique"},{"label":"Philippines"},{"label":"Pitcairn Island"},{"label":"Poland"},{"label":"Portugal"},{"label":"Qatar"},{"label":"Republic of Congo"},{"label":"Republic of Georgia"},{"label":"Republic of Macedonia"},{"label":"Reunion"},{"label":"Romania"},{"label":"Russia"},{"label":"Rwanda"},{"label":"Ryukyu Islands"},{"label":"Saba"},{"label":"Samoa"},{"label":"San Marino"},{"label":"Sao Tome and Principe"},{"label":"Sardinia"},{"label":"Saudi Arabia"},{"label":"Scotland"},{"label":"Senegal"},{"label":"Serbia"},{"label":"Serbia and Montenegro"},{"label":"Seychelles"},{"label":"Sicily"},{"label":"Sierra Leone"},{"label":"Singapore"},{"label":"Slovak Republic"},{"label":"Slovakia"},{"label":"Slovenia"},{"label":"Solomon Islands"},{"label":"Somalia"},{"label":"Somaliland"},{"label":"Sombrero"},{"label":"South Africa"},{"label":"South Korea"},{"label":"Southwest Africa"},{"label":"Spain"},{"label":"Spanish Sahara"},{"label":"Sri Lanka"},{"label":"St Christopher"},{"label":"St Eustatius"},{"label":"St Helena"},{"label":"St Kitts"},{"label":"St Lucia"},{"label":"St Maarten"},{"label":"St Martin"},{"label":"St Pierre"},{"label":"St Vincent"},{"label":"Sudan"},{"label":"Sumatra"},{"label":"Suriname"},{"label":"Swaziland"},{"label":"Sweden"},{"label":"Switzerland"},{"label":"Syria"},{"label":"Tahiti"},{"label":"Taiwan"},{"label":"Tajikistan"},{"label":"Tanzania"},{"label":"Thailand"},{"label":"Timor"},{"label":"Togo"},{"label":"Tonga"},{"label":"Tortola"},{"label":"Trinidad and Tobago"},{"label":"Tristan da Cunha"},{"label":"Tunisia"},{"label":"Turkey"},{"label":"Turkmenistan"},{"label":"Turks and Caicos Is"},{"label":"Turks Islands"},{"label":"Tuvalu"},{"label":"Uganda"},{"label":"Ukraine"},{"label":"United Arab Emirates"},{"label":"United Kingdom"},{"label":"United States of America"},{"label":"Upper Volta"},{"label":"Uruguay"},{"label":"Uzbekistan"},{"label":"Vanuatu"},{"label":"Vatican City"},{"label":"Venezuela"},{"label":"Vietnam"},{"label":"Wake Island"},{"label":"Wales"},{"label":"Wallis and Futuna Is"},{"label":"Walvis Bay"},{"label":"Western Sahara"},{"label":"Western Samoa"},{"label":"Yemen"},{"label":"Yemen, Republic of"},{"label":"Zaire"},{"label":"Zambia"},{"label":"Zimbabwe"},{"label":"Cote D'Ivoire"},{"label":"Rep of South Sudan"},{"label":"Kosovo"},{"label":"Alderney"},{"label":"Ascension"},{"label":"Brunei Darussalam"},{"label":"Guernsey"},{"label":"Ivory Coast"},{"label":"Jersey"},{"label":"Kowloon"},{"label":"Niue"},{"label":"Redonda"},{"label":"Santa Cruz Islands"},{"label":"Sark"},{"label":"St Bartholomew"},{"label":"St Christopher - Nevis"},{"label":"St Pierre and Miquelon"},{"label":"St Vincent - Grenadine"},{"label":"Syrian Arab Republic"},{"label":"Timor-Leste"},{"label":"Eswatini"}]'>
          <input type="text" name="insert-field-name">
        </cbp-listbox>
      </cbp-form-field>

      <br />

      <cbp-form-field label="Insert Field Label" description="Insert field description." field-id="dropdown-id">
        <cbp-dropdown name="dropdown" field-id="dropdown-id">
          
          <cbp-dropdown-item value="1">Option 1</cbp-dropdown-item>
        
          <cbp-dropdown-item value="2">Option 2</cbp-dropdown-item>
        
          <cbp-dropdown-item value="3">Option 3</cbp-dropdown-item>
        
          <cbp-dropdown-item value="4">Option 4</cbp-dropdown-item>
        
          <cbp-dropdown-item value="5">Option 5</cbp-dropdown-item>
        
        </cbp-dropdown>
      </cbp-form-field>

      <br />

      <cbp-tooltip uid="tooltip">  
        <cbp-icon name="user" accessibility-text="User"></cbp-icon>
        <div slot="cbp-tooltip-content">
          <div style="font-weight: var(--cbp-font-weight-bold)">Test Tooltip Title</div>
          <div>Stub text for tooltip.</div>
        </div>
      </cbp-tooltip>

      <br />

      <cbp-action-bar variant="floating">
        <cbp-typography slot="cbp-action-bar-info" tag="div">
          0 items selected.
        </cbp-typography>
        <cbp-button fill="ghost">
          Action 1
        </cbp-button>
        <cbp-button fill="ghost" color="secondary">
          Action 2
        </cbp-button>
      </cbp-action-bar>

      <br />

      <cbp-floating-action right="var(--cbp-responsive-spacing-outer)" bottom="5rem">
        <cbp-button color="primary" variant="circle" accessibility-text="Action" sx='{"--cbp-button-height":"3.5rem"}'>
          <cbp-icon name="magnifying-glass" size="1.5rem"></cbp-icon>
        </cbp-button>
      </cbp-floating-action>
      
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