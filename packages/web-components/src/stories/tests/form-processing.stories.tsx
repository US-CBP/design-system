export default {
  title: "Test/Form Processing",
  argTypes: {
    name: {
      control: 'text',
    },
    action: {
      control: 'text',
    },
    method: {
      control: 'select',
      options: [ "get", "post"]
    },
    enctype: {
      control: 'select',
      options: [ "application/x-www-form-urlencoded", "multipart/form-data", "text/plain"]
    },
    prefix: {
      control: 'text',
    },
    firstName: {
      control: 'text',
    },
    middleInitial: {
      control: 'text',
    },
    lastName: {
      control: 'text',
    },
    suffix: {
      control: 'text',
    },
    countries: {
      control: 'text',
    },
    radio: {
      control: 'text',
    },
    toggle1: {
      control: 'boolean',
    },
    toggle2: {
      control: 'boolean',
    },
    size: {
      control: 'text',
    },
    slider: {
      control: 'number',
    },
    rangeStart: {
      control: 'number',
    },
    rangeEnd: {
      control: 'number',
    },
  },
  args: {
    name: 'test',
    action: '/?path=/story/test-form-processing--form-processing',
    method: 'post',
    enctype: 'multipart/form-data',
    toggle1: true,
    toggle2: true
  },
};




