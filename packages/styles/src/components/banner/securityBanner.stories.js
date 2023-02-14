export default {
  title: 'Patterns/Banners',
  argTypes: {},
};

const Template = () => {
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

export const SecurityBanner = Template.bind({});
SecurityBanner.args = {};
