import { getInvertedContext } from "../../utils/utils";

export default {
  title: 'Content/Popover',
  tags: ['new'],
  argTypes: {
    id: {
      description: 'A unique `id` applied to the dialog and referenced by the control.',
      control: 'text',
    },
    open: {
      description: 'Specifies whether the popover is open or closed.',
      control: 'boolean',
    },
    height: {
      description: 'Specifies a custom CSS height for the popover',
      control: 'text'
    },
    width: {
      description: 'Specifies a custom CSS width for the popover',
      control: 'text'
    },
    headerContent: {
      description: 'Specifies what is in the header slot of the popover',
      control: 'text'
    },
    actionsLayout:{
      name: "Actions Layout",
      description: "Choose actions layout of the popover component",
      control: "select",
      options: ["single", "double", "triple"],
    },
    actionsFill: {
      name: "Actions Fill",
      description: "Choose the fill of the actions in the popover component",
      control: "radio",
      options: ["solid", "outline", "ghost"],
      if: {arg: "actionsLayout"}
    },
    actionsConfig: {
      name: "Card Actions",
      description: "Configure popover button labels and colors. Available button colors: `primary`, `secondary`, `tertiary` and `danger`",
      control: "object",
      if: {arg: "actionsLayout"}
    },
    position: {
      description: 'Sets where the the popover will align to the control.',
      control: 'select',
      options: [
        "top-start",
        "top",
        "top-end",
        "right-start",
        "right",
        "right-end",
        "bottom-start",
        "bottom",
        "bottom-end",
        "left-start",
        "left",
        "left-end"
      ],
    },
    danger: {
      description: 'Sets the danger prop of the popover, visually changing the popover',
      control: 'boolean'
    },
    headerClose: {
      descirption: 'Adds a close button to the header of the popover',
      control: 'boolean'
    },
    context : {
      control: 'select',
      options: [ 'light-inverts', 'light-always', 'dark-inverts', 'dark-always']
    },
    sx: {
      description: 'Supports adding inline styles as an object of key-value pairs comprised of CSS properties and values. Values should reference design tokens when possible.',
      control: 'object',
    },
  },
  parameters: { layout: 'centered' },
};

const renderActions = (id, layout, fill,  context, { btn1, btn2, btn3 }) => {
  
  if (layout === 'double') {
    return `
      <div slot="cbpPopoverActions">
        <cbp-button tag="${btn2.tag}" ${btn2.tag == 'a' ? `href="#"` : ''} color="${btn2.color}" fill="${fill}" ${context ? `context="${context}"` : ``} >
          ${btn2.label}
        </cbp-button>
        <cbp-button tag="${btn1.tag}" ${btn1.tag == 'a' ? `href="#"` : ''} color="${btn1.color}" fill="${fill}" ${context ? `context="${context}"` : ``} target-prop="open" controls=${id}>
          ${btn1.label}
        </cbp-button>
      </div>
    `;
  }
  else if (layout === 'triple') {
    return `
      <div slot="cbpPopoverActions">
        <cbp-button tag="${btn3.tag}" ${btn3.tag == 'a' ? `href="#"` : ''} color="${btn3.color}" fill="${fill}" ${context ? `context="${context}"` : ``} >
           ${btn3.label}
        </cbp-button>
        <cbp-button tag="${btn2.tag}" ${btn2.tag == 'a' ? `href="#"` : ''} color="${btn2.color}" fill="${fill}" >
           ${btn2.label}
        </cbp-button>
        <cbp-button tag="${btn1.tag}" ${btn1.tag == 'a' ? `href="#"` : ''} color="${btn1.color}" fill="${fill}" ${context ? `context="${context}"` : ``} target-prop="open" controls=${id}>
           ${btn1.label}
        </cbp-button>
      </div>
    `;
  } else {
    return `
      <div slot="cbpPopoverActions">
        <cbp-button tag="${btn1.tag}" ${btn1.tag == 'a' ? `href="#"` : ''} color="${btn1.color}" fill="${fill}" ${context ? `context="${context}"` : ``} target-prop="open" controls=${id}>
          ${btn1.label}
        </cbp-button>
      </div>
    `;
  }
};

const PopoverTemplate = ({open, height, width, position, danger, headerContent, headerClose, actionsLayout, actionsFill, actionsConfig, id, context, sx }) => {
  return `
    <cbp-button
      id="popoverControl"
      color="secondary"
      accessibility-text="Open Popover"
      target-prop="open"
      controls=${id}
    >
      Open Popover
    </cbp-button>

    <cbp-popover
      ${id ? `id="${id}"` : ''}
      ${open ? 'open' : ''}
      ${height ? `height="${height}"` : ''}
      ${width ? `width="${width}"` : ''}
      ${position ? `position="${position}"` : ''}
      ${danger ? 'danger' : ''}
      control-selector = "#popoverControl"
      ${sx ? `sx='${JSON.stringify(sx)}'` : ''}
    >
      <div slot="cbpPopoverHeader">
        ${headerContent}
        ${headerClose ? `
          <cbp-button 
            variant="square"
            target-prop="open" 
            controls=${id}
            context=${getInvertedContext(context)}
            sx='{"margin-left":"auto"}'  
          >
            <cbp-icon name="circle-xmark"></cbp-icon>
          </cbp-button>
          ` : ``}  
      </div>
      <div>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914 Cicero translation and scrambled it to make dummy text for Letraset's Body Type sheets. It has survived not only many decades
      </div>
      ${actionsLayout ? renderActions(id, actionsLayout, actionsFill, context, actionsConfig) : ``}
    </cbp-popover>
  `;
}
  
export const Popover: any = PopoverTemplate.bind({});
Popover.args ={
  // height: "20rem",
  // width: "20rem",
  id: "popover",
  headerContent: "<cbp-icon name='check-circle'></cbp-icon> Header",
  actionsFill: "solid",
  actionsLayout: "triple",
  actionsConfig: {
    btn1: {
      label: "Close",
      tag: "button",
      color: "primary",
    },
    btn2: {
      label: "Action 2",
      tag: "button",
      color: "secondary",
    },
    btn3: {
      label: "Action 3",
      tag: "button",
      color: "tertiary",
    },
  }
}