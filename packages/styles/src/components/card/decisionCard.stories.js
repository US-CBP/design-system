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
    danger: {
      name: 'Danger',
      description: 'Choose modifier for the state of card',
      control: 'boolean'
    }
  }
};

const DefaultDecisionCardTemplate = ({ title, actionsLayout, danger }) => {
  return `
    <!-- Default width is 100%, hardcoded for demo purposes -->
    <div class="cbp-card-decision ${danger ? 'cbp-card-decision--danger' : ''}" style="width: 312px;">
      <div class="cbp-card-decision__content">
        <div class="cbp-card__header">
          <h4 class="cbp-card__title"><i class="fas fa-circle cbp-mr-2"></i>${title}</h4>
          <button class="cbp-btn cbp-btn__square cbp-btn__square-secondary--ghost">
            <i class="fas fa-clipboard-check"></i>
          </button>
        </div>
        <p class="cbp-text-body cbp-mt-2">
          The card has this passage of example text to emphasize
          truncation and reveal functionality and some other things...
        </p>
        <button class="cbp-btn cbp-btn__secondary--ghost cbp-mt-2">
          <i class="fas fa-angle-down"></i>
          More
        </button>
      </div>
      ${renderButtons(actionsLayout)}
    </div>
  `;
};

const DefaultDecisionLinksCardTemplate = ({ title, actionsLayout, danger}) => {
  return `
    <div class="cbp-card-decision ${danger ? 'cbp-card-decision--danger' : ''}" style="width: 312px">
      <div class="cbp-card-decision__content">
        <div class="cbp-card__header">
          <h4 class="cbp-card__title"><i class="fas fa-circle cbp-mr-2"></i>${title}</h4>
          <button class="cbp-btn cbp-btn__square cbp-btn__square-secondary--ghost">
            <i class="fas fa-clipboard-check"></i>
          </button>
        </div>
        <p class="cbp-text-body cbp-mt-2">
          The card has this passage of example text to emphasize
          truncation and reveal functionality and some other things...
        </p>
        <button class="cbp-btn cbp-btn__secondary--ghost cbp-mt-2">
          <i class="fas fa-angle-down"></i>
          More
        </button>
      </div>
      ${renderLinks(actionsLayout)}
    </div>
  `;
};

export const DefaultDecisionCard = DefaultDecisionCardTemplate.bind({});
DefaultDecisionCard.args = {
  title: 'Decision Card 1',
  actionsLayout: 'single',
  danger: false
};
DefaultDecisionCard.storyName = 'Default';

export const DefaultDecisionLinksCard = DefaultDecisionLinksCardTemplate.bind({});
DefaultDecisionLinksCard.args = {
  title: 'Decision Card 1',
  actionsLayout: 'single',
  danger: false
};
DefaultDecisionLinksCard.storyName = 'Default With Links'
