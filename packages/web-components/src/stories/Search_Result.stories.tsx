export default {
  title: 'Archetypes/Search Results',
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
        search: {
        description: 'determines if the search field is rendered',
        control: 'boolean'
        },
        searchMethod: {
        description: 'set the method attribute on the form for search',
        control: 'text',
        if:{ arg: 'search'}
        },
        searchAction: {
        description: 'set the action attribute on the form for search',
        control: 'text',
        if:{ arg: 'search'}
        }
    }
};

let page = 1;
let pageSize: number | 'all' = 10;

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
              accessibility-text="Application Name Navigation"
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

function renderUserPref(username, hashid) {
  return `
    <cbp-drawer
      uid= "userPref"    
      position= "right"
      accessibility-text= "User Preference Drawer"
    >
      <cbp-panel>
        <cbp-typography
          slot="cbp-panel-header"
          tag="h2"
          variant="heading-lg"
          id="userprefheader"
        >
          <cbp-icon name="user"></cbp-icon>
          User Preferences
        </cbp-typography>

        <cbp-typography
          tag="p"
          variant="heading-xs"
        >
          Hi there,
        </cbp-typography>
        
        <cbp-typography
          tag="h3"
          variant="heading-lg"
        >
          ${username}
        </cbp-typography>
        
        <cbp-typography
          tag="p"
          variant="heading-xs"
        >
          (${hashid})
        </cbp-typography>
        <cbp-flex
          gap="1rem"
          sx='{"margin-block":"var(--cbp-space-3x)"}'
        >
          <cbp-button color="secondary">
            <cbp-icon name="arrow-right-from-bracket"></cbp-icon>
            logout
          </cbp-button>
          <cbp-flex-item
            align-self="center"
          >
            <b>Not you?</b> Click here to Logout.
          </cbp-flex-item>
        </cbp-flex>

        <cbp-section
          sx='{
              "margin-block":"var(--cbp-space-3x)",
              "padding-block-start":"var(--cbp-space-4x)",
              "padding-block-end":"var(--cbp-space-3x)",
              "--cbp-section-color-border":"var(--cbp-color-gray-cool-20)",
              "--cbp-section-color-border-dark":"var(--cbp-color-gray-cool-60)",
              "--cbp-section-border-width":"var(--cbp-border-size-sm) 0"
            }'
        >
          <cbp-segmented-button-group
            id="darkmode"
            sx='{"margin-block-end":"var(--cbp-space-1x)"}'
          >
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
  `
}

