export default {
  title: 'Patterns/Accordion',
  argTypes: {
    label: { control: 'text' },
    onClick: { action: 'onClick' },
  },
};



const Template = ({ label, ...args }) => {
  return `
    <div class="cbp-accordion">
      <div class="cbp-accordion__item">
        <button class="cbp-accordion__title" aria-expanded="false" aria-controls="accordion-demo-1">
            <div>
                <i class="fas fa-angle-down"></i>
                <span>Accordion Control</span>
            </div>
        </button>

        <div class="cbp-accordion__content" aria-labelledby="accordion-demo-1">
            <h6 class="cbp-text-heading-3xs text-italic">Content Heading</h6>
            <hr>
            <p>Accordion content here.</p>
            <div class="cbp-accordion__footer">
              <p>Accordion footer</p>
            </div>
        </div>
      </div>

      <div class="cbp-accordion__item">
        <button class="cbp-accordion__title" aria-expanded="false" aria-controls="accordion-demo-1">
            <div>
              <i class="fas fa-angle-down"></i>
              <span>Accordion Control with badge</span>
            </div>
            <div class="cbp-badge">
              <span class="cbp-text-badge">7</span>
            </div>
        </button>

        <div class="cbp-accordion__content" aria-labelledby="accordion-demo-1">
          <h6 class="cbp-text-heading-3xs text-italic">Content Heading</h6>
          <hr>
          <p>Accordion content here.</p>
          <div class="cbp-accordion__footer">
            <p>Accordion footer</p>
          </div>
        </div>
      </div>
    </div>
  `;
};

export const Accordion = Template.bind({});
Accordion.args = {};
