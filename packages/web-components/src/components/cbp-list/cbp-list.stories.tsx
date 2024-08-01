export default {
    title: 'Components/List',
    tags: ['autodocs'],
    argTypes: {
        tag: {
          control: 'select',
          description: 'Type of List',
          options: ['ul', 'ol'],
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
      tag: 'ul',
    },
};

function generateItems(items) {
    const html = items.map(({ content}) => {
        return `<li>${content}</li>`;      
    });
    return html.join('');
  }
  
const Template = ({listItems, tag, context }) => {
    return ` 
    <cbp-list
      ${tag ? `tag=${tag}` : ''}
      ${context && context != 'light-inverts' ? `context=${context}` : ''}
    >
        ${generateItems(listItems)}
    </cbp-list>
    `;
};

export const List = Template.bind({});
    List.args = {
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
            {//example of ul sublist
              content: `
              List Item 4
                <ul>
                  <li>List Sub-Item 1</li>
                  <li>List Sub-Item 2</li>
                  <li>List Sub-Item 3</li>
                  <li>List Sub-Item 4</li>
                  <li>List Sub-Item 5</li>
                </ul>
                `,
              sublist: true
            },
            {//example of ol sublist
              content: `
                list Item 5
                <ol>
                  <li>List Sub-Item 1</li>
                  <li>List Sub-Item 2</li>
                  <li>List Sub-Item 3</li>
                  <li>List Sub-Item 4</li>
                  <li>List Sub-Item 5</li>
                  <ol>
                    <li>List Sub-Item 1</li>
                    <li>List Sub-Item 2</li>
                    <li>List Sub-Item 3</li>
                    <li>List Sub-Item 4</li>
                    <li>List Sub-Item 5</li>
                    <ol>
                      <li>List Sub-Item 1</li>
                      <li>List Sub-Item 2</li>
                      <li>List Sub-Item 3</li>
                      <li>List Sub-Item 4</li>
                      <li>List Sub-Item 5</li>
                    </ol>
                  </ol>  
                </ol>
                `,
              sublist: true
            },
          ]
};