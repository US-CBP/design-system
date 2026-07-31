export default {
  title: 'Forms/Form Field/Form Field Groups',
  //tags: ['beta'],
  argTypes: {
    label: {
      control: 'text',
    },
    labelSlotted: {
      name: 'label (slotted)',
      control: 'text',
    },
    description: {
      control: 'text',
    },
    descriptionSlotted: {
      name: 'description (slotted)',
      control: 'text',
    },
    fieldId: {
      control: 'text',
    },
    fields: {
      name: 'Form fields (slotted)',
      control: 'object',
    },
    error: {
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
};


// Countries: 
const Countries=[{"label":"Afghanistan"},{"label":"Albania"},{"label":"Algeria"},{"label":"Andaman Islands"},{"label":"Andorra"},{"label":"Angola"},{"label":"Anguilla"},{"label":"Annobon Island"},{"label":"Antigua"},{"label":"Antigua and Barbuda"},{"label":"Argentina"},{"label":"Armenia"},{"label":"Aruba"},{"label":"Ascension Island"},{"label":"Australia"},{"label":"Austria"},{"label":"Azerbaijan"},{"label":"Azores"},{"label":"Bahamas"},{"label":"Bahrain"},{"label":"Balearic Islands"},{"label":"Bangladesh"},{"label":"Barbados"},{"label":"Barbuda"},{"label":"Basse Terre"},{"label":"Belarus"},{"label":"Belau"},{"label":"Belgium"},{"label":"Belize"},{"label":"Benin"},{"label":"Bermuda"},{"label":"Bhutan"},{"label":"Bolivia"},{"label":"Bonaire"},{"label":"Bosnia and Herzegovina"},{"label":"Bosnia-Herzegovina"},{"label":"Botswana"},{"label":"Brazil"},{"label":"British Virgin Islands"},{"label":"Brunei"},{"label":"Bulgaria"},{"label":"Burkina Faso"},{"label":"Burma"},{"label":"Burundi"},{"label":"Byelarus"},{"label":"Cabinda"},{"label":"Caicos Islands"},{"label":"Cambodia"},{"label":"Cameroon"},{"label":"Canada"},{"label":"Canary Islands"},{"label":"Canton Islands"},{"label":"Cape Verde"},{"label":"Carriacou"},{"label":"Castelrosse Islands"},{"label":"Cayman Islands"},{"label":"Central African Rep"},{"label":"Chad"},{"label":"Channel Islands"},{"label":"Chile"},{"label":"China"},{"label":"Christmas Island"},{"label":"Cocos Islands"},{"label":"Colombia"},{"label":"Comoros"},{"label":"Congo"},{"label":"Cook Islands"},{"label":"Corsica"},{"label":"Costa Rica"},{"label":"Crete"},{"label":"Croatia"},{"label":"Cuba"},{"label":"Curacao"},{"label":"Cyprus"},{"label":"Czech Republic"},{"label":"Dem Rep of Congo"},{"label":"Denmark"},{"label":"Diego Garcia"},{"label":"Djibouti"},{"label":"Dodecanese Islands"},{"label":"Dominica"},{"label":"Dominican Republic"},{"label":"East Timor"},{"label":"Easter Island"},{"label":"Ecuador"},{"label":"Egypt"},{"label":"Eire"},{"label":"El Salvador"},{"label":"England"},{"label":"Equatorial Guinea"},{"label":"Eritrea"},{"label":"Estonia"},{"label":"Ethiopia"},{"label":"Falkland Islands"},{"label":"Faroe Islands"},{"label":"Fernando de Noronha"},{"label":"Fiji"},{"label":"Finland"},{"label":"France"},{"label":"French Guiana"},{"label":"French Polynesia"},{"label":"French West Indies"},{"label":"Gabon"},{"label":"Gambia"},{"label":"Georgia"},{"label":"Germany"},{"label":"Ghana"},{"label":"Gibraltar"},{"label":"Grand Cayman Island"},{"label":"Grand Terre"},{"label":"Grand Turk"},{"label":"Great Britain"},{"label":"Greece"},{"label":"Greenland"},{"label":"Grenada"},{"label":"Grenadine Islands"},{"label":"Guadeloupe"},{"label":"Guatemala"},{"label":"Guinea"},{"label":"Guinea-Bissau"},{"label":"Guyana"},{"label":"Haiti"},{"label":"Honduras"},{"label":"Hong Kong"},{"label":"Hungary"},{"label":"Iceland"},{"label":"India"},{"label":"Indonesia"},{"label":"Iran"},{"label":"Iraq"},{"label":"Ireland"},{"label":"Ireland, Republic of"},{"label":"Isle of Man"},{"label":"Israel"},{"label":"Italy"},{"label":"Jamaica"},{"label":"Jan Mayen Island"},{"label":"Japan"},{"label":"Jerusalem"},{"label":"Jordan"},{"label":"Kampuchea"},{"label":"Kazakhstan"},{"label":"Kenya"},{"label":"Kiribati"},{"label":"Kuwait"},{"label":"Kyrgyzstan"},{"label":"Laos"},{"label":"Latvia"},{"label":"Lebanon"},{"label":"Lesotho"},{"label":"Liberia"},{"label":"Libya"},{"label":"Liechtenstein"},{"label":"Lithuania"},{"label":"Little Cayman Island"},{"label":"Luxembourg"},{"label":"Macao"},{"label":"Macedonia"},{"label":"Madagascar"},{"label":"Madeira Islands"},{"label":"Malawi"},{"label":"Malaysia"},{"label":"Maldives"},{"label":"Mali"},{"label":"Malta"},{"label":"Marshall Islands"},{"label":"Martinique"},{"label":"Mauritania"},{"label":"Mauritius"},{"label":"Mexico"},{"label":"Micronesia"},{"label":"Midway Island"},{"label":"Miquelon Island"},{"label":"Moldova"},{"label":"Monaco"},{"label":"Mongolia"},{"label":"Montenegro"},{"label":"Montserrat"},{"label":"Morocco"},{"label":"Mozambique"},{"label":"Myanmar"},{"label":"Namibia"},{"label":"Nauru"},{"label":"Nepal"},{"label":"Netherlands"},{"label":"Netherlands Antilles"},{"label":"Nevis"},{"label":"New Caldonia"},{"label":"New Caledonia"},{"label":"New Guinea"},{"label":"New Hebrides"},{"label":"New Zealand"},{"label":"Nicaragua"},{"label":"Nicobar Islands"},{"label":"Niger"},{"label":"Nigeria"},{"label":"North Korea"},{"label":"Northern Ireland"},{"label":"Norway"},{"label":"Okinawa"},{"label":"Oman"},{"label":"Pagalu"},{"label":"Pakistan"},{"label":"Palau"},{"label":"Panama"},{"label":"Papua New Guinea"},{"label":"Paraguay"},{"label":"Peru"},{"label":"Petit Martinique"},{"label":"Philippines"},{"label":"Pitcairn Island"},{"label":"Poland"},{"label":"Portugal"},{"label":"Qatar"},{"label":"Republic of Congo"},{"label":"Republic of Georgia"},{"label":"Republic of Macedonia"},{"label":"Reunion"},{"label":"Romania"},{"label":"Russia"},{"label":"Rwanda"},{"label":"Ryukyu Islands"},{"label":"Saba"},{"label":"Samoa"},{"label":"San Marino"},{"label":"Sao Tome and Principe"},{"label":"Sardinia"},{"label":"Saudi Arabia"},{"label":"Scotland"},{"label":"Senegal"},{"label":"Serbia"},{"label":"Serbia and Montenegro"},{"label":"Seychelles"},{"label":"Sicily"},{"label":"Sierra Leone"},{"label":"Singapore"},{"label":"Slovak Republic"},{"label":"Slovakia"},{"label":"Slovenia"},{"label":"Solomon Islands"},{"label":"Somalia"},{"label":"Somaliland"},{"label":"Sombrero"},{"label":"South Africa"},{"label":"South Korea"},{"label":"Southwest Africa"},{"label":"Spain"},{"label":"Spanish Sahara"},{"label":"Sri Lanka"},{"label":"St Christopher"},{"label":"St Eustatius"},{"label":"St Helena"},{"label":"St Kitts"},{"label":"St Lucia"},{"label":"St Maarten"},{"label":"St Martin"},{"label":"St Pierre"},{"label":"St Vincent"},{"label":"Sudan"},{"label":"Sumatra"},{"label":"Suriname"},{"label":"Swaziland"},{"label":"Sweden"},{"label":"Switzerland"},{"label":"Syria"},{"label":"Tahiti"},{"label":"Taiwan"},{"label":"Tajikistan"},{"label":"Tanzania"},{"label":"Thailand"},{"label":"Timor"},{"label":"Togo"},{"label":"Tonga"},{"label":"Tortola"},{"label":"Trinidad and Tobago"},{"label":"Tristan da Cunha"},{"label":"Tunisia"},{"label":"Turkey"},{"label":"Turkmenistan"},{"label":"Turks and Caicos Is"},{"label":"Turks Islands"},{"label":"Tuvalu"},{"label":"Uganda"},{"label":"Ukraine"},{"label":"United Arab Emirates"},{"label":"United Kingdom"},{"label":"United States of America"},{"label":"Upper Volta"},{"label":"Uruguay"},{"label":"Uzbekistan"},{"label":"Vanuatu"},{"label":"Vatican City"},{"label":"Venezuela"},{"label":"Vietnam"},{"label":"Wake Island"},{"label":"Wales"},{"label":"Wallis and Futuna Is"},{"label":"Walvis Bay"},{"label":"Western Sahara"},{"label":"Western Samoa"},{"label":"Yemen"},{"label":"Yemen, Republic of"},{"label":"Zaire"},{"label":"Zambia"},{"label":"Zimbabwe"},{"label":"Cote D&apos;Ivoire"},{"label":"Rep of South Sudan"},{"label":"Kosovo"},{"label":"Alderney"},{"label":"Ascension"},{"label":"Brunei Darussalam"},{"label":"Guernsey"},{"label":"Ivory Coast"},{"label":"Jersey"},{"label":"Kowloon"},{"label":"Niue"},{"label":"Redonda"},{"label":"Santa Cruz Islands"},{"label":"Sark"},{"label":"St Bartholomew"},{"label":"St Christopher - Nevis"},{"label":"St Pierre and Miquelon"},{"label":"St Vincent - Grenadine"},{"label":"Syrian Arab Republic"},{"label":"Timor-Leste"},{"label":"Eswatini"}];




const AddressTemplate = ({ label, labelSlotted, description, descriptionSlotted, fieldId, error, disabled, context, sx }) => {

  // The native JSON objects may not be properly sorted (such as Countries, which has more appended to the end out of order),
  // so sort them alphabetically.
  
  Countries.sort(function(a, b) {
    return a.label.localeCompare(b.label);
  });

  return ` 
    <cbp-form-field group
      ${label ? `label="${label}"` : ''}
      ${description ? `description="${description}"` : ''}
      ${fieldId ? `field-id="${fieldId}"` : ''}
      ${disabled ? `disabled` : ''}
      ${error ? `error` : ''}
      ${context && context != 'light-inverts' ? `context="${context}"` : ''}
      ${sx ? `sx='${JSON.stringify(sx)}'` : ''}
    >
      ${ labelSlotted ? `<span slot="cbp-form-field-label">${labelSlotted}</span>` : ''}
      ${ descriptionSlotted ? `<span slot="cbp-form-field-description">${descriptionSlotted}</span>` : ''}

      <cbp-flex 
        wrap="wrap"
        gap="0 var(--cbp-space-4x)"
        breakpoint="22.5rem"
      >

        <cbp-flex-item flex-grow="1" flex-basis="25ch">
          <cbp-form-field
            label="Street Address"
          >
            <input name="address1" type="text" />
          </cbp-form-field>
        </cbp-flex-item>

        <cbp-flex-item flex-grow="1" flex-basis="25ch">
          <cbp-form-field
            label="Apartment, Suite, Building, Etc."
          >
            <input name="address2" type="text" />
          </cbp-form-field>
        </cbp-flex-item>

        <cbp-flex-item flex-grow="1" flex-basis="25ch">
          <cbp-form-field
            label="Line 3"
          >
            <input name="address3" type="text" />
          </cbp-form-field>
        </cbp-flex-item>

        <cbp-flex-item flex-grow="1" flex-basis="25ch">
          <cbp-form-field
            label="Line 4"
          >
            <input name="address4" type="text" />
          </cbp-form-field>
        </cbp-flex-item>

        <cbp-flex-item flex-grow="1" flex-basis="25ch">
          <cbp-form-field
            label="City/Town"
          >
            <input name="city" type="text" />
          </cbp-form-field>
        </cbp-flex-item>

        <cbp-flex-item flex-grow="1" flex-basis="25ch">
          <cbp-form-field
            label="State/Province/Region"
          >
            <input name="state" type="text" />
          </cbp-form-field>
        </cbp-flex-item>

        <cbp-flex-item flex-grow="0" flex-basis="15ch">
          <cbp-form-field
            label="ZIP/Postal Code"
          >
            <input name="postalcode" type="text" />
          </cbp-form-field>
        </cbp-flex-item>

        <cbp-flex-item flex-grow="2" flex-basis="20ch">
          <cbp-form-field
            label="Country"
          >
            <cbp-dropdown name="country" items='${JSON.stringify(Countries)}' />
          </cbp-form-field>
        </cbp-flex-item>

      </cbp-flex>
    </cbp-form-field>
  `;
};

export const Address: any = AddressTemplate.bind({});
Address.args = {
  label:"Insert Group Label",
  description: "Required.",
};


const Prefix='[{"label":"Attorney","value":"Attorney"},{"label":"Coach","value":"Coach"},{"label":"Dr.","value":"Dr."},{"label":"Father","value":"Father"},{"label":"Governor","value":"Governor"},{"label":"Honorable","value":"Honorable"},{"label":"Officer","value":"Officer"},{"label":"Master","value":"Master"},{"label":"Miss","value":"Miss"},{"label":"Mr.","value":"Mr."},{"label":"Mrs","value":"Mrs."},{"label":"Ms.","value":"Ms"},{"label":"President","value":"President"},{"label":"Professor","value":"Professor"},{"label":"Reverend","value":"Reverend"}]';
const Suffix='[{"label":"I","value":"First"},{"label":"II","value":"Second"},{"label":"III","value":"Third"},{"label":"IV","value":"Fourth"},{"label":"IX","value":"Ninth"},{"label":"JR","value":"Junior"},{"label":"SR","value":"Senior"},{"label":"V","value":"Fifth"},{"label":"VI","value":"Sixth"},{"label":"VII","value":"Seventh"},{"label":"VIII","value":"Eighth"},{"label":"X","value":"Tenth"},{"label":"XI","value":"Eleventh"},{"label":"XII","value":"Twelfth"},{"label":"XIII","value":"Thirteenth"},{"label":"XIV","value":"Fourteenth"},{"label":"XV","value":"Fifteenth"},{"label":"XVI","value":"Sixteenth"},{"label":"XVII","value":"Seventeenth"}]';

const FullNameTemplate = ({ label, labelSlotted, description, descriptionSlotted, fieldId, error, disabled, context, sx }) => {
  return ` 
    <cbp-form-field group
      ${label ? `label="${label}"` : ''}
      ${description ? `description="${description}"` : ''}
      ${fieldId ? `field-id="${fieldId}"` : ''}
      ${disabled ? `disabled` : ''}
      ${error ? `error` : ''}
      ${context && context != 'light-inverts' ? `context="${context}"` : ''}
      ${sx ? `sx='${JSON.stringify(sx)}'` : ''}
    >
      ${ labelSlotted ? `<span slot="cbp-form-field-label">${labelSlotted}</span>` : ''}
      ${ descriptionSlotted ? `<span slot="cbp-form-field-description">${descriptionSlotted}</span>` : ''}

      <cbp-flex 
        wrap="wrap"
        gap="0 var(--cbp-space-4x)"
        breakpoint="22.5rem"
      >

        <cbp-flex-item
          flex-basis="10rem"
          flex-shrink="0"
        >
          <cbp-form-field
            label="Prefix"
          >
            <cbp-dropdown name="prefix" items='${Prefix}'></cbp-dropdown>
          </cbp-form-field>
        </cbp-flex-item>

        <cbp-flex-item
          flex-basis="10rem"
          flex-grow="1"
        >
          <cbp-form-field
            label="First Name"
          >
            <input name="firstname" type="text" />
          </cbp-form-field>
        </cbp-flex-item>

        <cbp-form-field
          label="M.I."
          sx='{"width":"5ch"}'
        >
          <input name="middleinitial" type="text" maxlength="1" />
        </cbp-form-field>

        <cbp-flex-item
          flex-basis="10rem"
          flex-grow="1"
        >
          <cbp-form-field
            label="Last Name"
          >
            <input name="lastname" type="text" />
          </cbp-form-field>
        </cbp-flex-item>

        <cbp-flex-item
          flex-basis="10rem"
          flex-shrink="0"
        >
          <cbp-form-field
            label="Suffix"
          >
            <cbp-dropdown name="suffix" items='${Suffix}'></cbp-dropdown>
          </cbp-form-field>
        </cbp-flex-item>

      </cbp-flex>
    </cbp-form-field>
  `;
};

export const FullName: any = FullNameTemplate.bind({});
FullName.args = {
  label:"User's Full Name",
  description: "Required.",
};

// test data obtained from https://gist.githubusercontent.com/pickletoni/021e2e18e83f33d16fee5daa308e6a4e/raw/fc6fd9127efd12d97a3d39f38befc784d6bcbf22/countryPhoneCodes.json
const CountryCodesDataset='[{"country":"United States","code":"1","iso":"US"},{"country":"Afghanistan","code":"93","iso":"AF"},{"country":"Albania","code":"355","iso":"AL"},{"country":"Algeria","code":"213","iso":"DZ"},{"country":"American Samoa","code":"1-684","iso":"AS"},{"country":"Andorra","code":"376","iso":"AD"},{"country":"Angola","code":"244","iso":"AO"},{"country":"Anguilla","code":"1-264","iso":"AI"},{"country":"Antarctica","code":"672","iso":"AQ"},{"country":"Antigua and Barbuda","code":"1-268","iso":"AG"},{"country":"Argentina","code":"54","iso":"AR"},{"country":"Armenia","code":"374","iso":"AM"},{"country":"Aruba","code":"297","iso":"AW"},{"country":"Australia","code":"61","iso":"AU"},{"country":"Austria","code":"43","iso":"AT"},{"country":"Azerbaijan","code":"994","iso":"AZ"},{"country":"Bahamas","code":"1-242","iso":"BS"},{"country":"Bahrain","code":"973","iso":"BH"},{"country":"Bangladesh","code":"880","iso":"BD"},{"country":"Barbados","code":"1-246","iso":"BB"},{"country":"Belarus","code":"375","iso":"BY"},{"country":"Belgium","code":"32","iso":"BE"},{"country":"Belize","code":"501","iso":"BZ"},{"country":"Benin","code":"229","iso":"BJ"},{"country":"Bermuda","code":"1-441","iso":"BM"},{"country":"Bhutan","code":"975","iso":"BT"},{"country":"Bolivia","code":"591","iso":"BO"},{"country":"Bosnia and Herzegovina","code":"387","iso":"BA"},{"country":"Botswana","code":"267","iso":"BW"},{"country":"Brazil","code":"55","iso":"BR"},{"country":"British Indian Ocean Territory","code":"246","iso":"IO"},{"country":"British Virgin Islands","code":"1-284","iso":"VG"},{"country":"Brunei","code":"673","iso":"BN"},{"country":"Bulgaria","code":"359","iso":"BG"},{"country":"Burkina Faso","code":"226","iso":"BF"},{"country":"Burundi","code":"257","iso":"BI"},{"country":"Cambodia","code":"855","iso":"KH"},{"country":"Cameroon","code":"237","iso":"CM"},{"country":"Canada","code":"1","iso":"CA"},{"country":"Cape Verde","code":"238","iso":"CV"},{"country":"Cayman Islands","code":"1-345","iso":"KY"},{"country":"Central African Republic","code":"236","iso":"CF"},{"country":"Chad","code":"235","iso":"TD"},{"country":"Chile","code":"56","iso":"CL"},{"country":"China","code":"86","iso":"CN"},{"country":"Christmas Island","code":"61","iso":"CX"},{"country":"Cocos Islands","code":"61","iso":"CC"},{"country":"Colombia","code":"57","iso":"CO"},{"country":"Comoros","code":"269","iso":"KM"},{"country":"Cook Islands","code":"682","iso":"CK"},{"country":"Costa Rica","code":"506","iso":"CR"},{"country":"Croatia","code":"385","iso":"HR"},{"country":"Cuba","code":"53","iso":"CU"},{"country":"Curacao","code":"599","iso":"CW"},{"country":"Cyprus","code":"357","iso":"CY"},{"country":"Czech Republic","code":"420","iso":"CZ"},{"country":"Democratic Republic of the Congo","code":"243","iso":"CD"},{"country":"Denmark","code":"45","iso":"DK"},{"country":"Djibouti","code":"253","iso":"DJ"},{"country":"Dominica","code":"1-767","iso":"DM"},{"country":"Dominican Republic","code":"1-809, 1-829, 1-849","iso":"DO"},{"country":"East Timor","code":"670","iso":"TL"},{"country":"Ecuador","code":"593","iso":"EC"},{"country":"Egypt","code":"20","iso":"EG"},{"country":"El Salvador","code":"503","iso":"SV"},{"country":"Equatorial Guinea","code":"240","iso":"GQ"},{"country":"Eritrea","code":"291","iso":"ER"},{"country":"Estonia","code":"372","iso":"EE"},{"country":"Ethiopia","code":"251","iso":"ET"},{"country":"Falkland Islands","code":"500","iso":"FK"},{"country":"Faroe Islands","code":"298","iso":"FO"},{"country":"Fiji","code":"679","iso":"FJ"},{"country":"Finland","code":"358","iso":"FI"},{"country":"France","code":"33","iso":"FR"},{"country":"French Polynesia","code":"689","iso":"PF"},{"country":"Gabon","code":"241","iso":"GA"},{"country":"Gambia","code":"220","iso":"GM"},{"country":"Georgia","code":"995","iso":"GE"},{"country":"Germany","code":"49","iso":"DE"},{"country":"Ghana","code":"233","iso":"GH"},{"country":"Gibraltar","code":"350","iso":"GI"},{"country":"Greece","code":"30","iso":"GR"},{"country":"Greenland","code":"299","iso":"GL"},{"country":"Grenada","code":"1-473","iso":"GD"},{"country":"Guam","code":"1-671","iso":"GU"},{"country":"Guatemala","code":"502","iso":"GT"},{"country":"Guernsey","code":"44-1481","iso":"GG"},{"country":"Guinea","code":"224","iso":"GN"},{"country":"Guinea-Bissau","code":"245","iso":"GW"},{"country":"Guyana","code":"592","iso":"GY"},{"country":"Haiti","code":"509","iso":"HT"},{"country":"Honduras","code":"504","iso":"HN"},{"country":"Hong Kong","code":"852","iso":"HK"},{"country":"Hungary","code":"36","iso":"HU"},{"country":"Iceland","code":"354","iso":"IS"},{"country":"India","code":"91","iso":"IN"},{"country":"Indonesia","code":"62","iso":"ID"},{"country":"Iran","code":"98","iso":"IR"},{"country":"Iraq","code":"964","iso":"IQ"},{"country":"Ireland","code":"353","iso":"IE"},{"country":"Isle of Man","code":"44-1624","iso":"IM"},{"country":"Israel","code":"972","iso":"IL"},{"country":"Italy","code":"39","iso":"IT"},{"country":"Ivory Coast","code":"225","iso":"CI"},{"country":"Jamaica","code":"1-876","iso":"JM"},{"country":"Japan","code":"81","iso":"JP"},{"country":"Jersey","code":"44-1534","iso":"JE"},{"country":"Jordan","code":"962","iso":"JO"},{"country":"Kazakhstan","code":"7","iso":"KZ"},{"country":"Kenya","code":"254","iso":"KE"},{"country":"Kiribati","code":"686","iso":"KI"},{"country":"Kosovo","code":"383","iso":"XK"},{"country":"Kuwait","code":"965","iso":"KW"},{"country":"Kyrgyzstan","code":"996","iso":"KG"},{"country":"Laos","code":"856","iso":"LA"},{"country":"Latvia","code":"371","iso":"LV"},{"country":"Lebanon","code":"961","iso":"LB"},{"country":"Lesotho","code":"266","iso":"LS"},{"country":"Liberia","code":"231","iso":"LR"},{"country":"Libya","code":"218","iso":"LY"},{"country":"Liechtenstein","code":"423","iso":"LI"},{"country":"Lithuania","code":"370","iso":"LT"},{"country":"Luxembourg","code":"352","iso":"LU"},{"country":"Macao","code":"853","iso":"MO"},{"country":"Macedonia","code":"389","iso":"MK"},{"country":"Madagascar","code":"261","iso":"MG"},{"country":"Malawi","code":"265","iso":"MW"},{"country":"Malaysia","code":"60","iso":"MY"},{"country":"Maldives","code":"960","iso":"MV"},{"country":"Mali","code":"223","iso":"ML"},{"country":"Malta","code":"356","iso":"MT"},{"country":"Marshall Islands","code":"692","iso":"MH"},{"country":"Mauritania","code":"222","iso":"MR"},{"country":"Mauritius","code":"230","iso":"MU"},{"country":"Mayotte","code":"262","iso":"YT"},{"country":"Mexico","code":"52","iso":"MX"},{"country":"Micronesia","code":"691","iso":"FM"},{"country":"Moldova","code":"373","iso":"MD"},{"country":"Monaco","code":"377","iso":"MC"},{"country":"Mongolia","code":"976","iso":"MN"},{"country":"Montenegro","code":"382","iso":"ME"},{"country":"Montserrat","code":"1-664","iso":"MS"},{"country":"Morocco","code":"212","iso":"MA"},{"country":"Mozambique","code":"258","iso":"MZ"},{"country":"Myanmar","code":"95","iso":"MM"},{"country":"Namibia","code":"264","iso":"NA"},{"country":"Nauru","code":"674","iso":"NR"},{"country":"Nepal","code":"977","iso":"NP"},{"country":"Netherlands","code":"31","iso":"NL"},{"country":"Netherlands Antilles","code":"599","iso":"AN"},{"country":"New Caledonia","code":"687","iso":"NC"},{"country":"New Zealand","code":"64","iso":"NZ"},{"country":"Nicaragua","code":"505","iso":"NI"},{"country":"Niger","code":"227","iso":"NE"},{"country":"Nigeria","code":"234","iso":"NG"},{"country":"Niue","code":"683","iso":"NU"},{"country":"North Korea","code":"850","iso":"KP"},{"country":"Northern Mariana Islands","code":"1-670","iso":"MP"},{"country":"Norway","code":"47","iso":"NO"},{"country":"Oman","code":"968","iso":"OM"},{"country":"Pakistan","code":"92","iso":"PK"},{"country":"Palau","code":"680","iso":"PW"},{"country":"Palestine","code":"970","iso":"PS"},{"country":"Panama","code":"507","iso":"PA"},{"country":"Papua New Guinea","code":"675","iso":"PG"},{"country":"Paraguay","code":"595","iso":"PY"},{"country":"Peru","code":"51","iso":"PE"},{"country":"Philippines","code":"63","iso":"PH"},{"country":"Pitcairn","code":"64","iso":"PN"},{"country":"Poland","code":"48","iso":"PL"},{"country":"Portugal","code":"351","iso":"PT"},{"country":"Puerto Rico","code":"1-787, 1-939","iso":"PR"},{"country":"Qatar","code":"974","iso":"QA"},{"country":"Republic of the Congo","code":"242","iso":"CG"},{"country":"Reunion","code":"262","iso":"RE"},{"country":"Romania","code":"40","iso":"RO"},{"country":"Russia","code":"7","iso":"RU"},{"country":"Rwanda","code":"250","iso":"RW"},{"country":"Saint Barthelemy","code":"590","iso":"BL"},{"country":"Saint Helena","code":"290","iso":"SH"},{"country":"Saint Kitts and Nevis","code":"1-869","iso":"KN"},{"country":"Saint Lucia","code":"1-758","iso":"LC"},{"country":"Saint Martin","code":"590","iso":"MF"},{"country":"Saint Pierre and Miquelon","code":"508","iso":"PM"},{"country":"Saint Vincent and the Grenadines","code":"1-784","iso":"VC"},{"country":"Samoa","code":"685","iso":"WS"},{"country":"San Marino","code":"378","iso":"SM"},{"country":"Sao Tome and Principe","code":"239","iso":"ST"},{"country":"Saudi Arabia","code":"966","iso":"SA"},{"country":"Senegal","code":"221","iso":"SN"},{"country":"Serbia","code":"381","iso":"RS"},{"country":"Seychelles","code":"248","iso":"SC"},{"country":"Sierra Leone","code":"232","iso":"SL"},{"country":"Singapore","code":"65","iso":"SG"},{"country":"Sint Maarten","code":"1-721","iso":"SX"},{"country":"Slovakia","code":"421","iso":"SK"},{"country":"Slovenia","code":"386","iso":"SI"},{"country":"Solomon Islands","code":"677","iso":"SB"},{"country":"Somalia","code":"252","iso":"SO"},{"country":"South Africa","code":"27","iso":"ZA"},{"country":"South Korea","code":"82","iso":"KR"},{"country":"South Sudan","code":"211","iso":"SS"},{"country":"Spain","code":"34","iso":"ES"},{"country":"Sri Lanka","code":"94","iso":"LK"},{"country":"Sudan","code":"249","iso":"SD"},{"country":"Suriname","code":"597","iso":"SR"},{"country":"Svalbard and Jan Mayen","code":"47","iso":"SJ"},{"country":"Swaziland","code":"268","iso":"SZ"},{"country":"Sweden","code":"46","iso":"SE"},{"country":"Switzerland","code":"41","iso":"CH"},{"country":"Syria","code":"963","iso":"SY"},{"country":"Taiwan","code":"886","iso":"TW"},{"country":"Tajikistan","code":"992","iso":"TJ"},{"country":"Tanzania","code":"255","iso":"TZ"},{"country":"Thailand","code":"66","iso":"TH"},{"country":"Togo","code":"228","iso":"TG"},{"country":"Tokelau","code":"690","iso":"TK"},{"country":"Tonga","code":"676","iso":"TO"},{"country":"Trinidad and Tobago","code":"1-868","iso":"TT"},{"country":"Tunisia","code":"216","iso":"TN"},{"country":"Turkey","code":"90","iso":"TR"},{"country":"Turkmenistan","code":"993","iso":"TM"},{"country":"Turks and Caicos Islands","code":"1-649","iso":"TC"},{"country":"Tuvalu","code":"688","iso":"TV"},{"country":"U.S. Virgin Islands","code":"1-340","iso":"VI"},{"country":"Uganda","code":"256","iso":"UG"},{"country":"Ukraine","code":"380","iso":"UA"},{"country":"United Arab Emirates","code":"971","iso":"AE"},{"country":"United Kingdom","code":"44","iso":"GB"},{"country":"Uruguay","code":"598","iso":"UY"},{"country":"Uzbekistan","code":"998","iso":"UZ"},{"country":"Vanuatu","code":"678","iso":"VU"},{"country":"Vatican","code":"379","iso":"VA"},{"country":"Venezuela","code":"58","iso":"VE"},{"country":"Vietnam","code":"84","iso":"VN"},{"country":"Wallis and Futuna","code":"681","iso":"WF"},{"country":"Western Sahara","code":"212","iso":"EH"},{"country":"Yemen","code":"967","iso":"YE"},{"country":"Zambia","code":"260","iso":"ZM"},{"country":"Zimbabwe","code":"263","iso":"ZW"}]';

const CountryCodes = JSON.stringify(JSON.parse(CountryCodesDataset).map( ({ iso, code }) => {
  return {
    "label": `${iso} +${code}`,
    "value": code
  }
}));

const PhoneTemplate = ({ label, labelSlotted, description, descriptionSlotted, fieldId, error, disabled, context, sx }) => {
  return ` 
    <cbp-form-field group
      ${label ? `label="${label}"` : ''}
      ${description ? `description="${description}"` : ''}
      ${fieldId ? `field-id="${fieldId}"` : ''}
      ${disabled ? `disabled` : ''}
      ${error ? `error` : ''}
      ${context && context != 'light-inverts' ? `context="${context}"` : ''}
      ${sx ? `sx='${JSON.stringify(sx)}'` : ''}
    >
      ${ labelSlotted ? `<span slot="cbp-form-field-label">${labelSlotted}</span>` : ''}
      ${ descriptionSlotted ? `<span slot="cbp-form-field-description">${descriptionSlotted}</span>` : ''}

      <cbp-flex 
        wrap="wrap"
        gap="0 var(--cbp-space-4x)"
        breakpoint="22.5rem"
      >
        <cbp-flex-item flex-basis="10rem" flex-shrink="0">
          <cbp-form-field label="Country Code">
            <cbp-dropdown name="countrycode" items='${CountryCodes}'></cbp-dropdown>
          </cbp-form-field>
        </cbp-flex-item>

        <cbp-flex-item
          flex-basis="10rem"
          flex-grow="0"
        >
          <cbp-form-field label="Phone Number">
            <input name="phonenumber" type="text" inputmode="numeric" />
          </cbp-form-field>
        </cbp-flex-item>

        </cbp-flex>
    </cbp-form-field>
  `;
};

export const Phone: any = PhoneTemplate.bind({});
Phone.args = {
  label:"User's Phone Number",
  description: "Required.",
};



const GroupAsHeadingTemplate = ({ label, labelSlotted, description, descriptionSlotted, fieldId, error, disabled, context, sx }) => {
  return ` 
    <cbp-form-field group
      ${label ? `label="${label}"` : ''}
      ${description ? `description="${description}"` : ''}
      ${fieldId ? `field-id="${fieldId}"` : ''}
      ${disabled ? `disabled` : ''}
      ${error ? `error` : ''}
      ${context && context != 'light-inverts' ? `context="${context}"` : ''}
      ${sx ? `sx='${JSON.stringify(sx)}'` : ''}
    >
      ${ labelSlotted ? `<span slot="cbp-form-field-label">${labelSlotted}</span>` : ''}
      ${ descriptionSlotted ? `<span slot="cbp-form-field-description">${descriptionSlotted}</span>` : ''}

      <cbp-flex 
        wrap="wrap"
        gap="0 var(--cbp-space-4x)"
        breakpoint="22.5rem"
      >

        <cbp-flex-item
          flex-basis="10rem"
          flex-shrink="0"
        >
          <cbp-form-field
            label="Prefix"
          >
            <cbp-dropdown name="prefix" items='${Prefix}'></cbp-dropdown>
          </cbp-form-field>
        </cbp-flex-item>

        <cbp-flex-item
          flex-basis="10rem"
          flex-grow="1"
        >
          <cbp-form-field
            label="First Name"
          >
            <input name="firstname" type="text" />
          </cbp-form-field>
        </cbp-flex-item>

        <cbp-form-field
          label="M.I."
          sx='{"width":"5ch"}'
        >
          <input name="middleinitial" type="text" maxlength="1" />
        </cbp-form-field>

        <cbp-flex-item
          flex-basis="10rem"
          flex-grow="1"
        >
          <cbp-form-field
            label="Last Name"
          >
            <input name="lastname" type="text" />
          </cbp-form-field>
        </cbp-flex-item>

        <cbp-flex-item
          flex-basis="10rem"
          flex-shrink="0"
        >
          <cbp-form-field
            label="Suffix"
          >
            <cbp-dropdown name="suffix" items='${Suffix}'></cbp-dropdown>
          </cbp-form-field>
        </cbp-flex-item>

      </cbp-flex>
    </cbp-form-field>
  `;
};

export const GroupAsHeadingFill: any = GroupAsHeadingTemplate.bind({});
GroupAsHeadingFill.storyName = "Group as Heading (Fill)";
GroupAsHeadingFill.args = {
  labelSlotted: `<cbp-typography tag="h3" divider="fill" sx='{"margin-block-end":"var(--cbp-space-2x)"}'><cbp-icon name="user" size="1.5rem" sx='{"margin-inline-end":"var(--cbp-space-3x)"}'></cbp-icon>Applicant Information</cbp-typography>`,
};

export const GroupAsHeadingUnderline: any = GroupAsHeadingTemplate.bind({});
GroupAsHeadingUnderline.storyName = "Group as Heading (Underline)";
GroupAsHeadingUnderline.args = {
  labelSlotted: `<cbp-typography tag="h3" divider="underline" sx='{"margin-block-end":"var(--cbp-space-2x)"}'><cbp-icon name="user" size="1.5rem" sx='{"margin-inline-end":"var(--cbp-space-3x)"}'></cbp-icon>Applicant Information</cbp-typography>`,
};