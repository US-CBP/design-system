export default {
  title: 'Patterns/Card/Checkbox Card',
  parameters: {
    layout: 'centered'
  }
};

const DefaultCheckboxCardTemplate = ({ title, danger, ...args }) => {
  return `
    <label for="card-checkbox-demo" class="cbp-card ${danger && 'cbp-card--danger'}" data-card="check">
      <div class="cbp-card__content">
        <div class="cbp-card__header">
          <h4 class="cbp-card__title"><i class="fas fa-info"></i>${title}</h4>
          <input type="checkbox" name="card-checkbox-demo" class="cbp-form__checkbox" id="card-checkbox-demo">
        </div>
        <p class="cbp-text-body cbp-mt-2">Here is an example of some supplementary text for this purely informational card</p>
      </div>
    </label>
  `;
};

const CheckCardWithMediaTemplate = ({ title, danger, ...args }) => {
  return `
    <label for="card-checkbox-demo" class="cbp-card ${danger && 'cbp-card--danger'}" data-card="check">
      <img src="assets/images/profile-page/passenge-photo-v2.jpg" alt="portrait of a person" width="116">
      <div class="cbp-card__content">
        <div class="cbp-card__header">
          <h4 class="cbp-card__title"><i class="fas fa-info"></i>${title}</h4>
          <input type="checkbox" name="card-checkbox-demo" id="card-checkbox-demo" class="cbp-form__checkbox">
        </div>
        <p class="cbp-text-body cbp-mt-2">Here is an example of some supplementary text for this purely informational card</p>
      </div>
    </label>
  `;
};

const CheckCardWithFlagTemplate = ({ title, danger, ...args }) => {
  return `
    <label for="card-checkbox-demo" class="cbp-card ${danger && 'cbp-card--danger'} cbp-d-block" data-card="check">
      <img src="assets/images/profile-page/passenge-photo-v2.jpg" alt="portrait of a person" width="310">
      <div class="cbp-card__header cbp-card__header--flag">
        <h4 class="cbp-card__title"><i class="fas fa-exclamation-triangle"></i>Jimbo Thompson</h4>
        <input type="checkbox" name="card-checkbox-demo" id="card-checkbox-demo" class="cbp-form__checkbox">
      </div>
    </label>
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
  title: 'General Card',
  danger: false
};
CheckCardWithFlag.storyName = 'With Flag'