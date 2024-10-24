export default {
    title: 'Components/Toast',
    tags: ['autodocs'],
    argTypes: {
      
      timer: {
        control: 'select',
        options: [3, 5, 10]
      },
      color: {
        control: 'select',
        options: ['info', 'danger', 'success', 'warning']
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
  
  const Template = ({ icon, content, buttons, timer, color, context, sx }) => {
    return ` 
          <cbp-toast
            color=${color}
            timer=${timer}
            ${icon ? `icon=${icon}` : ''}
            ${context && context != 'light-inverts' ? `context=${context}` : ''}
            ${sx ? `sx=${JSON.stringify(sx)}` : ''}
          >
            <div slot="cbp-toast-title"> Test Toast Title</div>
            ${content}
            <div slot="cbp-toast-buttons">${buttons}</div>
          </cbp-toast>
        `;
  };
  
  export const Toast = Template.bind({});
  
  Toast.args = {
    icon: 'user',
    content: 'Notification Description - A rule you are following just fired.',
    buttons: '<cbp-button type="button" fill="ghost" color="secondary"> Default </cbp-button> <cbp-button type="button" fill="ghost" color="secondary"> Default 2</cbp-button>'
  }

  const MultiTemplate = ({ icon, content, buttons, timer, color, context, sx }) => {
    return ` 
          <cbp-toast
            color=${color}
            timer=${timer}
            ${icon ? `icon=${icon}` : ''}
            ${context && context != 'light-inverts' ? `context=${context}` : ''}
            ${sx ? `sx=${JSON.stringify(sx)}` : ''}
          >
            <div slot="cbp-toast-title"> Test Toast Title</div>
            ${content}
            <div slot="cbp-toast-buttons">${buttons}</div>
          </cbp-toast>
        
          <cbp-toast
          color=${color}
          timer=${timer}
          ${icon ? `icon=${icon}` : ''}
          ${context && context != 'light-inverts' ? `context=${context}` : ''}
          ${sx ? `sx=${JSON.stringify(sx)}` : ''}
        >
          <div slot="cbp-toast-title"> Test Toast Title</div>
          ${content}
          <div slot="cbp-toast-buttons">${buttons}</div>
        </cbp-toast>
        
        <cbp-toast
        color=${color}
        timer=${timer}
        ${icon ? `icon=${icon}` : ''}
        ${context && context != 'light-inverts' ? `context=${context}` : ''}
        ${sx ? `sx=${JSON.stringify(sx)}` : ''}
      >
        <div slot="cbp-toast-title"> Test Toast Title</div>
        ${content}
        <div slot="cbp-toast-buttons">${buttons}</div>
      </cbp-toast>

      <cbp-toast
      color=${color}
      timer=${timer}
      ${icon ? `icon=${icon}` : ''}
      ${context && context != 'light-inverts' ? `context=${context}` : ''}
      ${sx ? `sx=${JSON.stringify(sx)}` : ''}
    >
      <div slot="cbp-toast-title"> Test Toast Title</div>
      ${content}
      <div slot="cbp-toast-buttons">${buttons}</div>
    </cbp-toast>
          `;
  };

  export const MultipleToast = MultiTemplate.bind({});

  MultipleToast.args = {
    icon: 'user',
    content: 'Notification Description - A rule you are following just fired.',
    buttons: '<cbp-button type="button" fill="ghost" color="secondary"> Default </cbp-button> <cbp-button type="button" fill="ghost" color="secondary"> Default 2</cbp-button>'
  }