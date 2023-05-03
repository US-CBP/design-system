export default {
  title: 'Patterns/Textarea',
  parameters: {
    layout: 'centered',
    html: {
      root: '.cbp-form'
    }
  },
  argTypes: {
    label: {
      name: 'Input Label',
      control: { type: 'text' }
    },
    labelFor: {
      name: 'Label `for` Attribute',
      control: { type: 'text' }
    },
    inputDescription: {
      name: 'Input Description',
      control: { type: 'text' }
    },
    errorMessage: {
      name: 'Error Message',
      control: { type: 'text' }
    },
    inputName: {
      name: 'Input `name` Attribute',
      description: 'Name of the form control in the input element. Submitted with the form as part of a name/value pair.',
      control: { type: 'text' }
    },
    disabled: {
      name: '`disabled` Attribute',
      description: 'When the `disabled` attribute is present on the input element, it makes the element not mutable, focusable or submitted with the form.',
      control: { type: 'boolean' }
    }
  },
  decorators: [
    (Story, context) => `
      <form class="cbp-form">
        <label for=${context.args.labelFor} class="cbp-input__label">${context.args.label}</label>
        <p class="cbp-input__description">${context.args.inputDescription}</p>
        <p class="cbp-input__description cbp-input__description--error" hidden="true"><i class="fas fa-exclamation-triangle"></i>${context.args.errorMessage}</p>
        ${Story().outerHTML || Story()}
      </form>
    `
  ]
};

const TextAreaTemplate = ({ labelFor, inputName, disabled }) => `<textarea class="cbp-input" name=${inputName} id=${labelFor} ${disabled ? 'disabled' : ''} placeholder="Enter a description"></textarea>`

export const TextArea = TextAreaTemplate.bind({});
TextArea.args = {
  label: 'Task Description',
  labelFor: 'description',
  inputDescription: 'Required. 500/500 Characters remaining.',
  inputName: 'description',
  errorMessage: 'You must enter a description.'
}