function renderFilterDrawer(){
  return `
    <cbp-drawer
      uid= "filterdrawer"
      position="left"
      persist-at="min-width:64rem"
      sx='{"min-width":"20rem"}'
    >
      <cbp-panel
        aria-labelledby="filterpanelheader"
      >
        <cbp-typography
          slot="cbp-panel-header"
          tag="h3"
          variant="heading-lg"
          id="filterpanelheader"
        >
          <cbp-icon name="filter" size="var(--cbp-space-6x)" sx='{"margin-inline-end":"var(--cbp-space-2x)"}'></cbp-icon>Filter
        </cbp-typography>
        <form
          action=""
        >
          <cbp-form-field
            label="Arrival Date Range From:"
            description="(MM/DD/YYYY) Format"
          >
            <input type="date" name="arrivaldatestart" />
          </cbp-form-field>

          <cbp-form-field
            label="Arrival Time Range From:"
            description="(HH:MM Format) UTC-6 America/New York"
          >
            <cbp-form-field-wrapper>
              <input
                placeholder="HH:MM"
                maxlength="5"
                name="arrivalfrom"
              />
              <cbp-icon
                slot="cbp-form-field-overlay-start"
                name="clock"
              ></cbp-icon>

              <span slot="cbp-form-field-attached-button">
                <cbp-segmented-button-group name="arrivalfromampm">
                  <cbp-button
                    type="button"
                    value="AM"
                    pressed="true"
                  >
                    AM
                  </cbp-button>

                  <cbp-button
                    type="button"
                    value="PM"
                  >
                    PM
                  </cbp-button>

                  <cbp-button
                    type="button"
                    value="24H"
                  >
                    24 hr
                  </cbp-button>
                </cbp-segmented-button-group>
              </span>
            </cbp-form-field-wrapper>
          </cbp-form-field>

          <cbp-form-field
            label="Arrival Date Range To:"
            description="(MM/DD/YYYY) Format"
          >
            <input type="date" name="arrivaldateend" />
          </cbp-form-field>

          <cbp-form-field
            label="Arrival Time Range To:"
            description="(HH:MM Format) UTC-6 America/New York"
          >
            <cbp-form-field-wrapper>
              <input
                placeholder="HH:MM"
                maxlength="5"
                name="arrivalto"
              />
              <cbp-icon
                slot="cbp-form-field-overlay-start"
                name="clock"
              ></cbp-icon>

              <span slot="cbp-form-field-attached-button">
                <cbp-segmented-button-group name="arrivaltoampm">
                  <cbp-button
                    type="button"
                    value="AM"
                    pressed="true"
                  >
                    AM
                  </cbp-button>

                  <cbp-button
                    type="button"
                    value="PM"
                  >
                    PM
                  </cbp-button>

                  <cbp-button
                    type="button"
                    value="24H"
                  >
                    24 hr
                  </cbp-button>
                </cbp-segmented-button-group>
              </span>
            </cbp-form-field-wrapper>
          </cbp-form-field>


          <cbp-flex
            justify-content="end"
            gap="var(--cbp-space-4x)"
          >
            <cbp-button
              type="reset"
              color="secondary"
              fill="outline"
            >
              <cbp-icon name="circle"></cbp-icon>Reset
            </cbp-button>

            <cbp-button
              color="primary"
              fill="solid"
              type="submit"
            >
              <cbp-icon name="check-circle"></cbp-icon>Apply
            </cbp-button>
          </cbp-flex>
        </form>
      </cbp-panel>
    </cbp-drawer>
    `;
}


function renderPeopleListItem(items, searchText, page, pageSize){
const html = items.map(({ anchorTitle, location, pageCreation, lastEdited, textBlock }, index) => {
    if (index >= (page - 1) * pageSize && index < page * pageSize) {

      return `
          <cbp-structured-list-item>
            <cbp-flex
                direction="column"
                gap="0.5rem"
            >
                <cbp-flex-item>
                
                    <cbp-typography
                        tag="h6"
                    >
                        <cbp-link
                            href="#"
                        >
                            <cbp-icon name="arrow-right"></cbp-icon>
                            ${anchorTitle}
                        </cbp-link>
                    </cbp-typography>
                </cbp-flex-item>
                <cbp-flex-item>
                    <div>
                        <cbp-typography
                            tag="span"
                        >
                            <b>${location}</b>
                        </cbp-typography>
                    </div>
                    <div>
                        <cbp-typography
                            tag="span"
                        >
                            <b>Page Created:</b>
                        </cbp-typography>
                        ${pageCreation}
                        <cbp-typography
                            tag="span"
                            sx='{"margin-left":"0.25rem"}'
                        >
                            <b>Last Edited:</b>
                        </cbp-typography>
                        ${lastEdited}
                    </div>
                </cbp-flex-item>
                <cbp-flex-item>
                    <cbp-typography
                        tag="p"
                        variant="body-text"
                        sx='{"--cbp-line-length-longer":"100%"}'
                    >
                      <mark>
                        ${searchText}
                      </mark>
                        ${textBlock}
                    </cbp-typography>
                </cbp-flex-item>
            </cbp-flex>
          </cbp-structured-list-item>
      `;
    }
  });
  return html.join('');
}

