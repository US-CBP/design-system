export default {
  title: 'Content/Structured List',
  tags: ['beta'],
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
      control: 'select',
      options: ['none', 'even', 'odd'],
    },
    selectable: {
      control: 'boolean',
    },
    listItemType: {
        description: 'determine if structured list is populated with li or structured list item',
        control: 'select',
        options: ['li', 'structured list item']
    },
    listItems: {
      name: 'listItems (slotted)',
      control: 'object',
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
    showHeader: true,
    headerId: 'list-header',
  }
};


function generateLIs(items, selectable, context) {
  const html = items.map(({ content }, index) => {
    return `
      <li>
        ${selectable ?
        `<cbp-checkbox 
          value="${index}"
          ${context && context != 'light-inverts' ? `context="${context}"` : ''}   
        >
          <input
            type="checkbox"
            name="checkbox"
            value="${index}"
          />
          <cbp-hide visually-hide>
            Checkbox ${index}
          </cbp-hide>
        </cbp-checkbox>` : ''}
        ${content}
      </li>
    `;
  });
  return html.join('');
}

function generateItems(items, selectable, context) {
  const html = items.map(({ content, color}, index) => {
    return `
      <cbp-structured-list-item ${color ? `color="${color}"` : ''}>
        ${selectable ?
        `<cbp-checkbox 
          value="${index}"
          ${context && context != 'light-inverts' ? `context="${context}"` : ''}   
        >
          <input
            type="checkbox"
            name="checkbox"
            value="${index}"
          />
          <cbp-hide visually-hide>
            Checkbox ${index}
          </cbp-hide>
        </cbp-checkbox>`
        : ''} ${content}
      </cbp-structured-list-item>
    `;
  });
  return html.join('');
}

const StructuredListTemplate: any = ({ listItems, striped, selectable, showHeader, headerId, showFooter, listItemType, context, sx }) => {
  
  setTimeout(() => {
    let anchors = document.querySelectorAll('cbp-structured-list a');
    anchors.forEach(anchor => {
      anchor.addEventListener('click', function(e) { e.preventDefault(); })
    });
  }, 500);
  
  return ` 
    <cbp-structured-list
      ${striped ? `striped=${striped}` : ''}
      ${headerId ? `header-id="${headerId}"` : ``}
      ${context && context != 'light-inverts' ? `context="${context}"` : ''}   
      ${sx ? `sx='${JSON.stringify(sx)}'` : ''}
    >
      ${showHeader ? `<div slot="cbp-structured-list-header" ${headerId ? `id="${headerId}"` : ''}>${listItems.length} results, filters applied, etc. This acts as the "aria-description" for the list.</div>` : ''}
      ${listItemType=="structured list item" ? generateItems(listItems, selectable, context) : generateLIs(listItems, selectable, context)}
      ${showFooter ? `
      <div slot="cbp-structured-list-footer">
        <cbp-action-bar variant="inline" context="dark-inverts">
          <div slot="cbp-action-bar-info">0 items selected.</div>
          <cbp-button fill="ghost" context="dark-inverts" accessibility-text="Delete selected items">Delete</cbp-button>
          <cbp-button fill="ghost" context="dark-inverts" accessibility-text="Compare selected items">Compare</cbp-button>
        </cbp-action-bar>
      </div>` : ''}
    </cbp-structured-list>
  `;
};
export const StructuredList = StructuredListTemplate.bind({});
StructuredList.storyName = "Structured List (Simple)"
StructuredList.args = {
  listItemType: 'li',
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
      content: 'Structured list item 5',
      color: 'danger'
    },
  ]
}

export const StructuredListWithGrid = StructuredListTemplate.bind({});
StructuredListWithGrid.args = {
  listItemType: "structured list item",
  listItems: [
    {
      content: "<cbp-grid gap='var(--cbp-space-4x)'  grid-template-columns='repeat(auto-fit, minmax(5rem, 1fr))'><cbp-grid-item>Grid Item 1</cbp-grid-item><cbp-grid-item>Grid Item 2</cbp-grid-item><cbp-grid-item>Grid Item 3</cbp-grid-item><cbp-grid-item>Grid Item 4</cbp-grid-item></cbp-grid>",
    },
    {
      content: "<cbp-grid gap='var(--cbp-space-4x)' grid-template-columns='repeat(auto-fit, minmax(5rem, 1fr))'> <cbp-grid-item>Grid Item 1 is a bit longer</cbp-grid-item><cbp-grid-item>Grid Item 2</cbp-grid-item><cbp-grid-item>Grid Item 3 is a whole lot longer. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</cbp-grid-item><cbp-grid-item>Grid Item 4</cbp-grid-item></cbp-grid>",
    },
    {
      content: "<cbp-grid gap='var(--cbp-space-4x)' grid-template-columns='repeat(auto-fit, minmax(5rem, 1fr))'> <cbp-grid-item>Grid Item 1</cbp-grid-item><cbp-grid-item>Grid Item 2 has a little more.</cbp-grid-item><cbp-grid-item>Grid Item 3</cbp-grid-item><cbp-grid-item>Grid Item 4 does too.</cbp-grid-item></cbp-grid>",
    },
  ]
}

