export default {
  title: 'Patterns/Overflow Menu'
};

const Template = () => {
  return `
    <div class="cbp-overflow-menu__wrapper">
      <button class="cbp-btn--action" id="btn1" onclick="openOverflowMenu('menu1', this)">
        <i class="fas fa-ellipsis-v"></i>
      </button>
      <ul class="cbp-overflow-menu cbp-overflow-menu--top-left" id="menu1">
        <li class="cbp-overflow-menu__item">
          <a href="#">First Option</a>
        </li>
        <li class="cbp-overflow-menu__item">
          <a href="#">Second Option</a>
        </li>
        <li class="cbp-overflow-menu__item">
          <a href="#">Third Option</a>
        </li>
        <li>
          <button class="cbp-overflow-menu__btn" onclick="closeOverflowMenu()"><i class="fas fa-times-circle"></i>Close</button>
        </li>
      </ul>
    </div>
  `
}

export const OverflowMenu = Template.bind({});
OverflowMenu.args = {}
