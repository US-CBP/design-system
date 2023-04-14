export default {
  title: 'Patterns/Badges, Chips, and Tags',
  argTypes: {
    active: {
      name: 'Active',
      control: { type: 'boolean' },
      description: 'Adds a modifier class indicating an active/selected chip.'
    },
  },
};

const ChipTemplate = ({active}) => (`
  <button type="button" class="cbp-chip" aria-pressed="${active ? active.toString() : 'false'}">
    <span class="cbp-chip__label">Hotlist</span>
    <div class="cbp-chip__icon">
      <i class="fas fa-plus"></i>
    </div>
  </button>
`);

export const Chip = ChipTemplate.bind({});
Chip.args = {};