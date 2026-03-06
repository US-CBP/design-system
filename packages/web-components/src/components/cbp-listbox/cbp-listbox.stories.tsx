export default {
  title: 'Components/Listbox',
  tags: ['new','autodocs'],
  argTypes: {
    label: {
      control: 'text',
    },
    description: {
      control: 'text',
    },
    fieldId: {
      control: 'text',
    },
    name: {
      control: 'text',
    },
    inputType: {
      control: 'select',
      options: [ "text", "search"]
    },
    value: {
      control: 'text',
    },
    error: {
      control: 'boolean',
    },
    readonly: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    search: {
      control: 'select',
      options: [ "start", "full"]
    },
    context : {
      control: 'select',
      options: [ "light-inverts", "light-always", "dark-inverts", "dark-always"]
    },
    sx: {
      description: 'Supports adding inline styles as an object of key-value pairs comprised of CSS properties and values. Values should reference design tokens when possible.',
      control: 'object',
    },
  },
  args: {
    label: 'Field Label',
    description: 'Field description.',
  },
};



// States: 
//const States=[{"label":"Alabama","value":"AL"},{"label":"Alaska","value":"AK"},{"label":"Arizona","value":"AZ"},{"label":"Arkansas","value":"AR"},{"label":"California","value":"CA"},{"label":"Colorado","value":"CO"},{"label":"Connecticut","value":"CT"},{"label":"Delaware","value":"DE"},{"label":"District of Columbia","value":"DC"},{"label":"Florida","value":"FL"},{"label":"Georgia","value":"GA"},{"label":"Hawaii","value":"HI"},{"label":"Idaho","value":"ID"},{"label":"Illinois","value":"IL"},{"label":"Indiana","value":"IN"},{"label":"Iowa","value":"IA"},{"label":"Kansas","value":"KS"},{"label":"Kentucky","value":"KY"},{"label":"Louisiana","value":"LA"},{"label":"Maine","value":"ME"},{"label":"Maryland","value":"MD"},{"label":"Massachusetts","value":"MA"},{"label":"Michigan","value":"MI"},{"label":"Minnesota","value":"MN"},{"label":"Mississippi","value":"MS"},{"label":"Missouri","value":"MO"},{"label":"Montana","value":"MT"},{"label":"Nebraska","value":"NE"},{"label":"Nevada","value":"NV"},{"label":"New Hampshire","value":"NH"},{"label":"New Jersey","value":"NJ"},{"label":"New Mexico","value":"NM"},{"label":"New York","value":"NY"},{"label":"North Carolina","value":"NC"},{"label":"North Dakota","value":"ND"},{"label":"Ohio","value":"OH"},{"label":"Oklahoma","value":"OK"},{"label":"Oregon","value":"OR"},{"label":"Pennsylvania","value":"PA"},{"label":"Rhode Island","value":"RI"},{"label":"South Carolina","value":"SC"},{"label":"South Dakota","value":"SD"},{"label":"Tennessee","value":"TN"},{"label":"Texas","value":"TX"},{"label":"Utah","value":"UT"},{"label":"Vermont","value":"VT"},{"label":"Virginia","value":"VA"},{"label":"Washington","value":"WA"},{"label":"West Virginia","value":"WV"},{"label":"Wisconsin","value":"WI"},{"label":"Wyoming","value":"WY"}];

