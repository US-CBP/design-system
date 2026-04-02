export default {
  title: "Test/Table with Multiple Headers",
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
    showCaption: {
      control: 'boolean'
    },
    liveRegion: {
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
};

//test case for table with multilevel header

function generateTableHeaders(headerData, selectable, context) {


    const html = headerData.map( ({header}) =>{
        const checkbox = `
                    <th>
                        <cbp-checkbox ${context && context != 'light-inverts' ? `context="${context}"` : ''}>
                        <input type="checkbox" name="selectall" value="1">
                        <span style="display:none">Select Rows</span>
                        </cbp-checkbox>
                    </th>
        `
        let cells = header.map( ({label, colspan, sortable, alignmentRight}, i)  => {
            return `
            ${ sortable && !colspan? `
                    <th 
                        ${i == 0 ? `aria-sort="ascending"` : ''}
                        ${alignmentRight ? `style="text-align: right;"` : ''}
                    >
                        <cbp-button fill="ghost" color="secondary" name="${`column-${i}`}" value="${i}">
                        <cbp-icon></cbp-icon>${label}
                        </cbp-button>
                    </th>`
            : `
                    <th
                        ${colspan ? `colspan="${colspan}"` : ''}
                        ${alignmentRight ? `style="text-align: right;"` : ''}
                    >
                        ${label}
                    </th>`
            }`;
        }).join('');

        if (selectable) cells = checkbox + cells;
        return `<tr>${cells}</tr>`;
    }).join('');
    return html;
}

function generateTableRows(data, useRowHeader, selectable, context) {
  const html = data.map( ({ row, danger }, i) => {
    const checkbox = `
            <td>
              <cbp-checkbox ${context && context != 'light-inverts' ? `context="${context}"` : ''}>
                <input type="checkbox" name="rowid" value="${i+1}">
                <span style="display:none">Select row ${i+1}</span>
              </cbp-checkbox>
            </td>
    `;

    let cells = row.map( ({td, danger, highlight, alignmentRight}, j)  => {    
       return `
            <td
              ${danger ? `class="cbp-table--danger"` : highlight ? `class="cbp-table--highlight"` : ``}
              ${useRowHeader && j==0 ? `scope="row"` : ''}
              ${alignmentRight ? `style="text-align: right;"` : ''}
            >${td}</td>
      `;
    }).join('');
    
    if (selectable) cells = checkbox + cells;
    
    return `
          <tr ${danger ? `class="cbp-table--danger"` :''}>
            ${cells}
          </tr>
    `;
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


const Template = ({ tableData, headerData, useRowHeader, selectable, striped, hover, columnHover, overflow, showToolbar, showCaption, liveRegion, context, sx }) => {
  
  return ` 
    <cbp-table
      ${striped != 'none' ? `striped="${striped}"` : ''}
      ${hover == 'cell' ? `hover="${hover}"` : ''}
      ${columnHover ? 'column-hover' : ''}
      ${overflow ? `overflow="${overflow}"` : ''}
      ${context && context != 'light-inverts' ? `context="${context}"` : ''}
      ${sx ? `sx='${JSON.stringify(sx)}'` : ''}
    >
      ${showToolbar ? toolbar() : ''}
      ${liveRegion ? `<div slot="cbp-table-live-region">${liveRegion}</div>` : ''}

      <table style="width:100%">
        <caption ${ showCaption ? '' : 'hidden' }>Table Caption</caption>
        <thead>
          ${generateTableHeaders(headerData, selectable, context)}
        </thead>
        <tbody>
          ${generateTableRows(tableData, useRowHeader, selectable, context)}
        </tbody>
      </table>
    </cbp-table>
    
    ${ selectable ? `
      <cbp-action-bar variant="inline" context="dark-inverts">
        <div slot="cbp-action-bar-info">0 items selected.</div>
        <cbp-button fill="ghost" color="danger" context="dark-inverts" accessibility-text="Delete selected items">Delete</cbp-button>
        <cbp-button fill="ghost" context="dark-inverts" accessibility-text="Compare selected items">Compare</cbp-button>
      </cbp-action-bar>          
    ` : ''}
  `;
};

export const multiHeaderTable = Template.bind({});
multiHeaderTable.storyName="Table with Multiple Headers";
multiHeaderTable.args = {
  striped: 'even',
  headerData:[
    {
        header: [
            {
                label: "Group Header 1",
                colspan: 2,
                sortable: true,
            },
            {
                label: "Group Header 2",
                colspan: 3,
                sortable: true,
            }
        ],
    },
    {
        header: [
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
            sortable: true,
        },
        ],
    }
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
