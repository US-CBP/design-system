import { renderButtons, renderLinks } from "./cardStoryTemplates";

export default {
  title: 'Patterns/Card/Decision Card',
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    title: {
      name: 'Card Title',
      description: 'Title of the Card component to display',
      type: { name: 'string', required: false }
    },
    actionsLayout: {
      name: 'Actions Layout',
      description: 'Choose button layout of the card component',
      control: 'radio',
      options: ['single', 'double', 'triple']
    },
    modifiers: {
      name: 'Modifiers',
      description: 'Choose modifier for the state of card',
      control: 'radio',
      options: ['default', 'cbp-card-decision--danger']
    }
  }
};

const DefaultDecisionCardTemplate = ({ title, actionsLayout, modifiers }) => {
  return `
    <div class="cbp-card-decision ${modifiers}">
      <div class="cbp-card-decision__content">
        <div class="cbp-card__header">
          <h4 class="cbp-card__title"><i class="fas fa-circle"></i>${title}</h4>
          <button class="cbp-btn cbp-btn__square cbp-btn__square-secondary--ghost">
            <i class="fas fa-clipboard-check"></i>
          </button>
        </div>
        <p class="cbp-text-body">
          The card has this passage of example text to emphasize
          truncation and reveal functionality and some other things...
        </p>
        <div class="cbp-row">
          <button class="cbp-btn cbp-btn__secondary--ghost">
            <i class="fas fa-angle-down"></i>
            More
          </button>
        </div>
      </div>
      ${renderButtons(actionsLayout)}
    </div>
  `;
};

const DefaultDecisionLinksCardTemplate = ({ title, actionsLayout, modifiers}) => {
  return `
    <div class="cbp-card-decision ${modifiers}">
      <div class="cbp-card-decision__content">
        <div class="cbp-card__header">
          <h4 class="cbp-card__title"><i class="fas fa-circle"></i>${title}</h4>
          <button class="cbp-btn cbp-btn__square cbp-btn__square-secondary--ghost">
            <i class="fas fa-clipboard-check"></i>
          </button>
        </div>
        <p class="cbp-text-body">
          The card has this passage of example text to emphasize
          truncation and reveal functionality and some other things...
        </p>
        <div class="cbp-row">
          <button class="cbp-btn cbp-btn__secondary--ghost">
            <i class="fas fa-angle-down"></i>
            More
          </button>
        </div>
      </div>
      ${renderLinks(actionsLayout)}
    </div>
  `;
};

const ProfileCardTemplate = ({ title, modifiers, actionsLayout }) => {
  return `
    <div class="cbp-card-decision ${modifiers}">
      <div class="cbp-card-decision__content p-0">
        <img src="assets/images/profile-page/passenge-photo-v2.jpg" alt="portrait image of person" />
        <div class="cbp-card__header cbp-card__header--flag">
          <h4 class="cbp-card__title"><i class="fas fa-exclamation-triangle"></i>${title}</h4>
        </div>
        <div class="cbp-grid-container">
          <div class="cbp-row">
            <b>Sex:</b>&nbsp;<span>Male</span>
            <b>DOB:</b>&nbsp;<span>01/01/1980</span>
          </div>
          <div class="cbp-row">
            <b>Citizenship:</b>&nbsp;<span>United States of American</span>
          </div>
          <div class="cbp-row">
            <b>Place of Birth:</b>&nbsp;<span>New York, New York USA</span>
          </div>
        </div>
      </div>
      ${renderButtons(actionsLayout)}
    </div>
  `;
};

export const DefaultDecisionCard = DefaultDecisionCardTemplate.bind({});
DefaultDecisionCard.args = {
  title: 'Decision Card 1',
  actionsLayout: 'single',
  modifiers: 'default'
};
DefaultDecisionCard.storyName = 'Default';

export const DefaultDecisionLinksCard = DefaultDecisionLinksCardTemplate.bind({});
DefaultDecisionLinksCard.args = {
  title: 'Decision Card 1',
  actionsLayout: 'single',
  modifiers: 'default'
};
DefaultDecisionLinksCard.storyName = 'Default With Links'

export const ProfileCard = ProfileCardTemplate.bind({});
ProfileCard.args = {
  title: 'Jimbo Thompson',
  actionsLayout: 'single',
  modifiers: 'default'
};
ProfileCard.storyName = 'Example Profile Card';
