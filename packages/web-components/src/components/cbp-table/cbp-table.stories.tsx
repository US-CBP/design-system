export default {
  title: 'Components/Table',
  tags: ['new'],
  argTypes: {
    striped: {
      control: 'select',
      options: ['none', 'even', 'odd'],
    },
    hover: {
      control: 'select',
      options: ['row', 'cell'],
    },
    columnHover: {
      control: 'boolean'
    },
    selectable: {
      control: 'boolean'
    },
    overflow: {
      control: 'select',
      options: ['scroll', 'linearize'],
    },
    showToolbar: {
      control: 'boolean'
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
};


function generateTableHeaders(headers, selectable, context) {
  const checkbox = `<th>
      <cbp-checkbox ${context && context != 'light-inverts' ? `context=${context}` : ''}>
        <input type="checkbox" name="selectall" value="1">
        <span style="display:none">Select All</span>
      </cbp-checkbox>
    </th>`
  let cells = headers.map( ({label, sortable}, i)  => {
    return `${ sortable 
      ? `<th ${i == 0 ? `aria-sort="ascending"` : ''}>
          <cbp-button fill="ghost" color="secondary" name="${`column-${i}`}" value="${i}">
            <cbp-icon></cbp-icon>${label}
          </cbp-button>
        </th>`
      : `<th>${label}</th>`
    }`;
  }).join('');
  if (selectable) cells = checkbox + cells;
  return `
    ${cells}
  `;
}

function generateTableRows(data, selectable, context) {
  const html = data.map( ({ row, danger }, i) => {
    const checkbox = `<td>
        <cbp-checkbox ${context && context != 'light-inverts' ? `context=${context}` : ''}>
          <input type="checkbox" name="rowid" value="${i+1}">
          <span style="display:none">Select row ${i+1}</span>
        </cbp-checkbox>
      </td>`
    let cells = row.map( ({td, danger, highlight})  => {
      if(danger){
        return `
          <td class="cbp-table--danger">${td}</td>
        `;
      }else if(highlight){
        return `
          <td class="cbp-table--highlight">${td}</td>
        `;
      }
       return `
        <td>${td}</td>
      `;
      }).join('');
    if (selectable) cells = checkbox + cells;
    if(danger){
      return `
          <tr class="cbp-table--danger">
            ${cells}
          </tr>
        `;
    }else{
      return `
        <tr>
          ${cells}
        </tr>
      `;
    }
  });
  return html.join('');
}


function toolbar() {
  return `
    <div slot="cbp-table-toolbar">
      <cbp-form-field sx='{"--cbp-form-field-margin-bottom":"0"}'>
        <cbp-form-field-wrapper>  
          <input
            type="search"
            name="tablesearch"
            placeholder="Filter Results"
          />
          <span slot="cbp-form-field-attached-button">
            <cbp-button
              type="submit"
              fill="solid"
              color="secondary"
              variant="square"
              accessibility-text="Search"
            >
              <cbp-icon name="magnifying-glass"></cbp-icon>
            </cbp-button>
          </span>
         </cbp-form-field-wrapper>
      </cbp-form-field>
    </div>
  `;
}

const Template = ({ tableData, headers, selectable, striped, hover, columnHover, overflow, showToolbar, context, sx }) => {
  
  return ` 
      <cbp-table
        ${striped != 'none' ? `striped="${striped}"` : ''}
        ${hover == 'cell' ? `hover="${hover}"` : ''}
        ${columnHover ? `column-hover` : ''}
        ${overflow ? `overflow="${overflow}"` : ''}
        ${context && context != 'light-inverts' ? `context="${context}"` : ''}
        ${sx ? `sx='${JSON.stringify(sx)}'` : ''}
      >
        ${showToolbar ? toolbar() : ''}
        <table style="width: 100%">
          <caption hidden>Table Caption</caption>
          <thead>
            <tr>
              ${generateTableHeaders(headers, selectable, context)}
            </tr>
          </thead>
          <tbody>
            ${generateTableRows(tableData, selectable, context)}
          </tbody>
        </table>

        ${ selectable ? `
            <cbp-action-bar variant="inline" context="dark-inverts">
              <div slot="cbp-action-bar-info">0 items selected.</div>
              <cbp-button fill="ghost" color="danger" context="dark-inverts" accessibility-text="Delete selected items">Delete</cbp-button>
              <cbp-button fill="ghost" context="dark-inverts" accessibility-text="Compare selected items">Compare</cbp-button>
            </cbp-action-bar>          
          ` : ''}
      </cbp-typography>
    `;
};

export const BasicTable = Template.bind({});
BasicTable.args = {
  striped: 'even',
  headers: [
    {
      label: "Header 1",
      sortable: true,
    },
    {
      label: "Header 2",
      sortable: true,
    },
    {
      label: "Header 3 is longer",
      sortable: true,
    },
    {
      label: "Header 4",
      sortable: true,
    },
    {
      label: "Header 5",
      sortable: false,
    },
  ],
  tableData: [
    {
      row: [
        {td: 'Row 1 Column 1 Cell Text'},
        {td: 'Row 1 Column 2 Cell Text'},
        {td: 'Row 1 Column 3 Cell Text'},
        {td: 'Row 1 Column 4 Cell Text'},
        {td: 'Row 1 Column 4 Cell Text'},
      ]
    },
    {
      row: [
        {td: 'Row 2 Column 1 Cell Text'},
        {td: 'Row 2 Column 2 Cell Text'},
        {td: 'Row 2 Column 3 Cell Text'},
        {td: 'Row 2 Column 4 Cell Text'},
        {td: 'Row 2 Column 5 Cell Text'},
      ]
    },
    {
      row: [
        {td: 'Row 3 Column 1 Cell Text'},
        {td: 'Row 3 Column 2 Cell Text'},
        {td: 'Row 3 Column 3 Cell Text'},
        {td: 'Row 3 Column 4 Cell Text is longer than the rest'},
        {td: 'Row 3 Column 5 Cell Text'},      ]
    },
    {
      row: [
        {td: 'Row 4 Column 1 Cell Text'},
        {td: 'Row 4 Column 2 Cell Text'},
        {td: 'Row 4 Column 3 Cell Text'},
        {td: 'Row 4 Column 4 Cell Text'},
        {td: 'Row 4 Column 5 Cell Text'},
      ]
    },
    {
      row: [
        {td: 'Row 5 Column 1 Cell Text'},
        {td: 'Row 5 Column 2 Cell Text'},
        {td: 'Row 5 Column 3 Cell Text'},
        {td: 'Row 5 Column 4 Cell Text'},
        {td: 'Row 5 Column 5 Cell Text'},
      ]
    },
  ]
}

const tableDangerTemplate = ({ tableData, headers, selectable, striped, hover, columnHover, overflow, context, sx }) => {
  
 /*
  const toolbar=`
    <div slot="cbp-table-toolbar">
      Test toolbar.
    </div>
  `;
  */

  return ` 
      <cbp-table
        ${striped != 'none' ? `striped="${striped}"` : ''}
        ${hover == 'cell' ? `hover="${hover}"` : ''}
        ${columnHover ? `column-hover` : ''}
        ${overflow ? `overflow="${overflow}"` : ''}
        ${context && context != 'light-inverts' ? `context="${context}"` : ''}
        ${sx ? `sx='${JSON.stringify(sx)}'` : ''}
      >
        <table style="width: 100%">
          <caption hidden>Table Caption</caption>
          <thead>
            <tr>
              ${generateTableHeaders(headers, selectable, context)}
            </tr>
          </thead>
          <tbody>
            ${generateTableRows(tableData, selectable, context)}
          </tbody>
        </table>

        ${ selectable ? `
            <cbp-action-bar variant="inline" context="dark-inverts">
              <div slot="cbp-action-bar-info">0 items selected.</div>
              <cbp-button fill="ghost" color="danger" context="dark-inverts" accessibility-text="Delete selected items">Delete</cbp-button>
              <cbp-button fill="ghost" context="dark-inverts" accessibility-text="Compare selected items">Compare</cbp-button>
            </cbp-action-bar>          
          ` : ''}
      </cbp-typography>
    `;
};

export const dangerTable = tableDangerTemplate.bind({});
dangerTable.args = {
  striped: 'even',
  headers: [
    {
      label: "Header 1",
      sortable: true,
    },
    {
      label: "Header 2",
      sortable: true,
    },
    {
      label: "Header 3 is longer",
      sortable: true,
    },
    {
      label: "Header 4",
      sortable: true,
    },
    {
      label: "Header 5",
      sortable: false,
    },
  ],
  tableData: [
    {
      row: [
        {td: 'Row 1 Column 1 Cell Text'},
        {td: 'Row 1 Column 2 Cell Text'},
        {td: 'Row 1 Column 3 Cell Text'},
        {td: 'Row 1 Column 4 Cell Text'},
        {td: 'Row 1 Column 4 Cell Text'},
      ]
    },
    {
      row: [
        {td: 'Row 2 Column 1 Cell Text'},
        {td: 'Row 2 Column 2 Cell Text', danger: true},
        {td: 'Row 2 Column 3 Cell Text'},
        {td: 'Row 2 Column 4 Cell Text', danger: true},
        {td: 'Row 2 Column 5 Cell Text'},
      ]
    },
    {
      row: [
        {td: 'Row 3 Column 1 Cell Text'},
        {td: 'Row 3 Column 2 Cell Text'},
        {td: 'Row 3 Column 3 Cell Text'},
        {td: 'Row 3 Column 4 Cell Text is longer than the rest'},
        {td: 'Row 3 Column 5 Cell Text'},
      ], danger: true
    },
    {
      row: [
        {td: 'Row 4 Column 1 Cell Text'},
        {td: 'Row 4 Column 2 Cell Text'},
        {td: 'Row 4 Column 3 Cell Text'},
        {td: 'Row 4 Column 4 Cell Text'},
        {td: 'Row 4 Column 5 Cell Text'},
      ]
    },
    {
      row: [
        {td: 'Row 5 Column 1 Cell Text'},
        {td: 'Row 5 Column 2 Cell Text'},
        {td: 'Row 5 Column 3 Cell Text'},
        {td: 'Row 5 Column 4 Cell Text'},
        {td: 'Row 5 Column 5 Cell Text'},
      ]
    },
  ]
}

const tableHighlightTemplate = ({ tableData, headers, selectable, striped, hover, columnHover, overflow, context, sx }) => {
  
 /*
  const toolbar=`
    <div slot="cbp-table-toolbar">
      Test toolbar.
    </div>
  `;
  */

  return ` 
      <cbp-table
        ${striped != 'none' ? `striped="${striped}"` : ''}
        ${hover == 'cell' ? `hover="${hover}"` : ''}
        ${columnHover ? `column-hover` : ''}
        ${overflow ? `overflow="${overflow}"` : ''}
        ${context && context != 'light-inverts' ? `context="${context}"` : ''}
        ${sx ? `sx='${JSON.stringify(sx)}'` : ''}
      >
        <table style="width: 100%">
          <caption hidden>Table Caption</caption>
          <thead>
            <tr>
              ${generateTableHeaders(headers, selectable, context)}
            </tr>
          </thead>
          <tbody>
            ${generateTableRows(tableData, selectable, context)}
          </tbody>
        </table>

        ${ selectable ? `
            <cbp-action-bar variant="inline" context="dark-inverts">
              <div slot="cbp-action-bar-info">0 items selected.</div>
              <cbp-button fill="ghost" color="danger" context="dark-inverts" accessibility-text="Delete selected items">Delete</cbp-button>
              <cbp-button fill="ghost" context="dark-inverts" accessibility-text="Compare selected items">Compare</cbp-button>
            </cbp-action-bar>          
          ` : ''}
      </cbp-typography>
    `;
};

export const highlightTable = tableHighlightTemplate.bind({});
highlightTable.args = {
  striped: 'even',
  headers: [
    {
      label: "Header 1",
      sortable: true,
    },
    {
      label: "Header 2",
      sortable: true,
    },
    {
      label: "Header 3 is longer",
      sortable: true,
    },
    {
      label: "Header 4",
      sortable: true,
    },
    {
      label: "Header 5",
      sortable: false,
    },
  ],
  tableData: [
    {
      row: [
        {td: 'Row 1 Column 1 Cell Text'},
        {td: 'Row 1 Column 2 Cell Text'},
        {td: 'Row 1 Column 3 Cell Text'},
        {td: 'Row 1 Column 4 Cell Text'},
        {td: 'Row 1 Column 4 Cell Text'},
      ]
    },
    {
      row: [
        {td: 'Row 2 Column 1 Cell Text', highlight: true},
        {td: 'Row 2 Column 2 Cell Text'},
        {td: 'Row 2 Column 3 Cell Text', highlight: true},
        {td: 'Row 2 Column 4 Cell Text'},
        {td: 'Row 2 Column 5 Cell Text'},
      ]
    },
    {
      row: [
        {td: 'Row 3 Column 1 Cell Text'},
        {td: 'Row 3 Column 2 Cell Text', highlight: true},
        {td: 'Row 3 Column 3 Cell Text'},
        {td: 'Row 3 Column 4 Cell Text is longer than the rest'},
        {td: 'Row 3 Column 5 Cell Text'},      ]
    },
    {
      row: [
        {td: 'Row 4 Column 1 Cell Text'},
        {td: 'Row 4 Column 2 Cell Text'},
        {td: 'Row 4 Column 3 Cell Text'},
        {td: 'Row 4 Column 4 Cell Text'},
        {td: 'Row 4 Column 5 Cell Text'},
      ]
    },
    {
      row: [
        {td: 'Row 5 Column 1 Cell Text'},
        {td: 'Row 5 Column 2 Cell Text'},
        {td: 'Row 5 Column 3 Cell Text'},
        {td: 'Row 5 Column 4 Cell Text'},
        {td: 'Row 5 Column 5 Cell Text'},
      ]
    },
  ]
}


const singleRowActionTableTemplate = ({ tableData, headers, selectable, striped, hover, columnHover, overflow, context, sx }) => {
  
 /*
  const toolbar=`
    <div slot="cbp-table-toolbar">
      Test toolbar.
    </div>
  `;
  */

  return ` 
      <cbp-table
        ${striped != 'none' ? `striped="${striped}"` : ''}
        ${hover == 'cell' ? `hover="${hover}"` : ''}
        ${columnHover ? `column-hover` : ''}
        ${overflow ? `overflow="${overflow}"` : ''}
        ${context && context != 'light-inverts' ? `context="${context}"` : ''}
        ${sx ? `sx=${JSON.stringify(sx)}` : ''}
      >
        <table style="width: 100%">
          <caption hidden>Table Caption</caption>
          <thead>
            <tr>
              ${generateTableHeaders(headers, selectable, context)}
            </tr>
          </thead>
          <tbody>
            ${generateTableRows(tableData, selectable, context)}
          </tbody>
        </table>

        ${ selectable ? `
            <cbp-action-bar variant="inline" context="dark-inverts">
              <div slot="cbp-action-bar-info">0 items selected.</div>
              <cbp-button fill="ghost" color="danger" context="dark-inverts" accessibility-text="Delete selected items">Delete</cbp-button>
              <cbp-button fill="ghost" context="dark-inverts" accessibility-text="Compare selected items">Compare</cbp-button>
            </cbp-action-bar>          
          ` : ''}
      </cbp-typography>
    `;
};

export const singleRowActionTable = singleRowActionTableTemplate.bind({});
singleRowActionTable.args = {
  striped: 'even',
  headers: [
    {
      label: "Header 1",
      sortable: true,
    },
    {
      label: "Header 2",
      sortable: true,
    },
    {
      label: "Header 3 is longer",
      sortable: true,
    },
    {
      label: "Actions",
      sortable: false,
    },
  ],
  tableData: [
    {
      row: [
        {td: 'Row 1 Column 1 Cell Text'},
        {td: 'Row 1 Column 2 Cell Text'},
        {td: 'Row 1 Column 3 Cell Text'},
        {td: `  <cbp-button
                  fill="outline"
                  color="secondary"
                  accessibility-text="View details of Row 1"
                > 
                  View 
                </cbp-button>`
        },
      ]
    },
    {
      row: [
        {td: 'Row 2 Column 1 Cell Text'},
        {td: 'Row 2 Column 2 Cell Text'},
        {td: 'Row 2 Column 3 Cell Text'},
        {td: `  <cbp-button
                  fill="outline"
                  color="secondary"
                  accessibility-text="View details of Row 2"
                > 
                  View
                </cbp-button>`
        },
      ]
    },
    {
      row: [
        {td: 'Row 3 Column 1 Cell Text'},
        {td: 'Row 3 Column 2 Cell Text'},
        {td: 'Row 3 Column 3 Cell Text'},
        {td: `  <cbp-button
                  fill="outline"
                  color="secondary"
                  accessibility-text="View details of Row 3"
                > 
                  View
                </cbp-button>`
        },
      ]
    },
    {
      row: [
        {td: 'Row 4 Column 1 Cell Text'},
        {td: 'Row 4 Column 2 Cell Text'},
        {td: 'Row 4 Column 3 Cell Text'},
        {td: `  <cbp-button
                  fill="outline"
                  color="secondary"
                  accessibility-text="View details of Row 4"
                > 
                  View
                </cbp-button>`
        },
      ]
    },
    {
      row: [
        {td: 'Row 5 Column 1 Cell Text'},
        {td: 'Row 5 Column 2 Cell Text'},
        {td: 'Row 5 Column 3 Cell Text'},
        {td: `  <cbp-button
                  fill="outline"
                  color="secondary"
                  accessibility-text="View details of Row 5"
                > 
                  View
                </cbp-button>`
        },
      ]
    },
  ]
}

const OverflowTemplate = ({ tableData, headers, selectable, striped, hover, columnHover, overflow, context, sx }) => {
  
 /*
  const toolbar=`
    <div slot="cbp-table-toolbar">
      Test toolbar.
    </div>
  `;
  */

  return ` 
      <cbp-table
        ${striped != 'none' ? `striped="${striped}"` : ''}
        ${hover == 'cell' ? `hover="${hover}"` : ''}
        ${columnHover ? `column-hover` : ''}
        ${overflow ? `overflow="${overflow}"` : ''}
        ${context && context != 'light-inverts' ? `context="${context}"` : ''}
        ${sx ? `sx=${JSON.stringify(sx)}` : ''}
      >
        <table style="width: 100%">
          <caption hidden>Table Caption</caption>
          <thead>
            <tr>
              ${generateTableHeaders(headers, selectable, context)}
            </tr>
          </thead>
          <tbody>
            ${generateTableRows(tableData, selectable, context)}
          </tbody>
        </table>

        ${ selectable ? `
            <cbp-action-bar variant="inline" context="dark-inverts">
              <div slot="cbp-action-bar-info">0 items selected.</div>
              <cbp-button fill="ghost" color="danger" context="dark-inverts" accessibility-text="Delete selected items">Delete</cbp-button>
              <cbp-button fill="ghost" context="dark-inverts" accessibility-text="Compare selected items">Compare</cbp-button>
            </cbp-action-bar>          
          ` : ''}
      </cbp-typography>
    `;
};

export const OverflowMenu = OverflowTemplate.bind({});
OverflowMenu.storyName = "Single Action Table with Overflow Menu"
// AppHeaderWithSubnav.storyName = "Application Header with Sub-Nav"
OverflowMenu.args = {
  striped: 'even',
  headers: [
    {
      label: "Header 1",
      sortable: true,
    },
    {
      label: "Header 2",
      sortable: true,
    },
    {
      label: "Header 3 is longer",
      sortable: true,
    },
    {
      label: "Actions",
      sortable: false,
    },
  ],
  tableData: [
    {
      row: [
        {td: 'Row 1 Column 1 Cell Text'},
        {td: 'Row 1 Column 2 Cell Text'},
        {td: 'Row 1 Column 3 Cell Text'},
        {td: `
          <cbp-menu
            uid="menuId1"
            position="bottom-end"
          >

            <cbp-button
              fill="outline"
              color="secondary"
              variant="square"
              accessibility-text="Actions"
              target-prop="open"
              controls="menuId1"
            >
              <cbp-icon name="ellipsis-vertical"></cbp-icon>
            </cbp-button>

            <cbp-menu-item>
              <cbp-button> 
                <cbp-icon>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M105.1 202.6c7.7-21.8 20.2-42.3 37.8-59.8c62.5-62.5 163.8-62.5 226.3 0L386.3 160 352 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l111.5 0c0 0 0 0 0 0l.4 0c17.7 0 32-14.3 32-32l0-112c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 35.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5zM39 289.3c-5 1.5-9.8 4.2-13.7 8.2c-4 4-6.7 8.8-8.1 14c-.3 1.2-.6 2.5-.8 3.8c-.3 1.7-.4 3.4-.4 5.1L16 432c0 17.7 14.3 32 32 32s32-14.3 32-32l0-35.1 17.6 17.5c0 0 0 0 0 0c87.5 87.4 229.3 87.4 316.7 0c24.4-24.4 42.1-53.1 52.9-83.8c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.5 62.5-163.8 62.5-226.3 0l-.1-.1L125.6 352l34.4 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L48.4 288c-1.6 0-3.2 .1-4.8 .3s-3.1 .5-4.6 1z"/></svg>
                </cbp-icon>
                Refresh
              </cbp-button>
            </cbp-menu-item>
            <cbp-menu-item>
              <cbp-button> 
                <cbp-icon name="clone"></cbp-icon>
                Copy
              </cbp-button>
            </cbp-menu-item>
            <cbp-menu-item>
              <cbp-button fill="ghost" color="secondary">  
                <cbp-icon name="arrow-right"></cbp-icon>
                Export as .csv
              </cbp-button>
            </cbp-menu-item>
            <cbp-menu-item color="danger">
              <cbp-button fill="ghost" color="danger">   
                <cbp-icon>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
                </cbp-icon>
                Delete
              </cbp-button>
            </cbp-menu-item>
          </cbp-menu>
          `}
      ]
    },
    {
      row: [
        {td: 'Row 2 Column 1 Cell Text'},
        {td: 'Row 2 Column 2 Cell Text'},
        {td: 'Row 2 Column 3 Cell Text'},
        {td: `
          <cbp-menu
            uid="menuId2"
            position="bottom-end"
          >

            <cbp-button
              fill="outline"
              color="secondary"
              variant="square"
              accessibility-text="Actions"
              target-prop="open"
              controls="menuId2"
            >
              <cbp-icon name="ellipsis-vertical"></cbp-icon>
            </cbp-button>

            <cbp-menu-item>
              <cbp-button> 
                <cbp-icon>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M105.1 202.6c7.7-21.8 20.2-42.3 37.8-59.8c62.5-62.5 163.8-62.5 226.3 0L386.3 160 352 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l111.5 0c0 0 0 0 0 0l.4 0c17.7 0 32-14.3 32-32l0-112c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 35.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5zM39 289.3c-5 1.5-9.8 4.2-13.7 8.2c-4 4-6.7 8.8-8.1 14c-.3 1.2-.6 2.5-.8 3.8c-.3 1.7-.4 3.4-.4 5.1L16 432c0 17.7 14.3 32 32 32s32-14.3 32-32l0-35.1 17.6 17.5c0 0 0 0 0 0c87.5 87.4 229.3 87.4 316.7 0c24.4-24.4 42.1-53.1 52.9-83.8c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.5 62.5-163.8 62.5-226.3 0l-.1-.1L125.6 352l34.4 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L48.4 288c-1.6 0-3.2 .1-4.8 .3s-3.1 .5-4.6 1z"/></svg>
                </cbp-icon>
                Refresh
              </cbp-button>
            </cbp-menu-item>
            <cbp-menu-item>
              <cbp-button> 
                <cbp-icon name="clone"></cbp-icon>
                Copy
              </cbp-button>
            </cbp-menu-item>
            <cbp-menu-item>
              <cbp-button fill="ghost" color="secondary">  
                <cbp-icon name="arrow-right"></cbp-icon>
                Export as .csv
              </cbp-button>
            </cbp-menu-item>
            <cbp-menu-item color="danger">
              <cbp-button fill="ghost" color="danger">   
                <cbp-icon>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
                </cbp-icon>
                Delete
              </cbp-button>
            </cbp-menu-item>
          </cbp-menu>
          `}
      ]
    },
    {
      row: [
        {td: 'Row 3 Column 1 Cell Text'},
        {td: 'Row 3 Column 2 Cell Text'},
        {td: 'Row 3 Column 3 Cell Text'},
        {td: `
          <cbp-menu
            uid="menuId3"
            position="bottom-end"
          >

            <cbp-button
              fill="outline"
              color="secondary"
              variant="square"
              accessibility-text="Actions"
              target-prop="open"
              controls="menuId3"
            >
              <cbp-icon name="ellipsis-vertical"></cbp-icon>
            </cbp-button>

            <cbp-menu-item>
              <cbp-button> 
                <cbp-icon>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M105.1 202.6c7.7-21.8 20.2-42.3 37.8-59.8c62.5-62.5 163.8-62.5 226.3 0L386.3 160 352 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l111.5 0c0 0 0 0 0 0l.4 0c17.7 0 32-14.3 32-32l0-112c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 35.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5zM39 289.3c-5 1.5-9.8 4.2-13.7 8.2c-4 4-6.7 8.8-8.1 14c-.3 1.2-.6 2.5-.8 3.8c-.3 1.7-.4 3.4-.4 5.1L16 432c0 17.7 14.3 32 32 32s32-14.3 32-32l0-35.1 17.6 17.5c0 0 0 0 0 0c87.5 87.4 229.3 87.4 316.7 0c24.4-24.4 42.1-53.1 52.9-83.8c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.5 62.5-163.8 62.5-226.3 0l-.1-.1L125.6 352l34.4 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L48.4 288c-1.6 0-3.2 .1-4.8 .3s-3.1 .5-4.6 1z"/></svg>
                </cbp-icon>
                Refresh
              </cbp-button>
            </cbp-menu-item>
            <cbp-menu-item>
              <cbp-button> 
                <cbp-icon name="clone"></cbp-icon>
                Copy
              </cbp-button>
            </cbp-menu-item>
            <cbp-menu-item>
              <cbp-button fill="ghost" color="secondary">  
                <cbp-icon name="arrow-right"></cbp-icon>
                Export as .csv
              </cbp-button>
            </cbp-menu-item>
            <cbp-menu-item color="danger">
              <cbp-button fill="ghost" color="danger">   
                <cbp-icon>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
                </cbp-icon>
                Delete
              </cbp-button>
            </cbp-menu-item>
          </cbp-menu>
          `}
      ]
    },
    {
      row: [
        {td: 'Row 4 Column 1 Cell Text'},
        {td: 'Row 4 Column 2 Cell Text'},
        {td: 'Row 4 Column 3 Cell Text'},
        {td: `
          <cbp-menu
            uid="menuId4"
            position="bottom-end"
          >

            <cbp-button
              fill="outline"
              color="secondary"
              variant="square"
              accessibility-text="Actions"
              target-prop="open"
              controls="menuId4"
            >
              <cbp-icon name="ellipsis-vertical"></cbp-icon>
            </cbp-button>

            <cbp-menu-item>
              <cbp-button> 
                <cbp-icon>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M105.1 202.6c7.7-21.8 20.2-42.3 37.8-59.8c62.5-62.5 163.8-62.5 226.3 0L386.3 160 352 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l111.5 0c0 0 0 0 0 0l.4 0c17.7 0 32-14.3 32-32l0-112c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 35.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5zM39 289.3c-5 1.5-9.8 4.2-13.7 8.2c-4 4-6.7 8.8-8.1 14c-.3 1.2-.6 2.5-.8 3.8c-.3 1.7-.4 3.4-.4 5.1L16 432c0 17.7 14.3 32 32 32s32-14.3 32-32l0-35.1 17.6 17.5c0 0 0 0 0 0c87.5 87.4 229.3 87.4 316.7 0c24.4-24.4 42.1-53.1 52.9-83.8c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.5 62.5-163.8 62.5-226.3 0l-.1-.1L125.6 352l34.4 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L48.4 288c-1.6 0-3.2 .1-4.8 .3s-3.1 .5-4.6 1z"/></svg>
                </cbp-icon>
                Refresh
              </cbp-button>
            </cbp-menu-item>
            <cbp-menu-item>
              <cbp-button> 
                <cbp-icon name="clone"></cbp-icon>
                Copy
              </cbp-button>
            </cbp-menu-item>
            <cbp-menu-item>
              <cbp-button fill="ghost" color="secondary">  
                <cbp-icon name="arrow-right"></cbp-icon>
                Export as .csv
              </cbp-button>
            </cbp-menu-item>
            <cbp-menu-item color="danger">
              <cbp-button fill="ghost" color="danger">   
                <cbp-icon>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
                </cbp-icon>
                Delete
              </cbp-button>
            </cbp-menu-item>
          </cbp-menu>
          `}
      ]
    },
    {
      row: [
        {td: 'Row 5 Column 1 Cell Text'},
        {td: 'Row 5 Column 2 Cell Text'},
        {td: 'Row 5 Column 3 Cell Text'},
       {td: `
          <cbp-menu
            uid="menuId5"
            position="bottom-end"
          >

            <cbp-button
              fill="outline"
              color="secondary"
              variant="square"
              accessibility-text="Actions"
              target-prop="open"
              controls="menuId5"
            >
              <cbp-icon name="ellipsis-vertical"></cbp-icon>
            </cbp-button>

            <cbp-menu-item>
              <cbp-button> 
                <cbp-icon>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M105.1 202.6c7.7-21.8 20.2-42.3 37.8-59.8c62.5-62.5 163.8-62.5 226.3 0L386.3 160 352 160c-17.7 0-32 14.3-32 32s14.3 32 32 32l111.5 0c0 0 0 0 0 0l.4 0c17.7 0 32-14.3 32-32l0-112c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 35.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5zM39 289.3c-5 1.5-9.8 4.2-13.7 8.2c-4 4-6.7 8.8-8.1 14c-.3 1.2-.6 2.5-.8 3.8c-.3 1.7-.4 3.4-.4 5.1L16 432c0 17.7 14.3 32 32 32s32-14.3 32-32l0-35.1 17.6 17.5c0 0 0 0 0 0c87.5 87.4 229.3 87.4 316.7 0c24.4-24.4 42.1-53.1 52.9-83.8c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.5 62.5-163.8 62.5-226.3 0l-.1-.1L125.6 352l34.4 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L48.4 288c-1.6 0-3.2 .1-4.8 .3s-3.1 .5-4.6 1z"/></svg>
                </cbp-icon>
                Refresh
              </cbp-button>
            </cbp-menu-item>
            <cbp-menu-item>
              <cbp-button> 
                <cbp-icon name="clone"></cbp-icon>
                Copy
              </cbp-button>
            </cbp-menu-item>
            <cbp-menu-item>
              <cbp-button fill="ghost" color="secondary">  
                <cbp-icon name="arrow-right"></cbp-icon>
                Export as .csv
              </cbp-button>
            </cbp-menu-item>
            <cbp-menu-item color="danger">
              <cbp-button fill="ghost" color="danger">   
                <cbp-icon>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
                </cbp-icon>
                Delete
              </cbp-button>
            </cbp-menu-item>
          </cbp-menu>
          `}
      ]
    },
  ]
}