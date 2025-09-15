export default {
  title: 'Archetypes/Passenger List',
  parameters: {
    layout: 'fullscreen',
    html: {
      root: '#storybook-root',
    },
  },
  argTypes: {},
  args: {
    username: 'Johnathan Smithington',
    hashid: 'HASHIDX',
    isLoggedIn: true,
    navItems: [
      {
        label: 'Application Name',
        name: 'Application Name',
        href: './?path=/story/components-application-header--application-header#',
        current: true
      },
      {
        label: 'Nav Item 1',
        name: 'Nav Item 1',
        href: './?path=/story/components-application-header--application-header#',
      },
      {
        label: 'Nav Item 2',
        name: 'Nav Item 2',
        href: './?path=/story/components-application-header--application-header#',
      },
      {
        label: 'Nav Item 3',
        name: 'Nav Item 3',
        href: './?path=/story/components-application-header--application-header#',
      },
    ]
  },
};

// const passengerArchetypeList = HTMLCbpStructuredListElement;
//TODO: needs default values (currently hard set to component defaults) below is 'ideal' but DOM not rendered at this point
let page = 1; //document.getElementsByTagName('cbp-pagination')[0].page;
let pageSize: number | 'all' = 10; //document.getElementsByTagName('cbp-pagination')[0].pageSize;

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

