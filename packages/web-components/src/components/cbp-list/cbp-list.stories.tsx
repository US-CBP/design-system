export default {
    title: 'Components/List',
    tags: ['autodocs'],
    argTypes: {
        tag: {
          control: 'select',
          description: 'Type of List',
          options: ['ul', 'ol'],
        },
        size: {
          control: 'select',
          description: 'Font size of list text',
          options: ['normal', 'large'],
        },
        accessibilityText: {
          description: 'Support for accessibility text',
          control: 'text',
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


  
const Template = ({listItems, tag, size, accessibilityText, context,}) => {
    return ` 
    <cbp-list
      ${tag ? `tag=${tag}` : ''}
      ${size ? `size=${size}` : ''}
      ${accessibilityText ? `accessibility-text="${accessibilityText}"` : ''}
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
                  <li>List Sub-Item 5
                  <ol>
                    <li>List Sub-Item 1</li>
                    <li>List Sub-Item 2</li>
                    <li>List Sub-Item 3</li>
                    <li>List Sub-Item 4</li>
                    <li>List Sub-Item 5
                    <ol>
                      <li>List Sub-Item 1</li>
                      <li>List Sub-Item 2</li>
                      <li>List Sub-Item 3</li>
                      <li>List Sub-Item 4</li>
                      <li>List Sub-Item 5</li>
                    </ol>
                    </li>
                  </ol>
                  </li>  
                </ol>
                `,
              sublist: true
            },
          ]
};

function generateLinkListItems(items, size, parentVariant) {
  if(size == 'normal'){
    const html = items.map(({ content}) => {
      return `<li>
                <cbp-icon ${parentVariant == 'link-external' ? 'name="external-link-alt"' : 'name="arrow-right"'}
                  sx='{"color":"var(--cbp-link-list-icon-color)"}'
                > </cbp-icon>
                <cbp-link href='#' target='_self'>${content}</cbp-link>
              </li>`;      
    });
    return html.join('');
  } else {  //size == 'large'
    
    const html = items.map(({ content}) => {
      return `<li>
                <cbp-icon ${parentVariant == 'link-external' ? 'name="external-link-alt"' : 'name="arrow-right"'}
                sx='{"color":"var(--cbp-link-list-icon-color)"}'
                > </cbp-icon>
                <cbp-link href='#' target='_self'>${content}</cbp-link>
                ${parentVariant == 'link-external' ? '<br /><cbp-icon class="linkListDescriptionIcon" name="globe" /> </cbp-icon><span class="linkListDescription"> ' + content + ' description </span>' : ''}
              </li>`;      
    });
    return html.join('');
  } 
}

const LinkListTemplate = ({linkListItems, size, accessibilityText, context,}) => {
  return ` 
  <cbp-typography tag="h3"> Internal Link List: </cbp-typography>
  <cbp-list
    variant='link' 
    ${size ? `size=${size}` : ''}
    ${accessibilityText ? `accessibility-text="${accessibilityText}"` : ''}
    ${context && context != 'light-inverts' ? `context=${context}` : ''}
  >
      ${generateLinkListItems(linkListItems, size, 'link-internal')}
  </cbp-list>

  <br />
  <cbp-typography tag="h3"> External Link List: </cbp-typography>
  <cbp-list
  variant='link' 
  ${size ? `size=${size}` : ''}
  ${accessibilityText ? `accessibility-text="${accessibilityText}"` : ''}
  ${context && context != 'light-inverts' ? `context=${context}` : ''}
>
    ${generateLinkListItems(linkListItems, size, 'link-external')}
</cbp-list>
  `;
};

export const LinkList = LinkListTemplate.bind({});
  LinkList.args = {
      linkListItems: [
          {
            content: "List Link Item 1",
          },
          {
            content: "List Link Item 2",
          },
          {
            content: "List Link Item 3",
          },
        ]
};