export default {
  title: 'Patterns/Expand',
  argType: {},
};

const Template = () => {
  return `
    <div class="cbp-expand">
      <div class="cbp-expand__title">
        <button>
          <i class="fas fa-caret-down"></i>
        </button>
        <span>
          This is a question about where frogs live.
        </span>
      </div>
      <div class="cbp-expand__content">
        <ul class="cbp-expand__list">
          <li>There are different species of frogs and some make great pets!</li>
          <li>Frogs can be bought at any pet store really. Here's a link to one <a href="http://petstore.com"
              class="cbp-text-link" target="_blank" rel="noopener noreferrer">petstore.com</a></li>
        </ul>
      </div>
    </div>
    <div class="cbp-expand">
      <div class="cbp-expand__title">
        <button>
          <i class="fas fa-caret-down"></i>
        </button>
        <span>
          This is a question about where frogs live.
        </span>
      </div>
      <div class="cbp-expand__content">
        <ul class="cbp-expand__list">
          <li>Frogs can be bought at any pet store really. Here's a link to one <a href="http://petstore.com"
              target="_blank" rel="noopener noreferrer">petstore.com</a></li>
        </ul>
      </div>
    </div>
    <div class="cbp-expand">
      <div class="cbp-expand__title">
        <button>
          <i class="fas fa-caret-down"></i>
        </button>
        <span>
          Some facts about dinosaurs and their eating habits that you should teach your kids.
        </span>
      </div>
      <div class="cbp-expand__content">
        <ul class="cbp-expand__list">
          <li>Frogs can be bought at any pet store really. Here's a link to one <a href="http://petstore.com"
              target="_blank" rel="noopener noreferrer">petstore.com</a></li>
        </ul>
      </div>
    </div>
  `;
};

export const Expand = Template.bind({});
Expand.args = {};
