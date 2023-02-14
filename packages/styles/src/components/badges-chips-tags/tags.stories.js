export default {
  title: 'Patterns/Badges, Chips & Tags',
  argTypes: {},
};

const Template = () => {
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
  `
}

export const Tags = Template.bind({});
Tags.args = {};