// Countries: 
const Countries=[{"label":"Afghanistan"},{"label":"Albania"},{"label":"Algeria"},{"label":"Andaman Islands"},{"label":"Andorra"},{"label":"Angola"},{"label":"Anguilla"},{"label":"Annobon Island"},{"label":"Antigua"},{"label":"Antigua and Barbuda"},{"label":"Argentina"},{"label":"Armenia"},{"label":"Aruba"},{"label":"Ascension Island"},{"label":"Australia"},{"label":"Austria"},{"label":"Azerbaijan"},{"label":"Azores"},{"label":"Bahamas"},{"label":"Bahrain"},{"label":"Balearic Islands"},{"label":"Bangladesh"},{"label":"Barbados"},{"label":"Barbuda"},{"label":"Basse Terre"},{"label":"Belarus"},{"label":"Belau"},{"label":"Belgium"},{"label":"Belize"},{"label":"Benin"},{"label":"Bermuda"},{"label":"Bhutan"},{"label":"Bolivia"},{"label":"Bonaire"},{"label":"Bosnia and Herzegovina"},{"label":"Bosnia-Herzegovina"},{"label":"Botswana"},{"label":"Brazil"},{"label":"British Virgin Islands"},{"label":"Brunei"},{"label":"Bulgaria"},{"label":"Burkina Faso"},{"label":"Burma"},{"label":"Burundi"},{"label":"Byelarus"},{"label":"Cabinda"},{"label":"Caicos Islands"},{"label":"Cambodia"},{"label":"Cameroon"},{"label":"Canada"},{"label":"Canary Islands"},{"label":"Canton Islands"},{"label":"Cape Verde"},{"label":"Carriacou"},{"label":"Castelrosse Islands"},{"label":"Cayman Islands"},{"label":"Central African Rep"},{"label":"Chad"},{"label":"Channel Islands"},{"label":"Chile"},{"label":"China"},{"label":"Christmas Island"},{"label":"Cocos Islands"},{"label":"Colombia"},{"label":"Comoros"},{"label":"Congo"},{"label":"Cook Islands"},{"label":"Corsica"},{"label":"Costa Rica"},{"label":"Crete"},{"label":"Croatia"},{"label":"Cuba"},{"label":"Curacao"},{"label":"Cyprus"},{"label":"Czech Republic"},{"label":"Dem Rep of Congo"},{"label":"Denmark"},{"label":"Diego Garcia"},{"label":"Djibouti"},{"label":"Dodecanese Islands"},{"label":"Dominica"},{"label":"Dominican Republic"},{"label":"East Timor"},{"label":"Easter Island"},{"label":"Ecuador"},{"label":"Egypt"},{"label":"Eire"},{"label":"El Salvador"},{"label":"England"},{"label":"Equatorial Guinea"},{"label":"Eritrea"},{"label":"Estonia"},{"label":"Ethiopia"},{"label":"Falkland Islands"},{"label":"Faroe Islands"},{"label":"Fernando de Noronha"},{"label":"Fiji"},{"label":"Finland"},{"label":"France"},{"label":"French Guiana"},{"label":"French Polynesia"},{"label":"French West Indies"},{"label":"Gabon"},{"label":"Gambia"},{"label":"Georgia"},{"label":"Germany"},{"label":"Ghana"},{"label":"Gibraltar"},{"label":"Grand Cayman Island"},{"label":"Grand Terre"},{"label":"Grand Turk"},{"label":"Great Britain"},{"label":"Greece"},{"label":"Greenland"},{"label":"Grenada"},{"label":"Grenadine Islands"},{"label":"Guadeloupe"},{"label":"Guatemala"},{"label":"Guinea"},{"label":"Guinea-Bissau"},{"label":"Guyana"},{"label":"Haiti"},{"label":"Honduras"},{"label":"Hong Kong"},{"label":"Hungary"},{"label":"Iceland"},{"label":"India"},{"label":"Indonesia"},{"label":"Iran"},{"label":"Iraq"},{"label":"Ireland"},{"label":"Ireland, Republic of"},{"label":"Isle of Man"},{"label":"Israel"},{"label":"Italy"},{"label":"Jamaica"},{"label":"Jan Mayen Island"},{"label":"Japan"},{"label":"Jerusalem"},{"label":"Jordan"},{"label":"Kampuchea"},{"label":"Kazakhstan"},{"label":"Kenya"},{"label":"Kiribati"},{"label":"Kuwait"},{"label":"Kyrgyzstan"},{"label":"Laos"},{"label":"Latvia"},{"label":"Lebanon"},{"label":"Lesotho"},{"label":"Liberia"},{"label":"Libya"},{"label":"Liechtenstein"},{"label":"Lithuania"},{"label":"Little Cayman Island"},{"label":"Luxembourg"},{"label":"Macao"},{"label":"Macedonia"},{"label":"Madagascar"},{"label":"Madeira Islands"},{"label":"Malawi"},{"label":"Malaysia"},{"label":"Maldives"},{"label":"Mali"},{"label":"Malta"},{"label":"Marshall Islands"},{"label":"Martinique"},{"label":"Mauritania"},{"label":"Mauritius"},{"label":"Mexico"},{"label":"Micronesia"},{"label":"Midway Island"},{"label":"Miquelon Island"},{"label":"Moldova"},{"label":"Monaco"},{"label":"Mongolia"},{"label":"Montenegro"},{"label":"Montserrat"},{"label":"Morocco"},{"label":"Mozambique"},{"label":"Myanmar"},{"label":"Namibia"},{"label":"Nauru"},{"label":"Nepal"},{"label":"Netherlands"},{"label":"Netherlands Antilles"},{"label":"Nevis"},{"label":"New Caldonia"},{"label":"New Caledonia"},{"label":"New Guinea"},{"label":"New Hebrides"},{"label":"New Zealand"},{"label":"Nicaragua"},{"label":"Nicobar Islands"},{"label":"Niger"},{"label":"Nigeria"},{"label":"North Korea"},{"label":"Northern Ireland"},{"label":"Norway"},{"label":"Okinawa"},{"label":"Oman"},{"label":"Pagalu"},{"label":"Pakistan"},{"label":"Palau"},{"label":"Panama"},{"label":"Papua New Guinea"},{"label":"Paraguay"},{"label":"Peru"},{"label":"Petit Martinique"},{"label":"Philippines"},{"label":"Pitcairn Island"},{"label":"Poland"},{"label":"Portugal"},{"label":"Qatar"},{"label":"Republic of Congo"},{"label":"Republic of Georgia"},{"label":"Republic of Macedonia"},{"label":"Reunion"},{"label":"Romania"},{"label":"Russia"},{"label":"Rwanda"},{"label":"Ryukyu Islands"},{"label":"Saba"},{"label":"Samoa"},{"label":"San Marino"},{"label":"Sao Tome and Principe"},{"label":"Sardinia"},{"label":"Saudi Arabia"},{"label":"Scotland"},{"label":"Senegal"},{"label":"Serbia"},{"label":"Serbia and Montenegro"},{"label":"Seychelles"},{"label":"Sicily"},{"label":"Sierra Leone"},{"label":"Singapore"},{"label":"Slovak Republic"},{"label":"Slovakia"},{"label":"Slovenia"},{"label":"Solomon Islands"},{"label":"Somalia"},{"label":"Somaliland"},{"label":"Sombrero"},{"label":"South Africa"},{"label":"South Korea"},{"label":"Southwest Africa"},{"label":"Spain"},{"label":"Spanish Sahara"},{"label":"Sri Lanka"},{"label":"St Christopher"},{"label":"St Eustatius"},{"label":"St Helena"},{"label":"St Kitts"},{"label":"St Lucia"},{"label":"St Maarten"},{"label":"St Martin"},{"label":"St Pierre"},{"label":"St Vincent"},{"label":"Sudan"},{"label":"Sumatra"},{"label":"Suriname"},{"label":"Swaziland"},{"label":"Sweden"},{"label":"Switzerland"},{"label":"Syria"},{"label":"Tahiti"},{"label":"Taiwan"},{"label":"Tajikistan"},{"label":"Tanzania"},{"label":"Thailand"},{"label":"Timor"},{"label":"Togo"},{"label":"Tonga"},{"label":"Tortola"},{"label":"Trinidad and Tobago"},{"label":"Tristan da Cunha"},{"label":"Tunisia"},{"label":"Turkey"},{"label":"Turkmenistan"},{"label":"Turks and Caicos Is"},{"label":"Turks Islands"},{"label":"Tuvalu"},{"label":"Uganda"},{"label":"Ukraine"},{"label":"United Arab Emirates"},{"label":"United Kingdom"},{"label":"United States of America"},{"label":"Upper Volta"},{"label":"Uruguay"},{"label":"Uzbekistan"},{"label":"Vanuatu"},{"label":"Vatican City"},{"label":"Venezuela"},{"label":"Vietnam"},{"label":"Wake Island"},{"label":"Wales"},{"label":"Wallis and Futuna Is"},{"label":"Walvis Bay"},{"label":"Western Sahara"},{"label":"Western Samoa"},{"label":"Yemen"},{"label":"Yemen, Republic of"},{"label":"Zaire"},{"label":"Zambia"},{"label":"Zimbabwe"},{"label":"Cote D&apos;Ivoire"},{"label":"Rep of South Sudan"},{"label":"Kosovo"},{"label":"Alderney"},{"label":"Ascension"},{"label":"Brunei Darussalam"},{"label":"Guernsey"},{"label":"Ivory Coast"},{"label":"Jersey"},{"label":"Kowloon"},{"label":"Niue"},{"label":"Redonda"},{"label":"Santa Cruz Islands"},{"label":"Sark"},{"label":"St Bartholomew"},{"label":"St Christopher - Nevis"},{"label":"St Pierre and Miquelon"},{"label":"St Vincent - Grenadine"},{"label":"Syrian Arab Republic"},{"label":"Timor-Leste"},{"label":"Eswatini"}];


