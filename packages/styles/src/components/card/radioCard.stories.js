export default {
  title: 'Patterns/Card/Radio Card',
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    title: {
      name: 'Title',
      control: 'text'
    },
    danger: {
      name: 'Danger',
      control: 'boolean'
    }
  }
};

const DefaultRadioCardTemplate = ({ title, danger }) => {
  return `
    <div class="cbp-card ${danger ? 'cbp-card--danger' : ''}" data-component="radio-card">
      <div class="cbp-card__content">
        <div class="cbp-card__header">
          <label class="cbp-card__title" for="default-radio-card"><i class="fas fa-info cbp-mr-2"></i>${title}</label>
          <input type="radio" class="cbp-form__radio" name="default-radio-card" id="default-radio-card">
        </div>
        <p class="cbp-text-body cbp-mt-2">Here is an example of some supplementary text for this purely informational card</p>
      </div>
    </div>
  `;
};

const RadioCardWithMediaTemplate = ({ title, danger }) => {
  return `
    <div class="cbp-card ${danger ? 'cbp-card--danger' : ''} cbp-d-flex" data-component="radio-card">
      <img src="assets/images/profile-page/passenge-photo-v2.jpg" alt="portrait of a person" width="116">
      <div class="cbp-card__content">
        <div class="cbp-card__header">
          <label class="cbp-card__title" for="radio-card-media"><i class="fas fa-info cbp-mr-2"></i>${title}</label>
          <input type="radio" class="cbp-form__radio" name="radio-card-media" id="radio-card-media">
        </div>
        <p class="cbp-text-body cbp-mt-2">Here is an example of some supplementary text for this purely informational card</p>
      </div>
    </div>
  `;
};

const RadioCardWithFlagTemplate = ({ title, danger }) => {
  return `
    <div class="cbp-card ${danger ? 'cbp-card--danger' : ''}" data-component="radio-card" style="display: block;">
      <img src="assets/images/profile-page/passenge-photo-v2.jpg" alt="portrait of a person" width="310">
      <div class="cbp-card__header cbp-card__header--flag">
        <label class="cbp-card__title" for="radio-card-flag"><i class="fas fa-exclamation-triangle cbp-mr-2"></i>${title}</label>
        <input type="radio" class="cbp-form__radio" name="radio-card-flag" id="radio-card-flag">
      </div>
    </div>
  `;
};

export const DefaultRadioCard = DefaultRadioCardTemplate.bind({});
DefaultRadioCard.args = {
  title: 'General Radio Card',
  danger: false
};
DefaultRadioCard.storyName = 'Default';

export const RadioCardWithMedia = RadioCardWithMediaTemplate.bind({});
RadioCardWithMedia.args = {
  title: 'General Radio Card',
  danger: false
};
RadioCardWithMedia.storyName = 'With Media';

export const RadioCardWithFlag = RadioCardWithFlagTemplate.bind({});
RadioCardWithFlag.args = {
  title: 'Jimbo Thompson',
  danger: false
};
RadioCardWithFlag.storyName = 'With Flag';