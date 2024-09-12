export default {
    title: 'Components/Notice',
    tags: ['autodocs'],
    argTypes: {
      title: {
        name: 'Title (slotted)',
        description: 'The visible text within the notice.',
        control: 'text',
      },
      content: {
        name: 'content (slotted)',
        description: 'The visible text within the notice.',
        control: 'text',
      },
      color: {
        description: 'The color of the notice.',
        control: { type: 'select' },
        options: ['info', 'success', 'warning', 'danger'],
      },
      withIcon: {
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
  };
  
  const NoticeTemplate = ({ title, withIcon, content, color, context, sx }) => {
    return ` 
      <cbp-notice
        ${color ? `color=${color}` : ''}
        ${context && context != 'light-inverts' ? `context=${context}` : ''}
        ${sx ? `sx=${JSON.stringify(sx)}` : ''}
      >
        <cbp-typography tag='p' slot="cbp-notice-title" context=${context}>
            ${withIcon ? `<cbp-icon name='circle-info' size='1.25rem' sx='{"vertical-align":"bottom"}'></cbp-icon>` : ''}
            ${title}
        </cbp-typography>
        ${content}
      </cbp-notice>
    `;
  };
  
  export const Notice = NoticeTemplate.bind({});
  Notice.args = {    
      title: 'Notice Title',
      content: 'Notice: This is default text',
  };
  