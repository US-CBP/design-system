export default {
  title: 'Components/Carousel',
  tags: ['new'],
  argTypes: {
    sx: {
      description: 'Supports adding inline styles as an object of key-value pairs comprised of CSS properties and values. Values should reference design tokens when possible.',
      control: 'object',
    },
  },
};

function generateSlides(slides) {
    const html = slides.map(({ content }) => {
    return `<cbp-carousel-item>${content}</cbp-carousel-item>`;
  });
  return html.join('');
}

const Template = ({slides, sx}) => {
  return `
   <cbp-carousel
    height="300px"
    width="500px"
    ${sx ? `sx='${JSON.stringify(sx)}'` : ''}
   >
        ${generateSlides(slides)}
        <cbp-dot-indicator 
            slot='cbp-carousel-controls'
            current=0
            items=${slides.length}
        ></cbp-dot-indicator>
   </cbp-carousel>
  `;
};

export const Carousel = Template.bind({});

Carousel.args ={
    slides: [{
            content: `
                <cbp-card variant="banner">
                    <cbp-typography tag="h4" slot"cbp-card-title">
                        Carousel Card 1 Title
                    </cbp-typography>
                    <p> Content for Carousel Card 1 </p>
                </cbp-card>
            `,
        },
        {
            content: `
                <cbp-card variant="banner">
                    <cbp-typography tag="h4" slot"cbp-card-title">
                        Carousel Card 2 Title
                    </cbp-typography>
                    <p> Content for Carousel Card 2 </p>
                </cbp-card>
            `,
        },
        {
            content: `
                <cbp-card variant="banner">
                    <cbp-typography tag="h4" slot"cbp-card-title">
                        Carousel Card 3 Title
                    </cbp-typography>
                    <p> Content for Carousel Card 3 </p>
                </cbp-card>
            `,
        },
    ],
}