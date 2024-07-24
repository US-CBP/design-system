export default {
    title: 'Components/Simple List',
    tags: ['autodocs'],
    argTypes: {

        variant: {
        control: 'select',
        options: ['unordered', 'ordered'],
        },
        context : {
        control: 'select',
        options: [ "light-inverts", "light-always", "dark-inverts", "dark-always"]
        },
        sx: {
        description: 'Supports adding inline styles as an object of key-value pairs comprised of CSS properties and values. Values should reference design tokens when possible.',
        control: 'object',
        },
    },   
    args: {
    },
};

function generateItems(items) {
    const html = items.map(({ content, indent}) => {
      return `<cbp-list-item ${indent ? `aria-indent=${indent}`: ''}>${content}</cbp-list-item>`;
    });
    return html.join('');
  }
  
const Template = ({listItems, variant, context }) => {
    return ` 
    <cbp-list
      ${variant !== 'unordered' ? `variant=${variant}` : ''}
      ${context && context != 'light-inverts' ? `context=${context}` : ''}
    >
        ${generateItems(listItems)}
    </cbp-list>
    `;
};

export const SimpleList = Template.bind({});
    SimpleList.args = {
        listItems: [
            {
              content: "List Item 1",
            },
            {
              content: "List Item 2",
            },
            {
              content: "List Item 3",
            },
            {
              content: "List Item 4",
            },
            {
              content: "List Item 5",
            },
            {//todo: example of sublist
              content: `
              <cbp-list>
                <cbp-list-item>List Sub-Item 1</cbp-list-item>
                <cbp-list-item>List Sub-Item 2</cbp-list-item>
                <cbp-list-item>List Sub-Item 3</cbp-list-item>
                <cbp-list-item>List Sub-Item 4</cbp-list-item>
                <cbp-list-item>List Sub-Item 5</cbp-list-item>
              </cbp-list>`,
              indent: true,
            },
          ]
};