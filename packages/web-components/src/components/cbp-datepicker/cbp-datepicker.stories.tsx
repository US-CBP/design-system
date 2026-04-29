export default {
  title: 'Forms/Date Picker',
  tags: ['new'],
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
    fieldId: 'insert-unique-id',
    name: 'insert-datepicker',
    //value: '2017-06-01'
  },
};


const Template: any = ({ label, description, fieldId, name, value, error, disabled, readonly, context, sx }) => {
  
  // Set up event handlers for logging and setting errors on files via the `status` prop.
  /*
  setTimeout(() => {
    const fileInput = document.querySelector('cbp-file-input');
    fileInput.addEventListener( 'valueChange', e => {
      //console.log('cbp-file-input',e)
      // Set errors on each file for testing purposes
      if (showFileErrors == true) {
        let status=e.detail.value;
        status.forEach( item => {
          item.status="error";
          item.message="Oops...something went wrong."
        });
        fileInput.status=JSON.stringify(status);
      }
    });
  }, 500);
  */

  return ` 
    <cbp-form-field
      ${label ? `label="${label}"` : ''}
      ${description ? `description="${description}"` : ''}
      ${fieldId ? `field-id="${fieldId}"` : ''}
      ${readonly ? 'readonly' : ''}
      ${disabled ? 'disabled' : ''}
      ${error ? 'error' : ''}
      ${context && context != 'light-inverts' ? `context="${context}"` : ''}
    >
      <cbp-datepicker
        ${name ? `name="${name}"` : ''}
        ${fieldId ? `field-id="${fieldId}"` : ''}
        ${context && context != 'light-inverts' ? `context="${context}"` : ''}
        ${sx ? `sx='${JSON.stringify(sx)}'` : ''}
      >
        <input
          type="date"
          ${value ? `value="${value}"` : ''}
          min="1000-01-01"
          max="9999-12-31"
         />
      </cbp-file-input>
    </cbp-form-field>
  `;
};
export const Datepicker = Template.bind({});


//<input type="date" value="2017-06-01" />