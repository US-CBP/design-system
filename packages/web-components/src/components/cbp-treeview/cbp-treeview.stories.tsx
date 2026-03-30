export default {
  title: 'Controls/Treeview',
  tags: ['new'],
  argTypes: {
    name: {
      control: 'text',
    },
    accessibilityText: {
      control: 'text',
    },
    selectable: {
      control: 'boolean',
    },
    context: {
      control: 'select',
      options: ['light-inverts', 'light-always', 'dark-inverts', 'dark-always'],
    },
    sx: {
      description: 'Supports adding inline styles as an object of key-value pairs comprised of CSS properties and values. Values should reference design tokens when possible.',
      control: 'object',
    },
  },
};

function generateTreeviewitems(tree, selectable) {
  const html = tree.map(({ label, value, children, checked, slottedButton }) => {
    return `
      <cbp-treeview-item
        label="${label}"
        value="${value}"
        ${checked && selectable? 'checked' : ''}
      >
        ${!selectable && slottedButton ? `
          <cbp-button
            slot="cbp-treeview-item-buttons"
            color="secondary"
            fill="outline"
          >
            ${slottedButton}
          </cbp-button>
        ` : ''}
        ${children ? generateTreeviewitems(children, selectable) : ''}
      </cbp-treeview-item>`;
  });
  return html.join('');
}


const Template = ({ treeItems, name, selectable, accessibilityText, context, sx }) => {
  return `
    <cbp-treeview
      ${name ? `name="${name}"` : ''}
      ${accessibilityText ? `accessibility-text="${accessibilityText}"` : ''}
      ${selectable ? 'selectable' : ''}
      ${context && context != 'light-inverts' ? `context="${context}"` : ''}
      ${sx ? `sx='${JSON.stringify(sx)}'` : ''}
    >
      ${generateTreeviewitems(treeItems, selectable)}
    </cbp-treeview>
  `;
};

export const Treeview = Template.bind({});
Treeview.args = {
  accessibilityText: 'Treeview storybook example',
  name: 'treeitem',
  selectable: true,
  treeItems: [
    {
      label: 'Parent Level A 1',
      value: 'a1',
      children: [
        {
          label: 'Parent Level B 1',
          value: 'b1',
          children: [
            {
              label: 'Parent Level C 1',
              value: 'c1',
              children: [
                {
                  label: 'Parent Level D 1',
                  value: 'd1',
                  children: [
                    {
                      label: 'Parent Level E 1',
                      value: 'e1',
                      children: [],
                      checked: true,
                    },
                    {
                      label: 'Parent Level E 2',
                      value: 'e2',
                      children: [],
                      checked: false,
                    },
                  ],
                  checked: false,
                },
                {
                  label: 'Parent Level D 2',
                  value: 'd2',
                  children: [],
                  checked: false,
                },
                {
                  label: 'Parent Level D 3',
                  value: 'd3',
                  children: [],
                  checked: false,
                },
              ],
              checked: false,
            },
            {
              label: 'Parent Level C 2',
              value: 'c2',
              children: [],
              checked: false,
            },
            {
              label: 'Parent Level C 3',
              value: 'c3',
              children: [],
              checked: false,
            },
          ],
          checked: false,
        },
        {
          label: 'Parent Level B 2',
          value: 'b2',
          children: [],
          checked: false,
        },
        {
          label: 'Parent Level B 3',
          value: 'b3',
          children: [],
          checked: false,
        },
      ],
      checked: false,
    },
    {
      label: 'Parent Level A 2',
      value: 'a2',
      children: [
        {
          label: 'Parent Level B 1',
          value: 'b1-1',
          children: [],
          checked: false,
        },
        {
          label: 'Parent Level B 2',
          value: 'b2-1',
          children: [],
          checked: false,
        },
      ],
      checked: false,
    },
  ],
};

const actionButtonTemplate = ({ treeItems, name,  accessibilityText, context, sx }) => {
  return `
    <cbp-treeview
      ${name ? `name="${name}"` : ''}
      ${accessibilityText ? `accessibility-text="${accessibilityText}"` : ''}
      ${context && context != 'light-inverts' ? `context="${context}"` : ''}
      ${sx ? `sx='${JSON.stringify(sx)}'` : ''}
    >
      ${generateTreeviewitems(treeItems, false)}
    </cbp-treeview>
  `;
};

export const actionButtonTreeview = actionButtonTemplate.bind({});
actionButtonTreeview.storyName = 'Treeview with Action Button'
actionButtonTreeview.args = {
  accessibilityText: 'Treeview storybook example',
  name: 'treeitem',
  selectable: true,
  treeItems: [
    {
      label: 'Parent Level A 1',
      value: 'a1',
      children: [
        {
          label: 'Parent Level B 1',
          value: 'b1',
          children: [
            {
              label: 'Parent Level C 1',
              value: 'c1',
              children: [
                {
                  label: 'Parent Level D 1',
                  value: 'd1',
                  children: [
                    {
                      label: 'Parent Level E 1',
                      value: 'e1',
                      children: [],
                      slottedButton: `Action E1`
                    },
                    {
                      label: 'Parent Level E 2',
                      value: 'e2',
                      children: [],
                      slottedButton: `Action E2`
                    },
                  ],
                },
                {
                  label: 'Parent Level D 2',
                  value: 'd2',
                  children: [],
                  slottedButton: `Action D2`
                },
                {
                  label: 'Parent Level D 3',
                  value: 'd3',
                  children: [],
                  slottedButton: `Action D3`
                },
              ],
            },
            {
              label: 'Parent Level C 2',
              value: 'c2',
              children: [],
              slottedButton: `Action C2`
            },
            {
              label: 'Parent Level C 3',
              value: 'c3',
              children: [],
              slottedButton: `Action C3`
            },
          ],
        },
        {
          label: 'Parent Level B 2',
          value: 'b2',
          children: [],
          slottedButton: `Action B2`
        },
        {
          label: 'Parent Level B 3',
          value: 'b3',
          children: [],
          slottedButton: `Action B3`
        },
      ],
    },
    {
      label: 'Parent Level A 2',
      value: 'a2',
      children: [
        {
          label: 'Parent Level B 1',
          value: 'b1-1',
          children: [],
          slottedButton: `Action B1`
        },
        {
          label: 'Parent Level B 2',
          value: 'b2-1',
          children: [],
          slottedButton: `Action B2`
        },
      ],
    },
  ],
};
