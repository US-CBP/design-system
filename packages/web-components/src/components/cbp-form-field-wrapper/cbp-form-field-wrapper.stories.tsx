export default {
  title: 'Components/Form Field Wrapper',
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
    inputType:{
      control: 'select',
      options: [ "text", "number", "password", "search", "email", "tel", "url", "color", "range", "date", "datetime-local", "month", "week", "time", "file"]
    },
    name: {
      control: 'text',
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
    overlayStart: {
      control: 'text',
    },
    overlayEnd: {
      control: 'text',
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
    inputType: 'text'
  },
};



const InputWithOverlaysTemplate = ({ label, description, inputType, overlayStart, overlayEnd, fieldId, error, readonly, disabled, name, value, context, sx }) => {
  return ` 
    <cbp-form-field
      ${label ? `label="${label}"` : ''}
      ${description ? `description="${description}"` : ''}
      ${fieldId ? `field-id="${fieldId}"` : ''}
      ${error ? `error` : ''}
      ${context && context != 'light-inverts' ? `context=${context}` : ''}
      ${sx ? `sx=${JSON.stringify(sx)}` : ''}
    >
      <cbp-form-field-wrapper>  
        <input 
          type="${inputType}" 
          ${name ? `name="${name}"` : ''} 
          ${value ? `value="${value}"` : ''} 
          ${readonly ? `readonly` : ''}
          ${disabled ? `disabled` : ''}
        />

        ${overlayStart != undefined ? `<span slot="cbp-form-field-overlay-start">${overlayStart}</span>` : ''}
        ${overlayEnd != undefined ? `<span slot="cbp-form-field-overlay-end">${overlayEnd}</span>` : ''}

      </cbp-form-field-wrapper>
    </cbp-form-field>
  `;
};

export const InputWithOverlays = InputWithOverlaysTemplate.bind({});
InputWithOverlays.args = {
  name: 'textinput',
  value: '',
};



const FileInputTemplate = ({ label, description, overlayStart, overlayEnd, fieldId, name, error, readonly, disabled, context, sx }) => {
  return ` 
    <cbp-form-field
      ${label ? `label="${label}"` : ''}
      ${description ? `description="${description}"` : ''}
      ${fieldId ? `field-id="${fieldId}"` : ''}
      ${name ? `name="${name}"` : ''} 
      ${error ? `error` : ''}
      ${context && context != 'light-inverts' ? `context=${context}` : ''}
      ${sx ? `sx=${JSON.stringify(sx)}` : ''}
    >
      <cbp-form-field-wrapper>
        <input type="file" name="fileinput" ${readonly ? `readonly` : ''} ${disabled ? `disabled` : ''} />

        ${overlayStart != undefined ? `<span slot="cbp-form-field-overlay-start">${overlayStart}</span>` : ''}
        ${overlayEnd != undefined ? `<span slot="cbp-form-field-overlay-end">${overlayEnd}</span>` : ''}

        <span slot="cbp-form-field-attached-button">
          <cbp-button
            fill="solid"
            color="secondary"
            aria-describedby="${fieldId}-label"
            onClick="event.target.closest('cbp-form-field').querySelector('input').click()"
          >
            Browse
          </cbp-button>
        </span>
      </cbp-form-field-wrapper>
    </cbp-form-field>
  `;
};

export const FileInput = FileInputTemplate.bind({});
FileInput.storyName="File Input (Simple)"



const NumericCounterTemplate = ({ label, description, inputType, overlayStart, overlayEnd, fieldId, name, value, error, readonly, disabled, context, sx }) => {

  // Ideally, this should be placed on the button component itself, not the document; but the event bubbles, so it works here.
  document.addEventListener('buttonClick', function(e) {
    const buttonComponent = e.target as HTMLCbpButtonElement;
    const button = buttonComponent.querySelector('button') as HTMLButtonElement;
    const input: HTMLInputElement = document.querySelector(`#${fieldId}`) || document.querySelector('input');
    const step:number = Number(input.getAttribute('step')) || 1;

    let value:number = Number(input.value) || 0;
    if(button.getAttribute('name')==="increment") {
      input.value = `${value + step}`;
    }
    if(button.getAttribute('name')==="decrement") {
      input.value = `${value - step}`;
    }
  });
  

  return ` 
    <cbp-form-field
      ${label ? `label="${label}"` : ''}
      ${description ? `description="${description}"` : ''}
      ${fieldId ? `field-id="${fieldId}"` : ''}
      ${error ? `error` : ''}
      ${readonly ? `readonly` : ''}
      ${disabled ? `disabled` : ''}
      ${context && context != 'light-inverts' ? `context=${context}` : ''}
      ${sx ? `sx=${JSON.stringify(sx)}` : ''}
    >
      <cbp-form-field-wrapper>
        <input
          type="${inputType}"
          ${name ? `name="${name}"` : ''}
          ${value ? `value="${value}"` : ''}
        />

        ${overlayStart != undefined ? `<span slot="cbp-form-field-overlay-start">${overlayStart}</span>` : ''}
        ${overlayEnd != undefined ? `<span slot="cbp-form-field-overlay-end">${overlayEnd}</span>` : ''}
        
        <span slot="cbp-form-field-unattached-buttons">
          <cbp-button
            name="decrement"
            type="button"
            fill="outline"
            color="secondary"
            variant="square"
            accessibility-text="Decrement"
            controls="${fieldId}"
            aria-describedby="${fieldId}-label"
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
            controls="${fieldId}"
            aria-describedby="${fieldId}-label"
          >
            <cbp-icon name="plus"></cbp-icon>
          </cbp-button>

        </span>
        
      </cbp-form-field-wrapper>
    </cbp-form-field>
  `;
};

export const NumericCounter = NumericCounterTemplate.bind({});
NumericCounter.args = {
  label: 'Numeric Counter Field',
  description: 'This pattern requires some JavaScript to function, which can be found in the story source code.',
  fieldId: 'numeric-input',
  inputType: 'number',
  name: 'numericinput',
  value: '',
};



const PasswordTemplate = ({ label, description, inputType,  overlayStart, overlayEnd, fieldId, name, value, error, readonly, disabled, context, sx }) => {

  // Ideally, this should be placed on the button component itself, not the document; but the event bubbles, so it works here.
  document.addEventListener('buttonClick', function(e) {
    const buttonComponent = e.target as HTMLCbpButtonElement;
    const button = buttonComponent.querySelector('button') as HTMLButtonElement;
    const buttonIcon = buttonComponent.querySelector('cbp-icon');
    const input = document.querySelector(`#${fieldId}`) || document.querySelector('input');
    const type = input.getAttribute('type');

    if(button.getAttribute('name')==="togglepw") {
      // Toggle the input type
      (input.getAttribute('type') !== 'password')
        ? input.setAttribute('type','password')
        : input.setAttribute('type', type !== 'password' ? type : 'text');
      // Toggle the button icon
      input.getAttribute('type') !== 'password'
        ? buttonIcon.name = 'eye-slash'
        : buttonIcon.name = 'eye';
    }
  });

  return ` 
    <cbp-form-field
      ${label ? `label="${label}"` : ''}
      ${description ? `description="${description}"` : ''}
      ${fieldId ? `field-id="${fieldId}"` : ''}
      ${error ? `error` : ''}
      ${readonly ? `readonly` : ''}
      ${disabled ? `disabled` : ''}
      ${context && context != 'light-inverts' ? `context=${context}` : ''}
      ${sx ? `sx=${JSON.stringify(sx)}` : ''}
    >
      <cbp-form-field-wrapper>
        <input
          type="${inputType}"
          ${name ? `name="${name}"` : ''}
          ${value ? `value="${value}"` : ''}
        />

        ${overlayStart != undefined ? `<span slot="cbp-form-field-overlay-start">${overlayStart}</span>` : ''}
        ${overlayEnd != undefined ? `<span slot="cbp-form-field-overlay-end">${overlayEnd}</span>` : ''}
        
        <span slot="cbp-form-field-attached-button">
          <cbp-button
            name="togglepw"
            type="button"
            fill="solid"
            color="secondary"
            variant="square"
            accessibility-text="Toggle visibility"
            controls="${fieldId}"
            aria-describedby="${fieldId}-label"
          >
            <cbp-icon name="eye"></cbp-icon>
          </cbp-button>
        </span>
        
      </cbp-form-field-wrapper>
    </cbp-form-field>
  `;
};

export const Password = PasswordTemplate.bind({});
Password.args = {
  label: 'Password',
  description: 'This pattern requires some JavaScript to function, which can be found in the story source code.',
  fieldId: 'pw',
  inputType: 'password',
  name: 'password',
  value: '',
};



const SearchTemplate = ({ label, description, inputType,  overlayStart, overlayEnd, fieldId, name, value, error, readonly, disabled, context, sx }) => {
  return ` 
    <cbp-form-field
      ${label ? `label="${label}"` : ''}
      ${description ? `description="${description}"` : ''}
      ${fieldId ? `field-id="${fieldId}"` : ''}
      ${error ? `error` : ''}
      ${readonly ? `readonly` : ''}
      ${disabled ? `disabled` : ''}
      ${context && context != 'light-inverts' ? `context=${context}` : ''}
      ${sx ? `sx=${JSON.stringify(sx)}` : ''}
    >
      <cbp-form-field-wrapper>  
        <input
          type="${inputType}"
          ${name ? `name="${name}"` : ''}
          ${value ? `value="${value}"` : ''}
        />

        ${overlayStart != undefined ? `<span slot="cbp-form-field-overlay-start">${overlayStart}</span>` : ''}
        ${overlayEnd != undefined ? `<span slot="cbp-form-field-overlay-end">${overlayEnd}</span>` : ''}
        
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
  `;
};

export const Search = SearchTemplate.bind({});
Search.args = {
  label: 'Search',
  description: '',
  fieldId: 'search',
  inputType: 'search',
  name: 'search',
  value: '',
};


const TimeInputTemplate = ({ label, description, fieldId, name, value, error, readonly, disabled, context, sx }) => {
  return ` 
    <cbp-form-field
      ${label ? `label="${label}"` : ''}
      ${description ? `description="${description}"` : ''}
      ${fieldId ? `field-id="${fieldId}"` : ''}
      ${error ? `error` : ''}
      ${context && context != 'light-inverts' ? `context=${context}` : ''}
      ${sx ? `sx=${JSON.stringify(sx)}` : ''}
    >
      <cbp-form-field-wrapper>  
        <input 
          placeholder="HH:MM"
          maxlength="5"
          ${name ? `name="${name}"` : ''}
          ${value ? `value="${value}"` : ''}
          ${readonly ? `readonly` : ''}
          ${disabled ? `disabled` : ''} 
        />
        <cbp-icon 
          slot="cbp-form-field-overlay-start" 
          name="clock"
        ></cbp-icon>

        <span slot="cbp-form-field-attached-button">
          <cbp-segmented-button-group
            name="time-ampm"
          >
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
  `;
};

export const TimeInput = TimeInputTemplate.bind({});
TimeInput.args = {
  label: 'Field Title',
  description: '(HH:MM Format) UTC-6 America/New York',
  name: 'time',
  value: '',
};
