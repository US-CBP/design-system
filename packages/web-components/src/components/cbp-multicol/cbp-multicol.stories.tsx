export default {
  title: 'Layout and Structure/Multicol',
  tags: ['beta','code-only'],
  argTypes: {
    content: {
      name: 'Content (slotted)',
      description: 'The multi-col children and their contents.',
      control: 'object',
    },
    columns: {
      control: 'number',
    },
    width: {
      control: 'text',
    },
    gap: {
      control: 'text',
    },
    rule: {
      control: 'text',
    },
    nobreak: {
      control: 'boolean',
    },
    sx: {
      description: 'Supports adding inline styles as an object of key-value pairs comprised of CSS properties and values. Values should reference design tokens when possible.',
      control: 'object',
    },
  },
  args: {
    content: [
      {
        text: 'Item 1',
      },
      {
        text: 'Item 2',
      },
      {
        text: 'Item 3',
      },
      {
        text: 'Item 4',
      },
      {
        text: 'Item 5',
      },
      {
        text: 'Item 6',
      },
      {
        text: 'Item 7',
      },
      {
        text: 'Item 8',
      },
      {
        text: 'Item 9',
      },
      {
        text: 'Item 10',
      },
    ],
  },
};

function createChildren(children) {
  const html = children.map(({ text }) => {
    return `
      <li>${text}</li>`;
  });
  return html.join('');
}

const Template = ({ content, columns, width, gap, rule, nobreak, sx }) => {
  return `
    <cbp-multicol
      ${columns ? `columns="${columns}"` : ''}
      ${width ? `width="${width}"` : ''}
      ${gap ? `gap="${gap}"` : ''}
      ${rule ? `rule="${rule}"` : ''}
      ${nobreak ? 'nobreak' : ''}
      ${sx ? `sx='${JSON.stringify(sx)}'` : ''}
      role="list"
    >${createChildren(content)}
    </cbp-multicol>
  `;
};

export const Multicol: any = Template.bind({});
Multicol.args = {
  columns: 2,
  width: '8rem',
  gap: 'var(--cbp-space-4x)',
  sx: {"padding-inline-start":"var(--cbp-space-4x)"}
};