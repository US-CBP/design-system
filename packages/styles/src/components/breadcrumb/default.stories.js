export default {
  title: 'Patterns/Breadcrumb',
  argType: {},
};

const Template = () => {
  return `
    <div>
      <ul class="cbp-breadcrumb" data-breadcrumb="true">
        <li class="cbp-breadcrumb__item">
          <button class="cbp-breadcrumb__btn">
            <i class="fas fa-home"></i>
          </button>
        </li>
        <li class="cbp-breadcrumb__item">
          <a href="#">Child Page</a>
        </li>
        <li class="cbp-breadcrumb__item">
          <a href="#">Grandchild Page</a>
        </li>
      </ul>
      <h1 class="cbp-lastcrumb">Primary Passengers Application</h1>
    </div> 
  `;
};

export const Default = Template.bind({});
Default.args = {};
