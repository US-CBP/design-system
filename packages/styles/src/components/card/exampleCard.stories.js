export default {
  title: 'Patterns/Card/Examples',
  parameters: {
    layout: 'centered'
  }
};

const ProfileCardTemplate = ({ label, ...args }) => {
  return `
    <div class="cbp-card-action cbp-card-action--danger">
      <div class="cbp-card-action__wrapper">
        <img class="cbp-card-action__media" src="assets/images/profile-page/passenge-photo-v2.jpg" alt="portrait image of person" />
        <h4 class="cbp-card__flag"><i class="fas fa-exclamation-triangle"></i>Jimbo Thompson</h4>
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
        <button><i class="fas fa-eye"></i>View Profile</button>
      </div>
    </div>
  `;
};

const PortCardTemplate = ({ label, ...args }) => {
  return `
    <div class="cbp-card">
      <div class="cbp-card__content">
        <div class="cbp-card__img">
          <img src="assets/images/profile-page/passenge-photo-v2.jpg" alt="card general image" />
        </div>
        <div class="cbp-card__flag">
          <i class="fas fa-vector-square"></i>
          <h4>Cypress Pass</h4>
        </div>
        <div class="cbp-card__body">
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
      <div class="cbp-card__buttons cbp-card__buttons--single">
        <button><i class="fas fa-eye"></i>View Profile</button>
      </div>
    </div>
  `;
};

export const ProfileCard = ProfileCardTemplate.bind({});
ProfileCard.args = {};

export const PortCard = PortCardTemplate.bind({});
PortCard.args = {};