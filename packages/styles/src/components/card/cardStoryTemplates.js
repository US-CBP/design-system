export const renderButtons = (buttonLayout) => {
  switch (buttonLayout) {
    case 'double':
      return `
        <div class="cbp-card-decision__actions cbp-card-decision__actions--double">
          <button class="cbp-btn__secondary"><i class="fas fa-info-circle"></i>App Info</button>
          <button class="cbp-btn__primary"><i class="fas fa-external-link-alt"></i>Go To App</button>
        </div>
      `
      break;
    case 'triple':
      return `
        <div class="cbp-card-decision__actions cbp-card-decision__actions--triple">
          <button class="cbp-btn__danger"><i class="fas fa-trash-alt"></i>Delete</button>
          <button class="cbp-btn__secondary"><i class="fas fa-times"></i>Cancel</button>
          <button class="cbp-btn__primary"><i class="fas fa-save"></i>Publish</button>
        </div>
      `
      break;
    default:
      return `
      <div class="cbp-card-decision__actions">
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
        <div class="cbp-card-decision__actions cbp-card-decision__actions--double">
          <a href="#" class="cbp-btn__secondary"><i class="fas fa-info-circle"></i>App Info</a>
          <a href="#" class="cbp-btn__primary"><i class="fas fa-external-link-alt"></i>Go To App</a>
        </div>
      `
      break;
    case 'triple':
      return `
        <div class="cbp-card-decision__actions cbp-card-decision__actions--triple">
          <a href="#" class="cbp-btn__danger">
            <i class="fas fa-trash-alt"></i>
            Delete
          </a>
          <a href="#" class="cbp-btn__secondary">
            <i class="fas fa-times"></i>
            Cancel
          </a>
          <a href="#" class="cbp-btn__primary">
            <i class="fas fa-times"></i>
            Publish
          </a>
        </div>
      `
      break;
    default:
      return `
      <div class="cbp-card-decision__actions">
        <a href="#" class="cbp-btn__primary"><i class="fas fa-external-link-alt"></i>Go To App</a>
      </div>
      `
      break;
  }
}
