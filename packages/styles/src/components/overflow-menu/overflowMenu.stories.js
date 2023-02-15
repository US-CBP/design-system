export default {
  title: 'Patterns/Overflow Menu'
};

const OverflowMenuTemplate = () => {
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

const CondensedOverflowMenuTemplate = () => {
  return `
    <div class="cbp-overflow-menu__wrapper">
      <button class="cbp-btn--action" id="btn2" onclick="openOverflowMenu('menu2', this)">
        <i class="fas fa-ellipsis-v"></i>
      </button>
      <ul class="cbp-overflow-menu cbp-overflow-menu--condensed cbp-overflow-menu--top-left" id="menu2">
        <li class="cbp-overflow-menu__item">
          <a href="#"><i class="fas fa-sync-alt"></i>Refresh</a>
        </li>
        <li class="cbp-overflow-menu__item">
          <a href="#"><i class="fas fa-copy"></i>Copy</a>
        </li>
        <li class="cbp-overflow-menu__item">
          <button><i class="fas fa-download"></i>Export as .csv</button>
        </li>
        <li class="cbp-overflow-menu__item cbp-overflow-menu__item--danger">
          <button><i class="fas fa-trash-alt"></i>Delete</button>
        </li>
        <li>
          <button class="cbp-overflow-menu__btn" onclick="closeOverflowMenu()"><i class="fas fa-times-circle"></i>Close</button>
        </li>
      </ul>
    </div>
  `
}

export const OverflowMenu = OverflowMenuTemplate.bind({});
OverflowMenu.args = {}

export const CondensedOverflowMenu = CondensedOverflowMenuTemplate.bind({});
CondensedOverflowMenu.args = {}
