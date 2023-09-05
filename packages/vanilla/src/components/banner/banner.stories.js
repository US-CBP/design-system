export default {
  title: 'Patterns/Banners',
  argTypes: {},
};

const InfoBannerTemplate = ({headingLevel, headingText, bannerText}) => {
  return `
    <div class="cbp-banner__info">
      <div>
        <div>
          <i class="fas fa-exclamation"></i>
          <${headingLevel} class="cbp-banner__info-title d-none-lg">${headingText}</${headingLevel}>
        </div>
        <div>
          <${headingLevel} class="cbp-banner__info-title d-none-sm">${headingText}</${headingLevel}>
          <p class="cbp-banner__text">${bannerText}</p>
        </div>
        <button type="button" class="cbp-btn cbp-btn__secondary-ghost">
          <i class="fas fa-times"></i>Dismiss
        </button>
      </div>
    </div>
  `;
};

const SecurityBannerTemplate = ({headingLevel, headingText, bannerText}) => {
  return `
    <div class="cbp-banner__security">
      <div>
        <div>
          <img src="../assets/images/cbp-icon/SECURITY ICON - TS SCI.svg" alt="security logo">
          <h6 class="cbp-banner__info-title d-none-lg">
            <i class="fas fa-exclamation-triangle"></i> Infosec Classification: TS/SCI
          </h6>
        </div>
        <div>
          <h6 class="cbp-banner__info-title d-none-sm">
            <i class="fas fa-exclamation-triangle"></i> Infosec Classification: TS/SCI
          </h6>
          <p class="cbp-banner__text">
            ${bannerText ? bannerText : `This page contains information, in whole or part, that is marked <span class="cbp-text-bold cbp-text-italic">CLASSIFIED: TOP SECRET (TS)</span>. 
            If you are accessing this information from a non-classified device, stop what you are doing 
            immediately and contact your unit&#39;s security officer. 
            <a href="#" class="cbp-link__inline"><i class="fas fa-external-link-alt"></i> Learn More About INFOSEC</a>`}
          </p>
        </div>
        <button type="button" class="cbp-btn cbp-btn__secondary-ghost">
          <i class="fas fa-times"></i>Dismiss
        </button>
      </div>
    </div>
  `;
};

const UsaBannerTemplate = () => {
  return `
    <section aria-label="Official website of the United States government">
      <header class="cbp-banner">
        <div class="cbp-grid-container cbp-banner__title">
          <img src="../assets/images/us_flag_small.png" height="11" width="16" alt="usa logo" />
          <div>
            <span>An official website of the United States government.</span>
            <button class="cbp-banner__toggle" aria-controls="gov-banner">
              <span>Here&#39;s how you know<i class="fas fa-angle-down"></i></span>
              <div class="cbp-usa-banner__dismiss">
                <i class="fas fa-times"></i>
              </div>
            </button>
          </div>
        </div>

        <div class="cbp-banner__content cbp-grid-container" id="gov-banner">
          <div>
            <i class="fas fa-landmark"></i>
            <div>
              <strong>Official websites use .gov</strong>
              <p>A <strong>.gov</strong> website belongs to an official government organization in the United States.</p>
            </div>
          </div>

          <div>
            <i class="fas fa-lock"></i>
            <div>
              <strong>Secure .gov websites use HTTPS</strong>
              <p>A <strong>lock</strong> (<i class="fas fa-lock"></i>) or <strong>https://</strong> means you&#39;ve safely connected to the .gov website. Share sensitive information only on official, secure websites.</p>
            </div>
          </div>
        </div>
      </header>
    </section>
  `;
};

export const UsaBanner = UsaBannerTemplate.bind({});
UsaBanner.storyName="USA Banner";


export const InfoBanner = InfoBannerTemplate.bind({});
InfoBanner.argTypes = {
  headingLevel: {
    name: 'Heading Level',
    description:
      'The heading level used as the banner heading (e.g., `h2`-`h6`) as appropriate for the document structure.',
    control: 'select',
    options: ['h2', 'h3', 'h4', 'h5', 'h6'],
  },
  headingText: {
    name: 'Heading Text',
    description: 'Text used as the banner heading.',
    control: 'text',
  },  
  bannerText: {
    name: 'Banner Text',
    description: 'The text making up the body of the banner. This may include HTML, but it is not supported within Storybook.',
    control: 'text',
  },
};
InfoBanner.args = {
  headingLevel: 'h2',
  headingText: 'Scheduled Maintenance Notice',
  bannerText: 'This application will be undergoing scheduled maintenance from 10/15/22 - 10/31/22 from 12am - 3am and will be unavailable during these times.'
};


export const SecurityBanner = SecurityBannerTemplate.bind({});
SecurityBanner.argTypes = {
  headingLevel: {
    name: 'Heading Level',
    description:
      'The heading level used as the banner heading (e.g., `h2`-`h6`) as appropriate for the document structure.',
    control: 'select',
    options: ['h2', 'h3', 'h4', 'h5', 'h6'],
  },
  headingText: {
    name: 'Heading Text',
    description: 'Text used as the banner heading.',
    control: 'text',
  },
  bannerText: {
    name: 'Banner Text',
    description: 'The text making up the body of the banner. This may include HTML, but it is not supported within Storybook.',
    control: 'text',
  },
};
SecurityBanner.args = {
  headingLevel: 'h2',
  headingText: 'Scheduled Maintenance Notice'
};