const Prefix='[{"label":"Attorney","value":"Attorney"},{"label":"Coach","value":"Coach"},{"label":"Dr.","value":"Dr."},{"label":"Father","value":"Father"},{"label":"Governor","value":"Governor"},{"label":"Honorable","value":"Honorable"},{"label":"Officer","value":"Officer"},{"label":"Master","value":"Master"},{"label":"Miss","value":"Miss"},{"label":"Mr.","value":"Mr."},{"label":"Mrs","value":"Mrs."},{"label":"Ms.","value":"Ms"},{"label":"President","value":"President"},{"label":"Professor","value":"Professor"},{"label":"Reverend","value":"Reverend"}]';
const Suffix='[{"label":"I","value":"First"},{"label":"II","value":"Second"},{"label":"III","value":"Third"},{"label":"IV","value":"Fourth"},{"label":"IX","value":"Ninth"},{"label":"JR","value":"Junior"},{"label":"SR","value":"Senior"},{"label":"V","value":"Fifth"},{"label":"VI","value":"Sixth"},{"label":"VII","value":"Seventh"},{"label":"VIII","value":"Eighth"},{"label":"X","value":"Tenth"},{"label":"XI","value":"Eleventh"},{"label":"XII","value":"Twelfth"},{"label":"XIII","value":"Thirteenth"},{"label":"XIV","value":"Fourteenth"},{"label":"XV","value":"Fifteenth"},{"label":"XVI","value":"Sixteenth"},{"label":"XVII","value":"Seventeenth"}]';
// Countries: have no value - only label
const Countries='[{"label":"Afghanistan"},{"label":"Albania"},{"label":"Algeria"},{"label":"Andaman Islands"},{"label":"Andorra"},{"label":"Angola"},{"label":"Anguilla"},{"label":"Annobon Island"},{"label":"Antigua"},{"label":"Antigua and Barbuda"},{"label":"Argentina"},{"label":"Armenia"},{"label":"Aruba"},{"label":"Ascension Island"},{"label":"Australia"},{"label":"Austria"},{"label":"Azerbaijan"},{"label":"Azores"},{"label":"Bahamas"},{"label":"Bahrain"},{"label":"Balearic Islands"},{"label":"Bangladesh"},{"label":"Barbados"},{"label":"Barbuda"},{"label":"Basse Terre"},{"label":"Belarus"},{"label":"Belau"},{"label":"Belgium"},{"label":"Belize"},{"label":"Benin"},{"label":"Bermuda"},{"label":"Bhutan"},{"label":"Bolivia"},{"label":"Bonaire"},{"label":"Bosnia and Herzegovina"},{"label":"Bosnia-Herzegovina"},{"label":"Botswana"},{"label":"Brazil"},{"label":"British Virgin Islands"},{"label":"Brunei"},{"label":"Bulgaria"},{"label":"Burkina Faso"},{"label":"Burma"},{"label":"Burundi"},{"label":"Byelarus"},{"label":"Cabinda"},{"label":"Caicos Islands"},{"label":"Cambodia"},{"label":"Cameroon"},{"label":"Canada"},{"label":"Canary Islands"},{"label":"Canton Islands"},{"label":"Cape Verde"},{"label":"Carriacou"},{"label":"Castelrosse Islands"},{"label":"Cayman Islands"},{"label":"Central African Rep"},{"label":"Chad"},{"label":"Channel Islands"},{"label":"Chile"},{"label":"China"},{"label":"Christmas Island"},{"label":"Cocos Islands"},{"label":"Colombia"},{"label":"Comoros"},{"label":"Congo"},{"label":"Cook Islands"},{"label":"Corsica"},{"label":"Costa Rica"},{"label":"Crete"},{"label":"Croatia"},{"label":"Cuba"},{"label":"Curacao"},{"label":"Cyprus"},{"label":"Czech Republic"},{"label":"Dem Rep of Congo"},{"label":"Denmark"},{"label":"Diego Garcia"},{"label":"Djibouti"},{"label":"Dodecanese Islands"},{"label":"Dominica"},{"label":"Dominican Republic"},{"label":"East Timor"},{"label":"Easter Island"},{"label":"Ecuador"},{"label":"Egypt"},{"label":"Eire"},{"label":"El Salvador"},{"label":"England"},{"label":"Equatorial Guinea"},{"label":"Eritrea"},{"label":"Estonia"},{"label":"Ethiopia"},{"label":"Falkland Islands"},{"label":"Faroe Islands"},{"label":"Fernando de Noronha"},{"label":"Fiji"},{"label":"Finland"},{"label":"France"},{"label":"French Guiana"},{"label":"French Polynesia"},{"label":"French West Indies"},{"label":"Gabon"},{"label":"Gambia"},{"label":"Georgia"},{"label":"Germany"},{"label":"Ghana"},{"label":"Gibraltar"},{"label":"Grand Cayman Island"},{"label":"Grand Terre"},{"label":"Grand Turk"},{"label":"Great Britain"},{"label":"Greece"},{"label":"Greenland"},{"label":"Grenada"},{"label":"Grenadine Islands"},{"label":"Guadeloupe"},{"label":"Guatemala"},{"label":"Guinea"},{"label":"Guinea-Bissau"},{"label":"Guyana"},{"label":"Haiti"},{"label":"Honduras"},{"label":"Hong Kong"},{"label":"Hungary"},{"label":"Iceland"},{"label":"India"},{"label":"Indonesia"},{"label":"Iran"},{"label":"Iraq"},{"label":"Ireland"},{"label":"Ireland, Republic of"},{"label":"Isle of Man"},{"label":"Israel"},{"label":"Italy"},{"label":"Jamaica"},{"label":"Jan Mayen Island"},{"label":"Japan"},{"label":"Jerusalem"},{"label":"Jordan"},{"label":"Kampuchea"},{"label":"Kazakhstan"},{"label":"Kenya"},{"label":"Kiribati"},{"label":"Kuwait"},{"label":"Kyrgyzstan"},{"label":"Laos"},{"label":"Latvia"},{"label":"Lebanon"},{"label":"Lesotho"},{"label":"Liberia"},{"label":"Libya"},{"label":"Liechtenstein"},{"label":"Lithuania"},{"label":"Little Cayman Island"},{"label":"Luxembourg"},{"label":"Macao"},{"label":"Macedonia"},{"label":"Madagascar"},{"label":"Madeira Islands"},{"label":"Malawi"},{"label":"Malaysia"},{"label":"Maldives"},{"label":"Mali"},{"label":"Malta"},{"label":"Marshall Islands"},{"label":"Martinique"},{"label":"Mauritania"},{"label":"Mauritius"},{"label":"Mexico"},{"label":"Micronesia"},{"label":"Midway Island"},{"label":"Miquelon Island"},{"label":"Moldova"},{"label":"Monaco"},{"label":"Mongolia"},{"label":"Montenegro"},{"label":"Montserrat"},{"label":"Morocco"},{"label":"Mozambique"},{"label":"Myanmar"},{"label":"Namibia"},{"label":"Nauru"},{"label":"Nepal"},{"label":"Netherlands"},{"label":"Netherlands Antilles"},{"label":"Nevis"},{"label":"New Caldonia"},{"label":"New Caledonia"},{"label":"New Guinea"},{"label":"New Hebrides"},{"label":"New Zealand"},{"label":"Nicaragua"},{"label":"Nicobar Islands"},{"label":"Niger"},{"label":"Nigeria"},{"label":"North Korea"},{"label":"Northern Ireland"},{"label":"Norway"},{"label":"Okinawa"},{"label":"Oman"},{"label":"Pagalu"},{"label":"Pakistan"},{"label":"Palau"},{"label":"Panama"},{"label":"Papua New Guinea"},{"label":"Paraguay"},{"label":"Peru"},{"label":"Petit Martinique"},{"label":"Philippines"},{"label":"Pitcairn Island"},{"label":"Poland"},{"label":"Portugal"},{"label":"Qatar"},{"label":"Republic of Congo"},{"label":"Republic of Georgia"},{"label":"Republic of Macedonia"},{"label":"Reunion"},{"label":"Romania"},{"label":"Russia"},{"label":"Rwanda"},{"label":"Ryukyu Islands"},{"label":"Saba"},{"label":"Samoa"},{"label":"San Marino"},{"label":"Sao Tome and Principe"},{"label":"Sardinia"},{"label":"Saudi Arabia"},{"label":"Scotland"},{"label":"Senegal"},{"label":"Serbia"},{"label":"Serbia and Montenegro"},{"label":"Seychelles"},{"label":"Sicily"},{"label":"Sierra Leone"},{"label":"Singapore"},{"label":"Slovak Republic"},{"label":"Slovakia"},{"label":"Slovenia"},{"label":"Solomon Islands"},{"label":"Somalia"},{"label":"Somaliland"},{"label":"Sombrero"},{"label":"South Africa"},{"label":"South Korea"},{"label":"Southwest Africa"},{"label":"Spain"},{"label":"Spanish Sahara"},{"label":"Sri Lanka"},{"label":"St Christopher"},{"label":"St Eustatius"},{"label":"St Helena"},{"label":"St Kitts"},{"label":"St Lucia"},{"label":"St Maarten"},{"label":"St Martin"},{"label":"St Pierre"},{"label":"St Vincent"},{"label":"Sudan"},{"label":"Sumatra"},{"label":"Suriname"},{"label":"Swaziland"},{"label":"Sweden"},{"label":"Switzerland"},{"label":"Syria"},{"label":"Tahiti"},{"label":"Taiwan"},{"label":"Tajikistan"},{"label":"Tanzania"},{"label":"Thailand"},{"label":"Timor"},{"label":"Togo"},{"label":"Tonga"},{"label":"Tortola"},{"label":"Trinidad and Tobago"},{"label":"Tristan da Cunha"},{"label":"Tunisia"},{"label":"Turkey"},{"label":"Turkmenistan"},{"label":"Turks and Caicos Is"},{"label":"Turks Islands"},{"label":"Tuvalu"},{"label":"Uganda"},{"label":"Ukraine"},{"label":"United Arab Emirates"},{"label":"United Kingdom"},{"label":"United States of America"},{"label":"Upper Volta"},{"label":"Uruguay"},{"label":"Uzbekistan"},{"label":"Vanuatu"},{"label":"Vatican City"},{"label":"Venezuela"},{"label":"Vietnam"},{"label":"Wake Island"},{"label":"Wales"},{"label":"Wallis and Futuna Is"},{"label":"Walvis Bay"},{"label":"Western Sahara"},{"label":"Western Samoa"},{"label":"Yemen"},{"label":"Yemen, Republic of"},{"label":"Zaire"},{"label":"Zambia"},{"label":"Zimbabwe"},{"label":"Cote D&apos;Ivoire"},{"label":"Rep of South Sudan"},{"label":"Kosovo"},{"label":"Alderney"},{"label":"Ascension"},{"label":"Brunei Darussalam"},{"label":"Guernsey"},{"label":"Ivory Coast"},{"label":"Jersey"},{"label":"Kowloon"},{"label":"Niue"},{"label":"Redonda"},{"label":"Santa Cruz Islands"},{"label":"Sark"},{"label":"St Bartholomew"},{"label":"St Christopher - Nevis"},{"label":"St Pierre and Miquelon"},{"label":"St Vincent - Grenadine"},{"label":"Syrian Arab Republic"},{"label":"Timor-Leste"},{"label":"Eswatini"}]';


