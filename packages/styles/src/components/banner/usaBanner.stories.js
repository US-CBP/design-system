export default {
  title: 'Patterns/Banners',
  argTypes: {},
};

const Template = () => {
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

export const USABanner = Template.bind({});
USABanner.args = {};