function filterByString(str) {
  // filter the JSON natively in JavaScript
  let filteredJSON = Countries.filter( (item) => item.label.toLowerCase().indexOf(str.toLowerCase()) != -1);
  console.log('filtered JSON: ', filteredJSON);
  return filteredJSON;
}

function filterStartByString(str) {
  // filter the JSON natively in JavaScript
  let filteredJSON = Countries.filter( (item) => item.label.toLowerCase().indexOf(str.toLowerCase()) != -1);
  console.log('filtered JSON: ', filteredJSON);
  return filteredJSON;
}

const Template = ({ label, description, fieldId, name, error, readonly, disabled, inputType, value, context, sx, items, search }) => {

  setTimeout(() => {
    let input = document.querySelector('cbp-listbox input');
    input.addEventListener('change', (e) => {
      console.log('Native input change event received: ', e);
    });

    let formField = document.querySelector('cbp-form-field');
    formField.addEventListener('valueChange', (e) => {
      console.log('Form field valueChange event received: ', e);
    });
    
    let listbox = document.querySelector('cbp-listbox');
    listbox.addEventListener('updateListboxSuggestions', (e) => {
      const { value } = e.detail;
      if (value.length > 0) {
        listbox.items = (search == 'start') ? filterStartByString(value) : filterByString(value);
      }
      else listbox.items = Countries;
    });
  }, 1000);

  return ` 
    <cbp-form-field
      ${label ? `label="${label}"` : ''}
      ${name ? `name="${name}"` : ''}
      ${description ? `description="${description}"` : ''}
      ${fieldId ? `field-id="${fieldId}"` : ''}
      ${readonly ? `readonly` : ''}
      ${disabled ? `disabled` : ''}
      ${error ? `error` : ''}
      ${context && context != 'light-inverts' ? `context=${context}` : ''}
    >
      <cbp-listbox
        ${items ? `items='${JSON.stringify(items)}'` : ''}
        ${context && context != 'light-inverts' ? `context=${context}` : ''}
        ${sx ? `sx='${JSON.stringify(sx)}'` : ''}
      >
        <input type="${inputType}"
          ${name ? `name="${name}"` : ''}
          ${value ? `value="${value}"` : ''}
        />
      </cbp-listbox>
    </cbp-form-field>
  `;
};