function HTMLForm( {name, action, method, enctype, prefix, firstName, middleInitial, lastName, suffix, countries, radio, toggle1, toggle2, size, slider, rangeStart, rangeEnd} ) {
   return ` 
    <p>Remember, a form reset does not just clear the form. It resets it to its initial state, including default values. Use the story controls to set default field values for testing.</p>

    <form 
      name="${name}"
      action="${action}"
      method="${method}"
      ${enctype ? `enctype="${enctype}"` : ''}
      target="_top"
    >
      
      <!-- Name: Compound pattern -->
      <cbp-form-field group
        label="User's Full Name"
        description="Required."
      >
        <cbp-flex 
          wrap="wrap"
          gap="var(--cbp-space-4x)"
          breakpoint="20rem"
        >

          <cbp-flex-item
            flex-basis="10rem"
            flex-shrink="0"
          >
            <cbp-form-field
              label="Prefix"
            >
              <cbp-dropdown 
                name="prefix" 
                items='${Prefix}' 
                ${prefix ? `value="${prefix}"` : ''}
              ></cbp-dropdown>
            </cbp-form-field>
          </cbp-flex-item>

          <cbp-flex-item
            flex-basis="10rem"
            flex-grow="1"
          >
            <cbp-form-field
              label="First Name"
              name="firstname"
            >
              <input name="firstname" type="text" ${firstName ? `value="${firstName}"` : ''} />
            </cbp-form-field>
          </cbp-flex-item>

          <cbp-form-field
            label="M.I."
            sx='{"width":"5ch"}'
          >
            <input name="middleinitial" type="text" maxlength="1" ${middleInitial ? `value="${middleInitial}"` : ''} />
          </cbp-form-field>

          <cbp-flex-item
            flex-basis="10rem"
            flex-grow="1"
          >
            <cbp-form-field
              label="Last Name"
            >
              <input name="lastname" type="text" ${lastName ? `value="${lastName}"` : ''}/>
            </cbp-form-field>
          </cbp-flex-item>

          <cbp-flex-item
            flex-basis="10rem"
            flex-shrink="0"
          >
            <cbp-form-field
              label="Suffix"
            >
              <cbp-dropdown 
                name="suffix" 
                items='${Suffix}'
                ${suffix ? `value="${suffix}"` : ''}
              ></cbp-dropdown>
            </cbp-form-field>
          </cbp-flex-item>

        </cbp-flex>
      </cbp-form-field>

      <!-- Countries multi-select combobox with Create option -->
      <!-- -->
      <cbp-form-field label="Countries" description="A multi-select combobox of Countries with a Create option.">
        <cbp-dropdown filter multiple create
          name="countries" 
          items='${Countries}'
          ${countries ? `value="${countries}"` : ''}
        ></cbp-dropdown>
      </cbp-form-field>
      <!-- -->

      <!-- Checklist -->
      <cbp-form-field group
        label="Checklist"
        description="Checklist item 3 is 'checked' on the component while item 4 is 'checked' on the input."
      >
        <cbp-flex gap="var(--cbp-space-1x) var(--cbp-space-5x)" breakpoint="30rem" sx='{"width":"max-content"}'>
          <cbp-checkbox>
            <input type="checkbox" name="checklist" value="1"/>
            Checkbox 1
          </cbp-checkbox>
          <cbp-checkbox>
            <input type="checkbox" name="checklist" value="2" />
            Checkbox 2
          </cbp-checkbox>
          <cbp-checkbox checked>
            <input type="checkbox" name="checklist" value="3" />
            Checkbox 3
          </cbp-checkbox>
          <cbp-checkbox>
            <input type="checkbox" name="checklist" value="4" checked />
            Checkbox 4
          </cbp-checkbox>
        </cbp-flex>
      </cbp-form-field>


      <!-- Radio List (horizontal) -->
      <cbp-form-field group label="Radio List Group Label" description="Field description.">
        <cbp-flex gap="var(--cbp-space-1x) var(--cbp-space-5x)" breakpoint="28rem" sx='{"width":"max-content"}'>
          <cbp-radio ${radio == 1 ? `checked` : ''}>
            <input type="radio" name="radio" value="1">
            Radio 1
          </cbp-radio>
          <cbp-radio ${radio == 2 ? `checked` : ''}>
            <input type="radio" name="radio" value="2">
            Radio 2
          </cbp-radio>
          <cbp-radio ${radio == 3 ? `checked` : ''}>
            <input type="radio" name="radio" value="3">
            Radio 3
          </cbp-radio>
          <cbp-radio ${radio == 4 ? `checked` : ''}>
            <input type="radio" name="radio" value="4">
            Radio 4
          </cbp-radio>
        </cbp-flex>
      </cbp-form-field>

      <!-- Toggle -->
      <cbp-form-field group
        label="Toggles" 
        description="The first applies 'checked' via the input, the second is 'checked' via component prop."
      >
        <cbp-toggle width="10rem">
            Toggle #1 
            <input type="checkbox" name="toggle1" value="1" ${toggle1 == true ? `checked` : ''}>
        </cbp-toggle>
        <cbp-toggle width="10rem" ${toggle2 == true ? `checked` : ''}>
            Toggle #2 
            <input type="checkbox" name="toggle2" value="2">
        </cbp-toggle>
      </cbp-form-field>

      <!-- Segmented button group passing value -->
      <cbp-segmented-button-group 
        name="size"
        ${size ? `value="${size}"` : ''}
        sx='{"margin-block-end":"var(--cbp-space-4x)"}'
      >
        <cbp-button value="sm">
          Small
        </cbp-button>
        <cbp-button value="md">
          Medium
        </cbp-button>
        <cbp-button value="lg">
          Large
        </cbp-button>
      </cbp-segmented-button-group>

      <!-- Single slider -->
      <cbp-form-field label="Field Label" description="Field description.">
        <cbp-slider data-hide-input
          ${slider ? `value="${slider}"` : ''}
        >
          <input type="range" name="slider">
        </cbp-slider>
      </cbp-form-field>

      <!-- Range Slider -->
      <cbp-form-field label="Field Label" description="Field description.">
        <cbp-slider value="${`${rangeStart},${rangeEnd}`}">
          <input type="range" name="range-start">
          <input type="range" name="range-end">
        </cbp-slider>
      </cbp-form-field>

      <!-- File Inputs -->
      <label>
        Native File Input<br />
        <input type="file" name="nativefileinput" />
      </label><br /><br />

      <cbp-form-field
        label="Single File"
        description="Field description."
      >
        <cbp-file-input name="singlefile">
          <input type="file" />
        </cbp-file-input>
      </cbp-form-field>

      <cbp-form-field 
        label="Multiple Files"
        description="Field description."
      >
        <cbp-file-input 
          name="multifile" 
          multiple
          enhanced
        >
          <input type="file" />
        </cbp-file-input>
      </cbp-form-field>


      <cbp-button type="submit">Submit</cbp-button>
      <cbp-button type="reset" color="secondary" fill="outline">Reset</cbp-button>

    </form>
  `;
};


