export default {
  title: 'Patterns/Banners',
  argTypes: {},
};

const InfoBannerTemplate = () => {
  return `
    <div class="cbp-banner__info">
      <div>
        <div>
          <i class="fas fa-exclamation"></i>
          <h6 class="cbp-banner__info-title d-none-lg">Scheduled Maintenance Notice</h6>
        </div>
        <div>
          <h6 class="cbp-banner__info-title d-none-sm">Scheduled Maintenance Notice</h6>
          <p class="cbp-banner__text">This application will be undergoing scheduled maintenance from 10/15/22 - 10/31/22 from 12am - 3am and will be unavailable during these times.</p>
        </div>
        <button>
          <i class="fas fa-times"></i>
          Dismiss
        </button>
      </div>
    </div>
  `;
};

const SecurityBannerTemplate = () => {
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
            This page contains information, in whole or part, that is marked <span class="cbp-text-bold cbp-text-italic">CLASSIFIED: TOP SECRET (TS)</span>. 
            If you are accessing this information from a non-classified device, stop what you are doing 
            immediately and contact your unit&#39;s security officer. 
            <a href="#" class="cbp-link__inline"><i class="fas fa-external-link-alt"></i> Learn More About INFOSEC</a>
          </p>
        </div>
        <button>
          <i class="fas fa-times"></i>
          Dismiss
        </button>
      </div>
    </div>
  `;
};

const UsaBannerTemplate = () => {
  return `
    <header class="cbp-banner">
      <div class="cbp-grid-container cbp-banner__title">
        <img src="../assets/images/us_flag_small.png" alt="usa logo">
        <div>
          <span>An official website of the United States government.</span>
          <button>Here&#39;s how you know.<i class="fas fa-angle-up"></i></button>
        </div>
      </div>

      <div class="cbp-banner__content">
        <div>
          <i class="fas fa-landmark"></i>
          <div>
            <h6>Official websites use .gov</h6>
            <p>A .gov website belongs to an official government organization in the United States.</p>
          </div>
        </div>
        <div>
          <i class="fas fa-lock"></i>
          <div>
            <h6>Secure .gov websites use HTTPS</h6>
            <p>A lock (lock) or https:// means you&#39;ve safely connected to the .gov website. Share sensitive information only on official, secure websites.</p>
          </div>
        </div>
      </div>
    </header>
  `;
};

export const UsaBanner = UsaBannerTemplate.bind({});
UsaBanner.args = {};


export const InfoBanner = InfoBannerTemplate.bind({});
InfoBanner.args = {};

export const SecurityBanner = SecurityBannerTemplate.bind({});
SecurityBanner.args = {};