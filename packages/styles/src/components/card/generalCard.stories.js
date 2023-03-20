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
    type: {
      name: 'Card Modifier',
      control: 'select',
      options: ['', 'cbp-card--info', 'cbp-card--success', 'cbp-card--danger']
    }
  }
};

const displayImgOrIcon = (img) => {
  return img
    ? '<img src="assets/images/profile-page/passenge-photo-v2.jpg" alt="card general image">'
    : '<i class="fas fa-building" style="color: white; font-size: 4rem"></i>';
};

const DefaultGeneralCardTemplate = ({ title, type }) => {
  return `
    <div class="cbp-card ${type}">
      <div class="cbp-card__content">
        <div class="cbp-card__header">
          <h4 class="cbp-card__title"><i class="fas fa-info"></i>${title}</h4>
        </div>
        <p class="cbp-text-body">Here is an example of some supplementary text for this purely informational card</p>
      </div>
    </div>
  `;
};

const GeneralCardMediaTemplate = ({ title, type }) => {
  return `
    <div class="cbp-card ${type}">
      <img src="assets/images/profile-page/passenge-photo-v2.jpg" alt="portrait of a person" width="116">
      <div class="cbp-card__content">
        <div class="cbp-card__header">
          <h4 class="cbp-card__title"><i class="fas fa-info"></i>${title}</h4>
        </div>
        <p class="cbp-text-body">Here is an example of some supplementary text for this purely informational card</p>
      </div>
    </div>
  `;
};

const SmallGeneralCardTemplate = ({ title, type }) => {
  return `
    <div class="cbp-card ${type} cbp-card__general--small">
      <div class="cbp-card__content">
        <div class="cbp-card__header">
          <h4 class="cbp-card__title"><i class="fas fa-info"></i>${title}</h4>
        </div>
        <p class="cbp-text-body">Here is an example of some supplementary text for this purely informational card</p>
      </div>
    </div>
  `;
};

export const DefaultGeneralCard = DefaultGeneralCardTemplate.bind({});
DefaultGeneralCard.args = {
  title: 'General Card'
};
DefaultGeneralCard.storyName = 'Default';

export const GeneralCardMedia = GeneralCardMediaTemplate.bind({});
GeneralCardMedia.args = {
  title: 'General Card'
};
GeneralCardMedia.storyName = 'With Media'

export const SmallGeneralCard = SmallGeneralCardTemplate.bind({});
SmallGeneralCard.args = {
  title: 'General Card'
};
SmallGeneralCard.storyName = 'Small'
