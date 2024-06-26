export default {
  title: 'Components/Button',
  tags: ['autodocs'],
  argTypes: {
    label: {
      name: 'label (slotted)',
      description: 'Label text in the `button` element and used to describe the action when clicked.',
      control: 'text',
    },
    tag: {
      description: 'Both buttons and anchors may be visually styled like buttons. Be sure to only specify the appropriate attributes for the selected tag.',
      control: 'select',
      options: ['button', 'a'],
    },
    type: {
      description: 'The `type` attribute of the button. (not valid for anchors/links)',
      control: 'select',
      if: { arg: 'tag', neq: 'a' },
      options: ['button', 'submit', 'reset'],
    },
    value: {
      description: 'Specifies the `value` attribute of the rendered button. Not valid on link buttons.',
      control: 'text',
      if: { arg: 'tag', neq: 'a' },
    },
    href: {
      description: 'Specifies the `href` attribute for anchor buttons. Not valid on actual `button` tags.',
      control: 'text',
      if: { arg: 'tag', eq: 'a' },
    },
    rel: {
      description: 'Specifies the `rel` attribute for anchor buttons. Not valid on actual `button` tags.',
      control: 'text',
      if: { arg: 'tag', eq: 'a' },
    },
    target: {
      description: 'Specifies the `target` attribute for anchor buttons. Not valid on actual `button` tags.',
      control: 'text',
      if: { arg: 'tag', eq: 'a' },
    },
    download: {
      description:
        'Indicates whether the `download` attribute is placed on the rendered anchor tag as a browser hint indicating that the linked contents specified in the `href` should be downloaded rather than navigated to. Not valid on actual `button` tags.',
      control: 'boolean',
      if: { arg: 'tag', eq: 'a' },
    },
    fill: {
      description: 'Displays button fill in the overall button hierarchy. Available options are: `Solid`, `Outline` and `Ghost`.',
      control: 'select',
      options: ['solid', 'outline', 'ghost'],
    },
    color: {
      description:
        '`primary` is generally the dominant action among their peer buttons, `secondary` is the most common to appear but is not the dominant action over its peers, `danger` can indicate an action that cannot easily be undone.',
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'danger'],
    },
    variant: {
      description: 'Variants includes a larger "Call to Action" and a square button for icons-only.',
      control: 'select',
      options: ['default', 'square', 'cta'],
    },
    accessibilityText: {
      description: 'Accessibility text is applied as an `aria-label` and should be supplied when the button does not contain text or it is not sufficiently and uniquely descriptive.',
      control: 'text',
    },
    controls: {
      description: 'The `id` of the element the button is controlling (e.g., for accordions, menus, dialogs, etc.), rendered as an `aria-controls` attribute on the `button` tag.',
      control: 'text',
    },
    targetProp: {
      description: 'Specifies the property on the target element being toggled by the button/control (e.g., open).',
      control: 'text',
    },
    expanded: {
      description: 'Indicates that the button acting as a control has been pressed and the controlled element expanded, such as in the case of accordions, menus, etc., rendered as `aria-expanded` on the `button` tag',
      control: 'boolean',
      if: { arg: 'tag', neq: 'a' },
    },
    pressed: {
      description: 'Indicates that the button is pressed and renders `aria-pressed="true"` on the `button` tag. This property should only be used for stateful/toggle buttons such as in the segmented button group.',
      control: 'boolean',
      if: { arg: 'tag', neq: 'a' },
    },
    disabled: {
      description: 'Renders the button in a disabled state. A disabled button is non-interactive and unusable.',
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
    label: 'Default',
    tag: 'button',
    type: 'button',
    variant: 'default',
    color: 'primary',
    fill: 'solid',
  },
};

const Template = ({ label, tag, type, value, href, rel, target, download, fill, color, variant, accessibilityText, controls, targetProp, pressed, expanded, disabled, context, sx }) => {
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
        ${controls ? `controls=${controls}` : ''}
        ${targetProp ? `target-prop=${targetProp}` : ''}
        ${pressed ? `pressed=${pressed}` : ''}
        ${expanded ? `expanded=${expanded}` : ''}
        ${disabled ? `disabled=${disabled}` : ''}
        ${context && context != 'light-inverts' ? `context=${context}` : ''}
        ${sx ? `sx=${JSON.stringify(sx)}` : ''}
      >
        ${label}
      </cbp-button>
    `;
};

export const Button = Template.bind({});


const SlottedButtonTemplate = ({ label, tag, href, fill, color, variant, context, sx }) => {
  return ` 
      <cbp-button
        ${tag !== 'button' ? `tag=${tag}` : ''}
        ${href ? `href=${href}` : ''}
        ${fill ? `fill=${fill}` : ''}
        ${color ? `color=${color}` : ''}
        ${variant !== 'default' ? `variant=${variant}` : ''}
        ${context && context != 'light-inverts' ? `context=${context}` : ''}
        ${sx ? `sx=${JSON.stringify(sx)}` : ''}
      >
        <button 
          slot="cbp-button-custom"
          type="button"
          value="Custom Button Value"
        >
          ${label}
        </button>
      </cbp-button>
    `;
};

export const SlottedButton = SlottedButtonTemplate.bind({});