// Combobox using Countries data as an asynchronous call: 
const FormProcessingTemplate = ( args ) => {

  // Set up event handlers for logging and setting errors on files via the `status` prop.
  setTimeout(() => {
    const formEl = document.querySelector(`form[name="${name}"]`) as HTMLFormElement;
    const submitButton = document.querySelector('button[type=submit]') as HTMLButtonElement;
    
    //console.log('Event Listeners set: ', formEl, submitButton);

    submitButton?.addEventListener('click', e => {
      console.log('Submit button pressed', submitButton, e);
    });

    formEl?.addEventListener('submit', e => {
      console.log('Native Form submit', formEl, e);
      e.preventDefault();
      
      let formData = new FormData(formEl);
      // Data can be added to the formData for submission:
      //formData.append("CustomField", "This is some extra data");

      /*
       * Because formData is an iterable, logging it does not show its name/value pairs.
       * There are a number of ways to get at this, however, all of which require
       * adding "dom.iterable", to compilerOptions > lib in tsconfig.json to avoid the 
       * following TypeScript/compile error:
       * 
       * Type 'FormData' must have a '[Symbol.iterator]()' method that returns an iterator.
       */
      
      // List key/value pairs
      for(let [name, value] of formData) {
        console.log(`${name} =`, value);
      }
      // Spreading the formData as an array seems to give the same results as above.
      console.log('formData (array spread): ',[...formData]);
      // This method makes the assumption that object keys are unique and only shows 1 value when they are not.
      console.log('formData as JS Object: ', Object.fromEntries(formData.entries()));

      /*
      formData.append("CustomField", "This is some extra data");
      // formData can be manually submitted 
      const response = await fetch("stash.php", {
        method: "POST",
        body: formData,
      });
      */

    });
  }, 1000);

 return `
    <h1>Native Form Tag</h1>
    <p>Some component-enhanced functionality may not work with the native platform without using the cbp-form component. This page demonstrates component interactions with a native HTML form.</p>
    ${HTMLForm(args)}
  `;
};

