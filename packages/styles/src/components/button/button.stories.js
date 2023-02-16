export default {
  title: 'Patterns/Button',
  argType: {
    className: { control: 'text' }
  },
};

const Template = ({ className }) => {
  return `
    <button class="${className}">
      <i class="fas fa-clipboard-check"></i>
      vet passenger
    </button>
  `;
};

export const Primary = Template.bind({});
Primary.args = {
  className: 'cbp-btn cbp-btn__primary'
};

export const PrimaryOutline = Template.bind({});
PrimaryOutline.args = {
  className: 'cbp-btn cbp-btn__primary--outline'
};

export const PrimaryGhost = Template.bind({});
PrimaryGhost.args = {
  className: 'cbp-btn cbp-btn__primary--ghost'
};

export const Secondary = Template.bind({});
Secondary.args = {
  className: 'cbp-btn cbp-btn__secondary'
};

export const SecondaryOutline = Template.bind({});
SecondaryOutline.args = {
  className: 'cbp-btn cbp-btn__secondary--outline'
};

export const SecondaryGhost = Template.bind({});
SecondaryGhost.args = {
  className: 'cbp-btn cbp-btn__secondary--ghost'
};

export const Danger = Template.bind({});
Danger.args = {
  className: 'cbp-btn cbp-btn__danger'
};

export const DangerOutline = Template.bind({});
DangerOutline.args = {
  className: 'cbp-btn cbp-btn__danger--outline'
};

export const DangerGhost = Template.bind({});
DangerGhost.args = {
  className: 'cbp-btn cbp-btn__danger--ghost'
};

export const CTAButton = Template.bind({});
CTAButton.args = {
  className: 'cbp-btn cbp-btn__cta'
};