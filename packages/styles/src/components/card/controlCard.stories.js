export default {
  title: 'Patterns/Card',
  parameters: {
    layout: 'centered'
  }
};

const LinkCardTemplate = ({ title, ...args }) => {
  return `
    <div href="#" class="cbp-card" data-component="card">
      <div class="cbp-card__content">
        <div class="cbp-card__header">
          <h4 class="cbp-card__title"><i class="fas fa-info"></i>${title}</h4>
          <i class="fas fa-arrow-circle-right"></i>
        </div>
        <p class="cbp-text-body">Here is an example of some supplementary text for this purely informational card</p>
      </div>
    </div>
  `;
};

const RadioCardTemplate = ({ title, danger, ...args }) => {
  return `
    <label for="card-radio-demo" class="cbp-card__radio ${danger && 'cbp-card__radio--danger'}">
      <div class="cbp-card__content">
        <div class="cbp-card__header">
          <h4 class="cbp-card__title"><i class="fas fa-info"></i>${title}</h4>
          <input type="radio" name="card-radio-demo" id="card-radio-demo" class="cbp-form__radio">
        </div>
        <p class="cbp-text-body">Here is an example of some supplementary text for this purely informational card</p>
      </div>
    </label>
  `;
};

const CheckCardTemplate = ({ title, danger, ...args }) => {
  return `
    <label for="card-checkbox-demo" class="cbp-card__checkbox ${danger && 'cbp-card__checkbox--danger'}">
      <div class="cbp-card__content">
        <div class="cbp-card__header">
          <h4 class="cbp-card__title"><i class="fas fa-info"></i>${title}</h4>
          <input type="checkbox" name="card-checkbox-demo" class="cbp-form__checkbox" id="card-checkbox-demo">
        </div>
        <p class="cbp-text-body">Here is an example of some supplementary text for this purely informational card</p>
      </div>
    </label>
  `;
};

export const LinkCard = LinkCardTemplate.bind({});
LinkCard.args = {
  title: 'General Card',
  danger: false
};

export const RadioCard = RadioCardTemplate.bind({});
RadioCard.args = {
  title: 'General Card',
  danger: false
};

export const CheckCard = CheckCardTemplate.bind({});
CheckCard.args = {
  title: 'General Card',
  danger: false
};