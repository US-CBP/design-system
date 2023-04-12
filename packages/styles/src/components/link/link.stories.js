export default {
  title: 'Patterns/Link',
  parameters: {
    layout: 'centered'
  }
};

const LinkTemplate = ({ label, definition }) => (
  `<a href="#" class="cbp-link ${definition ? 'cbp-link--definition' : '' }">${label}</a>`
)

const DisabledLinkTemplate = ({ label }) => (
  `<a role=link aria-disabled=true>${label}</a> <a href="#">${label}</a>`
)

export const Link = LinkTemplate.bind({});
Link.args = {
  label: 'Text Link',
  definition: false
};
Link.argTypes = {
  label: {
    name: 'Link Label',
    description: 'Label of the Link to display',
    type: { name: 'string', required: true }
  },
  definition: {
    name: 'Definition Modifier',
    description: 'Used when the developer wants to give more information about a term or acronym',
    type: { name: 'boolean', required: false }
  }
}
Link.storyName = 'Default';

export const DisabledLink = DisabledLinkTemplate.bind({});
DisabledLink.args = {
  label: 'Disabled Text Link'
};
DisabledLink.storyName = 'Disabled';