export default {
    title: 'Components/Toast',
    tags: ['autodocs'],
    argTypes: {
      
      duration: {
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
  
  const Template = ({ open, icon, title, content, buttons, duration, color, context, sx }) => {
    return ` 
          <cbp-toast
            ${open ? `open` : ''}
            ${color ? `color=${color}` : ''}
            ${duration ? `duration=${duration}` : ''}
            ${icon ? `icon=${icon}` : ''}
            ${context && context != 'light-inverts' ? `context=${context}` : ''}
            ${sx ? `sx=${JSON.stringify(sx)}` : ''}
          >  
            <div slot="cbp-toast-icon"><cbp-icon size='2rem' name=${icon}></cbp-icon></div>
            <div slot="cbp-toast-title">${title}</div>
            ${content}
            <div slot="cbp-toast-buttons">${buttons}</div>
          </cbp-toast>
        `;
  };
  
  export const Toast = Template.bind({});
  
  Toast.args = {
    open: true,
    icon: `user`,
    title: 'Test Toast Title',
    content: 'Notification Description - A rule you are following just fired.',
    buttons: `<cbp-button type="button" fill="ghost" color="secondary"> Dismiss </cbp-button> <cbp-button type="button" fill="ghost" color="secondary"> Default 2</cbp-button>`
  }

  const MultiTemplate = ({ open, icon, title, content, buttons, duration, color, context, sx }) => {
    return ` 
          <cbp-toast
            ${open ? `open=${open}` : ''}
            color=${color}
            duration=${duration}
            ${icon ? `icon=${icon}` : ''}
            ${context && context != 'light-inverts' ? `context=${context}` : ''}
            ${sx ? `sx=${JSON.stringify(sx)}` : ''}
          >
            <div slot="cbp-toast-icon"><cbp-icon size='2rem' name=${icon}></cbp-icon></div>
            <div slot="cbp-toast-title">${title}</div>
            ${content}
            <div slot="cbp-toast-buttons">${buttons}</div>
          </cbp-toast>
        
        <cbp-toast
          ${open ? `open=${open}` : ''}
          color=${color}
          duration=${duration}
          ${icon ? `icon=${icon}` : ''}
          ${context && context != 'light-inverts' ? `context=${context}` : ''}
          ${sx ? `sx=${JSON.stringify(sx)}` : ''}
        >       
          <div slot="cbp-toast-icon"><cbp-icon size='2rem' name=${icon}></cbp-icon></div>
          <div slot="cbp-toast-title">${title}</div>
          ${content}
          <div slot="cbp-toast-buttons">${buttons}</div>
        </cbp-toast>
        
        <cbp-toast
          ${open ? `open=${open}` : ''}
          color=${color}
          duration=${duration}
          ${icon ? `icon=${icon}` : ''}
          ${context && context != 'light-inverts' ? `context=${context}` : ''}
          ${sx ? `sx=${JSON.stringify(sx)}` : ''}
        >      
          <div slot="cbp-toast-icon"><cbp-icon size='2rem' name=${icon}></cbp-icon></div>
          <div slot="cbp-toast-title">${title}</div>
          ${content}
          <div slot="cbp-toast-buttons">${buttons}</div>
        </cbp-toast>

      <cbp-toast
        ${open ? `open=${open}` : ''}
        color=${color}
        duration=${duration}
        ${icon ? `icon=${icon}` : ''}
        ${context && context != 'light-inverts' ? `context=${context}` : ''}
        ${sx ? `sx=${JSON.stringify(sx)}` : ''}
      >
        <div slot="cbp-toast-icon"><cbp-icon size='2rem' name=${icon}></cbp-icon></div>
        <div slot="cbp-toast-title">${title}</div>
        ${content}
        <div slot="cbp-toast-buttons">${buttons}</div>
      </cbp-toast>
          `;
  };

  export const MultipleToast = MultiTemplate.bind({});

  MultipleToast.args = {
    open: true,
    icon: `user`,
    title: 'Test Toast Title',
    content: 'Notification Description - A rule you are following just fired.',
    buttons: '<cbp-button type="button" fill="ghost" color="secondary"> Dismiss </cbp-button> <cbp-button type="button" fill="ghost" color="secondary"> Default 2</cbp-button>'
  }