export default {
  title: 'Components/Panel',
  argTypes: {
    headingLevel: {
      description:
        'The heading level used as the panel header (e.g., `h2`-`h6`) as appropriate for the document structure.',
      control: 'select',
      options: ['h2', 'h3', 'h4', 'h5', 'h6'],
    },
    header: {
      description: 'Text used as the panel header.',
      control: 'text',
    },
    headerId: {
      description:
        'The `id` of the heading tag used to label the wrapping landmark element via `aria-labelledby`. Specifying this `id` will override any `aria-label` on the landmark tag.',
      control: 'text',
    },
    showIcon: {
      description:
        'Show an icon in the panel header as an example. This icon could be swapped out for any other.',
      control: 'boolean',
    },
    content: {
      description:
        'Placeholder text representing the panel contents, which can include HTML markup not supported in this story.',
      control: 'text',
    },
    role: {
      description: 'The optional role applied to the panel component',
      control: 'select',
      options: [
        'none',
        'section',
        'complementary'
      ],
    },
    ariaLabel: {
      description:
        'An accessible label may be provided if the text within the header is not sufficiently descriptive or unique. In such a case, omit the heading `id`.',
      control: 'text',
    },
  },
};

const PanelTemplate = ({role, headingLevel, header, headerId, content, ariaLabel, showIcon}) =>
  `
    <cbp-panel
      ${headerId ? `aria-labelledby="${headerId}"` : ''}
      ${role != 'none' ? `role="${role}"` : ''}
      ${ariaLabel ? `aria-label="${ariaLabel}"` : ''}
      ${headerId ? `aria-labelledby="${headerId}"` : ''}
    >
      <cbp-typography
        slot="cbp-panel-header"
        tag=${headingLevel}
        variant="heading-lg"
        ${headerId ? `id="${headerId}"` : ''}
      >
        ${showIcon ? '<cbp-icon name="star" sx=\'{"margin-right":"var(--cbp-space-4x)"}\'></cbp-icon>': ''}${header}
      </cbp-typography
      <div class="cbp-panel__content">
        <p>${content}</p>
      </div>
    </cbp-panel>
  `;

export const Default = PanelTemplate.bind({});
Default.args = {
  headingLevel: 'h3',
  header: 'Panel Header',
  content: 'Panel Content',
  role: 'none',
};
Default.storyName = 'Default';

export const Sidebar = PanelTemplate.bind({});
Sidebar.args = {
  headingLevel: 'h3',
  header: 'Sidebar Header',
  headerId: 'panelheader',
  content: 'Sidebar Content',
  role: 'complementary',
};
Sidebar.storyName = 'Sidebar';