function renderPeopleTab(items, searchText){

    document.addEventListener('paginationChange', function (e) {
        const paginationComponent = e.target as HTMLCbpPaginationElement;
        const structuredListComponent = document.querySelector("#peopleResults > div[role='list']");
        page = paginationComponent.page;
        pageSize = paginationComponent.pageSize;

        structuredListComponent.innerHTML = renderPeopleListItem(items, searchText, page, pageSize);
    });

    return `
    <cbp-flex-item flex-grow="1">
      <cbp-flex
          align-items="flex-end"
          gap="1rem"
          wrap="wrap"
          sx='{"margin-bottom":"var(--cbp-space-4x)"}'
      >
          <cbp-flex-item
              flex-basis="calc(var(--cbp-space-16x) * 5)"
          >    
              <cbp-form-field
                  label="Search"
                  field-id="search"
                  sx='{"--cbp-form-field-margin-bottom":"0"}'
              >
                  <cbp-form-field-wrapper>
                      <input
                          type="search"
                          name="search"
                          value="${searchText}"
                      />
                      <span slot="cbp-form-field-attached-button">
                      <cbp-button
                          type="submit"
                          fill="solid"
                          color="secondary"
                          variant="square"
                          accessibility-text="Search"
                      >
                          <cbp-icon
                          name="magnifying-glass"
                          ></cbp-icon>
                      </cbp-button>
                      </span>
                  </cbp-form-field-wrapper>
              </cbp-form-field>
          </cbp-flex-item>
          <cbp-flex-item sx='{"margin-left":"auto"}'>
              <cbp-hide hide-at="min-width: 64rem">
                <cbp-button
                  type="button"
                  color="secondary"
                  accessibility-text="Open Drawer"
                  target-prop="open"
                  controls="filterdrawer"
                  fill="outline"
                >
              <cbp-icon name="filter"></cbp-icon>Filter
            </cbp-button>
          </cbp-hide>
          </cbp-flex-item>
          <cbp-flex-item>
              <cbp-flex    
                  align-items="center"
                  gap="1rem"
              >
                  <cbp-flex-item> 
                    <cbp-hide
                      visually-hide-at="max-width: 42em"
                    >
                      <cbp-typography tag="span"> <b><i>Alpha Sort</i></b> </cbp-typography>
                    </cbp-hide>
                  </cbp-flex-item>
                  <cbp-flex-item
                  >
                      <cbp-segmented-button-group
                        accessibility-text="sort search results asc/desc"
                      >
                          <cbp-button
                              type="button"
                              value="1"
                              pressed="true"
                              variant="square"                      
                              accessibility-text="sort ascending"
                          >
                              <cbp-icon name="sort-asc"></cbp-icon>
                          </cbp-button>

                          <cbp-button
                              type="button"
                              value="2"
                              pressed="false"
                              variant="square" 
                              accessibility-text="sort descending"
                          >
                              <cbp-icon name="sort-desc"></cbp-icon>
                          </cbp-button>
                      </cbp-segmented-button-group>
                  </cbp-flex-item>
              </cbp-flex>
      </cbp-flex>
      <cbp-structured-list 
          id="peopleResults" 
          header-id="list-header"
          striped
      >
          <div
              slot="cbp-structured-list-header"
              id="list-header"
          >
              234 Results Found
          </div>

          ${renderPeopleListItem(items, searchText, page, pageSize)}
      </cbp-structured-list>

      <cbp-pagination
          records=${items.length}
        >
          <cbp-form-field
            slot="cbp-pagination-items-per-page"
            label="Items Per Page"
            field-id="pagination_size"
          >
            <cbp-dropdown field-id="pagination_size">
              <cbp-dropdown-item value="10">10/Page</cbp-dropdown-item>
              <cbp-dropdown-item value="25">25/Page</cbp-dropdown-item>
              <cbp-dropdown-item value="50">50/Page</cbp-dropdown-item>
              <cbp-dropdown-item value="100">100/Page</cbp-dropdown-item>
              <cbp-dropdown-item value="all">All Results</cbp-dropdown-item>
            </cbp-dropdown>
          </cbp-form-field>

          <cbp-form-field
            slot="cbp-pagination-pages"
            label="Page Displayed"
            field-id="pagination_pages"
          >
            <cbp-dropdown field-id="pagination_pages">

              <div slot="cbp-dropdown-attached-button-start">
                <cbp-button
                  fill="solid"
                  color="secondary"
                  variant="square"
                  value="previous page"
                  accessibility-text="Previous page"
                >
                  <cbp-icon name="chevron-right" rotate="180" />
                </cbp-button>
              </div>

              <div slot="cbp-dropdown-attached-button-end">
                <cbp-button
                  fill="solid"
                  color="secondary"
                  variant="square"
                  value="next page"
                  accessibility-text="Next page"
                >
                  <cbp-icon name="chevron-right" />
                </cbp-button>
              </div>
            </cbp-dropdown>
          </cbp-form-field>
        </cbp-pagination>
      </cbp-flex-item>
    `;
}

