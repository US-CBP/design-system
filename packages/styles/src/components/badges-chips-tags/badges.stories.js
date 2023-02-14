export default {
  title: 'Patterns/Badges, Chips & Tags/Badges',
  argTypes: {},
};

const Template = () => {
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

export const Badges = Template.bind({});
Badges.args = {};