function renderDrawer(items, drawerid){

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
              store
              accessibility-text="Application Name Navigation"
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
          id="panelheader"
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
            value="undefined"
          />
        </cbp-toggle>

      </cbp-panel>
    </cbp-drawer>
  `
}

function getTimeDiff(date1, date2) {
  const timeDiff = Math.abs(date1 - date2);
  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  return { days, hours: hours % 24, minutes: minutes % 60, seconds: seconds % 60 };
}

function generatePassengers(passengerArgs, page, pageSize) {
  //TODO: update api call for img to have some variation see doc: https://www.dicebear.com/styles/personas/
  //TODO: math on the time to arrival format isn't great but not sure how to setup obj to not have diff for days

  const html = passengerArgs.map(({ name, bio, arrival, error }, index) => {
    const timeDiff = getTimeDiff(Date.now(), arrival);
    const formatedTime = arrival.toLocaleString('en-US', {
      timeZone: 'America/New_York',
      timeZoneName: 'short',
    });

    if (index >= (page - 1) * pageSize && index < page * pageSize) {
      return `
          <cbp-structured-list-item
            ${error ? `color=danger` : ``} 
          >
            <cbp-grid
              grid-template-columns="16rem 1fr 12rem"
              gap="var(--cbp-space-9x)"
              breakpoint="48rem"
            >
              <cbp-flex
                gap="var(--cbp-space-2x)"
                align-items="flex-start"
              >
                  <img
                    src="https://thispersondoesnotexist.com/"
                    alt="avatar"
                    style="width: 100px"
                  />
                <cbp-flex direction="column" gap="var(--cbp-space-1x)">
                  <cbp-typography tag="h3">${name}</cbp-typography>
                  <cbp-tag> Arriving In: ${timeDiff.hours}:${timeDiff.minutes}: ${timeDiff.hours} </cbp-tag>
                  ${error ? `<cbp-tag color="danger"> T-list</cbp-tag>` : ``}
                </cbp-flex>
              </cbp-flex>
              <cbp-flex direction="column" gap="var(--cbp-space-1x)">
                <span>
                  <b>BIO:</b> ${bio}
                </span>
                <span>
                  <b>Flight Inbound</b> A471 from LHR to JFK (A99/SM)
                </span>
                <span>
                  <b>Scheduled Arrival Time:</b> ${formatedTime}
                </span>
              </cbp-flex>
              <cbp-grid-item align-self="center">
                <cbp-button
                  type="button"
                  fill="ghost"
                  color="secondary"
                >
                  <cbp-icon name="check-circle"></cbp-icon>Vet Passenger
                </cbp-button>
              </cbp-grid-item>
            </cbp-grid>
          </cbp-structured-list-item>`;
    }
  });
  return html.join('');
}

function generateManifest(manifestArgs) {
  //TODO: tag icon for gate is not correct

  const html = manifestArgs.map(({ flight, arrivalTerminal, arrivalLocation, arrivalGate, arrivalTime, departureTerminal, departureLocation, departureTime, people, hotlist }) => {
    const timeDiff = getTimeDiff(Date.now(), arrivalTime);

    return `
          <cbp-card
            variant="decision"
            sx='{"margin-block-end":"var(--cbp-space-4x)"}'
          >
            <div>
              <cbp-flex 
                direction="row"
                align-items="flex-start"
                justify-content="space-between"
                sx='{"margin-block-end":"var(--cbp-space-4x)"}'
              >  
                <cbp-typography
                  tag="h3"
                  id="card-heading-1"
                >
                  ${flight}
                </cbp-typography>
                <cbp-tag color="danger"> Arriving In: ${timeDiff.hours}:${timeDiff.minutes}: ${timeDiff.hours} </cbp-tag>
              </cbp-flex>

              <cbp-flex 
                direction="row"
                align-items="flex-start"
                justify-content="space-between"
                sx='{"margin-block-end":"var(--cbp-space-4x)"}'
              >
                <cbp-flex direction="column">
                  <cbp-typography tag="h4">${departureTerminal}</cbp-typography>
                  <span><b>${departureLocation}</b></span>
                  <span>${departureTime}</span>
                </cbp-flex>
                
                <cbp-flex 
                  direction="column"
                  align-items="flex-end"
                  sx='{"text-align":"end"}'
                >
                  <cbp-typography tag="h4">${arrivalTerminal}</cbp-typography>
                  <span><b>${arrivalLocation}</b></span>
                  <span>${arrivalTime}</span>
                </cbp-flex>
              </cbp-flex>

              <cbp-flex 
                direction="row"
                align-items="flex-start"
                justify-content="space-between"
              >
                <cbp-flex direction="column">
                  <span>people: ${people}</span>
                  <span>hotlist: ${hotlist}</span>
                </cbp-flex>
                <cbp-tag color="warning">
                  <cbp-icon name="circle-info"></cbp-icon> ${arrivalGate}
                </cbp-tag>
              </cbp-flex>
            </div>

            <div slot="cbp-card-actions">
              <cbp-button
                fill="solid"
                color="primary"
              >
                <cbp-icon name="eye"></cbp-icon>View Manifest
              </cbp-button>
            </div>
          </cbp-card>
          `;
  });
  return html.join('');
}

function passengerList(passengerArgs) {
  document.addEventListener('paginationChange', function (e) {
    const paginationComponent = e.target as HTMLCbpPaginationElement;
    const structuredListComponent = document.querySelector("#passengerList > div[role='list']");
    page = paginationComponent.page;
    pageSize = paginationComponent.pageSize;

    structuredListComponent.innerHTML = generatePassengers(passengerArgs, page, pageSize);
  });

  return `
    <cbp-flex-item flex-grow="1">

      <cbp-flex
        gap="1rem"
        wrap="wrap"
        breakpoint="1rem"
        align-items="flex-end"
      >
        <cbp-flex-item
          flex-basis="20ch"
          flex-grow="1"
          flex-shrink="1"
        >
          <cbp-form-field
            label="Sort By"
            field-id="filterResults"
            sx='{"margin":"0"}'
          >
            <cbp-dropdown field-id="filterResults">
              <cbp-dropdown-item value="1">
                Closest to Arrival
              </cbp-dropdown-item>
              <cbp-dropdown-item value="2">
                Furthest from Arrival
              </cbp-dropdown-item>
              <cbp-dropdown-item value="3">
                Alphabetically
              </cbp-dropdown-item>
            </cbp-dropdown>
          </cbp-form-field>
        </cbp-flex-item>

        <cbp-hide hide-at="min-width:64rem">
          <cbp-button
            type="button"
            color="secondary"
            accessibility-text="Open Drawer"
            target-prop="open"
            controls="filterDrawer"
            fill="outline"
          >
            <cbp-icon name="filter"></cbp-icon>Filter
          </cbp-button>
        </cbp-hide>

        <cbp-flex-item flex-grow="3">
        </cbp-flex-item>
      
        <cbp-flex-item>
          <cbp-button
            type="button"
            fill="outline"
            color="secondary"
            target-prop="open"
            controls="manifestDrawer"
          >
            <cbp-icon name="circle-info"></cbp-icon>Manifests
          </cbp-button>
        </cbp-flex-item>
        
        <cbp-flex-item>
          <cbp-button
            type="button"
            fill="outline"
            color="secondary"
          >
            <cbp-icon name="circle"></cbp-icon>Refresh
          </cbp-button>
        </cbp-flex-item>
      </cbp-flex>


      <cbp-structured-list id="passengerList" header-id="list-header" striped  sx='{"margin-top":"var(--cbp-space-4x)"}'>
        <div slot="cbp-structured-list-header" id="list-header">
            XX Results - X filters Applied - Updated : 11/01/2024 10:00 EST 
        </div>
        ${generatePassengers(passengerArgs, page, pageSize)}
      </cbp-structured-list>

      <cbp-pagination
        records=${passengerArgs.length}
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


function filterPanel() {
  return `
    <cbp-drawer
      uid= "filterDrawer"
      position="left"
      persist-at="min-width:64rem"
      sx='{"flex-basis":"20rem"}'
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
          <cbp-icon name="filter" size="var(--cbp-space-6x)" sx='{"margin-inline-end":"var(--cbp-space-2x)"}'></cbp-icon>Filter
        </cbp-typography>
          
        <cbp-form-field
          label="Search"
          field-id="search"
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
                <cbp-icon
                  name="magnifying-glass"
                ></cbp-icon>
              </cbp-button>
            </span>
          </cbp-form-field-wrapper>
        </cbp-form-field>

        <cbp-form-field group
          label='Passenger Sex'
          description='Required'
        >
          <cbp-flex
            gap="var(--cbp-space-5x)"
            breakpoint="28rem"
            sx='{"width":"max-content"}'
          >
            <cbp-radio>
              <input type="radio" name="sex" value="Male" /> Male
            </cbp-radio>
            <cbp-radio>
              <input type="radio" name="sex" value="Female" /> Female
            </cbp-radio>
            <cbp-radio>
              <input type="radio" name="sex" value="Other" /> Other
            </cbp-radio>
          </cbp-flex>
        </cbp-form-field>

        <cbp-form-field
          label="Passenger Age Range"
        >
          <cbp-slider hide-minmax>
            <input
              type="range"
              name="age"
            />
          </cbp-slider>
        </cbp-form-field>

        <cbp-form-field
          label="Country that Issued Passport"
          description="Required."
        >
          <select name="select">
            <option value="">United States of America</option>
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
            <option value="4">Option 4</option>
            <option value="5">Option 5</option>
          </select>
        </cbp-form-field>

        <cbp-form-field
          label="Port of Departure"
          description="Required."
        >
          <select name="select">
            <option value="">Any</option>
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
            <option value="4">Option 4</option>
            <option value="5">Option 5</option>
          </select>
        </cbp-form-field>

        <cbp-form-field
          label="Port of Arrival"
          description="Required."
        >
          <select name="select">
            <option value="">JFK (XXXX/SM)</option>
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option value="3">Option 3</option>
            <option value="4">Option 4</option>
            <option value="5">Option 5</option>
          </select>
        </cbp-form-field>

        <cbp-form-field
          label="Arrival Date Range From:"
          description="(MM/DD/YYYY) Format"
        >
          <input type="date" name="arrivaldatestart" />
        </cbp-form-field>

        <cbp-form-field
          label="Arrival Time Range From:"
          description="(HH:MM Format) UTC-6 America/New York."
        >
          <cbp-form-field-wrapper>
            <input type="time" name="arrivaltimestart" />
            <span slot="cbp-form-field-overlay-start">
              <cbp-icon name="clock"></cbp-icon>
            </span>

            <cbp-segmented-button-group slot="cbp-form-field-attached-button">
              <cbp-button fill="outline" color="secondary">
                AM
              </cbp-button>

              <cbp-button fill="outline" color="secondary">
                PM
              </cbp-button>

              <cbp-button fill="outline" color="secondary">
                24 HR
              </cbp-button>
            </cbp-segmented-button-group>
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
          description="(HH:MM Format) UTC-6 America/New York."
        >
          <cbp-form-field-wrapper>
            <input type="time" name="arrivaltimeend" />
            <span slot="cbp-form-field-overlay-start">
              <cbp-icon name="clock"></cbp-icon>
            </span>

            <cbp-segmented-button-group slot="cbp-form-field-attached-button">
              <cbp-button fill="outline" color="secondary">
                AM
              </cbp-button>

              <cbp-button fill="outline" color="secondary">
                PM
              </cbp-button>

              <cbp-button fill="outline" color="secondary">
                24 HR
              </cbp-button>
            </cbp-segmented-button-group>
          </cbp-form-field-wrapper>
        </cbp-form-field>


        <cbp-flex
          justify-content="end"
          gap="var(--cbp-space-4x)"
        >
          <cbp-button
            color="secondary"
            fill="outline"
          >
            <cbp-icon name="circle"></cbp-icon>Reset
          </cbp-button>

          <cbp-button
            color="primary"
            fill="solid"
          >
            <cbp-icon name="check-circle"></cbp-icon>Apply
          </cbp-button>
        </cbp-flex>

      </cbp-panel>
    </cbp-drawer>
    `;
}

function manifestPane(manifestArgs) {
  //TODO: segmented button slotted/embedded in the tab header is 'working' but pretty sure this is bad implementation

  return `
        <cbp-drawer
          position= "right"
          accessibility-text= "Manifest Drawer"
          uid= "manifestDrawer"
        >
          <cbp-panel
            aria-labelledby="panelheader"
            role="complementary"
          >
            <cbp-typography
              slot="cbp-panel-header"
              tag="h3"
              variant="heading-lg"
              id="panelheader"
            >
              Manifests
            </cbp-typography>
            
            <cbp-form-field
              label="Select Port"
              description="Required. Choose which port you wish to see results for."
            >
              <select name="select">
                <option value="">JFK (XXXX/SM)</option>
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
                <option value="3">Option 3</option>
                <option value="4">Option 4</option>
                <option value="5">Option 5</option>
              </select>
            </cbp-form-field>

            <cbp-segmented-button-group>
              <cbp-button
                type="button"
                value="sm"
                >24 HRS</cbp-button
              ><cbp-button
                type="button"
                value="md"
                >Next 7 Days</cbp-button
              ><cbp-button
                type="button"
                value="lg"
                >NEXT 30 DAYS</cbp-button
              >
            </cbp-segmented-button-group>

            <cbp-checkbox
              name="checkbox"
              value="1"
            >
              <input
                type="checkbox"
                name="checkbox"
                value="1"
              />
              Make This Selection Your Default?
            </cbp-checkbox>

            <cbp-tabs accessibility-text="Tabs Example">
              <cbp-tab name="arrivals"> Arrivals </cbp-tab>
              <cbp-tab name="departures"> Departures </cbp-tab>
            </cbp-tabs>

            <cbp-segmented-button-group>
              <cbp-button
                type="button"
                value="sm"
                ><cbp-icon name='sort-asc'></cbp-icon></cbp-button
              ><cbp-button
                type="button"
                value="md"
                ><cbp-icon name='sort-desc'></cbp-icon></cbp-button
              >
            </cbp-segmented-button-group>

            <cbp-tab-panel name="arrivals">
              ${generateManifest(manifestArgs)}
            </cbp-tab-panel>
            <cbp-tab-panel name="departures">
              Departures content. 
            </cbp-tab-panel>

          </cbp-panel>
        </cbp-drawer>
      `;
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


const InternalTemplate = ({ isLoggedIn, username, hashid, navItems, passengersArgs, manifestArgs }) => {
  /** Techdebt for iteration on filter & manifest pane:
   * Icon for the app directory button is incorrect, verify all icons in buttons, most of these are initial stubs
   * Buttons in the universal header need spacing between icon & text
   * username value displaying twice, looks like issue with setting up the cbp-hide (is that needed here?)
   * App header is stubbed in, need to reevaluate, hrefs pointing to wrong place
   * Filter panel should have a fixed max width probably
   * Footer missing InfoSec section (right side of footer)
   *
   */
  
  // preventDefault on all links in the header and subnav
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

    <cbp-universal-header
      logo-src-lg="./assets/images/cbp-header-logo.svg"
      logo-src-sm="./assets/images/cbp-seal.svg"
    >
      <ul>
      ${
        isLoggedIn
          ? `
        <li>
          <cbp-button color="secondary" fill="ghost" context="dark-always">
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
          type="button"
          color="secondary" 
            fill="ghost" 
            context="dark-always" 
            controls="userPref"
            target-prop="open"
          >
            <cbp-icon name="user"></cbp-icon>
            <cbp-hide visually-hide-at="max-width: 64em">
              ${hashid}
            </cbp-hide>
          </cbp-button>
        </li>
        `
          : `
        <li>
          <cbp-button tag="a" href="#" color="secondary" fill="ghost" context="dark-always">
            <cbp-icon name="right-to-bracket"></cbp-icon>Login
          </cbp-button>
        </li>
        `
      }
      </ul>
    </cbp-universal-header>

    <cbp-app-header
      subnav-drawer-id="appHeaderDrawer"
      search
    >
      ${generateNavItems(navItems)}
    </cbp-app-header>
        
    <cbp-container sx='{"padding":"1rem var(--cbp-responsive-spacing-outer)"}'>
      <main id="main" tabindex="-1">
        <cbp-typography tag="h1" divider="underline" sx='{"margin-bottom":"var(--cbp-space-5x)"}'>
          Passenger Vetting
        </cbp-typography>

        <cbp-flex
          gap="1rem"
        >
          ${filterPanel()}
          ${passengerList(passengersArgs)}
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

    ${renderDrawer(navItems, 'appHeaderDrawer')}
    ${renderUserPref(username, hashid)}
    ${manifestPane(manifestArgs)}
    `;
};

export const Internal = InternalTemplate.bind({});

//TODO: randomize or update for different displays
Internal.args = {
  passengersArgs: [
    {
      name: 'Smithington, Johnathan',
      bio: 'Male - Age 46 - USA',
      arrival: new Date('2025-03-11T12:48:00'),
    },
    {
      name: 'Smithington, Johnathan',
      bio: 'Male - Age 46 - USA',
      arrival: new Date('2025-03-10T09:48:00'),
    },
    {
      name: 'Smithington, Johnathan',
      bio: 'Male - Age 46 - USA',
      arrival: new Date('2025-11-22T09:48:00'),
      error: true,
    },
    {
      name: 'Smithington, Johnathan',
      bio: 'Male - Age 46 - USA',
      arrival: new Date('2025-11-22T09:48:00'),
    },
    {
      name: 'Smithington, Johnathan',
      bio: 'Male - Age 46 - USA',
      arrival: new Date('2025-11-22T09:48:00'),
    },
    {
      name: 'Smithington, Johnathan',
      bio: 'Male - Age 46 - USA',
      arrival: new Date('2025-11-22T09:48:00'),
    },
    {
      name: 'Smithington, Johnathan',
      bio: 'Male - Age 46 - USA',
      arrival: new Date('2025-11-22T09:48:00'),
    },
    {
      name: 'Smithington, Johnathan',
      bio: 'Male - Age 46 - USA',
      arrival: new Date('2025-11-22T09:48:00'),
    },
    {
      name: 'Smithington, Johnathan',
      bio: 'Male - Age 46 - USA',
      arrival: new Date('2025-11-22T09:48:00'),
    },
    {
      name: 'Smithington, Johnathan',
      bio: 'Male - Age 46 - USA',
      arrival: new Date('2025-11-22T09:48:00'),
    },
    {
      name: 'Smithington, Johnathan',
      bio: 'Male - Age 46 - USA',
      arrival: new Date('2025-11-22T09:48:00'),
    },
    {
      name: 'Smithington, Johnathan',
      bio: 'Male - Age 46 - USA',
      arrival: new Date('2025-11-22T09:48:00'),
    },
    {
      name: 'Smithington, Johnathan',
      bio: 'Male - Age 46 - USA',
      arrival: new Date('2025-11-22T09:48:00'),
    },
    {
      name: 'Smithington, Johnathan',
      bio: 'Male - Age 46 - USA',
      arrival: new Date('2025-11-22T09:48:00'),
    },
    {
      name: 'Smithington, Johnathan',
      bio: 'Male - Age 99 - USA',
      arrival: new Date('2025-11-22T09:48:00'),
    },
  ],
  manifestArgs: [
    {
      flight: 'DL 250',
      arrivalTerminal: 'JFK',
      arrivalLocation: 'New York, NY',
      arrivalGate: 'Gate 34B',
      arrivalTime: new Date('2025-03-10T10:44:00'),
      departureTerminal: 'LHR',
      departureLocation: 'London, UK',
      departureTime: new Date('2025-03-11T15:48:00'),
      people: 86,
      hotlist: 4,
    },
    {
      flight: 'UA 775',
      arrivalTerminal: 'JFK',
      arrivalLocation: 'New York, NY',
      arrivalGate: 'Gate 34B',
      arrivalTime: new Date('2025-03-10T10:44:00'),
      departureTerminal: 'BER',
      departureLocation: 'Berlin, Germany',
      departureTime: new Date('2025-03-11T15:48:00'),
      people: 86,
      hotlist: 4,
    },
    {
      flight: 'AA 8754',
      arrivalTerminal: 'JFK',
      arrivalLocation: 'New York, NY',
      arrivalGate: 'Gate 34B',
      arrivalTime: new Date('2025-03-10T10:44:00'),
      departureTerminal: 'MAD',
      departureLocation: 'Madrid, Spain',
      departureTime: new Date('2025-03-11T15:48:00'),
      people: 86,
      hotlist: 4,
    },
  ],
};
