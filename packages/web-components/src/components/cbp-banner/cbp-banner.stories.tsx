export default {
    title: 'Notifications/Banner',
    tags: ['beta'],
    argTypes: {
      title: {
        name: 'Title (slotted)',
        control: 'text',
      },
      content:{
        name: 'Content (slotted)',
        control: 'text',
      },
    },
  };
  
  const Template = ({ title, content}) => {
    return ` 
      <cbp-banner>
        <cbp-typography 
          slot="cbp-banner-title"
          tag="div"
          variant="heading-md"
          context="dark-always"
        >
          ${title}
        </cbp-typography>
        ${content}
      </cbp-banner>
    `;
  };

  export const Banner: any = Template.bind({});
  Banner.args = {
    title: 'Scheduled Maintenance Notice',
    content: 'This application will be undergoing scheduled maintenance from 10/5/2026 to 10/31/2026 from 12am - 3am and wil be unavailable during these times.'
  };