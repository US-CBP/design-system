export default {
    title: 'Components/Notice',
    tags: ['autodocs'],
    argTypes: {
      label: {
        name: 'label (slotted)',
        description: 'The visible text within the badge.',
        control: 'text',
      },
      color: {
        description: 'The color of the badge.',
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
    // args: {
    //   title: 'Notice Title',
    //   label: 'Notice: This is default text',
    // },
  };
  
  const NoticeTemplate = ({ title, withIcon, content, color, context, sx }) => {
    return ` 
      <cbp-notice
        ${color ? `color=${color}` : ''}
        ${context && context != 'light-inverts' ? `context=${context}` : ''}
        ${sx ? `sx=${JSON.stringify(sx)}` : ''}
      >
        <cbp-typography tag='h4' slot="cbp-notice-title">
            ${withIcon ? `<cbp-icon name='circle-info' size='1.25rem'></cbp-icon>` : ''}
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
  