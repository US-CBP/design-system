export default {
  title: 'Patterns/Card',
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    title: {
      name: 'Title',
      control: 'text'
    },
    modifier: {
      name: 'Modifier',
      control: 'select',
      options: [
        '',
        'cbp-card__banner--info',  
        'cbp-card__banner--success', 
        'cbp-card__banner--danger'
      ]
    }
  }
};

const BannerCardTemplate = ({ title, type }) => {
  return `
    <div class="cbp-card__banner ${type}">
      <h4 class="cbp-card__banner-title">
        <i class="fas fa-info"></i>
        ${title}
      </h4>
      <div class="cbp-card__banner-content">
        <p class="cbp-text-body">
          Here is an example of some supplementary text for this purely informational card
        </p>
      </div>
    </div>
  `;
};

export const BannerCard = BannerCardTemplate.bind({});
BannerCard.args = {
  title: 'Banner Card',
  modifier: ''
};