const searchResultsTemplate = ({isLoggedIn, username, hashid, navItems, searchText, peopleResults, search, searchMethod, searchAction}) => {

    setTimeout(() => {
        initThemeSwitcher();

        // Prevent anchors from navigating away
        let anchors = document.querySelectorAll('cbp-app-header a,cbp-subnav a,cbp-footer a');
        anchors.forEach(anchor => {
        anchor.addEventListener('click', function(e) { e.preventDefault(); })
        });
    }, 500);

  return ` 
    <cbp-skip-nav></cbp-skip-nav>
    <cbp-flex
      direction="column"
      sx='{"min-height":"100vh"}'
    >
      <cbp-universal-header
        logo-src-lg="./assets/images/cbp-header-logo.svg"
        logo-src-sm="./assets/images/cbp-seal.svg"
      >
        <ul>
        ${ isLoggedIn
          ? `
          <li>
            <cbp-button tag="a" href="#" color="secondary" fill="ghost" context="dark-always">
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
            <cbp-button color="secondary" fill="ghost" context="dark-always" controls="userPref" target-prop="open">
              <cbp-icon name="user"></cbp-icon>
              <cbp-hide visually-hide-at="max-width: 64em">${hashid}</cbp-hide>
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
        subnav-drawer-id="appheaderdrawer"
        ${search ? `search` : ``}
        ${searchMethod ? `search-method=${searchMethod}` : ``}
        ${searchAction ? `search-action=${searchAction}` : ``}
      >
        ${generateNavItems(navItems, "appheaderdrawer")}
      </cbp-app-header>

      <cbp-container sx='{"flex-grow":"1","padding":"1rem var(--cbp-responsive-spacing-outer)"}'>
        <main id="main" tabindex="-1">
          <cbp-typography tag="h1" divider="underline" sx='{"margin-bottom":"var(--cbp-space-4x)"}'>
            Search Results
          </cbp-typography>

          <cbp-flex
            gap="1rem"
          >
            ${renderFilterDrawer()}
            ${renderPeopleTab(peopleResults, searchText)} 
          </cbp-flex>
          </main>
      </cbp-container>

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

      ${renderDrawer(navItems, 'appheaderdrawer', true)}
      ${renderUserPref(username, hashid)}
    </cbp-flex>
  `;
};

export const searchTemplate = searchResultsTemplate.bind({});

searchTemplate.args ={
    username: 'Johnathan Smithington',
    hashid: 'HASHIDX',
    isLoggedIn: true,
    search: true,
    navItems: [
        {
            label: 'Application Name',
            name: 'Application Name',
            href: './?path=/story/components-application-header--application-header#',
            current: true
        }
    ],
    searchText: "Manifest 4536789",
    peopleResults: [
        {
            anchorTitle: "Manifest 4536789 #1",
            location: "Home / Passenger Manifest / Flight 1023 HG / Manifest 4536789",
            pageCreation: "10/01/2025",
            lastEdited: "10/01/2025",
            textBlock: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        },
        {
            anchorTitle: "Manifest 4536789 #2",
            location: "Home / Passenger Manifest / Flight 1023 HG / Manifest 4536789",
            pageCreation: "10/01/2025",
            lastEdited: "10/01/2025",
            textBlock: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        },
        {
            anchorTitle: "Manifest 4536789 #3",
            location: "Home / Passenger Manifest / Flight 1023 HG / Manifest 4536789",
            pageCreation: "10/01/2025",
            lastEdited: "10/01/2025",
            textBlock: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        },
        {
            anchorTitle: "Manifest 4536789 #4",
            location: "Home / Passenger Manifest / Flight 1023 HG / Manifest 4536789",
            pageCreation: "10/01/2025",
            lastEdited: "10/01/2025",
            textBlock: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        },
        {
            anchorTitle: "Manifest 4536789 #5",
            location: "Home / Passenger Manifest / Flight 1023 HG / Manifest 4536789",
            pageCreation: "10/01/2025",
            lastEdited: "10/01/2025",
            textBlock: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        },
        {
            anchorTitle: "Manifest 4536789 #6",
            location: "Home / Passenger Manifest / Flight 1023 HG / Manifest 4536789",
            pageCreation: "10/01/2025",
            lastEdited: "10/01/2025",
            textBlock: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        },
        {
            anchorTitle: "Manifest 4536789 #7",
            location: "Home / Passenger Manifest / Flight 1023 HG / Manifest 4536789",
            pageCreation: "10/01/2025",
            lastEdited: "10/01/2025",
            textBlock: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        },
        {
            anchorTitle: "Manifest 4536789 #8",
            location: "Home / Passenger Manifest / Flight 1023 HG / Manifest 4536789",
            pageCreation: "10/01/2025",
            lastEdited: "10/01/2025",
            textBlock: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        },
        {
            anchorTitle: "Manifest 4536789 #9",
            location: "Home / Passenger Manifest / Flight 1023 HG / Manifest 4536789",
            pageCreation: "10/01/2025",
            lastEdited: "10/01/2025",
            textBlock: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        },
        {
            anchorTitle: "Manifest 4536789 #10",
            location: "Home / Passenger Manifest / Flight 1023 HG / Manifest 4536789",
            pageCreation: "10/01/2025",
            lastEdited: "10/01/2025",
            textBlock: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        },
        {
            anchorTitle: "Manifest 4536789 #11",
            location: "Home / Passenger Manifest / Flight 1023 HG / Manifest 4536789",
            pageCreation: "10/01/2025",
            lastEdited: "10/01/2025",
            textBlock: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        },
        {
            anchorTitle: "Manifest 4536789 #12",
            location: "Home / Passenger Manifest / Flight 1023 HG / Manifest 4536789",
            pageCreation: "10/01/2025",
            lastEdited: "10/01/2025",
            textBlock: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        },
        {
            anchorTitle: "Manifest 4536789 #13",
            location: "Home / Passenger Manifest / Flight 1023 HG / Manifest 4536789",
            pageCreation: "10/01/2025",
            lastEdited: "10/01/2025",
            textBlock: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        },
        {
            anchorTitle: "Manifest 4536789 #14",
            location: "Home / Passenger Manifest / Flight 1023 HG / Manifest 4536789",
            pageCreation: "10/01/2025",
            lastEdited: "10/01/2025",
            textBlock: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        },
        {
            anchorTitle: "Manifest 4536789 #15",
            location: "Home / Passenger Manifest / Flight 1023 HG / Manifest 4536789",
            pageCreation: "10/01/2025",
            lastEdited: "10/01/2025",
            textBlock: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        },
    ]   
}