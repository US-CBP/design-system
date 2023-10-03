export default {
  title: 'Patterns/Card/Decision Card',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    title: {
      name: 'Card Title',
      description: 'Title of the Card component to display',
      type: { name: 'string', required: false }
    },
    body: {
      name: 'Card Body',
      description: 'Card body content area',
      type: { name: 'string', required: false }
    },
    actionsLayout: {
      name: 'Actions Layout',
      description: 'Choose actions layout of the card component',
      control: 'radio',
      options: ['single', 'double', 'triple']
    },
    actionsConfig: {
      name: 'Configure Actions Layout',
      description: 'Configure card button labels and colors. <br /> Available button colors: `primary`, `secondary`, `tertiary` and `danger`',
      control: 'object'
    },
    danger: {
      name: 'Danger',
      description: 'Display the "danger" state modifier of the card',
      control: 'boolean'
    }
  }
};

const disableBtn = (isDisabled) => {
  return isDisabled ? 'disabled' : '';
};

const renderActions = (layout, { btn1, btn2, btn3 }) => {
  if (layout === 'double') {
    return `
      <div class="cbp-card__actions">
        <button class="cbp-btn cbp-btn__${btn2.color}" type="button" aria-describedby="card-heading-1" ${disableBtn(btn2.disabled)}>
          <i class="fas fa-eye"></i>${btn2.label}
        </button>
        <button class="cbp-btn cbp-btn__${btn1.color}" type="button" aria-describedby="card-heading-1" ${disableBtn(btn1.disabled)}>
          <i class="fas fa-eye"></i>${btn1.label}
        </button>
      </div>
    `;
  } else if (layout === 'triple') {
    return `
      <div class="cbp-card__actions">
        <button class="cbp-btn cbp-btn__${btn3.color}" type="button" aria-describedby="card-heading-1" ${disableBtn(btn3.disabled)}><i class="fas fa-eye"></i>${btn3.label}</button>
        <button class="cbp-btn cbp-btn__${btn2.color}" type="button" aria-describedby="card-heading-1" ${disableBtn(btn2.disabled)}><i class="fas fa-eye"></i>${btn2.label}</button>
        <button class="cbp-btn cbp-btn__${btn1.color}" type="button" aria-describedby="card-heading-1" ${disableBtn(btn1.disabled)}><i class="fas fa-eye"></i>${btn1.label}</button>
      </div>
    `;
  } else {
    return `
      <div class="cbp-card__actions">
        <button class="cbp-btn cbp-btn__${btn1.color}" type="button" aria-describedby="card-heading-1" ${disableBtn(btn1.disabled)}>
          <i class="fas fa-eye"></i>${btn1.label}
        </button>
      </div>
    `;
  }
};

const DefaultDecisionCardTemplate = ({ title, body, actionsLayout, danger, actionsConfig }) => {
  return `
    <div class="cbp-card ${danger ? 'cbp-card--danger' : ''} cbp-card--decision">
      <div class="cbp-card__content">
        <div class="cbp-card__header">
          <h4 class="cbp-card__title" id="card-heading-1">${title}</h4>
        </div>
        <p class="cbp-text-body cbp-margin-top-4x">${body}</p>
      </div>
      <!-- Decision Card actions can contain both <button> and <a href="#"> elements -->
      ${renderActions(actionsLayout, actionsConfig)}
    </div>
  `;
};

const ProfileCardTemplate = ({ title, danger, actionsLayout, actionsConfig }) => {
  return `
    <div class="cbp-card ${danger ? 'cbp-card--danger' : ''} cbp-card--decision">
      <div class="cbp-card__content cbp-padding-0">
        <img src="assets/images/profile-page/passenge-photo-v2.jpg" class="cbp-card__img-top" alt="portrait image of person" />
        <div class="cbp-card__header cbp-card__header--flag">
          <h4 class="cbp-card__title" id="card-heading-1" id="card-heading-1">
            <i class="fas fa-exclamation-triangle cbp-margin-right-2x"></i>${title}
          </h4>
        </div>
        <div class="cbp-padding-4x">
          <div class="cbp-margin-bottom-2x" style="display: flex;">
            <p class="cbp-margin-right-4x cbp-margin-bottom-0">
              <span class="cbp-font-weight-bold">Sex:</span>&nbsp;Male
            </p>
            <p class="cbp-margin-right-4x cbp-margin-bottom-0">
              <span class="cbp-font-weight-bold">DOB:</span>&nbsp;01/01/1980
            </p>
          </div>
          <p class="cbp-margin-bottom-2x">
            <span class="cbp-font-weight-bold">Citizenship:</span>&nbsp;United States of American
          </p>
          <p>
            <span class="cbp-font-weight-bold">Place of Birth:</span>&nbsp;New York, New York USA
          </p>
        </div>
      </div>
      ${renderActions(actionsLayout, actionsConfig)}
    </div>
  `;
};

const actionsConfig = {
  btn1: {
    label: 'Label',
    color: 'primary',
    disabled: false
  },
  btn2: {
    label: 'Label',
    color: 'secondary',
    disabled: false
  },
  btn3: {
    label: 'Label',
    color: 'tertiary',
    disabled: false
  },
}

export const DecisionCard = DefaultDecisionCardTemplate.bind({});
DecisionCard.args = {
  title: 'Card Title',
  body: 'Some quick example text to display the card body content.',
  actionsLayout: 'single',
  actionsConfig
};
DecisionCard.storyName = 'Default';

export const ProfileCard = ProfileCardTemplate.bind({});
ProfileCard.args = {
  title: 'Jimbo Thompson',
  actionsLayout: 'single',
  actionsConfig
};
ProfileCard.storyName = 'Example Profile Card';