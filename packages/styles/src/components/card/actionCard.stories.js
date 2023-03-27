import { renderButtons, renderLinks } from "./templates";

export default {
  title: 'Patterns/Card/Action Card',
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    title: {
      name: 'Card Title',
      description: 'Title of the Card component to display',
      type: { name: 'string', required: false }
    },
    actionsLayout: {
      name: 'Actions Layout',
      description: 'Choose button layout of the card component',
      control: 'radio',
      options: ['single', 'double', 'triple']
    },
    modifiers: {
      name: 'Modifiers',
      description: 'Choose modifier for the state of card',
      control: 'radio',
      options: ['default', 'cbp-card-decision--danger']
    }
  }
};

const DefaultActionCardTemplate = ({ title, actionsLayout, modifiers }) => {
  return `
    <div class="cbp-card-decision ${modifiers}">
      <div class="cbp-card-decision__wrapper cbp-card-decision__content">
        <div class="cbp-card__header">
          <h4 class="cbp-card__title"><i class="fas fa-circle"></i>${title}</h4>
          <button class="cbp-btn cbp-btn__square cbp-btn__square-secondary--ghost">
            <i class="fas fa-clipboard-check"></i>
          </button>
        </div>
        <p class="cbp-text-body">
          The card has this passage of example text to emphasize
          truncation and reveal functionality and some other things...
        </p>
        <div class="cbp-row">
          <button class="cbp-btn cbp-btn__secondary--ghost">
            <i class="fas fa-angle-down"></i>
            More
          </button>
        </div>
      </div>
      ${renderButtons(actionsLayout)}
    </div>
  `;
};

const DefaultActionLinksCardTemplate = ({ title, actionsLayout, modifiers}) => {
  return `
    <div class="cbp-card-decision ${modifiers}">
      <div class="cbp-card-decision__wrapper cbp-card-decision__content">
        <div class="cbp-card__header">
          <h4 class="cbp-card__title"><i class="fas fa-circle"></i>${title}</h4>
          <button class="cbp-btn cbp-btn__square cbp-btn__square-secondary--ghost">
            <i class="fas fa-clipboard-check"></i>
          </button>
        </div>
        <p class="cbp-text-body">
          The card has this passage of example text to emphasize
          truncation and reveal functionality and some other things...
        </p>
        <div class="cbp-row">
          <button class="cbp-btn cbp-btn__secondary--ghost">
            <i class="fas fa-angle-down"></i>
            More
          </button>
        </div>
      </div>
      ${renderLinks(actionsLayout)}
    </div>
  `;
};

const ProfileCardTemplate = ({ title, modifiers, actionsLayout }) => {
  return `
    <div class="cbp-card-decision ${modifiers}">
      <div class="cbp-card-decision__wrapper">
        <img class="cbp-card-decision__media" src="assets/images/profile-page/passenge-photo-v2.jpg" alt="portrait image of person" />
        <div class="cbp-card__header cbp-card__header--flag">
          <h4 class="cbp-card__title"><i class="fas fa-exclamation-triangle"></i>${title}</h4>
        </div>
        <div class="cbp-card-decision__content">
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
      ${renderButtons(actionsLayout)}
    </div>
  `;
};

const PortCardTemplate = ({ title, modifiers, actionsLayout }) => {
  return `
    <div class="cbp-card-decision ${modifiers}">
      <div class="cbp-card-decision__wrapper">
      <img class="cbp-card-decision__media" src="assets/images/profile-page/passenge-photo-v2.jpg" alt="portrait image of person" />
      <div class="cbp-card__header cbp-card__header--flag">
        <h4 class="cbp-card__title"><i class="fas fa-exclamation-triangle"></i>${title}</h4>
      </div>
        <div class="cbp-card-decision__content">
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
      ${renderButtons(actionsLayout)}
    </div>
  `;
};

export const DefaultActionCard = DefaultActionCardTemplate.bind({});
DefaultActionCard.args = {
  title: 'Decision Card 1',
  actionsLayout: 'single',
  modifiers: 'default'
};
DefaultActionCard.storyName = 'Default';

export const DefaultActionLinksCard = DefaultActionLinksCardTemplate.bind({});
DefaultActionLinksCard.args = {
  title: 'Decision Card 1',
  actionsLayout: 'single',
  modifiers: 'default'
};
DefaultActionLinksCard.storyName = 'Default With Links'

export const ProfileCard = ProfileCardTemplate.bind({});
ProfileCard.args = {
  title: 'Jimbo Thompson',
  actionsLayout: 'single',
  modifiers: 'default'
};
ProfileCard.storyName = 'Example Profile Card';

export const PortCard = PortCardTemplate.bind({});
PortCard.args = {
  title: 'Cyruss Hill',
  actionsLayout: 'single',
  modifiers: 'default'
};
PortCard.storyName = 'Example Port Card';