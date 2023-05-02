export default {
  title: 'Patterns/Text Inputs',
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

const NumericFieldTemplate = ({ labelFor }) => (
  `
    <div class="cbp-form__number">
      <input type="number" name="numeric" id=${labelFor} placeholder="Enter Number of Fish"></input>
    </div>
  `
)

const NumericCounterFieldTemplate = ({ labelFor }) => (
  `
    <div class="cbp-form__number cbp-form__number--counter" id="number-counter">
      <input type="number" name="numeric-counter" id=${labelFor} placeholder="Enter Number of Fish"></input>
      <button class="cbp-btn-square cbp-btn__secondary" id="decrement">
        <i class="fas fa-minus"></i>
      </button>
      <button class="cbp-btn-square cbp-btn__secondary" id="increment">
        <i class="fas fa-plus"></i>
      </button>
    </div>
  `
)

const NumericSwitchTemplate = ({ labelFor }) => (
  `
    <div class="cbp-form__number cbp-form__number--switch">
      <div>
        <input type="number" name="numeric-switch" id=${labelFor} placeholder="Enter Weight"></input>
        <div class="cbp-form__unit">lbs</div>
      </div>
      <div class="cbp-btn--segment">
        <button class="active">LBS</button>
        <button>KG</button>
      </div>
    </div>
  `
)

// *Predictive Search*
const SearchFieldTemplate = ({ labelFor }) => (
  `
    <div class="cbp-input-group">
      <input type="text" name="autocomplete-demo" id=${labelFor} placeholder="Enter Search Criteria" autocomplete="off"></input>
      <button type="button" class="cbp-btn-square cbp-btn__secondary">
        <i class="fas fa-search"></i>
      </button>
    </div>
    <!-- Predictive Search
    <ul class="cbp-autocomplete">
      <li class="cbp-autocomplete__item">Uganda</li>
      <li class="cbp-autocomplete__item">United States of America</li>
      <li class="cbp-autocomplete__item">United Emirates</li>
    </ul>
    -->
  `
)

const TextfieldButtonGroupTemplate = ({ square, labelFor }) => (
  `
    <div class="cbp-input-group">
      <input type="text" name="tag" id=${labelFor} placeholder="Add Person" />
      <button class="${square ? 'cbp-btn-square' : 'cbp-btn'} cbp-btn__secondary" type="button">${square ? '<i class="fas fa-plus"></i>' : 'Add Person'}</button>
    </div>  
  `
)

const TextFieldButtonGroupWithTagsTemplate = ({}) => (
  `
    <div class="cbp-input-group">
      <input type="text" name="tag" id="tag" placeholder="Add Tag Keyword"></input>
      <button type="button" class="cbp-btn-square cbp-btn__secondary">
        <i class="fas fa-plus"></i>
      </button>
    </div>
    <div class="cbp-display-flex cbp-padding-top-2x">
      <button type="button" class="cbp-chip cbp-margin-right-2x" aria-pressed="false">
        <span class="cbp-chip__label">Pepperoni</span>
        <div class="cbp-chip__icon">
          <i class="fas fa-plus"></i>
        </div>
      </button>
      <button type="button" class="cbp-chip" aria-pressed="false">
        <span class="cbp-chip__label">Mushroom</span>
        <div class="cbp-chip__icon">
          <i class="fas fa-plus"></i>
        </div>
      </button>
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

export const NumericField = NumericFieldTemplate.bind({});
NumericField.args = {
  label: 'Number of Fish',
  labelFor: 'numberOfFish',
  inputDescription: 'Required.',
  errorMessage: 'This field is required.'
}

export const NumericCounterField = NumericCounterFieldTemplate.bind({});
NumericCounterField.args = {
  label: 'Number of Fish',
  labelFor: 'numberOfFish',
  inputDescription: 'Required. 1,000 fish maximum.',
  errorMessage: 'This field is required.'
};

export const NumericSwitchField = NumericSwitchTemplate.bind({});
NumericSwitchField.args = {
  label: 'Your Weight',
  labelFor: 'weight',
  inputDescription: 'Required.',
  errorMessage: 'This field is required.'
}

export const SearchField = SearchFieldTemplate.bind({});
SearchField.args = {
  label: 'Search',
  labelFor: 'search',
  inputDescription: 'Required.',
  errorMessage: 'This field is required.'
}

export const TextfieldButtonGroup = TextfieldButtonGroupTemplate.bind({});
TextfieldButtonGroup.args = {
  square: false,
  label: 'Add Tags',
  labelFor: 'tags',
  inputDescription: 'Required.',
  errorMessage: 'This field is required.'
};
TextfieldButtonGroup.storyName = 'Textfield w/ Button';

export const TextFieldButtonGroupWithTags = TextFieldButtonGroupWithTagsTemplate.bind({});
TextFieldButtonGroupWithTags.args = {
  label: 'Add Tags',
  labelFor: 'tags',
  inputDescription: 'Required.',
  errorMessage: 'This field is required.'
}
TextFieldButtonGroupWithTags.storyName = 'TextField w/ Button w/ Tags'