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
  const html = data.map( ({ row }, i) => {
    const checkbox = `<td>
        <cbp-checkbox ${context && context != 'light-inverts' ? `context=${context}` : ''}>
          <input type="checkbox" name="rowid" value="${i+1}">
          <span style="display:none">Select row ${i+1}</span>
        </cbp-checkbox>
      </td>`
    let cells = row.map( ({td})  => {
      return `
        <td>${td}</td>
      `;
    }).join('');
    if (selectable) cells = checkbox + cells;
    return `
      <tr>
        ${cells}
      </tr>
    `;
  });
  return html.join('');
}


const Template = ({ tableData, headers, selectable, striped, hover, columnHover, context, sx }) => {
  
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
        ${context && context != 'light-inverts' ? `context="${context}"` : ''}
        ${sx ? `sx=${JSON.stringify(sx)}` : ''}
      >
        <table style="width: 100%">
          <caption>Table Caption</caption>
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

