export default {
  title: 'Patterns/Card/Checkbox Card',
  parameters: {
    layout: 'centered'
  }
};

const DefaultCheckboxCardTemplate = ({ title, danger }) => {
  return `
    <div class="cbp-card ${danger && 'cbp-card--danger'}" data-component="checkbox-card">
      <div class="cbp-card__content">
        <div class="cbp-card__header">
          <label class="cbp-card__title" for="default-checkbox-card"><i class="fas fa-info cbp-mr-2"></i>${title}</label>
          <input type="checkbox" class="cbp-form__checkbox" name="default-checkbox-card" id="default-checkbox-card">
        </div>
        <p class="cbp-text-body cbp-mt-2">Here is an example of some supplementary text for this purely informational card</p>
      </div>
    </div>
  `;
};

const CheckCardWithMediaTemplate = ({ title, danger }) => {
  return `
    <div class="cbp-card ${danger && 'cbp-card--danger'} cbp-d-flex" data-component="checkbox-card">
      <img src="assets/images/profile-page/passenge-photo-v2.jpg" alt="portrait of a person" width="116">
      <div class="cbp-card__content">
        <div class="cbp-card__header">
          <label class="cbp-card__title" for="checkbox-card-media"><i class="fas fa-info cbp-mr-2"></i>${title}</label>
          <input type="checkbox" class="cbp-form__checkbox" name="checkbox-card-media" id="checkbox-card-media">
        </div>
        <p class="cbp-text-body cbp-mt-2">Here is an example of some supplementary text for this purely informational card</p>
      </div>
    </div>
  `;
};

const CheckCardWithFlagTemplate = ({ title, danger }) => {
  return `
    <div class="cbp-card ${danger && 'cbp-card--danger'}" data-component="checkbox-card">
      <img src="assets/images/profile-page/passenge-photo-v2.jpg" alt="portrait of a person" width="310">
      <div class="cbp-card__header cbp-card__header--flag">
        <label class="cbp-card__title" for="checkbox-card-flag"><i class="fas fa-exclamation-triangle cbp-mr-2"></i>${title}</label>
        <input type="checkbox" class="cbp-form__checkbox" name="checkbox-card-flag" id="checkbox-card-flag">
      </div>
    </div>
  `;
};

export const DefaultCheckboxCard = DefaultCheckboxCardTemplate.bind({});
DefaultCheckboxCard.args = {
  title: 'General Card',
  danger: false
};
DefaultCheckboxCard.storyName = 'Default'

export const CheckCardWithMedia = CheckCardWithMediaTemplate.bind({});
CheckCardWithMedia.args = {
  title: 'General Card',
  danger: false
};
CheckCardWithMedia.storyName = 'With Media'

export const CheckCardWithFlag = CheckCardWithFlagTemplate.bind({});
CheckCardWithFlag.args = {
  title: 'Jimbo Thompson',
  danger: false
};
CheckCardWithFlag.storyName = 'With Flag'