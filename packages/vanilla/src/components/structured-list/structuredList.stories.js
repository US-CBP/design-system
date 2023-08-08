export default {
  title: 'Patterns'
};

const Template = () => (
  `
    <div class="cbp-structured-list__wrapper">
      <div class="cbp-structured-list__header">
        <span>56 Results - 3 Filters Applied Updated: 11/20/2020 10:10:00 EST</span>
      </div>
      <ul class="cbp-structured-list">
        <li class="cbp-structured-list__item">
          LIST CONTENT
        </li>
        <li class="cbp-structured-list__item">
          LIST CONTENT
        </li>
        <li class="cbp-structured-list__item">
          LIST CONTENT
        </li>
        <li class="cbp-structured-list__item">
          LIST CONTENT
        </li>
      </ul>
    </div>
  `
)


export const StructuredList = Template.bind({});
StructuredList.args = {};
StructuredList.argTypes = {}