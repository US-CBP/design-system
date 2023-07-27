export default {
  title: 'Patterns/List'
};

const Template = () => (
  `
    <div class="cbp-structured-list">
      <div class="cbp-structured-list__header">
        <span>56 Results</span>
      </div>
      <ul class="cbp-structured-list__list cbp-structured-list__list--striped">
        <li class="cbp-structured-list__item">
          <p>Some Content</p>
        </li>
        <li class="cbp-structured-list__item">
          <p>Some Content</p>
        </li>
        <li class="cbp-structured-list__item">
          <p>Some Content</p>
        </li>
        <li class="cbp-structured-list__item">
          <p>Some Content</p>
        </li>
      </ul>
    </div>
  `
)


export const StructuredList = Template.bind({});
StructuredList.args = {};
StructuredList.argTypes = {}