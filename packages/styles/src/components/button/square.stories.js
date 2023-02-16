export default {
  title: 'Patterns/Button',
  argType: {
    className: { control: 'text' },
  },
};

const Template = ({ className }) => {
  return `
    <button class="${className}">
      <i class="fas fa-clipboard-check"></i>
    </button>
  `;
};

export const PrimarySquare = Template.bind({});
PrimarySquare.args = {
  className: 'cbp-btn cbp-btn__square cbp-btn__square-primary',
};

export const PrimaryOutlineSquare = Template.bind({});
PrimaryOutlineSquare.args = {
  className: 'cbp-btn cbp-btn__square cbp-btn__square-primary--outline',
};

export const PrimaryGhostSquare = Template.bind({});
PrimaryGhostSquare.args = {
  className: 'cbp-btn cbp-btn__square cbp-btn__square-primary--ghost',
};

export const SecondarySquare = Template.bind({});
SecondarySquare.args = {
  className: 'cbp-btn cbp-btn__square cbp-btn__square-secondary',
};

export const SecondaryOutlineSquare = Template.bind({});
SecondaryOutlineSquare.args = {
  className: 'cbp-btn cbp-btn__square cbp-btn__square-secondary--outline',
};

export const SecondaryGhostSquare = Template.bind({});
SecondaryGhostSquare.args = {
  className: 'cbp-btn cbp-btn__square cbp-btn__square-secondary--ghost',
};

export const DangerSquare = Template.bind({});
DangerSquare.args = {
  className: 'cbp-btn cbp-btn__square cbp-btn__square-danger',
};

export const DangerOutlineSquare = Template.bind({});
DangerOutlineSquare.args = {
  className: 'cbp-btn cbp-btn__square cbp-btn__square-danger--outline',
};

export const DangerGhostSquare = Template.bind({});
DangerGhostSquare.args = {
  className: 'cbp-btn cbp-btn__square cbp-btn__square-danger--ghost',
};

export const PrimaryFloatingAction = Template.bind({});
PrimaryFloatingAction.args = {
  className: 'cbp-btn cbp-btn__primary cbp-btn__primary--float',
};

export const SecondaryFloatingAction = Template.bind({});
SecondaryFloatingAction.args = {
  className: 'cbp-btn cbp-btn__secondary cbp-btn__secondary--float',
};
