export default {
  title: 'Patterns/Expand',
  parameters: {
    html: {
      root: '.wrapper'
    }
  },
  argTypes: {
    title: {
      name: 'Expand Title',
      description: 'Title of the Expand component to display',
      type: { name: 'string' }
    },
  },
  decorators: [
    (Story) => `
      <div class="wrapper" style="margin-top: 2rem; margin-left: 2rem;">${Story().outerHTML || Story()}</div>
    `
  ]
};

const ExpandTemplate = ({ title }) => {
  return `
    <div class="cbp-expand">
      <div class="cbp-expand__title">
        <button
          type="button"
          aria-expanded="false"
          aria-labelledby="expand-title"
        >
          <i class="fas fa-caret-down"></i>
        </button>
        <span id="expand-title">${title}</span>
      </div>
      <div class="cbp-expand__content" aria-hidden="true">
        <p class="cbp-text-body">There are different species of frogs and some make great pets!</p>
        <p class="cbp-text-body cbp-margin-top-4x">Frogs can be bought at any pet store really. Here's a link to one <a href="http://petstore.com" class="cbp-text-link" target="_blank" rel="noopener noreferrer">petstore.com</a></p>
      </div>
    </div>
  `;
};

const ExpandLongTitleTemplate = ({ title }) => {
  return `
    <div class="cbp-expand">
      <div class="cbp-expand__title">
        <button 
          type="button"
          aria-expanded="false"
          aria-labelledby="expand-title"
        >
          <i class="fas fa-caret-down"></i>
        </button>
        <span id="expand-title">${title}</span>
      </div>
      <div class="cbp-expand__content" aria-hidden="true">
        <p class="cbp-text-body">There are different species of frogs and some make great pets!</p>
        <p class="cbp-text-body cbp-margin-top-4x">Frogs can be bought at any pet store really. Here's a link to one <a href="http://petstore.com" class="cbp-text-link" target="_blank" rel="noopener noreferrer">petstore.com</a></p>
      </div>
    </div>
  `
}

export const Expand = ExpandTemplate.bind({});
Expand.args = {
  title: 'This is a question about where frogs live.'
};

export const ExpandLongTitle = ExpandLongTitleTemplate.bind({});
ExpandLongTitle.args = {
  title: 'Some facts about dinosaurs and their eating habits that you should teach your kids.'
}
ExpandLongTitle.storyName = 'Expand w/ Long Title';