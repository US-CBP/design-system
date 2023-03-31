export default {
  title: 'Patterns/Card/General Card',
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    title: {
      name: 'Card Title',
      control: 'text'
    },
    modifier: {
      name: 'Card Modifier',
      control: 'select',
      options: ['', 'cbp-card--info', 'cbp-card--success', 'cbp-card--danger']
    }
  }
};

const DefaultGeneralCardTemplate = ({ title, modifier }) => {
  return `
    <div class="cbp-card ${modifier}">
      <div class="cbp-card__content">
        <div class="cbp-card__header">
          <h4 class="cbp-card__title"><i class="fas fa-info cbp-margin-right-2x"></i>${title}</h4>
        </div>
        <p class="cbp-text-body cbp-margin-top-4x">Here is an example of some supplementary text for this purely informational card</p>
      </div>
    </div>
  `;
};

export const DefaultGeneralCard = DefaultGeneralCardTemplate.bind({});
DefaultGeneralCard.args = {
  title: 'General Card'
};
DefaultGeneralCard.storyName = 'Default';