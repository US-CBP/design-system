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
  },
  decorators: [
    (Story, context) => `
      <form class="cbp-form" style="width: 512px;">
        <label for=${context.args.labelFor} class="cbp-input__label">${context.args.label}</label>
        <p class="cbp-input__description">${context.args.inputDescription}</p>
        <p class="cbp-input__description cbp-input__description--error" hidden="true"><i class="fas fa-exclamation-triangle"></i>${context.args.errorMessage}</p>
        ${Story().outerHTML || Story()}
      </form>
    `
  ]
};

const TextAreaTemplate = ({ labelFor }) => `<textarea class="cbp-input" name="description" id=${labelFor} cols="30" rows="10" placeholder="Enter a description"></textarea>`

export const TextArea = TextAreaTemplate.bind({});
TextArea.args = {
  label: 'Task Description',
  labelFor: 'description',
  inputDescription: 'Required. 500/500 Characters remaining.',
  errorMessage: 'You must enter a description.'
}