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
  },
  args: {
    name: 'test',
    action: '/?path=/story/test-form-processing--form-processing',
    method: 'post',
    enctype: 'multipart/form-data'
  },
};




const Prefix='[{"label":"Attorney","value":"Attorney"},{"label":"Coach","value":"Coach"},{"label":"Dr.","value":"Dr."},{"label":"Father","value":"Father"},{"label":"Governor","value":"Governor"},{"label":"Honorable","value":"Honorable"},{"label":"Officer","value":"Officer"},{"label":"Master","value":"Master"},{"label":"Miss","value":"Miss"},{"label":"Mr.","value":"Mr."},{"label":"Mrs","value":"Mrs."},{"label":"Ms.","value":"Ms"},{"label":"President","value":"President"},{"label":"Professor","value":"Professor"},{"label":"Reverend","value":"Reverend"}]';
const Suffix='[{"label":"I","value":"First"},{"label":"II","value":"Second"},{"label":"III","value":"Third"},{"label":"IV","value":"Fourth"},{"label":"IX","value":"Ninth"},{"label":"JR","value":"Junior"},{"label":"SR","value":"Senior"},{"label":"V","value":"Fifth"},{"label":"VI","value":"Sixth"},{"label":"VII","value":"Seventh"},{"label":"VIII","value":"Eighth"},{"label":"X","value":"Tenth"},{"label":"XI","value":"Eleventh"},{"label":"XII","value":"Twelfth"},{"label":"XIII","value":"Thirteenth"},{"label":"XIV","value":"Fourteenth"},{"label":"XV","value":"Fifteenth"},{"label":"XVI","value":"Sixteenth"},{"label":"XVII","value":"Seventeenth"}]';


// Combobox using Countries data as an asynchronous call: 
const FormProcessingTemplate = ({ name, action, method, enctype }) => {

  // Set up event handlers for logging and setting errors on files via the `status` prop.
  setTimeout(() => {
    const formEl = document.querySelector(`form[name="${name}"]`) as HTMLFormElement;
    const submitButton = document.querySelector('button[type=submit]') as HTMLButtonElement;
    
    //console.log('Event Listeners set: ', formEl, submitButton);

    submitButton.addEventListener('click', e => {
      console.log('submit pressed',submitButton,e);
    });

    formEl.addEventListener('submit', e => {
      console.log('form submit', formEl, e);
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
  }, 500);

  return ` 
    <form 
      name="${name}"
      action="${action}"
      method="${method}"
      ${enctype ? `enctype="${enctype}"` : ''}
      target="_top"
    >
      
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
              <cbp-dropdown name="prefix" items='${Prefix}'></cbp-dropdown>
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


      <cbp-form-field
        label="Numeric Counter Field"
        field-id="numeric-input"
      >
        <cbp-form-field-wrapper>
          <input
            type="number"
            name="number"
          />

          <span slot="cbp-form-field-unattached-buttons">
            <cbp-button
              name="decrement"
              type="button"
              fill="outline"
              color="secondary"
              variant="square"
              accessibility-text="Decrement"
              controls="numeric-input"
              aria-describedby="numeric-input-label"
            >
              <cbp-icon name="minus"></cbp-icon>
            </cbp-button>

            <cbp-button
              name="increment"
              type="button"
              fill="outline"
              color="secondary"
              variant="square"
              accessibility-text="Increment"
              controls="numeric-input"
              aria-describedby="numeric-input-label"
            >
              <cbp-icon name="plus"></cbp-icon>
            </cbp-button>
          </span>
        </cbp-form-field-wrapper>
      </cbp-form-field>

      <cbp-form-field group
        label="Checklist Group Label"
        description="Field description."
      >
        <cbp-checkbox>
          <input
            type="checkbox"
            name="checklist"
            value="1"
          />
          Checkbox 1
        </cbp-checkbox>
        <cbp-checkbox>
          <input
            type="checkbox"
            name="checklist"
            value="2"
          />
          Checkbox 2
        </cbp-checkbox>
        <cbp-checkbox>
          <input
            type="checkbox"
            name="checklist"
            value="3"
          />
          Checkbox 3
        </cbp-checkbox>
        <cbp-checkbox>
          <input
            type="checkbox"
            name="checklist"
            value="4"
          />
          Checkbox 4
        </cbp-checkbox>
      </cbp-form-field>


      <cbp-form-field
        label="Field Label"
        description="Field description."
      >
        <cbp-slider>
          <input
            type="range"
            name="range"
          />
        </cbp-slider>
      </cbp-form-field>

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
        <cbp-file-input name="multifile" multiple>
          <input type="file" />
        </cbp-file-input>
      </cbp-form-field>


      <cbp-button type="submit">Submit</cbp-button>
      <cbp-button type="reset" color="secondary" fill="outline">Reset</cbp-button>

    </form>
  `;
};

export const FormProcessing = FormProcessingTemplate.bind({});

