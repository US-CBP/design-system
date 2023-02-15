export default {
  title: 'Patterns/Header',
};

const Template = () => {
  return `
    <header class="cbp-header">
      <div class="cbp-header__brand">
        <img src="../assets/images/CBP_LOGO_HORIZONTAL_WHITE_TEXT.svg" alt="cbp brand logo" class="dh-sm-none">
        <img src="../assets/images/CBP_SEAL.svg" alt="cbp brand logo" class="dh-lg-none">
        <span class="dh-lg-none">CBP</span>
      </div>
      <div class="cbp-header__info dh-sm-none">
        <a href="#" class="cbp-header__item" target="_blank" rel="noopener noreferrer"><i class="fas fa-book"></i>App Directory</a>
        <button class="cbp-header__item"><i class="fas fa-comment"></i>Feedback</button>
        <button class="cbp-header__item"><i class="fas fa-user"></i>John Smithington</button>
      </div>
      <div class="cbp-header__info dh-lg-none">
        <a href="#" class="cbp-header__item" target="_blank" rel="noopener noreferrer"><i class="fas fa-book"></i></a>
        <button class="cbp-header__item"><i class="fas fa-comment"></i></button>
        <button class="cbp-header__item"><i class="fas fa-user"></i></button>
      </div>
    </header>
  `;
};

export const UniversalHeader = Template.bind({});
UniversalHeader.args = {};
