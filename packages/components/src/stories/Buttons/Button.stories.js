import { Button } from './Button';

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
export default {
  title: 'Components/Button',
  component: Button,
  tags: ['docsPage']
};

// More on writing stories with args: https://storybook.js.org/docs/7.0/react/writing-stories/args
export const Primary = {
  args: {
    label: 'Vet Passenger',
  },
};

export const PrimaryOutline = {
  args: {
    label: 'Vet Passenger',
    type: 'cbp-btn__primary--outline'
  },
};

export const PrimaryGhost = {
  args: {
    label: 'Vet Passenger',
    type: 'cbp-btn__primary--ghost'
  },
};

// export const PrimarySquare = {
//   args: {
//     label: 'Vet Passenger',
//     type: 'cbp-btn__square cbp-btn__square-primary'
//   }
// }

export const Secondary = {
  args: {
    label: 'Vet Passenger',
    type: 'cbp-btn__secondary'
  },
};

export const SecondaryOutline = {
  args: {
    label: 'Vet Passenger',
    type: 'cbp-btn__secondary--outline'
  },
};

export const SecondaryGhost = {
  args: {
    label: 'Vet Passenger',
    type: 'cbp-btn__secondary--ghost'
  },
};

export const CTABtn = {
  name: 'Call-to-Action',
  args: {
    label: 'Vet Passenger',
    type: 'cbp-btn__cta'
  },
};
