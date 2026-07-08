export default {
  title: 'Utilities/Floating Ui',
  tags: ['beta'],
  argTypes: {
    position: {
        description: 'Specifies the preferred position of the element to float, in relation to the container',
        control: 'select',
        options: ['top', 'left', 'bottom', 'right']
    },
    offset: {
        description: 'Specifies the offset (in px) of the element from the container',
        control: 'number'
    },
    flip: {
        description: 'Specifies if the element will vertically flip in cases of overflow',
        control: 'boolean',
    },
    shift: {
        description: 'Specifies if the element will horizonally shift in cases of overflow',
        control: 'boolean'
    },
    arrow: {
        description: 'Specifies if the element has an arrow directed back to the container',
        control: 'boolean'
    },
    sx: {
      description: 'Supports adding inline styles as an object of key-value pairs comprised of CSS properties and values. Values should reference design tokens when possible.',
      control: 'object',
    },
  },
  args: {
    position: 'bottom',
  },
};

const Template = ({position, offset, flip, shift, arrow}) => {
  // return `
  
  //   <cbp-float-ui 
  //       ${position ? `position=${position}` : ``}
  //       ${offset ? `offset=${offset}` : ``}
  //       ${flip ? `flip=${flip}` : ``}
  //       ${shift ? `shift=${shift}` : ``}
  //       ${arrow ? `arrow=${arrow}` : ``}
  //   >

  //       <button id="button" aria-describedby="tooltip">
  //           My button
  //       </button>
  //       <style>
  //         #tooltip {
  //           background: #222;
  //           color: white;
  //           font-weight: bold;
  //           padding: 5px;
  //           border-radius: 4px;
  //           font-size: 90%;
  //         }
  //       </style>
  //       <div id="tooltip" role="tooltip">
  //         My tooltip
  //         ${ arrow ? `<div id="arrow"></div>` : ``}
  //       </div>
  //   </cbp-float-ui>
  //  `;
 
  return `

    <div>
    <button id="button" aria-describedby="tooltip">
            My button
        </button>
    <floatUI
      position= ${position}
      offset=${offset}
      flip=${flip}
      shift=${shift}
      arrow=${arrow}
      >
      <style>
          #tooltip {
            background: #222;
            color: white;
            font-weight: bold;
            padding: 5px;
            border-radius: 4px;
            font-size: 90%;
          }
        </style>
        <div id="tooltip" role="tooltip">
          My tooltip
          ${ arrow ? `<div id="arrow"></div>` : ``}
        </div>
    </floatUI>
    </div>
  `
};
export const floatingAction = Template.bind({});
