export default {
  title: 'Patterns/Breadcrumb',
  argType: {},
};

const Template = () => {
  return `
    <ul class="cbp-breadcrumb" data-breadcrumb="true">
      <li class="cbp-breadcrumb__item">
        <a href="/" class="cbp-breadcrumb__btn" aria-label="Home">
          <i class="fas fa-home"></i>
        </a>
      </li>
      <li class="cbp-breadcrumb__item">
        <a href="#">Child Page</a>
      </li>
      <li class="cbp-breadcrumb__item">
        <a href="#">Grandchild Page</a>
      </li>
    </ul>
  `;
};

export const Default = Template.bind({});
Default.args = {};