export const FormProcessing = FormProcessingTemplate.bind({});





const FormComponentProcessingTemplate = (args) => {

  // Set up event handlers for logging and setting errors on files via the `status` prop.
  setTimeout(() => {
    const formEl = document.querySelector(`form[name="${name}"]`) as HTMLFormElement;
    const submitButton = document.querySelector('button[type=submit]') as HTMLButtonElement;
    
    //console.log('Event Listeners set: ', formEl, submitButton);

    submitButton?.addEventListener('click', e => {
      console.log('Submit button pressed', submitButton, e);
    });

    formEl?.addEventListener('submit', e => {
      console.log('Native Form submit', formEl, e);
      e.preventDefault();
      
      let formData = new FormData(formEl);
      // Data can be added to the formData for submission:
      //formData.append("CustomField", "This is some extra data");

      /*
       * Because formData is an iterable, logging it does not show its name/value pairs.
       * There are a number of ways to get at this, however, all of which require
       * adding "dom.iterable", to compilerOptions > lib in tsconfig.json to avoid the 
       * following TypeScript/compile error:
       * 
       * Type 'FormData' must have a '[Symbol.iterator]()' method that returns an iterator.
       */
      
      // List key/value pairs
      for(let [name, value] of formData) {
        console.log(`${name} =`, value);
      }
      // Spreading the formData as an array seems to give the same results as above.
      console.log('formData (array spread): ',[...formData]);
      // This method makes the assumption that object keys are unique and only shows 1 value when they are not.
      //console.log('formData as JS Object: ', Object.fromEntries(formData.entries()));

      /*
      formData.append("CustomField", "This is some extra data");
      // formData can be manually submitted 
      const response = await fetch("stash.php", {
        method: "POST",
        body: formData,
      });
      */

    });
  }, 1000);

 return `
    <h1>Form Component</h1>
    <p>
      Some component-enhanced functionality may not work with the native platform without using the cbp-form component. 
      This page demonstrates component interactions using a cbp-form wrapping a native HTML form and handling the form events such as submit and reset.
    </p>
    <cbp-form>
      ${HTMLForm(args)}
    </cbp-form>
  `;
};

export const FormComponentProcessing = FormComponentProcessingTemplate.bind({});