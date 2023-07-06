export default {
  title: 'Patterns/Card',
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    title: {
      name: 'Title',
      description: 'Set the title in the banner area of the card',
      control: 'text'
    },
    variant: {
      name: 'Variant',
      description: 'Set the variant class of the card',
      control: 'select',
      options: [
        'default',
        'info',  
        'success', 
        'danger'
      ]
    }
  }
};



const BannerCardTemplate = ({ title, variant }) => {
  return `
    <div class="cbp-card__banner ${variant != 'default' ? `cbp-card__banner--${variant}` : ''}">
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
  variant: 'default'
};

