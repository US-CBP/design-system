export default {
  title: 'Patterns/Card',
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

const renderActions = (layout) => {
  if (layout === 'double') {
    return `
      <!-- Card Decision actions can contain both Button and Link elements -->
      <div class="cbp-card-decision__actions cbp-card-decision__actions--double">
        <button class="cbp-btn__secondary"><i class="fas fa-info-circle"></i>App Info</button>
        <a href="#" class="cbp-btn__primary"><i class="fas fa-external-link-alt"></i>Go To App</a>
      </div>
    `
  } else if (layout === 'triple') {
    return `
      <!-- Card Decision actions can contain both Button and Link elements -->
      <div class="cbp-card-decision__actions cbp-card-decision__actions--triple">
        <button class="cbp-btn__danger"><i class="fas fa-trash-alt"></i>Delete</button>
        <button class="cbp-btn__secondary"><i class="fas fa-times"></i>Cancel</button>
        <button class="cbp-btn__primary"><i class="fas fa-save"></i>Publish</button>
      </div>
    `
  } else {
    return `
      <!-- Card Decision actions can contain both Button and Link elements -->
      <div class="cbp-card-decision__actions">
        <a href="#" class="cbp-btn__primary"><i class="fas fa-external-link-alt"></i>Go To App</a>
      </div>
    `
  }
}

const DecisionCardTemplate = ({ title, actionsLayout, danger }) => {
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
      ${renderActions(actionsLayout)}
    </div>
  `;
};

export const DecisionCard = DecisionCardTemplate.bind({});
DecisionCard.args = {
  title: 'Decision Card 1',
  actionsLayout: 'single',
  danger: false
};
