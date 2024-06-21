export default {
    title: 'Components/Banner',
    tags: ['autodocs'],
    argTypes: {
        bannerTitle: {
          name: 'Banner title',
          description: 'Text to fill the banner h2',
          control: 'text',
        },
        bannerContent:{
          name: 'Banner Content',
          description: 'Text to fill the banner Content',
          control: 'text',
        },
    },
      args: {
      },
    };
  
  const Template = ({ bannerTitle, bannerContent}) => {
    return ` 
        <cbp-banner 
            bannerTitle= ${bannerTitle}
            bannerContent= ${bannerContent}
        >
            <cbp-typography 
                slot='cbp-banner-title'
                tag='h2'
                variant='heading-lg'
                context='dark-always'
            >
                ${bannerTitle}
            </cbp-typography>
                ${bannerContent}
        </cbp-banner>
      `;
  };

  export const Default = Template.bind({});
    Default.args = {
        bannerTitle: 'Scheduled Maintenance Notice',
        bannerContent: 'This application will be undergoing scheduled maintenance from 10/5/XXXX to 10/31/XXXX from 12am - 3am and wil be unavaliable during these times'
    };
    Default.storyName = 'Default';