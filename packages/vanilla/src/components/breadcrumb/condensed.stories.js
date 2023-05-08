export default {
  title: 'Patterns/Breadcrumb',
  argType: {},
};

const Template = () => {
  return `
    <div> 
      <ul class="cbp-breadcrumb cbp-breadcrumb--condensed">
        <li class="cbp-breadcrumb__item">
          <button class="cbp-breadcrumb__btn">
            <i class="fas fa-home"></i>
          </button>
        </li>
        <li class="cbp-breadcrumb__item">
          <div class="cbp-overflow-menu__wrapper">
            <button class="cbp-breadcrumb__btn" id="btn3" onclick="openOverflowMenu('menu3', this)">
              <i class="fas fa-ellipsis-h"></i>
            </button>
            <ul class="cbp-overflow-menu cbp-overflow-menu--top-left" id="menu3" data-menu-type="breadcrumb">
              <li class="cbp-overflow-menu__item">
                <a href="#"><i class="fas fa-home"></i>Home Page (A)</a>
              </li>
              <li class="cbp-overflow-menu__item">
                <a href="#"><i class="fas fa-arrow-right"></i>Child Page (B)</a>
              </li>
              <li class="cbp-overflow-menu__item">
                <a href="#"><i class="fas fa-arrow-right"></i>Grandchild Page (C)</a>
              </li>
              <li class="cbp-overflow-menu__item">
                <a href="#"><i class="fas fa-arrow-right"></i>Great-Grandchild Page (D)</a>
              </li>
              <li>
                <button class="cbp-overflow-menu__btn" onclick="closeOverflowMenu()"><i
                    class="fas fa-times-circle"></i>Close</button>
              </li>
            </ul>
          </div>
        </li>
        <li class="cbp-breadcrumb__item">
          <a href="#">Grandchild Page</a>
        </li>
      </ul>
      <h1 class="cbp-lastcrumb">Primary Passengers Application</h1>
    </div>
  `;
};

export const Condensed = Template.bind({});
Condensed.args = {};
