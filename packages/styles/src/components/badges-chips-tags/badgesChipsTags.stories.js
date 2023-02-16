export default {
  title: 'Patterns/Badges, Chips & Tags',
  argTypes: {},
};

const BadgeTemplate = () => {
  return `
    <div style="display: flex; margin-bottom: 1rem;">
      <div class="cbp-badge margin-right-1">
        <span class="cbp-text-badge">0</span>
      </div>
      <div class="cbp-badge margin-right-1">
        <span class="cbp-text-badge">7</span>
      </div>
      <div class="cbp-badge margin-right-1">
        <span class="cbp-text-badge">73</span>
      </div>
      <div>
        <div class="cbp-badge margin-right-1">
          <span class="cbp-text-badge">99+</span>
        </div>
      </div>
      <div>
        <div class="cbp-badge cbp-badge--danger">
          <span class="cbp-text-badge">7</span>
        </div>
      </div>
    </div>
  `;
};

const ChipTemplate = () => {
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
  `;
};

const TagTemplate = () => {
  return `
    <div style="display: flex; margin-bottom: 1rem;">
      <div class="cbp-tag margin-right-1">
        <span>Hotlist</span>
      </div>
      <div class="cbp-tag cbp-tag--warning margin-right-1">
        <span>Warning</span>
      </div>
      <div class="cbp-tag cbp-tag--success margin-right-1">
        <span>Online</span>
      </div>
      <div class="cbp-tag cbp-tag--danger margin-right-1">
        <span>Danger</span>
      </div>
    </div>
  `;
};

export const Badges = BadgeTemplate.bind({});
Badges.args = {};

export const Chips = ChipTemplate.bind({});
Chips.args = {};

export const Tags = TagTemplate.bind({});
Tags.args = {};
