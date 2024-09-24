export default {
  title: 'Components/Link',
  tags: ['autodocs'],
  argTypes: {
    label: {
      name: 'label (slotted)',
      description: 'Linked text in the rendered anchor element.',
      control: 'text',
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

const Template = ({ label, href, rel, target, download, language, shortcutKey, accessibilityText, disabled, context, sx }) => {
  return ` 
        <cbp-link
          ${href ? `href=${href}` : ''}
          ${rel ? `rel=${rel}` : ''}
          ${target ? `target=${target}` : ''}
          ${download ? `download` : ''}
          ${shortcutKey ? `accesskey=${shortcutKey}` : ''}
          ${language ? `lang=${language}` : ''}
          ${accessibilityText ? `accessibility-text=${accessibilityText}` : ''}
          ${disabled ? `disabled` : ''}
          ${context && context != 'light-inverts' ? `context=${context}` : ''}
          ${sx ? `sx=${JSON.stringify(sx)}` : ''}
        >
          ${label}
        </cbp-link>
      `;
};

export const Link = Template.bind({});
