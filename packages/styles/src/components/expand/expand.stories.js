export default {
  title: 'Patterns/Expand',
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    title: {
      name: 'Expand Title',
      description: 'Title of the Expand component to display',
      type: { name: 'string', required: true }
    },
  },
  // decorators: [
  //   (Story) => (
  //     `<div class="demo-container" style="margin: 12rem">
  //       ${Story().outerHTML || Story()}
  //     </div>`
  //   )
  // ]
};

const ExpandTemplate = ({ title }) => {
  return `
    <div class="cbp-expand">
      <div class="cbp-expand__title">
        <button><i class="fas fa-caret-down"></i></button>
        <span>${title}</span>
      </div>
      <div class="cbp-expand__content">
        <p class="cbp-text-body">There are different species of frogs and some make great pets!</p>
        <p class="cbp-text-body">Frogs can be bought at any pet store really. Here's a link to one <a href="http://petstore.com" class="cbp-text-link" target="_blank" rel="noopener noreferrer">petstore.com</a></p>
      </div>
    </div>
  `;
};

const ExpandLongTitleTemplate = ({ title }) => {
  return `
    <div class="cbp-expand" style="width: 513px">
      <div class="cbp-expand__title">
        <button><i class="fas fa-caret-down"></i></button>
        <span>${title}</span>
      </div>
      <div class="cbp-expand__content">
        <p class="cbp-text-body">There are different species of frogs and some make great pets!</p>
        <p class="cbp-text-body">Frogs can be bought at any pet store really. Here's a link to one <a href="http://petstore.com" class="cbp-text-link" target="_blank" rel="noopener noreferrer">petstore.com</a></p>
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