export const StructuredListCollection = StructuredListTemplate.bind({});
StructuredListCollection.argTypes = {
  listItems: {
    description: 'Configure various aspects of the list items within the structured list.',
    control: 'object',
  },
}
StructuredListCollection.args = {
  showHeader: false,
  listItemType: "structured list item",
  listItems: [
    {
      content: "<cbp-typography tag='p'><cbp-link href='#'><cbp-icon name='arrow-right'></cbp-icon>Internal Link</cbp-link></cbp-typography><cbp-typography tag='p'> Description text</cbp-typography><cbp-typography tag='p'> <cbp-icon name='user'></cbp-icon> <i>https://www.text-link.com/help-me</i></cbp-typography><cbp-tag> Tag </cbp-tag>",
    },
    {
      content: "<cbp-typography tag='p'><cbp-link href='#'><cbp-icon name='arrow-right'></cbp-icon>Internal Link</cbp-link></cbp-typography><cbp-typography tag='p'> Description text</cbp-typography><cbp-typography tag='p'> <cbp-icon name='user'></cbp-icon> <i>https://www.text-link.com/help-me</i></cbp-typography><cbp-tag> Tag </cbp-tag>",
    },
    {
      content: "<cbp-typography tag='p'><cbp-link href='#'><cbp-icon name='arrow-right'></cbp-icon>Internal Link</cbp-link></cbp-typography><cbp-typography tag='p'> Description text</cbp-typography><cbp-typography tag='p'> <cbp-icon name='user'></cbp-icon> <i>https://www.text-link.com/help-me</i></cbp-typography><cbp-tag> Tag </cbp-tag>",
    },
    {
      content: "<cbp-typography tag='p'><cbp-link href='#'><cbp-icon name='arrow-right'></cbp-icon>Internal Link</cbp-link></cbp-typography><cbp-typography tag='p'> Description text</cbp-typography><cbp-typography tag='p'> <cbp-icon name='user'></cbp-icon> <i>https://www.text-link.com/help-me</i></cbp-typography><cbp-tag> Tag </cbp-tag>",
    },
    {
      content: "<cbp-typography tag='p'><cbp-link href='#'><cbp-icon name='arrow-right'></cbp-icon>Internal Link</cbp-link></cbp-typography><cbp-typography tag='p'> Description text</cbp-typography><cbp-typography tag='p'> <cbp-icon name='user'></cbp-icon> <i>https://www.text-link.com/help-me</i></cbp-typography><cbp-tag> Tag </cbp-tag>",
    },
  ]
}

export const StructuredListMedia = StructuredListTemplate.bind({});

