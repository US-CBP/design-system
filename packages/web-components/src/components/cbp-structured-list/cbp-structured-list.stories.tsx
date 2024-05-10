export default {
  title: 'Components/Structured List',
  tags: ['autodocs'],
  argTypes: {
    showHeader: {
      control: 'boolean',
    },
    showFooter: {
      control: 'boolean',
    },
    striped: {
      control: 'boolean',
    },
    selectable: {
      control: 'boolean',
    },
    sx: {
      description: 'Supports adding inline styles as an object of key-value pairs comprised of CSS properties and values. Values should reference design tokens when possible.',
      control: 'object',
    },
  },
};

const StructuredListTemplate = ({ striped, selectable, showHeader, showFooter, sx }) => {
  return ` 
        <cbp-structured-list
          ${striped ? `striped` : ''}
          ${selectable ? `selectable` : ''}
          header-id="list-header"
          ${sx ? `sx=${JSON.stringify(sx)}` : ''}
        >
          ${showHeader ? `<div slot="cbp-structured-list-header" id="list-header"># of Results, etc.</div>` : ''}
          <li>Structured list content here.</li>
          <li>Structured list content here.</li>
          <li>Structured list content here.</li>
          <li>Structured list content here.</li>
          <li>Structured list content here.</li>
          ${showFooter ? `<div slot="cbp-structured-list-footer">Some footer info and/or action buttons here.</div>` : ''}
        </cbp-structured-list>
      `;
};
export const StructuredList = StructuredListTemplate.bind({});


const StructuredListItemsTemplate = ({ striped, selectable, showHeader, showFooter, sx }) => {
  return ` 
        <cbp-structured-list
          ${striped ? `striped` : ''}
          ${selectable ? `selectable` : ''}
          header-id="list-header"
          ${sx ? `sx=${JSON.stringify(sx)}` : ''}
        >
          ${showHeader ? `<div slot="cbp-structured-list-header" id="list-header"># of Results, etc.</div>` : ''}
          <cbp-structured-list-item>Structured list content here.</cbp-structured-list-item>
          <cbp-structured-list-item>Structured list content here.</cbp-structured-list-item>
          <cbp-structured-list-item>Structured list content here.</cbp-structured-list-item>
          <cbp-structured-list-item>Structured list content here.</cbp-structured-list-item>
          <cbp-structured-list-item>Structured list content here.</cbp-structured-list-item>
          ${showFooter ? `<div slot="cbp-structured-list-footer">Some footer info and/or action buttons here.</div>` : ''}
        </cbp-structured-list>
      `;
};
export const StructuredListItems = StructuredListItemsTemplate.bind({});


const StructuredListWithGridTemplate = ({ striped, selectable, showHeader, showFooter, sx }) => {
  return ` 
        <cbp-structured-list
          ${striped ? `striped` : ''}
          ${selectable ? `selectable` : ''}
          header-id="list-header"
          ${sx ? `sx=${JSON.stringify(sx)}` : ''}
        >
          ${showHeader ? `<div slot="cbp-structured-list-header" id="list-header"># of Results, etc.</div>` : ''}

          <cbp-structured-list-item>
            <cbp-grid
              gap="var(--cbp-space-2x)"
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
              gap="var(--cbp-space-2x)"
              grid-template-columns="repeat(auto-fit, minmax(5rem, 1fr))"
            >
              <cbp-grid-item>
                Grid Item 1 is a bit longer
              </cbp-grid-item>
              <cbp-grid-item>
                Grid Item 2
              </cbp-grid-item>
              <cbp-grid-item>
                Grid Item 3 is a whole lot longer blah blah blah blah blah blah blah blah blah.
              </cbp-grid-item>
              <cbp-grid-item>
                Grid Item 4
              </cbp-grid-item>
            </cbp-grid>
          </cbp-structured-list-item>

          <cbp-structured-list-item>
            <cbp-grid
              gap="var(--cbp-space-2x)"
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

          ${showFooter ? `<div slot="cbp-structured-list-footer">Some footer info and/or action buttons here.</div>` : ''}
        </cbp-structured-list>
      `;
};
export const StructuredListWithGrid = StructuredListWithGridTemplate.bind({});