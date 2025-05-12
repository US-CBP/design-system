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
    username: 'HASHIDX',
    isLoggedIn: true,
  },
};

// const passengerArchetypeList = HTMLCbpStructuredListElement;
//TODO: needs default values (currently hard set to component defaults) below is 'ideal' but DOM not rendered at this point
let page = 1; //document.getElementsByTagName('cbp-pagination')[0].page;
let pageSize: number | 'all' = 10; //document.getElementsByTagName('cbp-pagination')[0].pageSize;

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
              grid-template-columns="14rem 1fr 12rem"
              gap="var(--cbp-space-9x)"
              breakpoint="48rem"
            >
              <cbp-flex>
                  <img
                    src="https://api.dicebear.com/9.x/personas/svg"
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
                  <cbp-icon name="book"></cbp-icon>Vet Passenger
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
            class="hydrated"
          >
            <div>
              <cbp-flex 
                direction="row"
                gap='33%'
              >  
                <cbp-typography
                  tag="h3"
                 
                  id="card-heading-1"
                  class="hydrated"
                >
                  ${flight}
                </cbp-typography>
                <cbp-tag color="danger"> Arriving In: ${timeDiff.hours}:${timeDiff.minutes}: ${timeDiff.hours} </cbp-tag>
              </cbp-flex>

              <cbp-flex 
                direction="row"
                gap='1rem'
              >
                <cbp-flex direction="column">
                  <cbp-typography tag="h4">${departureTerminal}</cbp-typography>
                  <span><b>${departureLocation}</b></span>
                  <span>${departureTime}</span>
                </cbp-flex>
                
                <cbp-flex 
                  direction="column"
                >
                  <cbp-typography tag="h4">${arrivalTerminal}</cbp-typography>
                  <span><b>${arrivalLocation}</b></span>
                  <span>${arrivalTime}</span>
                </cbp-flex>
              </cbp-flex>
              </br>
              <cbp-flex 
                direction="row"
                gap='50%'  
              >
                <cbp-flex direction="column">
                  <span>people: ${people}</span>
                  <span>hotlist: ${hotlist}</span>
                </cbp-flex>
                <cbp-tag color='warning'>
                  <cbp-icon name='circle-info'></cbp-icon> ${arrivalGate}
                </cbp-tag>
              </cbp-flex>
            </div>
            <div slot="cbp-card-actions">
              <cbp-button
                tag="button"
                fill="solid"
                color="primary"
                context="undefined"
                class="hydrated"
                ><button
                  aria-describedby="card-heading-1"
                  type="button"
                >
                  <cbp-icon name='eye'></cbp-icon>View Manifest
                </button></cbp-button
              >
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
        breakpoint="30rem"
        align-items="flex-end"
      >
        <cbp-flex-item
          flex-basis="12rem"
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
            class="hydrated"
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
            <cbp-icon name="book"></cbp-icon>Manifests
          </cbp-button>
        </cbp-flex-item>
        
        <cbp-flex-item>
          <cbp-button
            type="button"
            fill="outline"
            color="secondary"
          >
            <cbp-icon name="book"></cbp-icon>Refresh
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
        role="complementary"
      >
        <cbp-typography
          slot="cbp-panel-header"
          tag="h3"
          variant="heading-lg"
          id="panelheader"
        >
          Sidebar Header
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
              <cbp-icon name="book"></cbp-icon>
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
              <cbp-icon name="book"></cbp-icon>
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
const InternalTemplate = ({ isLoggedIn, username, passengersArgs, manifestArgs }) => {
  /** Techdebt for iteration on filter & manifest pane:
   * Icon for the app directory button is incorrect, verify all icons in buttons, most of these are initial stubs
   * Buttons in the universal header need spacing between icon & text
   * username value displaying twice, looks like issue with setting up the cbp-hide (is that needed here?)
   * App header is stubbed in, need to reevaluate, hrefs pointing to wrong place
   * Filter panel should have a fixed max width probably
   * Footer missing InfoSec section (right side of footer)
   *
   */

  return `
    <cbp-skip-nav></cbp-skip-nav>

    <header>
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
            <cbp-button color="secondary" fill="ghost" context="dark-always">
              <cbp-icon name="user"></cbp-icon>
              <cbp-hide visually-hide-at="max-width: 64em">
                ${username}
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

      <cbp-app-header>
        <cbp-nav-item selected="">
          <cbp-button
            tag="a"
            fill="ghost"
            color="secondary"
            href="./?path=/story/patterns-page-templates--internal#"
          >
            Application Name
          </cbp-button></cbp-nav-item
        ><cbp-nav-item>
          <cbp-button
            tag="a"
            fill="ghost"
            color="secondary"
            href="./?path=/story/patterns-page-templates--internal#"
          >
            Single Nav Item 1
          </cbp-button></cbp-nav-item
        ><cbp-nav-item>
          <cbp-button
            tag="a"
            fill="ghost"
            color="secondary"
            href="./?path=/story/patterns-page-templates--internal#"
          >
            Single Nav Item 2
          </cbp-button></cbp-nav-item
        >
      </cbp-app-header>
    </header>

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

    ${manifestPane(manifestArgs)}

    <cbp-footer>
      <nav slot="cbp-footer-nav">
        <cbp-flex role="list" breakpoint="37.5rem">
          <cbp-flex-item role="list-item">
            <cbp-button tag="a" href="#" color="secondary" fill="ghost" context="dark-always">App Overview</cbp-button>
          </cbp-flex-item>
          <cbp-flex-item role="list-item">
            <cbp-button tag="a" href="#" color="secondary" fill="ghost" context="dark-always">Trainings</cbp-button>
          </cbp-flex-item>
          <cbp-flex-item role="list-item">
            <cbp-button tag="a" href="#" color="secondary" fill="ghost" context="dark-always">FAQs</cbp-button>
          </cbp-flex-item>
          <cbp-flex-item role="list-item">
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
