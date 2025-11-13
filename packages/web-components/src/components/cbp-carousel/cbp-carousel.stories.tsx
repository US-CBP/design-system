export default {
    title: 'Components/Carousel',
    tags: ['new'],
    argTypes: {
        height: {
            description: 'Sets the Height of the carousel',
            control: 'text'
        },
        width: {
            description: 'Sets the Width of the carousel',
            control: 'text'
        },
        activeIndex: {
            description: 'Sets the item # to the active state, moving carousel to specified item',
            control: 'number'
        },
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

const Template = ({ slides, height, width, activeIndex, sx }) => {
    return `
   <cbp-carousel
    ${height ? `height= ${height}` : ''}
    ${width ? `width= ${width}` : ''}
    ${activeIndex ? `activeIndex= ${activeIndex}` : ''}
    ${sx ? `sx='${JSON.stringify(sx)}'` : ''}
   >
        ${generateSlides(slides)}
        <cbp-dot-indicator 
            slot='cbp-carousel-controls'
            current=${activeIndex ? activeIndex : '0'}
            items=${slides.length}
        ></cbp-dot-indicator>
   </cbp-carousel>
  `;
};

export const Carousel = Template.bind({});

Carousel.args = {
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