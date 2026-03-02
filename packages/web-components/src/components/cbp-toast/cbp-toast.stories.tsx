export default {
  title: 'Components/Toast',
  tags: ['new'],
  argTypes: {

    duration: {
      control: 'select',
      options: [3, 5, 10]
    },
    color: {
      control: 'select',
      options: ['info', 'danger', 'success', 'warning']
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
};

function generateIcon(color) {
  switch (color) {
    case "info":
      return 'circle-info';
    case "success":
      return 'check-circle';
    case "warning":
      return 'exclamation-circle';
    case "danger":
      return 'triangle-exclamation';
  }
}

const Template = ({ open, title, content, buttons, duration, color, context, sx }) => {
  return ` 
    <cbp-toast
      ${open ? `open` : ''}
      ${color ? `color=${color}` : ''}
      ${duration ? `duration=${duration}` : ''}
      icon=${generateIcon(color)}
      ${context && context != 'light-inverts' ? `context=${context}` : ''}
      ${sx ? `sx='${JSON.stringify(sx)}'` : ''}
    >  
      <div slot="cbp-toast-icon">
        <cbp-icon 
          name=${generateIcon(color)}
        ></cbp-icon>
      </div>
      <div slot="cbp-toast-title">${title}</div>
      ${content}
      <div slot="cbp-toast-buttons">${buttons}</div>
    </cbp-toast>
  `;
};

export const Toast = Template.bind({});

Toast.args = {
  open: true,
  color: 'info',
  title: 'Test Toast Title',
  content: 'Notification Description - A rule you are following just fired.',
  buttons: `<cbp-button type="button" fill="ghost" color="secondary"> Dismiss </cbp-button> <cbp-button type="button" fill="ghost" color="secondary"> Default 2</cbp-button>`
}

const MultiTemplate = ({ open, title, content, buttons, duration, color, context, sx }) => {
  return ` 
    <cbp-toast
      ${open ? `open=${open}` : ''}
      color=${color}
      duration=${duration}
      icon=${generateIcon(color)}
      ${context && context != 'light-inverts' ? `context=${context}` : ''}
      ${sx ? `sx='${JSON.stringify(sx)}'` : ''}
    >
      <div slot="cbp-toast-icon">
        <cbp-icon name=${generateIcon(color)}"></cbp-icon>
      </div>
      <div slot="cbp-toast-title">${title}</div>
      ${content}
      <div slot="cbp-toast-buttons">${buttons}</div>
    </cbp-toast>
    
    <cbp-toast
      ${open ? `open=${open}` : ''}
      color=${color}
      duration=${duration}
      icon=${generateIcon(color)}
      ${context && context != 'light-inverts' ? `context=${context}` : ''}
      ${sx ? `sx='${JSON.stringify(sx)}'` : ''}
    >       
      <div slot="cbp-toast-icon">
        <cbp-icon name=${generateIcon(color)} ></cbp-icon>
      </div>
      <div slot="cbp-toast-title">${title}</div>
      ${content}
      <div slot="cbp-toast-buttons">${buttons}</div>
    </cbp-toast>
    
    <cbp-toast
      ${open ? `open=${open}` : ''}
      color=${color}
      duration=${duration}
      icon=${generateIcon(color)}
      ${context && context != 'light-inverts' ? `context=${context}` : ''}
      ${sx ? `sx='${JSON.stringify(sx)}'` : ''}
    >      
      <div slot="cbp-toast-icon">
        <cbp-icon name=${generateIcon(color)}></cbp-icon>
      </div>
      <div slot="cbp-toast-title">${title}</div>
      ${content}
      <div slot="cbp-toast-buttons">${buttons}</div>
    </cbp-toast>

    <cbp-toast
      ${open ? `open=${open}` : ''}
      color=${color}
      duration=${duration}
      icon=${generateIcon(color)}
      ${context && context != 'light-inverts' ? `context=${context}` : ''}
      ${sx ? `sx='${JSON.stringify(sx)}'` : ''}
    >
      <div slot="cbp-toast-icon">
        <cbp-icon name=${generateIcon(color)}></cbp-icon>
      </div>
      <div slot="cbp-toast-title">${title}</div>
      ${content}
      <div slot="cbp-toast-buttons">${buttons}</div>
    </cbp-toast>
  `;
};

export const MultipleToast = MultiTemplate.bind({});

MultipleToast.args = {
  open: true,
  color: 'info',
  title: 'Test Toast Title',
  content: 'Notification Description - A rule you are following just fired.',
  buttons: '<cbp-button type="button" fill="ghost" color="secondary"> Dismiss </cbp-button> <cbp-button type="button" fill="ghost" color="secondary"> Default 2</cbp-button>'
}