export default {
  title: 'Patterns'
};

const Template = ({ headerText }) => (
  `
    <div class="cbp-structured-list__wrapper">
      <div class="cbp-structured-list__header">
        <span>${headerText}</span>
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
StructuredList.args = {
  headerText: '56 Results'
};
StructuredList.argTypes = {
  headerText: {
    name: 'Header Text',
    description: 'Text for the structured list header',
    type: { name: 'string' }
  }
}