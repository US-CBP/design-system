export default {
  title: 'Patterns/Accordion',
  argTypes: {
    defaultAccordion: {
      name: 'Accordion (Default)',
    },
    badgeAccordion: {
      name: 'Accordion w/ Badge',
    }, 
    iconAccordion: {
      name: 'Accordion w/ Icon',
    }
  }
};

const Template = ({ defaultAccordion, badgeAccordion, iconAccordion }) => {
  return `
    <div class="cbp-accordion">

      <div class="cbp-accordion__item ${defaultAccordion.danger ? 'cbp-accordion__item--danger' : ''}">
        <button class="cbp-accordion__control" id="accordion1"  aria-controls="accordion-content-1">
          <span class="cbp-accordion__title">
            <i class="fas fa-chevron-down"></i>
            ${defaultAccordion.title}
          </span>
        </button>
        <div class="cbp-accordion__content" id="accordion-content-1" aria-labelledby="accordion1" hidden>
          <p class="cbp-font-style-italic">Content Area</p>
        </div>
      </div>

      <div class="cbp-accordion__item ${badgeAccordion.danger ? 'cbp-accordion__item--danger' : ''}">
        <button class="cbp-accordion__control" id="accordion2" aria-controls="accordion-content-2">
          <span class="cbp-accordion__title">
            <i class="fas fa-chevron-down"></i>
            ${badgeAccordion.title}
          </span>
          <div class="cbp-badge">
            <span class="cbp-text-badge">16</span>
          </div>
        </button>

        <div class="cbp-accordion__content" id="accordion-content-2" aria-labelledby="accordion2" hidden>
          <p class="cbp-font-style-italic">Content Area</p>
        </div>
      </div>

      <div class="cbp-accordion__item ${iconAccordion.danger ? 'cbp-accordion__item--danger' : ''}">
        <button class="cbp-accordion__control" id="accordion3" aria-controls="accordion-content-3">
          <span class="cbp-accordion__title">
            <i class="fas fa-chevron-down"></i>
            ${iconAccordion.title}
          </span>
          <i class="fas fa-exclamation-triangle"></i>
        </button>
        <div class="cbp-accordion__content" id="accordion-content-3" aria-labelledby="accordion3" hidden>
          <p class="cbp-font-style-italic">Content Area</p>
        </div>
      </div>

    </div>
  `;
};

export const Accordion = Template.bind({});
Accordion.args = {
  defaultAccordion: {
    title: 'Accordion (Default)',
    danger: false
  },
  badgeAccordion: {
    title: 'Accordion w/ Badge',
    danger: false
  }, 
  iconAccordion: {
    title: 'Accordion w/ Icon',
    danger: false
  }
};
