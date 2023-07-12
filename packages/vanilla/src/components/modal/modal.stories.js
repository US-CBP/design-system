export default {
  title: 'Patterns/Modal',
  argTypes: {
    title: {
      name: 'Modal Title',
      description: 'Title of the modal component'
    },
    modalID: {
      name: 'Modal ID',
      description: 'Sets the ID of the `<dialog>` element associated with the `data-modal` attribute on the control that opens the modal'
    },
    titleID: {
      name: 'ARIA Labelledby ID',
      description: 'The modals accessible title, associated with the title/heading element within the modal'
    },
    describedByID: {
      name: 'ARIA Describedby ID',
      description: 'The modals accessible description or detail associated with the description text within the `<dialog>` element'
    },
    controlsLayout: {
      name: 'Controls Layout',
      description: 'Choose controls layout of the modal component',
      control: 'radio',
      options: ['single', 'double', 'triple']
    },
  }
};

const renderControls = (layout) => {
  if (layout === 'double') {
    return `
      <div class="cbp-modal__controls">
        <button type="button" class="cbp-btn cbp-btn__secondary" data-modal-close><i class="fas fa-times"></i>cancel</button>
        <button type="button" class="cbp-btn cbp-btn__primary"><i class="fas fa-paper-plane"></i>submit</button>
      </div>
    `;
  } else if (layout === 'triple') {
    return `
      <div class="cbp-modal__controls">
        <button type="button" class="cbp-btn cbp-btn__secondary" data-modal-close><i class="fas fa-times"></i>cancel</button>
        <button type="button" class="cbp-btn cbp-btn__danger" data-modal-close><i class="fas fa-trash-alt"></i>delete</button>
        <button type="button" class="cbp-btn cbp-btn__primary"><i class="fas fa-paper-plane"></i>publish</button>
      </div>
    `;
  } else {
    return `
      <div class="cbp-modal__controls">
        <button type="button" class="cbp-btn cbp-btn__primary" data-modal-close><i class="fas fa-check"></i>accept</button>
      </div>
    `;
  }
};

const ModalTemplate = ({ title, modalID, titleID, describedByID, controlsLayout }) => {
  return `
    <button type="button" class="cbp-btn cbp-btn__primary" data-modal="${modalID}">Open Model</button>
    <dialog class="cbp-modal" id="${modalID}" role="alertdialog" aria-labelledby="${titleID}" aria-describedby="${describedByID}">
      <div class="cbp-modal__content">
        <h2 class="cbp-modal__title" id="${titleID}">${title}</h2>
        <hr>
        <p class="cbp-modal__description" id="${describedByID}">Description text that describes the modal content.</p>
      </div>
      ${renderControls(controlsLayout)}
    </dialog>
  `
}

export const Modal = ModalTemplate.bind({});
Modal.args = {
  title: 'Modal Title',
  modalID: 'modal-id',
  titleID: 'modal-title-id',
  describedByID: 'modal-description-id',
  controlsLayout: 'single'
}