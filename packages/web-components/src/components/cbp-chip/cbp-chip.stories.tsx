export default {
  title: 'Controls/Chip',
  tags: ['beta'],
  argTypes: {
    label: {
      name: 'label (slotted)',
      description: 'The visible text within the chip.',
      control: 'text',
    },
    name: {
      control: 'text',
    },
    value: {
      control: 'text',
    },
    icon:{
      control: 'select',
      options: [
        'address-book',
        'angle-down',
        'arrow-right',
        'bars',
        'book',
        'caret-down',
        'check',
        'chevron-right',
        'circle',
        'circle-info',
        'circle-xmark',
        'clock',
        'clone',
        'computer',
        'ellipsis-vertical',
        'envelope',
        'external-link-alt',
        'eye',
        'eye-slash',
        'filter',
        'globe',
        'home',
        'landmark',
        'lock',
        'magnifying-glass',
        'minus',
        'moon',
        'pen-to-square',
        'plus',
        'right-to-bracket',
        'right-from-bracket',
        'rotate',
        'sort-asc',
        'sort-desc',
        'square',
        'star',
        'star-solid',
        'sun',
        'times',
        'triangle-exclamation',
        'up-right-from-square',
        'user',
      ],
    },
    pressed: {
      description: 'The initial active/selected state.',
      control: 'boolean',
    },
    disabled: {
      description: '',
      control: 'boolean'
    },
    context: {
      control: 'select',
      options: ["light-inverts", "light-always", "dark-inverts", "dark-always"]
    },
    sx: {
      description: 'Supports adding inline styles as an object of key-value pairs comprised of CSS properties and values. Values should reference design tokens when possible.',
      control: 'object',
    },
  },
  args: {
    label: 'Chip',
  },
};

const Template = ({ label, name, value, icon, pressed, disabled, context, sx }) => {
  return ` 
      <cbp-chip
        ${name ? `name="${name}"` : ''}
        ${value ? `value="${value}"` : ''}
        ${icon ? `icon="${icon}"` : ''}
        ${pressed ? 'pressed' : ''}
        ${disabled ? 'disabled' : ''}
        ${context && context != 'light-inverts' ? `context="${context}"` : ''}
        ${sx ? `sx='${JSON.stringify(sx)}'` : ''}
      >
        ${icon ? `<cbp-icon slot="cbp-chip-icon" name="${icon}"></cbp-icon>` : ``}
        ${label}
      </cbp-chip>
    `;
};
export const Chip = Template.bind({});