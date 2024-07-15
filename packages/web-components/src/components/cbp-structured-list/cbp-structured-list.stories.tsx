export default {
  title: 'Components/Structured List',
  tags: ['autodocs'],
  argTypes: {
    showHeader: {
      control: 'boolean',
    },
    headerId: {
      control: 'text',
    },
    showFooter: {
      control: 'boolean',
    },
    striped: {
      control: 'boolean',
    },
    /*
    selectable: {
      control: 'boolean',
    },
    */
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
    showHeader: true,
    headerId: 'list-header',
  }
};


function generateLIs(items) {
  const html = items.map(({ content }) => {
    return `<li>${content}</li>`;
  });
  return html.join('');
}

function generateItems(items) {
  const html = items.map(({ content, color, selected }) => {
    return `<cbp-structured-list-item ${color != 'default' ? `color="${color}"` : ''} ${selected ? `selected` : ''}>${content}</cbp-structured-list-item>`;
  });
  return html.join('');
}




const StructuredListTemplate = ({ listItems, striped, selectable, showHeader, headerId, showFooter, context, sx }) => {
  return ` 
        <cbp-structured-list
          ${striped ? `striped` : ''}
          ${selectable ? `selectable` : ''}
          header-id="list-header"
          ${context && context != 'light-inverts' ? `context=${context}` : ''}   
          ${sx ? `sx=${JSON.stringify(sx)}` : ''}
        >
          ${showHeader ? `<div slot="cbp-structured-list-header" id="${headerId}">${listItems.length} results, filters applied, etc. This acts as the "aria-description" for the list. </div>` : ''}

          ${generateLIs(listItems)}

          
          ${showFooter
            ? `
                <div slot="cbp-structured-list-footer">
                  <cbp-flex align-items="center" justify-content="space-between">  
                    <div>0 items selected.</div>
                    <div>
                      <cbp-button fill="ghost" context="dark-inverts" accessibility-text="Delete selected items">Delete</cbp-button>
                      <cbp-button fill="ghost" context="dark-inverts" accessibility-text="Compare selected items">Compare</cbp-button>
                    </div>
                </div>
              ` 
            : ''}
        </cbp-structured-list>
      `;
};
export const StructuredList = StructuredListTemplate.bind({});
StructuredList.argTypes = {
  listItems: {
    description: 'Configure various aspects of the list items within the structured list.',
    control: 'object',
  },
}
StructuredList.args = {
  listItems: [
    {
      content: 'Structured list item 1'
    },
    {
      content: 'Structured list item 2'
    },
    {
      content: 'Structured list item 3'
    },
    {
      content: 'Structured list item 4'
    },
    {
      content: 'Structured list item 5'
    },
  ]
}


const StructuredListItemsTemplate = ({ listItems, striped, selectable, showHeader, headerId, showFooter, context, sx }) => {
  return ` 
        <cbp-structured-list
          ${striped ? `striped` : ''}
          ${selectable ? `selectable` : ''}
          header-id="list-header"
          ${context && context != 'light-inverts' ? `context=${context}` : ''}   
          ${sx ? `sx=${JSON.stringify(sx)}` : ''}
        >
        ${showHeader ? `<div slot="cbp-structured-list-header" id="${headerId}">${listItems.length} results, filters applied, etc. This acts as the "aria-description" for the list. </div>` : ''}

        ${generateItems(listItems)}

        ${showFooter
            ? `
                <div slot="cbp-structured-list-footer">
                  <cbp-flex align-items="center" justify-content="space-between">  
                    <div>0 items selected.</div>
                    <div>
                      <cbp-button fill="ghost" context="dark-inverts" accessibility-text="Delete selected items">Delete</cbp-button>
                      <cbp-button fill="ghost" context="dark-inverts" accessibility-text="Compare selected items">Compare</cbp-button>
                    </div>
                </div>
              ` 
            : ''}
        </cbp-structured-list>
      `;
};
export const StructuredListItems = StructuredListItemsTemplate.bind({});
StructuredListItems.argTypes = {
  listItems: {
    description: 'Configure various aspects of the list items within the structured list.',
    control: 'object',
  },
}
StructuredListItems.args = {
  listItems: [
    {
      content: 'Structured list item 1',
      color: 'default',
      selected: false
    },
    {
      content: 'Structured list item 2',
      color: 'default',
      selected: false
    },
    {
      content: 'Structured list item 3',
      color: 'default',
      selected: false
    },
    {
      content: 'Structured list item 4',
      color: 'danger',
      selected: false
    },
    {
      content: 'Structured list item 5',
      color: 'default',
      selected: false
    },
  ]
}


