export default {
  title: 'Patterns/Toggle'
};


/*
  TechDebt: the use of 2 labels isn't correct here and the overall structure could be made more flexible 
  (no hardcoded widths in CSS) with Flexbox.
  However, heavily modifying the HTML structure will impact both the CSS and JS, so saving for later.
  The real label text should live inside of the wrapping label tag with the input.
*/
const Template = () => {
  return `
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
  `
}

export const Toggle = Template.bind({});
Toggle.args = {}
