export default {
    title: 'Components/Accordion',
    tags: ['autodocs'],
    argTypes: {
      items: {
        name: 'Accordion Items',
        description: 'Configure various aspects of the accordion items within the accordion.',
        control: 'object',
      },
      multiple: {
        description: 'Specifies whether multiple accordion items may remain open at the same time.',
        control: 'boolean',
      },
      sx: {
        description: 'Supports adding inline styles as an object of key-value pairs comprised of CSS properties and values. Values should reference design tokens when possible.',
        control: 'object',
      },
    },
    args: {
      items: [
        {
          label: 'Accordion Item 1',
          open: false,
          content: 'Accordion item 1 content.',
        },
        {
          label: 'Accordion Item 2',
          open: false,
          content: 'Accordion item 2 content.',
        },
        {
          label: 'Accordion Item 3',
          open: false,
          content: 'Accordion item 3 content.',
        },
        {
          label: 'Accordion Item 4',
          open: false,
          content: 'Accordion item 4 content.',
        },
      ],
    },
  };
  

  function generateChildren(items) {
    const html = items.map(({ label, content, open }) => {
      return `
        <cbp-accordion-item
          ${label ? `label="${label}"` : ''}  
          ${open == true ? 'open' : ''}
        >
          ${content}
        </cbp-accordion-item>
      `;
    });
    return html.join('');
  }
  

  const Template = ({ items, multiple, sx }) => {
    return ` 
        <cbp-accordion
            ${multiple ? `multiple` : ''}  
            ${sx ? `sx=${JSON.stringify(sx)}` : ''}
        >
            ${generateChildren(items)}
        </cbp-accordion>
      `;
  };

  export const Accordion = Template.bind({});
  Accordion.args = {}
