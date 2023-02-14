export default {
  title: 'Patterns/Banners',
  argTypes: {},
};

const Template = () => {
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

export const InfoBanner = Template.bind({});
InfoBanner.args = {};
