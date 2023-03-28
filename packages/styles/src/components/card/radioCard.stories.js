export default {
  title: 'Patterns/Card/Radio Card',
  parameters: {
    layout: 'centered'
  }
};

const DefaultRadioCardTemplate = ({ title, danger, ...args }) => {
  return `
    <label for="card-radio-demo" class="cbp-card ${danger && 'cbp-card--danger'}" data-component="radio-card">
      <div class="cbp-card__content">
        <div class="cbp-card__header">
          <h4 class="cbp-card__title"><i class="fas fa-info"></i>${title}</h4>
          <input type="radio" name="card-radio-demo" id="card-radio-demo" class="cbp-form__radio">
        </div>
        <p class="cbp-text-body cbp-mt-2">Here is an example of some supplementary text for this purely informational card</p>
      </div>
    </label>
  `;
};

const RadioCardWithMediaTemplate = ({ title, danger, ...args }) => {
  return `
    <label for="card-radio-demo" class="cbp-card ${danger && 'cbp-card--danger'}" data-component="radio-card">
      <img src="assets/images/profile-page/passenge-photo-v2.jpg" alt="portrait of a person" width="116">
      <div class="cbp-card__content">
        <div class="cbp-card__header">
          <h4 class="cbp-card__title"><i class="fas fa-info"></i>${title}</h4>
          <input type="radio" name="card-radio-demo" id="card-radio-demo" class="cbp-form__radio">
        </div>
        <p class="cbp-text-body cbp-mt-2">Here is an example of some supplementary text for this purely informational card</p>
      </div>
    </label>
  `;
};

const RadioCardWithFlagTemplate = ({ title, danger, ...args }) => {
  return `
    <label for="card-radio-demo" class="cbp-card ${danger && 'cbp-card--danger'}" data-component="radio-card" style="display: block;">
      <img src="assets/images/profile-page/passenge-photo-v2.jpg" alt="portrait of a person" width="310">
      <div class="cbp-card__header cbp-card__header--flag">
        <h4 class="cbp-card__title"><i class="fas fa-exclamation-triangle"></i>Jimbo Thompson</h4>
        <input type="radio" name="card-radio-demo" id="card-radio-demo" class="cbp-form__radio">
      </div>
    </label>
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
  title: 'General Radio Card',
  danger: false
};
RadioCardWithFlag.storyName = 'With Flag';