StructuredListMedia.argTypes = {
  listItems: {
    description: 'Configure various aspects of the list items within the structured list.',
    control: 'object',
  },
}
StructuredListMedia.args = {
  showHeader: false,
  listItemType: "structured list item",
  listItems: [
    {
      content: "<cbp-grid grid-template-columns='100px 1fr' gap='1rem'><div><img src='./assets/images/cbp-seal.svg' style='width: 100px' alt=''/></div><div><cbp-typography tag='p'><cbp-link href='#'><cbp-icon name='arrow-right'></cbp-icon>CBP Seizes over 2 Million Pounds of Cocaine</cbp-link></cbp-typography><cbp-typography tag='p'>CBP officers out of the Port of Baltimore Narcotics task force seized more than 2 million pounds of cocaine tuesday. It is one of the largest single seizures of cocaine ever recorded</cbp-typography><cbp-typography tag='p'><cbp-icon name='globe'></cbp-icon> <i>https://www.cbp.dhs.gov/news/cocaine</i></cbp-typography><cbp-tag> News</cbp-tag></div><cbp-grid>",
    },
    {
      content: "<cbp-grid grid-template-columns='100px 1fr' gap='1rem'><div><img src='./assets/images/cbp-seal.svg' style='width: 100px' alt=''/></div><div><cbp-typography tag='p'><cbp-link href='#'><cbp-icon name='arrow-right'></cbp-icon>CBP Seizes over 2 Million Pounds of Cocaine</cbp-link></cbp-typography><cbp-typography tag='p'>CBP officers out of the Port of Baltimore Narcotics task force seized more than 2 million pounds of cocaine tuesday. It is one of the largest single seizures of cocaine ever recorded</cbp-typography><cbp-typography tag='p'><cbp-icon name='globe'></cbp-icon> <i>https://www.cbp.dhs.gov/news/cocaine</i></cbp-typography><cbp-tag> News</cbp-tag></div><cbp-grid>",
    },
    {
      content: "<cbp-grid grid-template-columns='100px 1fr' gap='1rem'><div><img src='./assets/images/cbp-seal.svg' alt=''/></div><div><cbp-typography tag='p'><cbp-link href='#'><cbp-icon name='arrow-right'></cbp-icon>CBP Seizes over 2 Million Pounds of Cocaine</cbp-link></cbp-typography><cbp-typography tag='p'>CBP officers out of the Port of Baltimore Narcotics task force seized more than 2 million pounds of cocaine tuesday. It is one of the largest single seizures of cocaine ever recorded</cbp-typography><cbp-typography tag='p'><cbp-icon name='globe'></cbp-icon> <i>https://www.cbp.dhs.gov/news/cocaine</i></cbp-typography><cbp-tag> News</cbp-tag></div><cbp-grid>",
    },
    {
      content: "<cbp-grid grid-template-columns='100px 1fr' gap='1rem'><div><img src='./assets/images/cbp-seal.svg' alt=''/></div><div><cbp-typography tag='p'><cbp-link href='#'><cbp-icon name='arrow-right'></cbp-icon>CBP Seizes over 2 Million Pounds of Cocaine</cbp-link></cbp-typography><cbp-typography tag='p'>CBP officers out of the Port of Baltimore Narcotics task force seized more than 2 million pounds of cocaine tuesday. It is one of the largest single seizures of cocaine ever recorded</cbp-typography><cbp-typography tag='p'><cbp-icon name='globe'></cbp-icon> <i>https://www.cbp.dhs.gov/news/cocaine</i></cbp-typography><cbp-tag> News</cbp-tag></div><cbp-grid>",
    },
  ]
}

export const StructuredListMediaCalendar = StructuredListTemplate.bind({});

