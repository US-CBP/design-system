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
        'warning',
        'danger'
      ]
    },
    showIcon: {
      name: 'Show Icon',
      description: 'Show an icon in the title',
      control: 'boolean'
    },
  }
};

const icons = {
  default: '<i class="fas fa-info"></i>',
  info: '<i class="fas fa-info-circle"></i>',  
  success: '<i class="fas fa-check"></i>',
  warning: '<i class="fas fa-exclamation-circle"></i>',
  danger: '<i class="fas fa-exclamation-triangle"></i>'
}

const BannerCardTemplate = ({ title, variant, showIcon }) => {
  return `
    <div class="cbp-card__banner ${variant != 'default' ? `cbp-card__banner--${variant}` : ''}">
      <h4 class="cbp-card__banner-title">${showIcon ? icons[variant] : ''}${title}</h4>
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

