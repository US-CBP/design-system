export const renderButtons = (buttonLayout) => {
  switch (buttonLayout) {
    case 'double':
      return `
        <div class="cbp-card-action__buttons cbp-card-action__buttons--double">
          <button class="cbp-btn__secondary"><i class="fas fa-info-circle"></i>App Info</button>
          <button class="cbp-btn__primary"><i class="fas fa-external-link-alt"></i>Go To App</button>
        </div>
      `
      break;
    case 'triple':
      return `
        <div class="cbp-card-action__buttons cbp-card-action__buttons--triple">
          <button class="cbp-btn__danger"><i class="fas fa-trash-alt"></i>Delete</button>
          <button class="cbp-btn__secondary"><i class="fas fa-times"></i>Cancel</button>
          <button class="cbp-btn__primary"><i class="fas fa-save"></i>Publish</button>
        </div>
      `
      break;
    default:
      return `
      <div class="cbp-card-action__buttons cbp-card-action__buttons--single">
        <button class="cbp-btn__primary"><i class="fas fa-external-link-alt"></i>Go To App</button>
      </div>
      `
      break;
  }
}

export const renderLinks = (buttonLayout) => {
  switch (buttonLayout) {
    case 'double':
      return `
        <div class="cbp-card-action__buttons cbp-card-action__buttons--double">
          <a class="cbp-card-action__link cbp-card-action__link--secondary" href="#">
            <i class="fas fa-info-circle"></i>
            App Info
          </a>
          <a class="cbp-card-action__link cbp-card-action__link--primary" href="#">
            <i class="fas fa-external-link-alt"></i>
            Go To App
          </a>
        </div>
      `
      break;
    case 'triple':
      return `
        <div class="cbp-card-action__buttons cbp-card-action__buttons--triple">
          <a class="cbp-card-action__link cbp-card-action__link--danger" href="#">
            <i class="fas fa-trash-alt"></i>
            Delete
          </a>
          <a class="cbp-card-action__link cbp-card-action__link--secondary" href="#">
            <i class="fas fa-times"></i>
            Cancel
          </a>
          <a class="cbp-card-action__link cbp-card-action__link--primary" href="#">
            <i class="fas fa-times"></i>
            Publish
          </a>
        </div>
      `
      break;
    default:
      return `
      <div class="cbp-card-action__buttons cbp-card-action__buttons--single">
        <a class="cbp-card-action__link cbp-card-action__link--secondary" href="#">
          <i class="fas fa-external-link-alt"></i>
          Go To App
        </a>
      </div>
      `
      break;
  }
}
