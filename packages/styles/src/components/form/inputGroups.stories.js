export default {
  title: 'Patterns/Form/Input Groups',
  parameters: {
    layout: 'centered',
    html: {
      root: '.cbp-form'
    }
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

const TextfieldButtonGroupTemplate = ({ square, labelFor }) => (
  `
    <div class="cbp-input-group">
      <input type="text" name="tag" id=${labelFor} placeholder="Add Person" />
      <button class="${square ? 'cbp-btn-square' : 'cbp-btn'} cbp-btn__secondary" type="button">${square ? '<i class="fas fa-plus"></i>' : 'Add Person'}</button>
    </div>  
  `
)

export const TextfieldButtonGroup = TextfieldButtonGroupTemplate.bind({});
TextfieldButtonGroup.args = {
  square: false,
  label: 'Add Tags',
  labelFor: 'tags',
  inputDescription: 'Required.',
  errorMessage: 'This field is required.'
};
TextfieldButtonGroup.argTypes = {
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
  }
}
TextfieldButtonGroup.storyName = 'Textfield w/ Button';
