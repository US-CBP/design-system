export default {
  title: 'Components/Link',
  tags: ['beta'],
  argTypes: {
    label: {
      name: 'label (slotted)',
      description: 'Linked text in the rendered anchor element.',
      control: 'text',
    },
    withIcon: {
      control: 'select',
      options: ['none', 'before', 'after'],
    },
    inText: {
      control: 'boolean',
    },
    href: {
      description: 'Specifies the `href` attribute for the rendered anchor.',
      control: 'text',
    },
    rel: {
      description: 'Specifies the `rel` attribute for the rendered anchor.',
      control: 'text',
    },
    target: {
      description: 'Specifies the `target` attribute for the rendered anchor.',
      control: 'text',
    },
    download: {
      description:
        'Indicates whether the `download` attribute is placed on the rendered anchor tag as a browser hint indicating that the linked contents specified in the `href` should be downloaded rather than navigated to.',
      control: 'boolean',
    },
    definition: {
      description: 'toggle definition prop', //TODO: testing
      control: 'boolean'
    },
    language: {
      description:
        'Specifies the `lang` attribute on the rendered anchor tag, which is required when the link points to content in a language different than the current document.',
      type: 'string',
    },
    shortcutKey: {
      description: 'Specifies the shortcut key as the `accessKey` attribute on the rendered anchor tag.',
      type: 'string',
    },
    accessibilityText: {
      description:
        'Accessibility text is applied as an `aria-label` and should be supplied when the link does not contain text or it is not sufficiently and uniquely descriptive.',
      type: 'string',
    },
    disabled: {
      description: 'Renders the anchor in a disabled state. A disabled anchor is non-interactive and unusable.',
      control: 'boolean',
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
  args: {
    label: 'Link text',
    href: '#',
    target: '_self',
  },
};

const Template = ({ label, withIcon, inText, href, rel, target, definition, download, language, shortcutKey, accessibilityText, disabled, context, sx }) => {
  return `
    ${ inText ? `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ` : ''}
    <cbp-link
      ${href ? `href=${href}` : ''}
      ${rel ? `rel=${rel}` : ''}
      ${target ? `target=${target}` : ''}
      ${download ? `download` : ''}
      ${shortcutKey ? `accesskey=${shortcutKey}` : ''}
      ${language ? `lang=${language}` : ''}
      ${accessibilityText ? `accessibility-text=${accessibilityText}` : ''}
      ${disabled ? `disabled` : ''}
      ${definition ? `definition` : ``}
      ${context && context != 'light-inverts' ? `context=${context}` : ''}
      ${sx ? `sx=${JSON.stringify(sx)}` : ''}
    >
      ${withIcon == 'before' ? `<cbp-icon name="pen-to-square"></cbp-icon>` : ''}
      ${label}
      ${withIcon == 'after' ? `<cbp-icon name="up-right-from-square"></cbp-icon>` : ''}
    </cbp-link>
    ${ inText ? ` Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>` : ''}
  `;
};

export const Link = Template.bind({});
