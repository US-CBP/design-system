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
      name: 'Title',
      description: 'Set the title of the card',
      control: 'text'
    },
    modifier: {
      name: 'Modifier',
      description: 'Set the modifier class of the card',
      control: 'select',
      options: ['default', 'info', 'success', 'danger', 'warning']
    },
    showIcon: {
      name: 'Show Icon',
      description: 'Show an icon in the title',
      control: 'boolean'
    },
    bodyText: {
      name: 'Body Text',
      description: 'Set the body text of the card',
      control: 'text'
    }
  }
};

const DefaultGeneralCardTemplate = ({ title, modifier, showIcon, bodyText }) => {
  return `
    <div class="wrapper" style="display: grid; grid-template-columns: 432px">
      <div class="cbp-card ${modifier != 'default' ? `cbp-card--${modifier}` : ''}">
        <div class="cbp-card__content">
          <div class="cbp-card__header">
            <h4 class="cbp-card__title">${showIcon ? '<i class="fas fa-info-circle cbp-margin-right-2x"></i>' : ''}${title}</h4>
          </div>
          <p class="cbp-text-body cbp-margin-top-4x">${bodyText}</p>
        </div>
      </div>
    </div>
  `;
};

const GeneralCardMediaTemplate = ({ title, modifier, showIcon, bodyText }) => {
  return `
    <div class="wrapper" style="display: grid; grid-template-columns: 486px">
      <div class="cbp-card ${modifier != 'default' ? `cbp-card--${modifier}` : ''} cbp-display-flex">
        <img src="assets/images/profile-page/passenge-photo-v2.jpg" class="cbp-card__img-left" alt="portrait of a person" height="127" width="116">
        <div class="cbp-card__content">
          <div class="cbp-card__header">
            <h4 class="cbp-card__title">${showIcon ? '<i class="fas fa-info-circle cbp-margin-right-2x"></i>' : ''}${title}</h4>
          </div>
          <p class="cbp-text-body cbp-margin-top-4x">${bodyText}</p>
        </div>
      </div>
    </div>
  `;
};

export const DefaultGeneralCard = DefaultGeneralCardTemplate.bind({});
DefaultGeneralCard.args = {
  title: 'General Card',
  modifier: 'default',
  bodyText: 'Here is an example of some supplementary text for this purely informational card'
};
DefaultGeneralCard.storyName = 'Default';

export const GeneralCardMedia = GeneralCardMediaTemplate.bind({});
GeneralCardMedia.args = {
  title: 'General Card',
  modifier: 'default',
  bodyText: 'Here is an example of some supplementary text for this purely informational card'
};
GeneralCardMedia.storyName = 'With Media';
