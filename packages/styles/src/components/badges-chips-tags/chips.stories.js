export default {
  title: 'Patterns/Badges, Chips & Tags',
  argTypes: {},
};

const Template = () => {
  return `
    <div style="display: flex; margin-bottom: 1rem;">
      <div class="cbp-chips margin-right-1">
        <span>Hotlist</span>
        <div class="plus-border">
          <i class="fas fa-plus"></i>
        </div>
      </div>
      <div class="cbp-chips cbp-chips--active">
        <span>Hotlist</span>
        <div class="plus-border">
          <i class="fas fa-plus"></i>
        </div>
      </div>
    </div>
  `
}

export const Chips = Template.bind({});
Chips.args = {};