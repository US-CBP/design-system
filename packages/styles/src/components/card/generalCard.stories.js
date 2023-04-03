export default {
  title: 'Patterns/Card/General Card',
  parameters: {
    layout: 'centered',
    html: {
      root: '.wrapper'
    },
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
    <div class="wrapper" style="display: grid; grid-template-columns: 432px">
      <div class="cbp-card ${modifier}">
        <div class="cbp-card__content">
          <div class="cbp-card__header">
            <h4 class="cbp-card__title"><i class="fas fa-info-circle cbp-margin-right-2x"></i>${title}</h4>
          </div>
          <p class="cbp-text-body cbp-margin-top-4x">Here is an example of some supplementary text for this purely informational card</p>
        </div>
      </div>
    </div>
  `;
};

const GeneralCardMediaTemplate = ({ title, modifier }) => {
  return `
    <div class="wrapper" style="display: grid; grid-template-columns: 486px">
      <div class="cbp-card ${modifier} cbp-display-flex">
        <img src="assets/images/profile-page/passenge-photo-v2.jpg" class="cbp-card__img-left" alt="portrait of a person" height="127" width="116">
        <div class="cbp-card__content">
          <div class="cbp-card__header">
            <h4 class="cbp-card__title"><i class="fas fa-info-circle cbp-margin-right-2x"></i>${title}</h4>
          </div>
          <p class="cbp-text-body cbp-margin-top-4x">Here is an example of some supplementary text for this purely informational card</p>
        </div>
      </div>
    </div>
  `;
};

const SmallGeneralCardTemplate = ({ title, modifier }) => {
  return `
    <div class="wrapper" style="display: grid; grid-template-columns: 312px">
      <div class="cbp-card ${modifier}">
        <div class="cbp-card__content">
          <div class="cbp-card__header">
            <h4 class="cbp-card__title"><i class="fas fa-info-circle cbp-margin-right-2x"></i>${title}</h4>
          </div>
          <p class="cbp-text-body cbp-margin-top-4x">Here is an example of some supplementary text for this purely informational card</p>
        </div>
      </div>
    </div>
  `;
};

export const DefaultGeneralCard = DefaultGeneralCardTemplate.bind({});
DefaultGeneralCard.args = {
  title: 'General Card',
  modifier: ''
};
DefaultGeneralCard.storyName = 'Default';

export const GeneralCardMedia = GeneralCardMediaTemplate.bind({});
GeneralCardMedia.args = {
  title: 'General Card',
  modifier: ''
};
GeneralCardMedia.storyName = 'With Media';

export const SmallGeneralCard = SmallGeneralCardTemplate.bind({});
SmallGeneralCard.args = {
  title: 'General Card',
  modifier: ''
};
SmallGeneralCard.storyName = 'Small Size';