export default {
    title: 'Components/Simple List',
    tags: ['autodocs'],
    argTypes: {

        variant: {
        control: 'select',
        options: ['unordered', 'ordered', 'descriptive'], //todo: remove DL
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
//todo: refactor to simplify
function generateItems(items, variant) {
    const html = items.map(({ content, indent }) => {
      console.log(variant);
          if(indent && variant == 'ordered'){
            return `<ol>${content}</ol>`
          }else if(indent && variant == 'unordered'){
            return `<ul>${content}</ul>`  
          }else if(indent && variant == 'descriptive'){
            return `<dl>${content}</dl>` 
          }else {
            return `<li>${content}</li>`;
          }
          
    });
    return html.join('');
  }
  
const Template = ({listItems, variant, context }) => {
    return ` 
    <cbp-list
      ${variant ? `variant=${variant}` : ''}
      ${context && context != 'light-inverts' ? `context=${context}` : ''}
    >
        ${generateItems(listItems, variant)}
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
                  <li>List Sub-Item 1</li>
                  <li>List Sub-Item 2</li>
                  <li>List Sub-Item 3</li>
                  <li>List Sub-Item 4</li>
                  <li>List Sub-Item 5</li>
                `,
                indent: true, //todo: remove indent as prop
            },
          ]
};