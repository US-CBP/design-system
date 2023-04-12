export default {
  title: 'Patterns/Badges, Chips, and Tags',
  argTypes: {
    active: {
      control: { type: 'boolean' },
      description: 'Adds a modifier class indicating an active/selected chip.'
    },
  },
};

const ChipTemplate = (args) => {
  //const active = (args.active ==true) ? 'true' : 'false';

  return `
    <button type="button" class="cbp-chip" ${args.active != undefined ? 'aria-pressed="'+args.active+'"' : ''}>
      <span class="cbp-chip__label">Hotlist</span>
      <div class="cbp-chip__icon">
        <i class="fas fa-plus"></i>
      </div>
    </button>
  `;
};

export const Chip = ChipTemplate.bind({});
Chip.args = {};