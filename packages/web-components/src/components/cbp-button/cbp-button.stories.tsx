export default {
  title: 'Components/Button',
  tags: ['autodocs'],
  argTypes: {
    label: {
      name: 'label (slotted)',
      description: 'Label text in the `button` element and used to describe the action when clicked.',
      control: 'text'
    },
    tag: {
      description: 'Both buttons and anchors may be visually styled like buttons. Be sure to only specify the appropriate attributes for the selected tag.',
      control: 'select',
      options: [
        'button',
        'a',
      ]
    },
    type: {
      description: 'The `type` attribute of the button. (not valid for anchors/links)',
      control: 'select', if: { arg: 'tag', neq: 'a' }, 
      options: [
        'button',
        'submit',
        'reset',
      ]
    },
    value: {
      description: 'Specifies the `value` attribute of the rendered button. Not valid on link buttons.',
      control: 'text', if: { arg: 'tag', neq: 'a' }
    },
    href: {
      description: 'Specifies the `href` attribute for anchor buttons. Not valid on actual `button` tags.',
      control: 'text', if: { arg: 'tag', eq: 'a' }
    },
    rel: {
      description: 'Specifies the `rel` attribute for anchor buttons. Not valid on actual `button` tags.',
      control: 'text', if: { arg: 'tag', eq: 'a' }
    },
    target: {
      description: 'Specifies the `target` attribute for anchor buttons. Not valid on actual `button` tags.',
      control: 'text', if: { arg: 'tag', eq: 'a' }
    },
    download: {
      description: 'Indicates whether the `download` attribute is placed on the rendered anchor tag as a browser hint indicating that the linked contents specified in the `href` should be downloaded rather than navigated to. Not valid on actual `button` tags.',
      control: 'boolean', if: { arg: 'tag', eq: 'a' }
    },
    fill: {
      description: 'Displays button fill in the overall button hierarchy. Available options are: `Solid`, `Outline` and `Ghost`.',
      control: 'select',
      options: [
        'solid',
        'outline',
        'ghost'
      ],
    },
    color: {
      description: '`primary` is generally the dominant action among their peer buttons, `secondary` is the most common to appear but is not the dominant action over its peers, `danger` can indicate an action that cannot easily be undone.',
      control: 'select',
      options: [
        'primary',
        'secondary',
        'tertiary',
        'danger'
      ]
    },
    variant: {
      description: 'Variants includes a larger "Call to Action" and a square button for icons-only.',
      control: 'select',
      options: [ 'default', 'square', 'cta']
    },
    accessibilityText: {
      description: 'Accessibility text is applied as an `aria-label` and should be supplied when the button does not contain text or it is not sufficiently and uniquely descriptive.',
      type: 'string'
    },
    disabled: {
      description: 'Renders the button in a disabled state. A disabled button is non-interactive and unusable.',
      control: 'boolean'
    },
    sx: {
      description: 'Supports adding inline styles as an object of key-value pairs comprised of CSS properties and values. Values should reference design tokens when possible.',
      control: 'object'
    },
  },
  args: {
    label: 'Default',
    tag: 'button',
    type: 'button',
    variant: 'default',
    color: 'primary',
    fill: 'solid',
  }
};

const Template = ({ label, tag, type, value, href, rel, target, download, fill, color, variant, accessibilityText, disabled, sx }) => { 
  return ` 
      <cbp-button
        ${tag !== 'button' ? `tag=${tag}` : ''}
        ${type ? `type=${type}` : ''}
        ${value ? `value=${value}` : ''}
        ${href ? `href=${href}` : ''}
        ${rel ? `rel=${rel}` : ''}
        ${target ? `target=${target}` : ''}
        ${download ? `download=${download}` : ''}
        ${fill ? `fill=${fill}` : ''}
        ${color ? `color=${color}` : ''}
        ${variant !== 'default' ? `variant=${variant}` : ''}
        ${accessibilityText ? `accessibility-text=${accessibilityText}` : ''}
        ${disabled ? `disabled=${disabled}` : ''}
        ${sx ? `sx=${JSON.stringify(sx)}` : ''}
      >
        ${label}
      </cbp-button>
    `
}

export const Button = Template.bind({});

