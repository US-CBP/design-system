export default {
  title: 'Components/Table',
  //tags: ['autodocs'],
  argTypes: {
    striped: {
      control: 'select',
      options: ['none', 'even', 'odd'],
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


function generateTableRows(data, selectable) {
  const html = data.map( ({ row }, i) => {
    const checkbox = `<td><cbp-checkbox><input type="checkbox" name="rowid" value="${i+1}"><span style="display:none">Select row ${i+1}</span></cbp-checkbox></td>`
    let cells = row.map( ({td})  => {
      return `
        <td>${td}</td>
      `;
    }).join('');
    if (selectable) cells = checkbox + cells;
    //return html.join('');
    return `
      <tr>
        ${cells}
      </tr>
    `;
  });
  return html.join('');
}


const Template = ({ tableData, selectable, striped, context, sx }) => {
  return ` 
      <cbp-table
        ${striped != 'none' ? `striped=${striped}` : ''}
        ${context && context != 'light-inverts' ? `context=${context}` : ''}
        ${sx ? `sx=${JSON.stringify(sx)}` : ''}
      >
        <table style="width: 100%">
          <caption>Table Caption</caption>
          <thead>
            <tr>
              ${ selectable ? `<th><cbp-checkbox><input type="checkbox" name="selectall" value="1"><span style="display:none">Select All</span></cbp-checkbox></th>` : ''}
              <th>Header 1</th>
              <th>Header 2</th>
              <th>Header 3</th>
              <th>Header 4</th>
            </tr>
          </thead>
          <tbody>
            ${generateTableRows(tableData, selectable)}
          </tbody>
        </table>
      </cbp-typography>
    `;
};

export const BasicTable = Template.bind({});
BasicTable.args = {
  striped: 'even',
  tableData: [
    {
      row: [
        {td: 'Cell Text'},
        {td: 'Cell Text'},
        {td: 'Cell Text'},
        {td: 'Cell Text'},
      ]
    },
    {
      row: [
        {td: 'Cell Text'},
        {td: 'Cell Text'},
        {td: 'Cell Text'},
        {td: 'Cell Text'},
      ]
    },
    {
      row: [
        {td: 'Cell Text'},
        {td: 'Cell Text'},
        {td: 'Cell Text'},
        {td: 'Cell Text'},
      ]
    },
    {
      row: [
        {td: 'Cell Text'},
        {td: 'Cell Text'},
        {td: 'Cell Text'},
        {td: 'Cell Text'},
      ]
    },
  ]
}

