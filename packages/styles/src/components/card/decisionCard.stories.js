export default {
  title: 'Patterns/Card/Decision Card',
  parameters: {
    layout: 'centered',
    html: {
      root: '.wrapper'
    }
  },
  argTypes: {
    title: {
      name: 'Card Title',
      description: 'Title of the Card component to display',
      type: { name: 'string', required: false }
    },
    actionsLayout: {
      name: 'Actions Layout',
      description: 'Choose actions layout of the card component',
      control: 'radio',
      options: ['single', 'double', 'triple']
    },
    danger: {
      name: 'Danger',
      description: 'Display the "danger" state modifier of the card',
      control: 'boolean'
    }
  },
  decorators: [
    (Story) => `
      <div class="wrapper" style="display: grid; grid-template-columns: 312px">
        ${Story().outerHTML || Story()}
      </div>
    `
  ]
};

const renderActions = (layout) => {
  if (layout === 'double') {
    return `
      <!-- Card Decision actions can contain both Button and Link elements -->
      <div class="cbp-card__actions">
        <button class="cbp-btn__secondary" type="button"><i class="fas fa-info-circle"></i>App Info</button>
        <a href="#" class="cbp-btn__primary"><i class="fas fa-external-link-alt"></i>Go To App</a>
      </div>
    `;
  } else if (layout === 'triple') {
    return `
      <!-- Card Decision actions can contain both Button and Link elements -->
      <div class="cbp-card__actions">
        <button class="cbp-btn__danger" type="button"><i class="fas fa-trash-alt"></i>Delete</button>
        <button class="cbp-btn__secondary" type="button"><i class="fas fa-times"></i>Cancel</button>
        <button class="cbp-btn__primary" type="button"><i class="fas fa-save"></i>Publish</button>
      </div>
    `;
  } else {
    return `
      <!-- Card Decision actions can contain both Button and Link elements -->
      <div class="cbp-card__actions">
        <a href="#" class="cbp-btn__primary"><i class="fas fa-external-link-alt"></i>Go To App</a>
      </div>
    `;
  }
};

const DefaultDecisionCardTemplate = ({ title, actionsLayout, danger }) => {
  return `
    <div class="cbp-card ${danger ? 'cbp-card--danger' : ''} cbp-card--decision">
      <div class="cbp-card__content">
        <div class="cbp-card__header">
          <h4 class="cbp-card__title"><i class="fas fa-circle cbp-margin-right-2x"></i>${title}</h4>
          <button class="cbp-btn cbp-btn__square cbp-btn__square-secondary--ghost">
            <i class="fas fa-clipboard-check"></i>
          </button>
        </div>
        <p class="cbp-text-body cbp-margin-top-4x">
          The card has this passage of example text to emphasize
          truncation and reveal functionality and some other things...
        </p>
        <button class="cbp-btn cbp-btn__secondary--ghost cbp-margin-top-4x" type="button">
          <i class="fas fa-angle-down"></i>
          More
        </button>
      </div>
      ${renderActions(actionsLayout)}
    </div>
  `;
};

const ProfileCardTemplate = ({ title, danger, actionsLayout }) => {
  return `
    <div class="cbp-card ${danger ? 'cbp-card--danger' : ''} cbp-card--decision">
      <div class="cbp-card__content cbp-padding-0">
        <img src="assets/images/profile-page/passenge-photo-v2.jpg" alt="portrait image of person" width="312px" />
        <div class="cbp-card__header cbp-card__header--flag">
          <h4 class="cbp-card__title"><i class="fas fa-exclamation-triangle cbp-margin-right-2x"></i>${title}</h4>
        </div>
        <div class="cbp-padding-4x">
          <div class="cbp-margin-bottom-2x" style="display: flex;">
            <p class="cbp-margin-right-4x">
              <span class="cbp-font-weight-bold">Sex:</span>&nbsp;Male
            </p>
            <p class="cbp-margin-right-4x">
              <span class="cbp-font-weight-bold">DOB:</span>&nbsp;01/01/1980
            </p>
          </div>
          <p class="cbp-margin-bottom-2x">
            <span class="cbp-font-weight-bold">Citizenship:</span>&nbsp;United States of American
          </p>
          <p class="cbp-margin-bottom-2x">
            <span class="cbp-font-weight-bold">Place of Birth:</span>&nbsp;New York, New York USA
          </p>
        </div>
      </div>
      ${renderActions(actionsLayout)}
    </div>
  `;
};

export const DecisionCard = DefaultDecisionCardTemplate.bind({});
DecisionCard.args = {
  title: 'Decision Card 1',
  actionsLayout: 'single',
  danger: false
};
DecisionCard.storyName = 'Default';

export const ProfileCard = ProfileCardTemplate.bind({});
ProfileCard.args = {
  title: 'Jimbo Thompson',
  actionsLayout: 'single',
  danger: false
};
ProfileCard.storyName = 'Example Profile Card';