StructuredListMediaCalendar.argTypes = {
  listItems: {
    description: 'Configure various aspects of the list items within the structured list.',
    control: 'object',
  },
}
StructuredListMediaCalendar.args = {
  showHeader: false,
  listItemType: "structured list item",
  listItems: [
    {
      content: `<cbp-grid grid-template-columns='6.25rem 1fr' gap='1rem'>
                  <cbp-flex  
                    display="flex"
                    direction="column"
                    align-items="center"
                    align-content="center"
                  >
                  <cbp-flex-item
                  sx='{
                        "width":"100%",
                        "text-align":"center",
                        "border-radius":"var(--cbp-border-radius-soft) var(--cbp-border-radius-soft) 0 0",
                        "padding-block":"var(--cbp-space-2x)",
                        "background-color":"var(--cbp-color-red-50)",
                        "border":"var(--cbp-border-size-sm) solid var(--cbp-color-red-50)",
                        "color":"var(--cbp-color-white)",
                        "text-transform":"uppercase"
                      }'
                  > 
                  <cbp-typography tag="span" size="8">
                    apr
                  </cbp-typography>
                  </cbp-flex-item>
                  
                  <cbp-flex-item
                    sx='{
                      "width":"100%",
                      "height":"4.25rem",
                      "text-align":"center",
                      "border-radius":"0 0 var(--cbp-border-radius-soft) var(--cbp-border-radius-soft)",
                      "border-width":"var(--cbp-border-size-md)",
                      "border-style":"solid",
                      "border-color":"var(--cbp-color-gray-cool-40)",
                      "border-top":"none",
                      "color":"var(--cbp-structured-list-color)",
                      "font-size":"var(--cbp-font-size-masthead-1)",
                      "font-weight":"var(--cbp-font-weight-black)",
                      "line-height":"1.75"
                  }'
                    >
                  <cbp-typography tag="span" variant="heading-xxl" font-weight="black">
                    31
                  </cbp-typography>
                  </cbp-flex-item>
                </cbp-flex>
                  <div>
                    <cbp-typography tag='p'>
                      <cbp-link href='#'>
                        <cbp-icon name='arrow-right'></cbp-icon>
                        Find the Hidden Beetle Training
                      </cbp-link>
                    </cbp-typography>
                    <cbp-typography tag='p'>This training session will help you find those pesky hiding beetles. Inside boxes, on top of containers, or in someone's pocket, these bugs don't stand a chance of getting to America's sweet, delicious forests</cbp-typography>
                    <cbp-typography tag='p'>
                      <cbp-icon name='globe'></cbp-icon>
                      <i>https://www.cbp.dhs.gov/news/beetles</i>
                    </cbp-typography>
                  </div>
                <cbp-grid>`,
    },
    {
      content: `<cbp-grid grid-template-columns='6.25rem 1fr' gap='1rem'>
                  <cbp-flex  
                    display="flex"
                    direction="column"
                    align-items="center"
                  >
                  <cbp-flex-item
                  sx='{
                        "width":"100%",
                        "text-align":"center",
                        "border-radius":"var(--cbp-border-radius-soft) var(--cbp-border-radius-soft) 0 0",
                        "padding-block":"var(--cbp-space-2x)",
                        "background-color":"var(--cbp-color-red-50)",
                        "border":"var(--cbp-border-size-sm) solid var(--cbp-color-red-50)",
                        "color":"var(--cbp-color-white)",
                        "text-transform":"uppercase"
                      }'
                  > 
                  <cbp-typography tag="span" size="8">
                    mar
                  </cbp-typography>
                  </cbp-flex-item>
                  
                  <cbp-flex-item
                    sx='{
                          "width":"100%",
                          "height":"4.25rem",
                          "text-align":"center",
                          "align-content":"center",
                          "border-radius":"0 0 var(--cbp-border-radius-soft) var(--cbp-border-radius-soft)",
                          "border-width":"var(--cbp-border-size-md)",
                          "border-style":"solid",
                          "border-color":"var(--cbp-color-gray-cool-40)",
                          "border-top":"none",
                          "color":"var(--cbp-structured-list-color)",
                          "font-size":"var(--cbp-font-size-masthead-1)",
                          "font-weight":"var(--cbp-font-weight-black)",
                          "line-height":"1.75"
                      }'
                    >
                  <cbp-typography tag="span" variant="heading-xxl" font-weight="black">
                    15
                  </cbp-typograpghy>
                  </cbp-flex-item>
                </cbp-flex>
                  <div>
                    <cbp-typography tag='p'>
                      <cbp-link href='#'>
                        <cbp-icon name='arrow-right'></cbp-icon>  
                        Agency Picnic
                      </cbp-link>
                    </cbp-typography>
                    <cbp-typography tag='p'>Every year the Capital District CBP employees come together to have a nice (ant free) picnic</cbp-typography>
                    <cbp-typography tag='p'>
                      <cbp-icon name='globe'></cbp-icon>
                      <i>https://www.cbp.dhs.gov/news/capital-picnic</i>
                    </cbp-typography>
                  </div>
                <cbp-grid>
      `,
    },
    {
      content: `<cbp-grid grid-template-columns='6.25rem 1fr' gap='1rem'>
                  <cbp-flex  
                    display="flex"
                    direction="column"
                    align-items="center"
                  >
                  <cbp-flex-item
                  sx='{
                        "width":"100%",
                        "text-align":"center",
                        "border-radius":"var(--cbp-border-radius-soft) var(--cbp-border-radius-soft) 0 0",
                        "padding-block":"var(--cbp-space-2x)",
                        "background-color":"var(--cbp-color-red-50)",
                        "border":"var(--cbp-border-size-sm) solid var(--cbp-color-red-50)",
                        "color":"var(--cbp-color-white)",
                        "text-transform":"uppercase"
                      }'
                  > 
                  <cbp-typography tag="span" size="8">
                    feb
                  </cbp-typography>
                  </cbp-flex-item>
                  
                  <cbp-flex-item
                    sx='{
                          "width":"100%",
                          "height":"4.25rem",
                          "text-align":"center",
                          "align-content":"center",
                          "border-radius":"0 0 var(--cbp-border-radius-soft) var(--cbp-border-radius-soft)",
                          "border-width":"var(--cbp-border-size-md)",
                          "border-style":"solid",
                          "border-color":"var(--cbp-color-gray-cool-40)",
                          "border-top":"none",
                          "color":"var(--cbp-structured-list-color)",
                          "font-size":"var(--cbp-font-size-masthead-1)",
                          "font-weight":"var(--cbp-font-weight-black)",
                          "line-height":"1.75"
                      }'
                    >
                  <cbp-typography tag="span" variant="heading-xxl" font-weight="black">
                    3
                  </cbp-typography>
                  </cbp-flex-item>
                </cbp-flex>
                  <div>
                    <cbp-typography tag='p'>
                      <cbp-link href='#'>                      
                        <cbp-icon name='arrow-right'></cbp-icon>
                        Commissioners Awards</cbp-link>
                    </cbp-typography>
                    <cbp-typography tag='p'>Join us in person or online to celebrate this past years CBP employees excellence awards.</cbp-typography>
                    <cbp-typography tag='p'>
                      <cbp-icon name='globe'></cbp-icon>
                      <i>https://www.cbp.dhs.gov/news/awards</i>
                    </cbp-typography>
                  </div>
                <cbp-grid>
      `,
    }
  ]
}