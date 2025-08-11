export default {
  title: 'Components/File Input',
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
    enhanced: {
      control: 'boolean',
    },
    multiple: {
      control: 'boolean',
    },
    accept: {
      control: 'text',
    },
    capture : {
      control: 'select',
      description: 'The capture attribute value is a string that specifies which camera to use for capture of image or video data, if the accept attribute indicates that the input should be of one of those types.',
      options: [ "user", "environment"]
    },
    error: {
      control: 'boolean',
    },
    showFileErrors: {
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


const FileInputTemplate = ({ label, description, fieldId, name, enhanced, multiple, accept, capture, error, showFileErrors, disabled, context, sx }) => {
  
  // Set up event handlers for logging and setting errors on files via the `status` prop.
  setTimeout(() => {
    /*
    // TechDebt: This seems to be the cbp-file-input event bubbled up. Need to investigate their interactions more.
    const formField =  document.querySelector('cbp-form-field:has(cbp-file-input)');
    formField.addEventListener( 'valueChange', e => {
      console.log('cbp-form-field',e)
    });
    */
    
    const fileInput = document.querySelector('cbp-file-input');
    fileInput.addEventListener( 'valueChange', e => {
      console.log('cbp-file-input',e)
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

  return ` 
    <cbp-form-field
      ${label ? `label="${label}"` : ''}
      ${description ? `description="${description}"` : ''}
      ${fieldId ? `field-id="${fieldId}"` : ''}
      ${disabled ? `disabled` : ''}
      ${error ? `error` : ''}
      ${context && context != 'light-inverts' ? `context=${context}` : ''}
    >
      <cbp-file-input
        ${name ? `name="${name}"` : ''}
        ${fieldId ? `field-id="${fieldId}"` : ''}
        ${enhanced ? 'enhanced' : ''}
        ${multiple ? 'multiple' : ''}
        ${accept ? `accept="${accept}"` : ''}
        ${capture ? `capture="${capture}"` : ''}
        ${context && context != 'light-inverts' ? `context=${context}` : ''}
        ${sx ? `sx=${JSON.stringify(sx)}` : ''}
      >
        <input type="file" />
      </cbp-file-input>
    </cbp-form-field>
  `;
};

export const FileInput = FileInputTemplate.bind({});

