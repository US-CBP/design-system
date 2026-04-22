export default {
  title: 'Forms/Dropdown',
  tags: ['beta'],
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
    value: {
      control: 'text',
    },
    placeholder: {
      control: 'text',
    },
    multiple: {
      control: 'boolean',
    },
    filter: {
      control: 'boolean',
    },
    async: {
      control: 'boolean',
      if: { arg: 'filter', eq: true },
    },
    minimumInputLength: {
      control: 'number',
      if: { arg: 'async', eq: true },
    },
    create: {
      control: 'boolean',
      if: { arg: 'filter', eq: true },
    },
    dataset: {
      control: 'radio',
      options: [ "Countries", "States", "Custom"],
    },
    dropdownItems: {
      control: 'radio',
      options: [ "Slotted", "JSON"],
      //if: { arg: 'async', neq: true }, // when true, it must be JSON
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

function generateItems(items) {
  const html = items.map(({ label, value=label, selected }) => {
    return `
        <cbp-dropdown-item  ${value ? `value="${value}"` : ''} ${selected == true ? 'selected' : ''}>${label}</cbp-dropdown-item>
      `;
  });
  return html.join('');
}

function generateMultiSelectItems(items, name, context) {
  const html = items.map(({ label, value, selected }) => {
    return `
      <cbp-dropdown-item  ${value ? `value="${value}"` : ''} ${selected == true ? 'selected' : ''}>
        <cbp-checkbox 
          ${context && context != 'light-inverts' ? `context="${context}"` : ''}
        >
          <input 
            type="checkbox" 
            name="${`${name}-selection`}"
            ${value ? `value="${value || label}"` : ''}
          />
          ${label}
        </cbp-checkbox>
      </cbp-dropdown-item>
    `;
  });
  return html.join('');
}

// States: 
const States=[{"label":"Alabama","value":"AL"},{"label":"Alaska","value":"AK"},{"label":"Arizona","value":"AZ"},{"label":"Arkansas","value":"AR"},{"label":"California","value":"CA"},{"label":"Colorado","value":"CO"},{"label":"Connecticut","value":"CT"},{"label":"Delaware","value":"DE"},{"label":"District of Columbia","value":"DC"},{"label":"Florida","value":"FL"},{"label":"Georgia","value":"GA"},{"label":"Hawaii","value":"HI"},{"label":"Idaho","value":"ID"},{"label":"Illinois","value":"IL"},{"label":"Indiana","value":"IN"},{"label":"Iowa","value":"IA"},{"label":"Kansas","value":"KS"},{"label":"Kentucky","value":"KY"},{"label":"Louisiana","value":"LA"},{"label":"Maine","value":"ME"},{"label":"Maryland","value":"MD"},{"label":"Massachusetts","value":"MA"},{"label":"Michigan","value":"MI"},{"label":"Minnesota","value":"MN"},{"label":"Mississippi","value":"MS"},{"label":"Missouri","value":"MO"},{"label":"Montana","value":"MT"},{"label":"Nebraska","value":"NE"},{"label":"Nevada","value":"NV"},{"label":"New Hampshire","value":"NH"},{"label":"New Jersey","value":"NJ"},{"label":"New Mexico","value":"NM"},{"label":"New York","value":"NY"},{"label":"North Carolina","value":"NC"},{"label":"North Dakota","value":"ND"},{"label":"Ohio","value":"OH"},{"label":"Oklahoma","value":"OK"},{"label":"Oregon","value":"OR"},{"label":"Pennsylvania","value":"PA"},{"label":"Rhode Island","value":"RI"},{"label":"South Carolina","value":"SC"},{"label":"South Dakota","value":"SD"},{"label":"Tennessee","value":"TN"},{"label":"Texas","value":"TX"},{"label":"Utah","value":"UT"},{"label":"Vermont","value":"VT"},{"label":"Virginia","value":"VA"},{"label":"Washington","value":"WA"},{"label":"West Virginia","value":"WV"},{"label":"Wisconsin","value":"WI"},{"label":"Wyoming","value":"WY"}];

// Countries: 
const Countries=[{"label":"Afghanistan"},{"label":"Albania"},{"label":"Algeria"},{"label":"Andaman Islands"},{"label":"Andorra"},{"label":"Angola"},{"label":"Anguilla"},{"label":"Annobon Island"},{"label":"Antigua"},{"label":"Antigua and Barbuda"},{"label":"Argentina"},{"label":"Armenia"},{"label":"Aruba"},{"label":"Ascension Island"},{"label":"Australia"},{"label":"Austria"},{"label":"Azerbaijan"},{"label":"Azores"},{"label":"Bahamas"},{"label":"Bahrain"},{"label":"Balearic Islands"},{"label":"Bangladesh"},{"label":"Barbados"},{"label":"Barbuda"},{"label":"Basse Terre"},{"label":"Belarus"},{"label":"Belau"},{"label":"Belgium"},{"label":"Belize"},{"label":"Benin"},{"label":"Bermuda"},{"label":"Bhutan"},{"label":"Bolivia"},{"label":"Bonaire"},{"label":"Bosnia and Herzegovina"},{"label":"Bosnia-Herzegovina"},{"label":"Botswana"},{"label":"Brazil"},{"label":"British Virgin Islands"},{"label":"Brunei"},{"label":"Bulgaria"},{"label":"Burkina Faso"},{"label":"Burma"},{"label":"Burundi"},{"label":"Byelarus"},{"label":"Cabinda"},{"label":"Caicos Islands"},{"label":"Cambodia"},{"label":"Cameroon"},{"label":"Canada"},{"label":"Canary Islands"},{"label":"Canton Islands"},{"label":"Cape Verde"},{"label":"Carriacou"},{"label":"Castelrosse Islands"},{"label":"Cayman Islands"},{"label":"Central African Rep"},{"label":"Chad"},{"label":"Channel Islands"},{"label":"Chile"},{"label":"China"},{"label":"Christmas Island"},{"label":"Cocos Islands"},{"label":"Colombia"},{"label":"Comoros"},{"label":"Congo"},{"label":"Cook Islands"},{"label":"Corsica"},{"label":"Costa Rica"},{"label":"Crete"},{"label":"Croatia"},{"label":"Cuba"},{"label":"Curacao"},{"label":"Cyprus"},{"label":"Czech Republic"},{"label":"Dem Rep of Congo"},{"label":"Denmark"},{"label":"Diego Garcia"},{"label":"Djibouti"},{"label":"Dodecanese Islands"},{"label":"Dominica"},{"label":"Dominican Republic"},{"label":"East Timor"},{"label":"Easter Island"},{"label":"Ecuador"},{"label":"Egypt"},{"label":"Eire"},{"label":"El Salvador"},{"label":"England"},{"label":"Equatorial Guinea"},{"label":"Eritrea"},{"label":"Estonia"},{"label":"Ethiopia"},{"label":"Falkland Islands"},{"label":"Faroe Islands"},{"label":"Fernando de Noronha"},{"label":"Fiji"},{"label":"Finland"},{"label":"France"},{"label":"French Guiana"},{"label":"French Polynesia"},{"label":"French West Indies"},{"label":"Gabon"},{"label":"Gambia"},{"label":"Georgia"},{"label":"Germany"},{"label":"Ghana"},{"label":"Gibraltar"},{"label":"Grand Cayman Island"},{"label":"Grand Terre"},{"label":"Grand Turk"},{"label":"Great Britain"},{"label":"Greece"},{"label":"Greenland"},{"label":"Grenada"},{"label":"Grenadine Islands"},{"label":"Guadeloupe"},{"label":"Guatemala"},{"label":"Guinea"},{"label":"Guinea-Bissau"},{"label":"Guyana"},{"label":"Haiti"},{"label":"Honduras"},{"label":"Hong Kong"},{"label":"Hungary"},{"label":"Iceland"},{"label":"India"},{"label":"Indonesia"},{"label":"Iran"},{"label":"Iraq"},{"label":"Ireland"},{"label":"Ireland, Republic of"},{"label":"Isle of Man"},{"label":"Israel"},{"label":"Italy"},{"label":"Jamaica"},{"label":"Jan Mayen Island"},{"label":"Japan"},{"label":"Jerusalem"},{"label":"Jordan"},{"label":"Kampuchea"},{"label":"Kazakhstan"},{"label":"Kenya"},{"label":"Kiribati"},{"label":"Kuwait"},{"label":"Kyrgyzstan"},{"label":"Laos"},{"label":"Latvia"},{"label":"Lebanon"},{"label":"Lesotho"},{"label":"Liberia"},{"label":"Libya"},{"label":"Liechtenstein"},{"label":"Lithuania"},{"label":"Little Cayman Island"},{"label":"Luxembourg"},{"label":"Macao"},{"label":"Macedonia"},{"label":"Madagascar"},{"label":"Madeira Islands"},{"label":"Malawi"},{"label":"Malaysia"},{"label":"Maldives"},{"label":"Mali"},{"label":"Malta"},{"label":"Marshall Islands"},{"label":"Martinique"},{"label":"Mauritania"},{"label":"Mauritius"},{"label":"Mexico"},{"label":"Micronesia"},{"label":"Midway Island"},{"label":"Miquelon Island"},{"label":"Moldova"},{"label":"Monaco"},{"label":"Mongolia"},{"label":"Montenegro"},{"label":"Montserrat"},{"label":"Morocco"},{"label":"Mozambique"},{"label":"Myanmar"},{"label":"Namibia"},{"label":"Nauru"},{"label":"Nepal"},{"label":"Netherlands"},{"label":"Netherlands Antilles"},{"label":"Nevis"},{"label":"New Caldonia"},{"label":"New Caledonia"},{"label":"New Guinea"},{"label":"New Hebrides"},{"label":"New Zealand"},{"label":"Nicaragua"},{"label":"Nicobar Islands"},{"label":"Niger"},{"label":"Nigeria"},{"label":"North Korea"},{"label":"Northern Ireland"},{"label":"Norway"},{"label":"Okinawa"},{"label":"Oman"},{"label":"Pagalu"},{"label":"Pakistan"},{"label":"Palau"},{"label":"Panama"},{"label":"Papua New Guinea"},{"label":"Paraguay"},{"label":"Peru"},{"label":"Petit Martinique"},{"label":"Philippines"},{"label":"Pitcairn Island"},{"label":"Poland"},{"label":"Portugal"},{"label":"Qatar"},{"label":"Republic of Congo"},{"label":"Republic of Georgia"},{"label":"Republic of Macedonia"},{"label":"Reunion"},{"label":"Romania"},{"label":"Russia"},{"label":"Rwanda"},{"label":"Ryukyu Islands"},{"label":"Saba"},{"label":"Samoa"},{"label":"San Marino"},{"label":"Sao Tome and Principe"},{"label":"Sardinia"},{"label":"Saudi Arabia"},{"label":"Scotland"},{"label":"Senegal"},{"label":"Serbia"},{"label":"Serbia and Montenegro"},{"label":"Seychelles"},{"label":"Sicily"},{"label":"Sierra Leone"},{"label":"Singapore"},{"label":"Slovak Republic"},{"label":"Slovakia"},{"label":"Slovenia"},{"label":"Solomon Islands"},{"label":"Somalia"},{"label":"Somaliland"},{"label":"Sombrero"},{"label":"South Africa"},{"label":"South Korea"},{"label":"Southwest Africa"},{"label":"Spain"},{"label":"Spanish Sahara"},{"label":"Sri Lanka"},{"label":"St Christopher"},{"label":"St Eustatius"},{"label":"St Helena"},{"label":"St Kitts"},{"label":"St Lucia"},{"label":"St Maarten"},{"label":"St Martin"},{"label":"St Pierre"},{"label":"St Vincent"},{"label":"Sudan"},{"label":"Sumatra"},{"label":"Suriname"},{"label":"Swaziland"},{"label":"Sweden"},{"label":"Switzerland"},{"label":"Syria"},{"label":"Tahiti"},{"label":"Taiwan"},{"label":"Tajikistan"},{"label":"Tanzania"},{"label":"Thailand"},{"label":"Timor"},{"label":"Togo"},{"label":"Tonga"},{"label":"Tortola"},{"label":"Trinidad and Tobago"},{"label":"Tristan da Cunha"},{"label":"Tunisia"},{"label":"Turkey"},{"label":"Turkmenistan"},{"label":"Turks and Caicos Is"},{"label":"Turks Islands"},{"label":"Tuvalu"},{"label":"Uganda"},{"label":"Ukraine"},{"label":"United Arab Emirates"},{"label":"United Kingdom"},{"label":"United States of America"},{"label":"Upper Volta"},{"label":"Uruguay"},{"label":"Uzbekistan"},{"label":"Vanuatu"},{"label":"Vatican City"},{"label":"Venezuela"},{"label":"Vietnam"},{"label":"Wake Island"},{"label":"Wales"},{"label":"Wallis and Futuna Is"},{"label":"Walvis Bay"},{"label":"Western Sahara"},{"label":"Western Samoa"},{"label":"Yemen"},{"label":"Yemen, Republic of"},{"label":"Zaire"},{"label":"Zambia"},{"label":"Zimbabwe"},{"label":"Cote D&apos;Ivoire"},{"label":"Rep of South Sudan"},{"label":"Kosovo"},{"label":"Alderney"},{"label":"Ascension"},{"label":"Brunei Darussalam"},{"label":"Guernsey"},{"label":"Ivory Coast"},{"label":"Jersey"},{"label":"Kowloon"},{"label":"Niue"},{"label":"Redonda"},{"label":"Santa Cruz Islands"},{"label":"Sark"},{"label":"St Bartholomew"},{"label":"St Christopher - Nevis"},{"label":"St Pierre and Miquelon"},{"label":"St Vincent - Grenadine"},{"label":"Syrian Arab Republic"},{"label":"Timor-Leste"},{"label":"Eswatini"}];

// Custom dataset: 
const Custom=[{"label":"Option 1","value":"1"},{"label":"Option 2","value":"2"},{"label":"Option 3","value":"3"},{"label":"Option 4","value":"4"},{"label":"Option 5","value":"5"}];

//let selectedDataset;

const Template: any = ({ label, description, fieldId, name, placeholder, multiple, filter, async, minimumInputLength, dropdownItems, dataset, items, create, error, readonly, disabled, value, context, sx }) => {

  if (dataset == 'Countries') items = Countries;
  if (dataset == 'States') items = States;
  if (dataset == 'Custom') items = Custom;
  if (async) dropdownItems = "JSON";

  // Ideally, this should be placed on the button component itself, not the document; but the event bubbles, so it works here.
  let asyncCombobox;
  setTimeout(() => {
    asyncCombobox=document.querySelector('cbp-dropdown[async]') as HTMLCbpDropdownElement;

    if(asyncCombobox) {
      asyncCombobox.addEventListener('populateCombobox', (e) => {
        let searchString = e.detail.searchString;
        // filter the JSON natively in JavaScript
        let filteredJSON = items.filter( (item) => item.label.toLowerCase().indexOf(searchString) != -1);
        // return the filtered JSON result to the component via the items property
        asyncCombobox.items = filteredJSON;
      });
    }
  }, 100);

  
  return ` 
    <cbp-form-field
      ${label ? `label="${label}"` : ''}
      ${description ? `description="${description}"` : ''}
      ${fieldId ? `field-id="${fieldId}"` : ''}
      ${readonly ? `readonly` : ''}
      ${disabled ? `disabled` : ''}
      ${error ? `error` : ''}
      ${context && context != 'light-inverts' ? `context="${context}"` : ''}
    >
      <cbp-dropdown
        ${name ? `name="${name}"` : ''}
        ${value ? `value="${value}"` : ''}
        ${fieldId ? `field-id="${fieldId}"` : ''}
        ${placeholder ? `placeholder="${placeholder}"` : ''}
        ${multiple ? 'multiple' : ''}
        ${filter ? 'filter' : ''}
        ${async ? 'async' : ''}
        ${items && dropdownItems == 'JSON' && !async ? `items='${JSON.stringify(items)}'` : ''}
        ${minimumInputLength ? `minimum-input-length="${minimumInputLength}"` : ''}
        ${create ? 'create' : ''}
        ${context && context != 'light-inverts' ? `context="${context}"` : ''}
        ${sx ? `sx='${JSON.stringify(sx)}'` : ''}
      >
        ${dropdownItems == "Slotted" ? multiple ? generateMultiSelectItems(items, name, context) : generateItems(items) : ''}
      </cbp-dropdown>
    </cbp-form-field>
  `;
};

export const Dropdown = Template.bind({});
Dropdown.args = {
  name: 'dropdown',
  value: '',
  fieldId: 'dropdown-id',
  dropdownItems: 'Slotted',
  dataset: 'Custom',
  //items: items
};




/*
const StatesDropdownTemplate: any = ({ label, description, fieldId, name, placeholder, filter, multiple, create, error, readonly, disabled, value, context, sx, items }) => {
  return ` 
    <cbp-form-field
      ${label ? `label="${label}"` : ''}
      ${description ? `description="${description}"` : ''}
      ${fieldId ? `field-id="${fieldId}"` : ''}
      ${readonly ? `readonly` : ''}
      ${disabled ? `disabled` : ''}
      ${error ? `error` : ''}
      ${context && context != 'light-inverts' ? `context="${context}"` : ''}
    >
      <cbp-dropdown
        ${name ? `name="${name}"` : ''}
        ${fieldId ? `field-id="${fieldId}"` : ''}
        ${placeholder ? `placeholder="${placeholder}"` : ''}
        ${value ? `value="${value}"` : ''}
        ${filter ? 'filter' : ''}
        ${multiple ? 'multiple' : ''}
        ${create ? 'create' : ''}
        ${context && context != 'light-inverts' ? `context="${context}"` : ''}
        ${sx ? `sx='${JSON.stringify(sx)}'` : ''}
      >
        ${multiple ? generateMultiSelectItems(items, name, context) : generateItems(items)}
      </cbp-dropdown>
    </cbp-form-field>
  `;
};

export const StatesDropdown = StatesDropdownTemplate.bind({});
StatesDropdown.storyName = "Dropdown - States";
StatesDropdown.args = {
  label:"State",
  value: '',
  items: States
};

// Countries: 
const Countries=[{"label":"Afghanistan"},{"label":"Albania"},{"label":"Algeria"},{"label":"Andaman Islands"},{"label":"Andorra"},{"label":"Angola"},{"label":"Anguilla"},{"label":"Annobon Island"},{"label":"Antigua"},{"label":"Antigua and Barbuda"},{"label":"Argentina"},{"label":"Armenia"},{"label":"Aruba"},{"label":"Ascension Island"},{"label":"Australia"},{"label":"Austria"},{"label":"Azerbaijan"},{"label":"Azores"},{"label":"Bahamas"},{"label":"Bahrain"},{"label":"Balearic Islands"},{"label":"Bangladesh"},{"label":"Barbados"},{"label":"Barbuda"},{"label":"Basse Terre"},{"label":"Belarus"},{"label":"Belau"},{"label":"Belgium"},{"label":"Belize"},{"label":"Benin"},{"label":"Bermuda"},{"label":"Bhutan"},{"label":"Bolivia"},{"label":"Bonaire"},{"label":"Bosnia and Herzegovina"},{"label":"Bosnia-Herzegovina"},{"label":"Botswana"},{"label":"Brazil"},{"label":"British Virgin Islands"},{"label":"Brunei"},{"label":"Bulgaria"},{"label":"Burkina Faso"},{"label":"Burma"},{"label":"Burundi"},{"label":"Byelarus"},{"label":"Cabinda"},{"label":"Caicos Islands"},{"label":"Cambodia"},{"label":"Cameroon"},{"label":"Canada"},{"label":"Canary Islands"},{"label":"Canton Islands"},{"label":"Cape Verde"},{"label":"Carriacou"},{"label":"Castelrosse Islands"},{"label":"Cayman Islands"},{"label":"Central African Rep"},{"label":"Chad"},{"label":"Channel Islands"},{"label":"Chile"},{"label":"China"},{"label":"Christmas Island"},{"label":"Cocos Islands"},{"label":"Colombia"},{"label":"Comoros"},{"label":"Congo"},{"label":"Cook Islands"},{"label":"Corsica"},{"label":"Costa Rica"},{"label":"Crete"},{"label":"Croatia"},{"label":"Cuba"},{"label":"Curacao"},{"label":"Cyprus"},{"label":"Czech Republic"},{"label":"Dem Rep of Congo"},{"label":"Denmark"},{"label":"Diego Garcia"},{"label":"Djibouti"},{"label":"Dodecanese Islands"},{"label":"Dominica"},{"label":"Dominican Republic"},{"label":"East Timor"},{"label":"Easter Island"},{"label":"Ecuador"},{"label":"Egypt"},{"label":"Eire"},{"label":"El Salvador"},{"label":"England"},{"label":"Equatorial Guinea"},{"label":"Eritrea"},{"label":"Estonia"},{"label":"Ethiopia"},{"label":"Falkland Islands"},{"label":"Faroe Islands"},{"label":"Fernando de Noronha"},{"label":"Fiji"},{"label":"Finland"},{"label":"France"},{"label":"French Guiana"},{"label":"French Polynesia"},{"label":"French West Indies"},{"label":"Gabon"},{"label":"Gambia"},{"label":"Georgia"},{"label":"Germany"},{"label":"Ghana"},{"label":"Gibraltar"},{"label":"Grand Cayman Island"},{"label":"Grand Terre"},{"label":"Grand Turk"},{"label":"Great Britain"},{"label":"Greece"},{"label":"Greenland"},{"label":"Grenada"},{"label":"Grenadine Islands"},{"label":"Guadeloupe"},{"label":"Guatemala"},{"label":"Guinea"},{"label":"Guinea-Bissau"},{"label":"Guyana"},{"label":"Haiti"},{"label":"Honduras"},{"label":"Hong Kong"},{"label":"Hungary"},{"label":"Iceland"},{"label":"India"},{"label":"Indonesia"},{"label":"Iran"},{"label":"Iraq"},{"label":"Ireland"},{"label":"Ireland, Republic of"},{"label":"Isle of Man"},{"label":"Israel"},{"label":"Italy"},{"label":"Jamaica"},{"label":"Jan Mayen Island"},{"label":"Japan"},{"label":"Jerusalem"},{"label":"Jordan"},{"label":"Kampuchea"},{"label":"Kazakhstan"},{"label":"Kenya"},{"label":"Kiribati"},{"label":"Kuwait"},{"label":"Kyrgyzstan"},{"label":"Laos"},{"label":"Latvia"},{"label":"Lebanon"},{"label":"Lesotho"},{"label":"Liberia"},{"label":"Libya"},{"label":"Liechtenstein"},{"label":"Lithuania"},{"label":"Little Cayman Island"},{"label":"Luxembourg"},{"label":"Macao"},{"label":"Macedonia"},{"label":"Madagascar"},{"label":"Madeira Islands"},{"label":"Malawi"},{"label":"Malaysia"},{"label":"Maldives"},{"label":"Mali"},{"label":"Malta"},{"label":"Marshall Islands"},{"label":"Martinique"},{"label":"Mauritania"},{"label":"Mauritius"},{"label":"Mexico"},{"label":"Micronesia"},{"label":"Midway Island"},{"label":"Miquelon Island"},{"label":"Moldova"},{"label":"Monaco"},{"label":"Mongolia"},{"label":"Montenegro"},{"label":"Montserrat"},{"label":"Morocco"},{"label":"Mozambique"},{"label":"Myanmar"},{"label":"Namibia"},{"label":"Nauru"},{"label":"Nepal"},{"label":"Netherlands"},{"label":"Netherlands Antilles"},{"label":"Nevis"},{"label":"New Caldonia"},{"label":"New Caledonia"},{"label":"New Guinea"},{"label":"New Hebrides"},{"label":"New Zealand"},{"label":"Nicaragua"},{"label":"Nicobar Islands"},{"label":"Niger"},{"label":"Nigeria"},{"label":"North Korea"},{"label":"Northern Ireland"},{"label":"Norway"},{"label":"Okinawa"},{"label":"Oman"},{"label":"Pagalu"},{"label":"Pakistan"},{"label":"Palau"},{"label":"Panama"},{"label":"Papua New Guinea"},{"label":"Paraguay"},{"label":"Peru"},{"label":"Petit Martinique"},{"label":"Philippines"},{"label":"Pitcairn Island"},{"label":"Poland"},{"label":"Portugal"},{"label":"Qatar"},{"label":"Republic of Congo"},{"label":"Republic of Georgia"},{"label":"Republic of Macedonia"},{"label":"Reunion"},{"label":"Romania"},{"label":"Russia"},{"label":"Rwanda"},{"label":"Ryukyu Islands"},{"label":"Saba"},{"label":"Samoa"},{"label":"San Marino"},{"label":"Sao Tome and Principe"},{"label":"Sardinia"},{"label":"Saudi Arabia"},{"label":"Scotland"},{"label":"Senegal"},{"label":"Serbia"},{"label":"Serbia and Montenegro"},{"label":"Seychelles"},{"label":"Sicily"},{"label":"Sierra Leone"},{"label":"Singapore"},{"label":"Slovak Republic"},{"label":"Slovakia"},{"label":"Slovenia"},{"label":"Solomon Islands"},{"label":"Somalia"},{"label":"Somaliland"},{"label":"Sombrero"},{"label":"South Africa"},{"label":"South Korea"},{"label":"Southwest Africa"},{"label":"Spain"},{"label":"Spanish Sahara"},{"label":"Sri Lanka"},{"label":"St Christopher"},{"label":"St Eustatius"},{"label":"St Helena"},{"label":"St Kitts"},{"label":"St Lucia"},{"label":"St Maarten"},{"label":"St Martin"},{"label":"St Pierre"},{"label":"St Vincent"},{"label":"Sudan"},{"label":"Sumatra"},{"label":"Suriname"},{"label":"Swaziland"},{"label":"Sweden"},{"label":"Switzerland"},{"label":"Syria"},{"label":"Tahiti"},{"label":"Taiwan"},{"label":"Tajikistan"},{"label":"Tanzania"},{"label":"Thailand"},{"label":"Timor"},{"label":"Togo"},{"label":"Tonga"},{"label":"Tortola"},{"label":"Trinidad and Tobago"},{"label":"Tristan da Cunha"},{"label":"Tunisia"},{"label":"Turkey"},{"label":"Turkmenistan"},{"label":"Turks and Caicos Is"},{"label":"Turks Islands"},{"label":"Tuvalu"},{"label":"Uganda"},{"label":"Ukraine"},{"label":"United Arab Emirates"},{"label":"United Kingdom"},{"label":"United States of America"},{"label":"Upper Volta"},{"label":"Uruguay"},{"label":"Uzbekistan"},{"label":"Vanuatu"},{"label":"Vatican City"},{"label":"Venezuela"},{"label":"Vietnam"},{"label":"Wake Island"},{"label":"Wales"},{"label":"Wallis and Futuna Is"},{"label":"Walvis Bay"},{"label":"Western Sahara"},{"label":"Western Samoa"},{"label":"Yemen"},{"label":"Yemen, Republic of"},{"label":"Zaire"},{"label":"Zambia"},{"label":"Zimbabwe"},{"label":"Cote D&apos;Ivoire"},{"label":"Rep of South Sudan"},{"label":"Kosovo"},{"label":"Alderney"},{"label":"Ascension"},{"label":"Brunei Darussalam"},{"label":"Guernsey"},{"label":"Ivory Coast"},{"label":"Jersey"},{"label":"Kowloon"},{"label":"Niue"},{"label":"Redonda"},{"label":"Santa Cruz Islands"},{"label":"Sark"},{"label":"St Bartholomew"},{"label":"St Christopher - Nevis"},{"label":"St Pierre and Miquelon"},{"label":"St Vincent - Grenadine"},{"label":"Syrian Arab Republic"},{"label":"Timor-Leste"},{"label":"Eswatini"}];

const CountriesDropdownTemplate: any = ({ label, description, fieldId, name, placeholder, filter, create, multiple, error, readonly, disabled, value, context, sx, items }) => {
  return ` 
    <cbp-form-field
      ${label ? `label="${label}"` : ''}
      ${description ? `description="${description}"` : ''}
      ${readonly ? 'readonly' : ''}
      ${disabled ? 'disabled' : ''}
      ${error ? 'error' : ''}
      ${context && context != 'light-inverts' ? `context="${context}"` : ''}
    >
      <cbp-dropdown
        ${name ? `name="${name}"` : ''}
        ${fieldId ? `field-id="${fieldId}"` : ''}
        ${placeholder ? `placeholder="${placeholder}"` : ''}
        ${value ? `value="${value}"` : ''}
        ${filter ? 'filter' : ''}
        ${multiple ? 'multiple' : ''}
        ${create ? 'create' : ''}
        ${context && context != 'light-inverts' ? `context="${context}"` : ''}
        ${sx ? `sx='${JSON.stringify(sx)}'` : ''}
      >
        ${multiple ? generateMultiSelectItems(items, name, context) : generateItems(items)}
      </cbp-dropdown>
    </cbp-form-field>
  `;
};

export const CountriesDropdown = CountriesDropdownTemplate.bind({});
CountriesDropdown.storyName = "Dropdown - Countries";
CountriesDropdown.args = {
  label:"Country",
  value: '',
  items: Countries
};






// Combobox using Countries data: 
const ComboboxTemplate: any = ({ label, description, fieldId, name, placeholder, filter, multiple, create, error, readonly, disabled, value, context, sx, items }) => {
  return ` 
    <cbp-form-field
      ${label ? `label="${label}"` : ''}
      ${description ? `description="${description}"` : ''}
      ${readonly ? 'readonly' : ''}
      ${disabled ? 'disabled' : ''}
      ${error ? 'error' : ''}
      ${context && context != 'light-inverts' ? `context="${context}"` : ''}
    >
      <cbp-dropdown
        ${name ? `name="${name}"` : ''}
        ${fieldId ? `field-id="${fieldId}"` : ''}
        ${placeholder ? `placeholder="${placeholder}"` : ''}
        ${value ? `value="${value}"` : ''}
        ${filter ? 'filter' : ''}
        ${multiple ? 'multiple' : ''}
        ${create ? 'create' : ''}
        ${context && context != 'light-inverts' ? `context="${context}"` : ''}
        ${sx ? `sx='${JSON.stringify(sx)}'` : ''}
      >
        ${multiple ? generateMultiSelectItems(items, name, context) : generateItems(items)}
      </cbp-dropdown>
    </cbp-form-field>
  `;
};

export const Combobox = ComboboxTemplate.bind({});
Combobox.storyName = "Dropdown - Combobox";
Combobox.args = {
  label: "Combobox",
  description: "A combobox is enabled by using the 'filter' property.",
  value: '',
  filter: true,
  items: Countries,
}




// Combobox using States   data as an asynchronous call: 
const DropdownJSONTemplate: any = ({ label, description, fieldId, name, placeholder, items, filter, async, minimumInputLength, multiple, create, error, readonly, disabled, value, context, sx }) => {

  return ` 
    <cbp-form-field
      ${label ? `label="${label}"` : ''}
      ${description ? `description="${description}"` : ''}
      ${readonly ? 'readonly' : ''}
      ${disabled ? 'disabled' : ''}
      ${error ? 'error' : ''}
      ${context && context != 'light-inverts' ? `context="${context}"` : ''}
    >
      <cbp-dropdown
        ${name ? `name="${name}"` : ''}
        ${fieldId ? `field-id="${fieldId}"` : ''}
        ${placeholder ? `placeholder="${placeholder}"` : ''}
        ${value ? `value="${value}"` : ''}
        ${items ? `items='${items}'` : ''}
        ${filter ? 'filter' : ''}
        ${async ? 'async' : ''}
        ${minimumInputLength ? `minimum-input-length="${minimumInputLength}"` : ''}
        ${multiple ? 'multiple' : ''}
        ${create ? 'create' : ''}
        ${context && context != 'light-inverts' ? `context="${context}"` : ''}
        ${sx ? `sx='${JSON.stringify(sx)}'` : ''}
      >
         <!-- No dropdown items loaded by default -->
      </cbp-dropdown>
    </cbp-form-field>
  `;
};

export const DropdownJSON = DropdownJSONTemplate.bind({});
DropdownJSON.storyName = "Dropdown - JSON items";
DropdownJSON.args = {
  label:"Dropdown using JSON",
  description: "A dropdown example using States data, loaded via JSON.",
  items: JSON.stringify(States),
  value: '',
};



// Combobox using Countries data as an asynchronous call: 
const ComboboxAsyncTemplate: any = ({ label, description, fieldId, name, placeholder, filter, async, minimumInputLength, multiple, create, error, readonly, disabled, value, selectedLabel, context, sx }) => {

  // Ideally, this should be placed on the button component itself, not the document; but the event bubbles, so it works here.
  let asyncCombobox;
  setTimeout(() => {
    asyncCombobox=document.querySelector('cbp-dropdown[async]') as HTMLCbpDropdownElement;

    asyncCombobox.addEventListener('populateCombobox', (e) => {
      let searchString = e.detail.searchString;
      // filter the JSON natively in JavaScript
      let filteredJSON = Countries.filter( (item) => item.label.toLowerCase().indexOf(searchString) != -1);
      // return the filtered JSON result to the component via the items property
      asyncCombobox.items = filteredJSON;
    });

  }, 100);
  

  return ` 
    <cbp-form-field
      ${label ? `label="${label}"` : ''}
      ${description ? `description="${description}"` : ''}
      ${readonly ? 'readonly' : ''}
      ${disabled ? 'disabled' : ''}
      ${error ? 'error' : ''}
      ${context && context != 'light-inverts' ? `context="${context}"` : ''}
    >
      <cbp-dropdown
        ${name ? `name="${name}"` : ''}
        ${fieldId ? `field-id="${fieldId}"` : ''}
        ${placeholder ? `placeholder="${placeholder}"` : ''}
        ${value ? `value="${value}"` : ''}
        ${selectedLabel ? `selected-label="${selectedLabel}"` : ''}
        ${filter ? 'filter' : ''}
        ${async ? 'async' : ''}
        ${minimumInputLength ? `minimum-input-length="${minimumInputLength}"` : ''}
        ${multiple ? 'multiple' : ''}
        ${create ? 'create' : ''}
        ${context && context != 'light-inverts' ? `context="${context}"` : ''}
        ${sx ? `sx='${JSON.stringify(sx)}'` : ''}
      >
         <!-- No dropdown items loaded by default -->
      </cbp-dropdown>
    </cbp-form-field>
  `;
};

export const ComboboxAsync = ComboboxAsyncTemplate.bind({});
ComboboxAsync.storyName = "Dropdown - Asynchronous JSON";
ComboboxAsync.argTypes = {
  async: {
    control: 'boolean',
  },
  minimumInputLength: {
    control: 'number',
    if: { arg: 'async', eq: true },
  },
  selectedLabel: {
    control: 'text',
  }
}
ComboboxAsync.args = {
  label:"Combobox",
  description: "A combobox example using Country data, fetched asynchronously after 2 key presses.",
  value: '',
  selectedLabel: '',
  filter: true,
  async: true,
  minimumInputLength: 2,
  multiple: false
};

*/


//const prefix='[{"label":"Attorney","value":"Attorney"},{"label":"Coach","value":"Coach"},{"label":"Dr.","value":"Dr."},{"label":"Father","value":"Father"},{"label":"Governor","value":"Governor"},{"label":"Honorable","value":"Honorable"},{"label":"Officer","value":"Officer"},{"label":"Master","value":"Master"},{"label":"Miss","value":"Miss"},{"label":"Mr.","value":"Mr."},{"label":"Mrs","value":"Mrs."},{"label":"Ms.","value":"Ms"},{"label":"President","value":"President"},{"label":"Professor","value":"Professor"},{"label":"Reverend","value":"Reverend"}]';
//const suffix='[{"label":"I","value":"First"},{"label":"II","value":"Second"},{"label":"III","value":"Third"},{"label":"IV","value":"Fourth"},{"label":"IX","value":"Ninth"},{"label":"JR","value":"Junior"},{"label":"SR","value":"Senior"},{"label":"V","value":"Fifth"},{"label":"VI","value":"Sixth"},{"label":"VII","value":"Seventh"},{"label":"VIII","value":"Eighth"},{"label":"X","value":"Tenth"},{"label":"XI","value":"Eleventh"},{"label":"XII","value":"Twelfth"},{"label":"XIII","value":"Thirteenth"},{"label":"XIV","value":"Fourteenth"},{"label":"XV","value":"Fifteenth"},{"label":"XVI","value":"Sixteenth"},{"label":"XVII","value":"Seventeenth"}]';



/* This one is actually problematic because a number of Armed Forces territories use the same value (AE).
// States with Territories: 
const StatesAndTerritories=[{"label":"Alabama","value":"AL"},{"label":"Alaska","value":"AK"},{"label":"American Samoa","value":"AS"},{"label":"Arizona","value":"AZ"},{"label":"Arkansas","value":"AR"},{"label":"Armed Forces Africa (AE Also Equals Canada Europe and the Middle East)","value":"AE"},{"label":"Armed Forces Americas (Except Canada)","value":"AA"},{"label":"Armed Forces Canada (AE Also Equals Africa Europe and the Middle East)","value":"AE"},{"label":"Armed Forces Europe (AE Also Equals Africa Canada and the Middle East)","value":"AE"},{"label":"Armed Forces Middle East (AE Also Equals Africa Canada and Europe)","value":"AE"},{"label":"Armed Forces Pacific","value":"AP"},{"label":"California","value":"CA"},{"label":"Colorado","value":"CO"},{"label":"Connecticut","value":"CT"},{"label":"Delaware","value":"DE"},{"label":"District of Columbia","value":"DC"},{"label":"Federated States of Micronesia","value":"FM"},{"label":"Florida","value":"FL"},{"label":"Georgia","value":"GA"},{"label":"Guam","value":"GU"},{"label":"Hawaii","value":"HI"},{"label":"Idaho","value":"ID"},{"label":"Illinois","value":"IL"},{"label":"Indiana","value":"IN"},{"label":"Iowa","value":"IA"},{"label":"Kansas","value":"KS"},{"label":"Kentucky","value":"KY"},{"label":"Louisiana","value":"LA"},{"label":"Maine","value":"ME"},{"label":"Marshall Islands","value":"MH"},{"label":"Maryland","value":"MD"},{"label":"Massachusetts","value":"MA"},{"label":"Michigan","value":"MI"},{"label":"Minnesota","value":"MN"},{"label":"Mississippi","value":"MS"},{"label":"Missouri","value":"MO"},{"label":"Montana","value":"MT"},{"label":"Nebraska","value":"NE"},{"label":"Nevada","value":"NV"},{"label":"New Hampshire","value":"NH"},{"label":"New Jersey","value":"NJ"},{"label":"New Mexico","value":"NM"},{"label":"New York","value":"NY"},{"label":"North Carolina","value":"NC"},{"label":"North Dakota","value":"ND"},{"label":"Northern Mariana Islands","value":"MP"},{"label":"Ohio","value":"OH"},{"label":"Oklahoma","value":"OK"},{"label":"Oregon","value":"OR"},{"label":"Palau","value":"PW"},{"label":"Pennsylvania","value":"PA"},{"label":"Puerto Rico","value":"PR"},{"label":"Rhode Island","value":"RI"},{"label":"South Carolina","value":"SC"},{"label":"South Dakota","value":"SD"},{"label":"Tennessee","value":"TN"},{"label":"Texas","value":"TX"},{"label":"Utah","value":"UT"},{"label":"Vermont","value":"VT"},{"label":"Virgin Islands","value":"VI"},{"label":"Virginia","value":"VA"},{"label":"Washington","value":"WA"},{"label":"West Virginia","value":"WV"},{"label":"Wisconsin","value":"WI"},{"label":"Wyoming","value":"WY"}];

const StatesWithTerritoriesDropdownTemplate = ({ label, description, fieldId, name, placeholder, filter, error, readonly, disabled, value, context, sx, items }) => {
  return ` 
    <cbp-form-field
      ${label ? `label="${label}"` : ''}
      ${description ? `description="${description}"` : ''}
      ${fieldId ? `field-id="${fieldId}"` : ''}
      ${readonly ? `readonly` : ''}
      ${disabled ? `disabled` : ''}
      ${error ? `error` : ''}
      ${context && context != 'light-inverts' ? `context="${context}"` : ''}
    >
      <cbp-dropdown
        ${name ? `name="${name}"` : ''}
        ${fieldId ? `field-id="${fieldId}"` : ''}
        ${placeholder ? `placeholder="${placeholder}"` : ''}
        ${value ? `value="${value}"` : ''}
        ${filter ? `filter` : ''}
        ${context && context != 'light-inverts' ? `context="${context}"` : ''}
        ${sx ? `sx='${JSON.stringify(sx)}'` : ''}
      >
         ${generateItems(items)}
      </ul>
      </cbp-dropdown>
    </cbp-form-field>
  `;
};

export const StatesWithTerritoriesDropdown = StatesWithTerritoriesDropdownTemplate.bind({});
StatesWithTerritoriesDropdown.args = {
  label:"State/Territory",
  value: '',
  fieldId: 'dropdown-id',
  items: StatesAndTerritories,
};
*/
