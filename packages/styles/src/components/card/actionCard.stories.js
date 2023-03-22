export default {
  title: 'Patterns/Card',
  parameters: {
    layout: 'centered'
  }
};

const renderButtons = (buttonLayout) => {
  switch (buttonLayout) {
    case 'double':
      return `
        <div class="cbp-card-action__buttons cbp-card-action__buttons--double">
          <button class="cbp-btn__secondary"><i class="fas fa-info-circle"></i>App Info</button>
          <button class="cbp-btn__primary"><i class="fas fa-external-link-alt"></i>Go To App</button>
        </div>
      `
      break;
    case 'triple':
      return `
        <div class="cbp-card-action__buttons cbp-card-action__buttons--triple">
          <button class="cbp-btn__danger"><i class="fas fa-trash-alt"></i>Delete</button>
          <button class="cbp-btn__secondary"><i class="fas fa-times"></i>Cancel</button>
          <button class="cbp-btn__primary"><i class="fas fa-save"></i>Publish</button>
        </div>
      `
      break;
    default:
      return `
      <div class="cbp-card-action__buttons cbp-card-action__buttons--single">
        <button class="cbp-btn__primary"><i class="fas fa-external-link-alt"></i>Go To App</button>
      </div>
      `
      break;
  }
}

const ActionCardTemplate = ({ label, buttonLayout, modifiers, ...args }) => {
  return `
    <div class="cbp-card-action ${modifiers}">
      <div class="cbp-card-action__wrapper cbp-card-action__content">
        <div class="cbp-card__header">
          <h4 class="cbp-card__title"><i class="fas fa-circle"></i>Decision Card 1</h4>
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
      ${renderButtons(buttonLayout)}
    </div>
  `;
};

export const ActionCard = ActionCardTemplate.bind({});
ActionCard.args = {
  buttonLayout: 'single',
  modifiers: 'default'
};
ActionCard.argTypes = {
  buttonLayout: {
    name: 'Button Layout',
    description: 'Choose button layout of the card component',
    control: 'radio',
    options: ['single', 'double', 'triple']
  },
  modifiers: {
    name: 'Modifiers',
    description: 'Choose modifier for the state of card',
    control: 'radio',
    options: ['default', 'cbp-card-action--danger']
  }
};
