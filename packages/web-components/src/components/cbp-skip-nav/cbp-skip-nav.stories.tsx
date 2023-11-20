export default {
  title: 'Components/Skip Navigation Link',
  tags: ['autodocs'],
  argTypes: {
    text: {
      name: 'text (slotted)',
      description: 'Optional slotted text that overrides the default text of "Skip to main content".',
      control: 'text'
    },
    targetId: {
      description: 'The `id` of the element in the document that focus is sent to when the skip navigation link is activated. Defaults to "main".',
      control: 'text'
    },
    shortcutKey: {
      description: 'Rendered as the `accessKey` on the skip navigation link.',
      control: 'text',
    },
    sx: {
      description: 'Supports adding inline styles as an object of key-value pairs comprised of CSS properties and values. Values should reference design tokens when possible.',
      control: 'object'
    },
  },
  args: {
  }
};

const Template = ({ text, targetId, shortcutKey, sx }) => { 
  return ` 
      <cbp-skip-nav
        ${targetId ? `targetId=${targetId}` : ''}
        ${shortcutKey ? `shortcutKey=${shortcutKey}` : ''}
        ${sx ? `sx=${JSON.stringify(sx)}` : ''}
      >
        ${text ? text : ''}
      </cbp-skip-nav>
    `
}

export const SkipNavigationLink = Template.bind({});

