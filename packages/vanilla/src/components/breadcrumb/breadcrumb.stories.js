export default {
  title: 'Patterns/Breadcrumb',
  argType: {},
};

const Template = () => {
  return `
    <ul class="cbp-breadcrumb" data-breadcrumb="true">
      <li class="cbp-breadcrumb__item">
        <a href="/" aria-label="Home">
          <i class="fas fa-home"></i>
        </a>
      </li>
      <li class="cbp-breadcrumb__item">
        <a href="#">Child Page</a>
      </li>
      <li class="cbp-breadcrumb__item">
      <div class="cbp-menu">
        <button
          type="button"
          aria-haspopup="menu"
          aria-controls="menu1"
          aria-label="More Options"
          id="menubutton1"
          class="cbp-menu__control cbp-btn-square cbp-btn__secondary-ghost"
          aria-expanded="false"
        >
          <i class="fas fa-ellipsis-v"></i>
        </button>
        <ul
          role="menu"
          id="menu1"
          class="cbp-menu__menu cbp-menu--bottom-start"
          aria-labelledby="menubutton1"
        >
          <li class="cbp-menu__item">
            <a href="#" tabindex="-1">First Option</a>
          </li>
          <li class="cbp-menu__item">
            <a href="#" tabindex="-1">Second Option</a>
          </li>
          <li class="cbp-menu__item">
            <a href="#" tabindex="-1">Third Option</a>
          </li>
          <li class="cbp-menu__item">
            <button class="cbp-menu__close-btn" tabindex="-1">
              <i class="fas fa-times-circle"></i>Close
            </button>
          </li>
        </ul>
      </div>    
      </li>
      <li class="cbp-breadcrumb__item">
        <a href="#">Grandchild Page</a>
      </li>
    </ul>
  `;
};

const CondensedTemplate = () => {
  return `
    <ul class="cbp-breadcrumb">
      <li class="cbp-breadcrumb__item">
        <a href="/" aria-label="Home">
          <i class="fas fa-home"></i>
        </a href="/">
      </li>
      <li class="cbp-breadcrumb__item">
        <a href="#">Grandchild Page</a>
      </li>
    </ul>
  `;
};

export const Default = Template.bind({});
Default.args = {};

export const Condensed = CondensedTemplate.bind({});
Condensed.args = {};