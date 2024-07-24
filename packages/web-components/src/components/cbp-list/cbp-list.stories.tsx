export default {
    title: 'Components/Simple List',
    tags: ['autodocs'],
    argTypes: {

        variant: {
        control: 'select',
        options: ['unstyled', 'bullet'],
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
    const html = items.map(({ content,selected }) => {
      return `<cbp-list-item  ${selected ? `selected` : ''}>${content}</cbp-list-item>`;
    });
    return html.join('');
  }
  
const Template = ({listItems}) => {
    return ` 
    <cbp-list>
        ${generateItems(listItems)}
    </cbp-list>
    `;
};

export const SimpleList = Template.bind({});
    SimpleList.args = {
        listItems: [
            {
              content: "<li> List Item 1</li>",
              // selected: false
            },
            {
              content: "<li> List Item 2</li>",
              // selected: false
            },
            {
              content: "<li> List Item 3</li>",
              // selected: false
            },
            {
              content: "<li> List Item 4</li>",
              // selected: false
            },
            {
              content: "<li> List Item 5</li>",
              // selected: false
            },
          ]
};