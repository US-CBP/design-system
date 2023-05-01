export default {
  title: 'Patterns/Form/Inputs',
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
        <label for=${context.args.labelFor} class="cbp-form__label">${context.args.label}</label>
        <p class="cbp-form__description">${context.args.inputDescription}</p>
        <p class="cbp-form__description cbp-form__description--error" hidden="true"><i class="fas fa-exclamation-triangle"></i>${context.args.errorMessage}</p>
        ${Story().outerHTML || Story()}
      </form>
    `
  ]
};

const Template = ({ labelFor }) => `<input type="text" class="cbp-form__input" name="firstName" id=${labelFor} placeholder="Enter first name."> `

const TextAreaTemplate = ({ labelFor }) => `<textarea class="cbp-form__textarea" name="description" id=${labelFor} cols="30" rows="10" placeholder="Enter a description"></textarea>`

const NumericFieldTemplate = ({ labelFor }) => (
  `
    <div class="cbp-form__number">
      <input type="number" name="numeric" id=${labelFor} placeholder="Enter Number of Fish"></input>
    </div>
  `
)

export const TextField = Template.bind({});
TextField.args = {
  label: 'First Name',
  labelFor: 'firstName',
  inputDescription: 'Required. 250/250 Characters remaining.',
  errorMessage: 'This field is required.'
};

export const TextArea = TextAreaTemplate.bind({});
TextArea.args = {
  label: 'Task Description',
  labelFor: 'description',
  inputDescription: 'Required. 500/500 Characters remaining.',
  errorMessage: 'You must enter a description.'
}

export const NumericField = NumericFieldTemplate.bind({});
NumericField.args = {
  label: 'Number of Fish',
  labelFor: 'numberOfFish',
  inputDescription: 'Required.',
  errorMessage: 'This field is required.'
}