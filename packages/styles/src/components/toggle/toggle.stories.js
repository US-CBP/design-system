export default {
  title: 'Patterns/Toggle'
};

const Template = () => {
  return `
    <div class="cbp-form-wrapper">
      <h4><i class="fas fa-user"></i> User Preferences</h4>
      <div class="cbp-toggle__wrapper">
        <label for="wi-fi" class="cbp-toggle__label">Wi-Fi Connection</label>
        <label class="cbp-toggle" data-component="cbp-toggle">
          <input type="checkbox">
          <span class="slider"></span>
        </label>
        <span>On</span>
      </div>
      <div class="cbp-toggle__wrapper">
        <label for="cell-data" class="cbp-toggle__label">Cellular Data</label>
        <label class="cbp-toggle" data-component="cbp-toggle">
          <input type="checkbox">
          <span class="slider"></span>
        </label>
        <span>On</span>
      </div>
      <div class="cbp-toggle__wrapper">
        <label for="bluetooth" class="cbp-toggle__label">Bluetooth</label>
        <label class="cbp-toggle" data-component="cbp-toggle">
          <input type="checkbox">
          <span class="slider"></span>
        </label>
        <span>On</span>
      </div>
      <div class="cbp-toggle__wrapper">
        <label for="dnd" class="cbp-toggle__label">Do Not Disturb</label>
        <label class="cbp-toggle" data-component="cbp-toggle">
          <input type="checkbox">
          <span class="slider"></span>
        </label>
        <span>Off</span>
      </div>
      <div class="cbp-toggle__wrapper">
        <label for="airplane-mode" class="cbp-toggle__label">Airplane Mode</label>
        <label class="cbp-toggle" data-component="cbp-toggle">
          <input type="checkbox">
          <span class="slider"></span>
        </label>
        <span>Off</span>
      </div>
    </div>
  `
}

export const Toggle = Template.bind({});
Toggle.args = {}
