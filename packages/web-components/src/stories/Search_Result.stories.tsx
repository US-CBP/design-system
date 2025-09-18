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
        },
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
  const ThemeToggle = document.querySelector('cbp-toggle#darkmode') as HTMLCbpToggleElement;
  const DarkMode = window?.matchMedia(`(prefers-color-scheme: dark)`);
  // Set the initial toggle state based on the system setting (checked = dark)
  ThemeToggle.checked = DarkMode.matches;

  const AppComponent = document.querySelector('cbp-app') as HTMLCbpAppElement;
  ThemeToggle.addEventListener('toggleClick', (e)=> {
    //console.log('Toggle Clicked: ', e);
    // Toggle the `theme` property on `cbp-app` based on this toggle
    AppComponent.theme = e.detail.checked ? "dark" : "light";
    // If you wanted to persist this setting, you could use sessionStorage or localStorage
  });
}

function renderUserPref(username, hashid) {
  return `

    <style>
      cbp-toggle#darkmode {
        --cbp-toggle-custom-icon-off: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" style="fill:rgb(92 72 9)" viewBox="0 0 512 512"><path d="M361.5 1.2c5 2.1 8.6 6.6 9.6 11.9L391 121l107.9 19.8c5.3 1 9.8 4.6 11.9 9.6s1.5 10.7-1.6 15.2L446.9 256l62.3 90.3c3.1 4.5 3.7 10.2 1.6 15.2s-6.6 8.6-11.9 9.6L391 391 371.1 498.9c-1 5.3-4.6 9.8-9.6 11.9s-10.7 1.5-15.2-1.6L256 446.9l-90.3 62.3c-4.5 3.1-10.2 3.7-15.2 1.6s-8.6-6.6-9.6-11.9L121 391 13.1 371.1c-5.3-1-9.8-4.6-11.9-9.6s-1.5-10.7 1.6-15.2L65.1 256 2.8 165.7c-3.1-4.5-3.7-10.2-1.6-15.2s6.6-8.6 11.9-9.6L121 121 140.9 13.1c1-5.3 4.6-9.8 9.6-11.9s10.7-1.5 15.2 1.6L256 65.1 346.3 2.8c4.5-3.1 10.2-3.7 15.2-1.6zM160 256a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zm224 0a128 128 0 1 0 -256 0 128 128 0 1 0 256 0z"/></svg>');

        --cbp-toggle-custom-icon-on: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" style="fill:rgb(254 230 133)" viewBox="0 0 640 640"><path d="M320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576C388.8 576 451.3 548.8 497.3 504.6C504.6 497.6 506.7 486.7 502.6 477.5C498.5 468.3 488.9 462.6 478.8 463.4C473.9 463.8 469 464 464 464C362.4 464 280 381.6 280 280C280 207.9 321.5 145.4 382.1 115.2C391.2 110.7 396.4 100.9 395.2 90.8C394 80.7 386.6 72.5 376.7 70.3C358.4 66.2 339.4 64 320 64z"/></svg>');
      }
    </style>

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
        >
          <cbp-button
            color="secondary"
          >
            <cbp-icon
              name="arrow-right-from-bracket"
            ></cbp-icon>
            logout
          </cbp-button>
          <cbp-flex-item
            align-self="center"
          >
            <cbp-typography
              tag="span"
            >
              <b>Not you?</b> Click here to Logout.
            </cbp-typography>
          </cbp-flex-item>
        </cbp-flex>

        <br />
        
        <cbp-toggle
          id="darkmode"
          status-text-on="Dark"
          status-text-off="Light"
          sx='{
            "--cbp-toggle-circle-color":"var(--cbp-color-white)",
            "--cbp-toggle-circle-color-border":"var(--cbp-color-white)",
            "--cbp-toggle-color-bg":"var(--cbp-color-yellow-30)",
            "--cbp-toggle-color-bg-hover":"var(--cbp-color-yellow-30)",
            "--cbp-toggle-color-bg-focus":"var(--cbp-color-yellow-30)",
            "--cbp-toggle-circle-color-dark":"var(--cbp-color-white)",
            "--cbp-toggle-circle-color-selected-dark":"var(--cbp-color-white)",
            "--cbp-toggle-circle-color-border-dark":"var(--cbp-color-white)",
            "--cbp-toggle-circle-color-border-selected-dark":"var(--cbp-color-white)",
            "--cbp-toggle-color-bg-hover-dark":"var(--cbp-color-mint-cool-60)",
            "--cbp-toggle-color-bg-focus-dark":"var(--cbp-color-mint-cool-60)",
            "--cbp-toggle-color-bg-selected":"var(--cbp-color-mint-cool-60)",
            "--cbp-toggle-color-bg-selected-dark":"var(--cbp-color-mint-cool-60)",
            "--cbp-toggle-grid-columns":"var(--cbp-toggle-control-width) 1fr"
          }'
        >
          <cbp-hide visually-hide>Theme</cbp-hide>
          <input
            type="checkbox"
            name="themeSwitch"
          />
        </cbp-toggle>

      </cbp-panel>
    </cbp-drawer>
  `
}

function renderPeopleListItem(items, searchText, page, pageSize){
const html = items.map(({ anchorTitle, location, pageCreation, lastEdited, textBlock }, index) => {
    if (index >= (page - 1) * pageSize && index < page * pageSize) {

        //TODO: link w/ Icon spacing seems high compared to spec but matching implementation in design system. maybe issue on spec?
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
                        <cbp-typography
                            tag="span"
                            sx='{
                                    "color":"var(--cbp-color-text-darkest)",
                                    "background":"var(--cbp-color-warning-base"
                                }'
                        >
                            ${searchText}
                        </cbp-typography>
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
    <cbp-flex
        align-items="flex-end"
        gap="1rem"
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
            <cbp-button
                type="button"
                fill="outline"
                color="secondary"
            >
                <cbp-icon
                    name="filter"
                ></cbp-icon>
                Filter
            </cbp-button>
        </cbp-flex-item>
        <cbp-flex-item>
            <cbp-flex    
                align-items="center"
                gap="1rem"
            >
                <cbp-flex-item> 
                    <cbp-typography tag="span"> <b><i>Alpha Sort</i></b> </cbp-typography>
                </cbp-flex-item>
                <cbp-flex-item
                >
                    <cbp-segmented-button-group>
                        <cbp-button
                            type="button"
                            value="1"
                            pressed="true"
                            variant="square"
                        >
                            <cbp-icon name="sort-asc"></cbp-icon>
                        </cbp-button>

                        <cbp-button
                            type="button"
                            value="2"
                            pressed="false"
                            variant="square"
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
          <cbp-typography tag="h1" divider="underline">
            Search Results
          </cbp-typography>

          <cbp-tabs accessibility-text="Search Results">
            <cbp-tab name="pages"> Pages </cbp-tab>
            <cbp-tab name="people"> People </cbp-tab>
            <cbp-tab name="hotlists"> Hotlists </cbp-tab>
        </cbp-tabs>

            <cbp-tab-panel name="pages"> ${renderPeopleTab(peopleResults, searchText)} </cbp-tab-panel>
            <cbp-tab-panel name="people"> TODO: people function </cbp-tab-panel>
            <cbp-tab-panel name="hotlists"> TODO: hotlists function </cbp-tab-panel>

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