const StructuredListWithGridTemplate = ({ striped, selectable, showHeader, headerId, showFooter, context, sx }) => {
  return ` 
        <cbp-structured-list
          ${striped ? `striped` : ''}
          ${selectable ? `selectable` : ''}
          header-id="list-header"
          ${context && context != 'light-inverts' ? `context=${context}` : ''}   
          ${sx ? `sx=${JSON.stringify(sx)}` : ''}
        >
          ${showHeader ? `<div slot="cbp-structured-list-header" id="${headerId}">3 Results, filters applied, etc. This acts as the "aria-description" for the list. </div>` : ''}

          <cbp-structured-list-item>
            <cbp-grid
              gap="var(--cbp-space-4x)"
              grid-template-columns="repeat(auto-fit, minmax(5rem, 1fr))"
            >
              <cbp-grid-item>
                Grid Item 1
              </cbp-grid-item>
              <cbp-grid-item>
                Grid Item 2
              </cbp-grid-item>
              <cbp-grid-item>
                Grid Item 3
              </cbp-grid-item>
              <cbp-grid-item>
                Grid Item 4
              </cbp-grid-item>
            </cbp-grid>
          </cbp-structured-list-item>

          <cbp-structured-list-item>
            <cbp-grid
              gap="var(--cbp-space-4x)"
              grid-template-columns="repeat(auto-fit, minmax(5rem, 1fr))"
            >
              <cbp-grid-item>
                Grid Item 1 is a bit longer
              </cbp-grid-item>
              <cbp-grid-item>
                Grid Item 2
              </cbp-grid-item>
              <cbp-grid-item>
                Grid Item 3 is a whole lot longer. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </cbp-grid-item>
              <cbp-grid-item>
                Grid Item 4
              </cbp-grid-item>
            </cbp-grid>
          </cbp-structured-list-item>

          <cbp-structured-list-item>
            <cbp-grid
              gap="var(--cbp-space-4x)"
              grid-template-columns="repeat(auto-fit, minmax(5rem, 1fr))"
            >
              <cbp-grid-item>
                Grid Item 1
              </cbp-grid-item>
              <cbp-grid-item>
                Grid Item 2 has a little more.
              </cbp-grid-item>
              <cbp-grid-item>
                Grid Item 3
              </cbp-grid-item>
              <cbp-grid-item>
                Grid Item 4 does too.
              </cbp-grid-item>
            </cbp-grid>
          </cbp-structured-list-item>

          ${showFooter
            ? `
                <div slot="cbp-structured-list-footer">
                  <cbp-flex align-items="center" justify-content="space-between">  
                    <div>0 items selected.</div>
                    <div>
                      <cbp-button fill="ghost" context="dark-inverts" accessibility-text="Delete selected items">Delete</cbp-button>
                      <cbp-button fill="ghost" context="dark-inverts" accessibility-text="Compare selected items">Compare</cbp-button>
                    </div>
                </div>
              ` 
            : ''}
        </cbp-structured-list>
      `;
};

const StructuredListCollectionTemplate = ({ listItems, striped, selectable, context, sx }) => {
  return ` 
        <cbp-structured-list
          ${striped ? `striped` : ''}
          ${selectable ? `selectable` : ''}
          header-id="list-header"
          ${context && context != 'light-inverts' ? `context=${context}` : ''}   
          ${sx ? `sx=${JSON.stringify(sx)}` : ''}
        >
        
        ${generateItems(listItems)}

        
        </cbp-structured-list>
      `;
};
export const StructuredListCollection = StructuredListCollectionTemplate.bind({});
StructuredListCollection.argTypes = {
  listItems: {
    description: 'Configure various aspects of the list items within the structured list.',
    control: 'object',
  },
}
StructuredListCollection.args = {
  showHeader: false,
  listItems: [
    {
      content: "<cbp-typography tag='p'><cbp-icon name='arrow-right' color='var(--cbp-link-color)' size='1rem'></cbp-icon><cbp-link href='#' target='_self' style='margin-inline-start: 0.5rem'>Internal Link</cbp-link></cbp-typography><cbp-typography tag='p'> Description text</cbp-typography><cbp-typography tag='p'> <cbp-icon name='user' size='1rem'></cbp-icon> <i>https://www.text-link.com/help-me</i></cbp-typography><cbp-tag class='hydrated'> Tag </cbp-tag>",
      color: 'default',
      selected: false
    },
    {
      content: "<cbp-typography tag='p'><cbp-icon name='arrow-right' color='var(--cbp-link-color)' size='1rem'></cbp-icon><cbp-link href='#' target='_self' style='margin-inline-start: 0.5rem'>Internal Link</cbp-link></cbp-typography><cbp-typography tag='p'> Description text</cbp-typography><cbp-typography tag='p'> <cbp-icon name='user' size='1rem'></cbp-icon> <i>https://www.text-link.com/help-me</i></cbp-typography><cbp-tag class='hydrated'> Tag </cbp-tag>",
      color: 'default',
      selected: false
    },
    {
      content: "<cbp-typography tag='p'><cbp-icon name='arrow-right' color='var(--cbp-link-color)' size='1rem'></cbp-icon><cbp-link href='#' target='_self' style='margin-inline-start: 0.5rem'>Internal Link</cbp-link></cbp-typography><cbp-typography tag='p'> Description text</cbp-typography><cbp-typography tag='p'> <cbp-icon name='user' size='1rem'></cbp-icon> <i>https://www.text-link.com/help-me</i></cbp-typography><cbp-tag class='hydrated'> Tag </cbp-tag>",
      color: 'default',
      selected: false
    },
    {
      content: "<cbp-typography tag='p'><cbp-icon name='arrow-right' color='var(--cbp-link-color)' size='1rem'></cbp-icon><cbp-link href='#' target='_self' style='margin-inline-start: 0.5rem'>Internal Link</cbp-link></cbp-typography><cbp-typography tag='p'> Description text</cbp-typography><cbp-typography tag='p'> <cbp-icon name='user' size='1rem'></cbp-icon> <i>https://www.text-link.com/help-me</i></cbp-typography><cbp-tag class='hydrated'> Tag </cbp-tag>",
      color: 'default',
      selected: false
    },
    {
      content: "<cbp-typography tag='p'><cbp-icon name='arrow-right' color='var(--cbp-link-color)' size='1rem'></cbp-icon><cbp-link href='#' target='_self' style='margin-inline-start: 0.5rem'>Internal Link</cbp-link></cbp-typography><cbp-typography tag='p'> Description text</cbp-typography><cbp-typography tag='p'> <cbp-icon name='user' size='1rem'></cbp-icon> <i>https://www.text-link.com/help-me</i></cbp-typography><cbp-tag class='hydrated'> Tag </cbp-tag>",
      color: 'default',
      selected: false
    },
  ]
}


export const StructuredListWithGrid = StructuredListWithGridTemplate.bind({});