export default {
  title: 'Patterns/Link',
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    label: {
      name: 'Link Text',
      description: 'The linked text, if any',
      type: 'string'
    },
    ariaLabel: {
      name: 'ARIA Label',
      description: 'The accessible label when the link does not contain text or it is not sufficiently and uniquely descriptive.',
      type: 'string'
    },
  }
};

const LinkTemplate = ({ label, ariaLabel, definition }) => (
  `<a href="#" class="cbp-link ${definition ? 'cbp-link--definition' : '' }" aria-label=${ariaLabel}>${label}</a>`
)

const DisabledLinkTemplate = ({ label, ariaLabel }) => (
  `<a class="cbp-link" role="link" aria-disabled="true" aria-label=${ariaLabel}>${label}</a>`
)

export const Link = LinkTemplate.bind({});
Link.args = {
  label: 'Text Link',
  definition: false
};
Link.argTypes = {
  definition: {
    name: 'Definition Modifier',
    description: 'Used when the developer wants to give more information about a term or acronym and can be used in conjunction with a `<abbr>` tag',
    type: { name: 'boolean', required: false }
  }
}
Link.storyName = 'Text Link';

export const DisabledLink = DisabledLinkTemplate.bind({});
DisabledLink.args = {
  label: 'Disabled Text Link'
};
DisabledLink.storyName = 'Disabled';
