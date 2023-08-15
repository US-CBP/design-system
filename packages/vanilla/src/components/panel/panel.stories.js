export default {
  title: 'Patterns/Panel',
  argTypes: {
    tag: {
      name: 'Semantic Tag',
      description: 'The semantic tag defining the panel',
      control: 'radio',
      options: ['section', 'aside'],
    },
    headingLevel: {
      name: 'Header Text',
      description:
        'The heading level used as the panel header (e.g., `h2`-`h6`) as appropriate for the document structure.',
      control: 'select',
      options: ['h2', 'h3', 'h4', 'h5', 'h6'],
    },
    header: {
      name: 'Heading Text',
      description: 'Text used as the panel header.',
      control: 'text',
    },
    headerId: {
      name: 'Heading ID',
      description:
        'The `id` of the heading tag used to label the wrapping landmark element via `aria-labelledby`. Specifying this `id` will override any `aria-label`.',
      control: 'text',
    },
    content: {
      name: 'Panel contents',
      description:
        'Placeholder text representing the panel contents, which can include HTML markup not supported in this story.',
      control: 'text',
    },
    ariaLabel: {
      name: 'ARIA Label',
      description:
        'An accessible label may be provided if the text within the header is not sufficiently descriptive or unique. In such a case, omit the heading `id`.',
      control: 'text',
    },
    showIcon: {
      name: 'Show Header Icon',
      description:
        'Show an icon in the panel header as an example. This icon could be swapped out for any other.',
      control: 'boolean',
    },
  },
};

const PanelTemplate = ({tag, headingLevel, header, headerId, content, ariaLabel, showIcon}) =>
  `
    <${tag} class="cbp-panel"
      ${headerId ? 'aria-labelledby="' + headerId + '"' : ''}
      ${ariaLabel ? 'aria-label="' + ariaLabel + '"' : ''}
    >
      <div class="cbp-panel-header">
        <${headingLevel}
          ${headerId ? 'id="' + headerId + '"' : ''}
        >${showIcon ? '<i class="fas fa-address-book cbp-margin-right-4x"></i>': ''}${header}
        </${headingLevel}>
      </div>
      <div class="cbp-panel-content">
        <p>${content}</p>
      </div>
    </${tag}>
  `;

export const Default = PanelTemplate.bind({});
Default.args = {
  tag: 'section',
  headingLevel: 'h3',
  header: 'Panel Header',
  headerId: 'panelheader',
  content: 'Panel Content',
};
Default.storyName = 'Default';

export const Sidebar = PanelTemplate.bind({});
Sidebar.args = {
  tag: 'aside',
  headingLevel: 'h3',
  header: 'Sidebar Header',
  headerId: 'panelheader',
  content: 'Sidebar Content',
};
Sidebar.storyName = 'Sidebar';