export const Listbox = Template.bind({});
Listbox.storyName="Listbox with Default Suggestions"
Listbox.args = {
  label: "Listbox Example",
  description: "This listbox has a default list of suggestions supplied; typing is not required but filters the list further.",
  inputType: "text",
  fieldId: "text",
  name: "text",
  value: "",
  items: Countries //States
};




const ListboxSearchTemplate = ({ label, description, fieldId, name, error, readonly, disabled, inputType, value, context, sx, items, search }) => {

  setTimeout(() => {
    let listbox = document.querySelector('cbp-listbox');
    listbox.addEventListener('updateListboxSuggestions', (e) => {
      const { value } = e.detail;
      if (value.length > 0) {
        listbox.items = (search == 'start') ? filterStartByString(value) : filterByString(value);
      }
      else listbox.items = '';
    });
  }, 1000);

  return ` 
    <cbp-form-field
      ${label ? `label="${label}"` : ''}
      ${name ? `name="${name}"` : ''}
      ${description ? `description="${description}"` : ''}
      ${fieldId ? `field-id="${fieldId}"` : ''}
      ${readonly ? `readonly` : ''}
      ${disabled ? `disabled` : ''}
      ${error ? `error` : ''}
      ${context && context != 'light-inverts' ? `context=${context}` : ''}
    >

      <cbp-listbox
        ${items ? `items='${JSON.stringify(items)}'` : ''}
        ${context && context != 'light-inverts' ? `context=${context}` : ''}
        ${sx ? `sx='${JSON.stringify(sx)}'` : ''}
      >
        <cbp-form-field-wrapper>  
          <input type="${inputType}"
            ${name ? `name="${name}"` : ''}
            ${value ? `value="${value}"` : ''}
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
      </cbp-listbox>
    </cbp-form-field>
  `;
};

export const ListboxSearch = ListboxSearchTemplate.bind({});
ListboxSearch.storyName="Search with Suggestions"
ListboxSearch.args = {
  label: "Search with Suggestions Listbox",
  description: "This search field uses a cbp-listbox to offer suggestions when typing.",
  inputType: "search",
  fieldId: "search",
  name: "search",
  value: "",
};