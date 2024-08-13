export default {
  title: 'Components/Form Field Wrapper',
  tags: ['autodocs'],
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
      options: [ "text", "number", "password", "search"] // additional types: email, tel, url, color, range, date, datetime-local, month, week, time
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



const InputWithOverlaysTemplate = ({ label, description, inputType, overlayStart, overlayEnd, fieldId, error, readonly, disabled, value, context, sx }) => {
  return ` 
    <cbp-form-field
      ${label ? `label="${label}"` : ''}
      ${description ? `description="${description}"` : ''}
      ${fieldId ? `field-id="${fieldId}"` : ''}
      ${error ? `error` : ''}
      ${context && context != 'light-inverts' ? `context=${context}` : ''}
      ${sx ? `sx=${JSON.stringify(sx)}` : ''}
    >
      <cbp-form-field-wrapper
        ${sx ? `sx=${JSON.stringify(sx)}` : ''}
      >  
        <input type="${inputType}" name="textinput" ${value ? `value="${value}"` : ''}  ${readonly ? `readonly` : ''} ${disabled ? `disabled` : ''} />

        ${overlayStart != undefined ? `<span slot="cbp-form-field-overlay-start">${overlayStart}</span>` : ''}
        ${overlayEnd != undefined ? `<span slot="cbp-form-field-overlay-end">${overlayEnd}</span>` : ''}

      </cbp-form-field-wrapper>
    </cbp-form-field>
  `;
};

export const InputWithOverlays = InputWithOverlaysTemplate.bind({});
InputWithOverlays.args = {
  value: '',
};



const NumericCounterTemplate = ({ label, description, inputType,  overlayStart, overlayEnd, fieldId, error, readonly, disabled, value, context, sx }) => {

  // Ideally, this should be placed on the button component itself, not the document; but the event bubbles, so it works here.
  document.addEventListener('buttonClick', function(e) {
    const buttonComponent = e.target as HTMLCbpButtonElement;
    const button = buttonComponent.querySelector('button') as HTMLButtonElement;
    const input: HTMLInputElement = document.querySelector(`#${fieldId}`) || document.querySelector('input');
    const step:number = Number(input.getAttribute('step')) || 1;

    //console.log({e});

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
      <cbp-form-field-wrapper
        ${sx ? `sx=${JSON.stringify(sx)}` : ''}
      >
        <input
          type="${inputType}"
          name="search"
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
            accessibility-text="Toggle visibility"
            aria-controls="${fieldId}"
          >
            <cbp-icon name="minus" size="1rem"></cbp-icon>
          </cbp-button>

          <cbp-button
            name="increment"
            type="button"
            fill="outline"
            color="secondary"
            variant="square"
            accessibility-text="Toggle visibility"
            aria-controls="${fieldId}"
          >
            <cbp-icon name="plus" size="1rem"></cbp-icon>
          </cbp-button>

        </span>
        
      </cbp-form-field-wrapper>
    </cbp-form-field>
  `;
};

export const NumericCounter = NumericCounterTemplate.bind({});
NumericCounter.args = {
  label: 'Numeric Counter Field',
  description: '',
  fieldId: 'numeric-input',
  inputType: 'number',
  value: '',
};



const PasswordTemplate = ({ label, description, inputType,  overlayStart, overlayEnd, fieldId, error, readonly, disabled, value, context, sx }) => {

  // Ideally, this should be placed on the button component itself, not the document; but the event bubbles, so it works here.
  document.addEventListener('buttonClick', function(e) {
    const buttonComponent = e.target as HTMLCbpButtonElement;
    const button = buttonComponent.querySelector('button') as HTMLButtonElement;
    const buttonIcon = buttonComponent.querySelector('cbp-icon');
    const input = document.querySelector(`#${fieldId}`) || document.querySelector('input');
    const type = input.getAttribute('type');

    //console.log({e});

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
      <cbp-form-field-wrapper
        ${sx ? `sx=${JSON.stringify(sx)}` : ''}
      >
        <input
          type="${inputType}"
          name="search"
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
            aria-controls="${fieldId}"
          >
            <cbp-icon name="eye" size="1rem"></cbp-icon>
          </cbp-button>
        </span>
        
      </cbp-form-field-wrapper>
    </cbp-form-field>
  `;
};

export const Password = PasswordTemplate.bind({});
Password.args = {
  label: 'Password',
  description: '',
  fieldId: 'pw',
  inputType: 'password',
  value: '',
};



const SearchTemplate = ({ label, description, inputType,  overlayStart, overlayEnd, fieldId, error, readonly, disabled, value, context, sx }) => {
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
      <cbp-form-field-wrapper
        ${sx ? `sx=${JSON.stringify(sx)}` : ''}
      >  
        <input
          type="${inputType}"
          name="search"
          ${value ? `value="${value}"` : ''}
          ${readonly ? `readonly` : ''}
          ${disabled ? `disabled` : ''}
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
            <cbp-icon name="magnifying-glass" size="1rem"></cbp-icon>
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
  value: '',
};
