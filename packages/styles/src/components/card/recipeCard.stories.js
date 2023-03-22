export default {
  title: 'Patterns/Card/Recipes',
  parameters: {
    layout: 'centered'
  }
};

const ProfileCardTemplate = ({ title, danger, ...args }) => {
  return `
    <div class="cbp-card-action ${danger && 'cbp-card-action--danger'}">
      <div class="cbp-card-action__wrapper">
        <img class="cbp-card-action__media" src="assets/images/profile-page/passenge-photo-v2.jpg" alt="portrait image of person" />
        <div class="cbp-card__header cbp-card__header--flag">
          <h4 class="cbp-card__title"><i class="fas fa-exclamation-triangle"></i>${title}</h4>
        </div>
        <div class="cbp-card-action__content">
          <div class="cbp-row" style="margin-bottom: 8px;">
            <b>Sex:</b>&nbsp;<span style="margin-right: 18px;">Male</span>
            <b>DOB:</b>&nbsp;<span>01/01/1980</span>
          </div>
          <div class="cbp-row" style="margin-bottom: 8px;">
            <b>Citizenship:</b>&nbsp;<span>United States of American</span>
          </div>
          <div class="cbp-row">
            <b>Place of Birth:</b>&nbsp;<span>New York, New York USA</span>
          </div>
        </div>
      </div>
      <div class="cbp-card-action__buttons cbp-card__buttons--single">
        <button class="cbp-btn__${danger ? 'danger' : 'primary'}"><i class="fas fa-eye"></i>View Profile</button>
      </div>
    </div>
  `;
};

const PortCardTemplate = ({ title, danger, ...args }) => {
  return `
    <div class="cbp-card-action ${danger && 'cbp-card-action--danger'}">
      <div class="cbp-card-action__wrapper">
      <img class="cbp-card-action__media" src="assets/images/profile-page/passenge-photo-v2.jpg" alt="portrait image of person" />
      <div class="cbp-card__header cbp-card__header--flag">
        <h4 class="cbp-card__title"><i class="fas fa-exclamation-triangle"></i>${title}</h4>
      </div>
        <div class="cbp-card-action__content">
          <div class="cbp-row" style="margin-bottom: 8px;">
            <h6 class="cbp-heading-xs">Port of Arrival</h6>
          </div>
          <div class="cbp-row" style="margin-bottom: 12px;">
            <span>Jacksonville, FL&nbsp;|&nbsp;</span>
            <span>1/2/2018&nbsp;|&nbsp;</span>
            <span>12:00 EST</span>
          </div>
          <div class="cbp-row" style="margin-bottom: 8px;">
            <h6 class="cbp-heading-xs">Port of Departure</h6>
          </div>
          <div class="cbp-row" style="margin-bottom: 12px;">
            <span>Tincan/Lagos, NG&nbsp;|&nbsp;</span>
            <span>1/2/2018&nbsp;|&nbsp;</span>
            <span>12:00 EST</span>
          </div>
          <div class="cbp-row" style="margin-bottom: 8px;">
            <div class="cbp-grid-col-2-sm cbp-grid-col-4-md cbp-grid-col-6-lg" style="margin: 0 !important;">
              <b>Voyage:</b>&nbsp;<span>6</span>
              <b>Crew:</b>&nbsp;<span>8</span>
              <b>Containers:</b>&nbsp;<span>253</span>
            </div>

            <div class="cbp-grid-col-2-sm cbp-grid-col-4-md cbp-grid-col-6-lg" style="margin-right: 0 !important;">
              <b>Passenger:</b>&nbsp;<span>55425TV</span>
              <b>Engine:</b>&nbsp;<span>Under Power</span>
              <b>Filing(s) Status:</b>&nbsp;<span>Yes</span>
            </div>
          </div>
        </div>
      </div>
      <div class="cbp-card-action__buttons cbp-card__buttons--single">
        <button class="cbp-btn__${danger ? 'danger' : 'primary'}"><i class="fas fa-eye"></i>View Profile</button>
      </div>
    </div>
  `;
};

export const ProfileCard = ProfileCardTemplate.bind({});
ProfileCard.args = {
  title: 'Jimbo Thompson',
  danger: false
};

export const PortCard = PortCardTemplate.bind({});
PortCard.args = {
  title: 'Jimbo Thompson',
  danger: false
};