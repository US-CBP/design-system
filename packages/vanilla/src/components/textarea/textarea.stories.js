export default {
  title: 'Patterns',
  argTypes: {
    label: {
      name: 'Input Label',
      description: 'Represents a caption for the input element in the user interface.',
      control: { type: 'text' }
    },
    labelFor: {
      name: 'Label `for` Attribute',
      description: 'When used on a <label> element it indicates the form element that this label describes and has the value which is the `id` of the form element it relates to.',
      control: { type: 'text' }
    },
    inputDescription: {
      name: 'Input Description',
      description: 'Instructions or supplementary information regarding the input element. Placed below the <label> element.',
      control: { type: 'text' }
    },
    errorMessage: {
      name: 'Error Message',
      description: 'A message in the input description that a problem has occurred.',
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
      <div class="cbp-input-pattern">
        <label for=${context.args.labelFor} class="cbp-input__label">${context.args.label}</label>
        <div class="cbp-input__description">${context.args.inputDescription}</div>
        <div class="cbp-input__description cbp-input__description--error" hidden="true"><i class="fas fa-exclamation-triangle"></i>${context.args.errorMessage}</div>
        ${Story().outerHTML || Story()}
      </div>
    `
  ]
};

const TextAreaTemplate = ({ labelFor, inputName, disabled }) => `<textarea class="cbp-input" name=${inputName} id=${labelFor} ${disabled ? 'disabled' : ''}></textarea>`

export const TextArea = TextAreaTemplate.bind({});
TextArea.args = {
  label: 'Task Description',
  labelFor: 'description',
  inputDescription: 'Required.',
  inputName: 'description',
  errorMessage: 'You must enter a description.'
}
TextArea.storyName = 'Textarea'