import { getInvertedContext } from "../../utils/utils";
import { CbpToast } from "./cbp-toast";

export default {
  title: 'Notifications/Toast',
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
    position:{
      control: 'select',
      options: ['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right']
    },
    multipleToast:{
      description: 'Generate X number of Toast components',
      control: 'number'
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
    default:
      return 'circle-info'
  }
}

function generateButton(text, color, context){

return `
  <cbp-button 
    fill="ghost" 
    color="secondary" 
    name=${text}
    ${color != 'warning' ? `context=${getInvertedContext(context)}` : `context='light-always'`}
  >
    ${text}
  </cbp-button>
`;
}

const Template: any = ({ open, title, content, duration, color, context, sx }) => {
  setTimeout(() => {
    const dismiss = document.querySelector('cbp-button[name="dismiss"]') as HTMLCbpButtonElement;
    dismiss.addEventListener('buttonClick', e => {
    const buttonComponent = e.target as HTMLCbpButtonElement;
    const toast = buttonComponent.closest('cbp-toast') as any as CbpToast;
    toast.dismissToast();
    });
  }, 10);

  return ` 
    <cbp-toast
      id="cbp-toast-1"
      ${open ? 'open' : ''}
      ${color ? `color="${color}"` : ''}
      ${duration ? `duration="${duration}"` : ''}
      icon=${generateIcon(color)}
      ${context && context != 'light-inverts' ? `context="${context}"` : ''}
      ${sx ? `sx='${JSON.stringify(sx)}'` : ''}
    >  
      <div slot="cbp-toast-icon">
        <cbp-icon name="${generateIcon(color)}"></cbp-icon>
      </div>
      <div slot="cbp-toast-title">${title}</div>
      ${content}
      <div slot="cbp-toast-buttons">
      ${generateButton('dismiss', color, context)}
      ${generateButton('default', color, context)}
      </div>
    </cbp-toast>
  `;
};

export const Toast = Template.bind({});

Toast.argTypes={
  position: {
    control: false
  },
  multipleToast:{
    control: false
  }
}

Toast.args = {
  open: true,
  title: 'Test Toast Title',
  content: 'Notification Description - A rule you are following just fired.',
}

const MultiTemplate: any = ({position, multipleToast, open, title, content, duration, color, context, sx }) => {
setTimeout(() => {
  const dismissButtons = document.querySelectorAll('cbp-button[name="dismiss"]');
  dismissButtons.forEach(dismiss => {
    dismiss.addEventListener('buttonClick', function(e) {
      const buttonComponent = e.target as HTMLCbpButtonElement;
      const toast = buttonComponent.closest('cbp-toast') as any as CbpToast;
      toast.dismissToast();
      });
    });
  }, 10);

  let toastHTML=``;
  for(let x=0; x < multipleToast; x++){
    toastHTML+= ` 
      <cbp-toast
        ${open ? 'open' : ''}
        ${color ? `color=${color}` : ``}
        ${duration ? `duration="${duration}"` : ``}
        icon="${generateIcon(color)}"
        ${context && context != 'light-inverts' ? `context="${context}"` : ''}
        ${sx ? `sx='${JSON.stringify(sx)}'` : ''}
      >
        <div slot="cbp-toast-icon">
          <cbp-icon name="${generateIcon(color)}"></cbp-icon>
        </div>
        <div slot="cbp-toast-title">
          ${title} ${x+1}
        </div>
          ${content}
        <div slot="cbp-toast-buttons">
          ${generateButton('dismiss', color,  context)}
          ${generateButton('default', color, context)}
        </div>
      </cbp-toast>`
  }

  return `
    <cbp-toast-container
      ${position ? `position=${position}` : ``}
    >
      ${toastHTML} 
    </cbp-toast-container>
  `
}

export const MultipleToast = MultiTemplate.bind({});

MultipleToast.args = {
  multipleToast: 3,
  open: true,
  title: 'Test Toast Title',
  content: 'Notification Description - A rule you are following just fired.',

}