export default {
  title: 'Patterns/Modal',
  argTypes: {
    heading: {
      name: 'Modal Heading',
      description: 'Heading of the modal component'
    },
    modalID: {
      name: 'Modal ID',
      description: 'Sets the ID of the `<dialog>` element associated with the `data-modal` attribute on the control that opens the modal'
    },
    headingID: {
      name: 'ARIA Labelledby ID',
      description: 'The modals accessible heading, associated with the heading element within the modal'
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

const ModalTemplate = ({ heading, modalID, headingID, describedByID, controlsLayout, setAlertDialog }) => {
  return `
    <button type="button" class="cbp-btn cbp-btn__primary" data-modal="${modalID}" aria-haspopup="dialog">Open Modal</button>
    <dialog class="cbp-modal" id="${modalID}" ${setAlertDialog ? 'role="alertdialog"' : ''} aria-labelledby="${headingID}" aria-describedby="${describedByID}">
      <div class="cbp-modal__content">
        <h2 class="cbp-modal__heading" id="${headingID}">${heading}</h2>
        <hr>
        <p class="cbp-modal__description" id="${describedByID}">Description text that describes the modal content.</p>
      </div>
      ${renderControls(controlsLayout)}
    </dialog>
  `
}

const FormModalTemplate = ({ heading, modalID, headingID, describedByID }) => {
  return `
    <button type="button" class="cbp-btn cbp-btn__primary" data-modal="${modalID}" aria-haspopup="dialog">Open Form Modal</button>
    <dialog class="cbp-modal" id="${modalID}" aria-labelledby="${headingID}" aria-describedby="${describedByID}">
      <div class="cbp-modal__content">
        <h2 class="cbp-modal__heading" id="${headingID}"><i class="fas fa-comment"></i>${heading}</h2>
        <hr>
        <p class="cbp-modal__description" id="${describedByID}">If you're experiencing a system error or application problem please contact the Technology Service Desk.</p>
        <form id="modal-form">
          <label for="description" class="cbp-input__label">Description</label>
          <textarea class="cbp-input" name="description" id="description" placeholder="Enter a description"></textarea>
          <p class="cbp-input__description">Required. Please describe the issue or feedback you would like the team to know about. 200/200 Characters remaining.</p>
        </form>
      </div>
      <div class="cbp-modal__controls">
        <button class="cbp-btn cbp-btn__secondary" form="modal-form" formmethod="dialog"><i class="fas fa-times"></i>cancel</button>
        <button class="cbp-btn cbp-btn__primary" form="modal-form" value="default"><i class="fas fa-paper-plane"></i>send</button>
      </div>
    </dialog>
  `
}

export const Modal = ModalTemplate.bind({});
Modal.args = {
  heading: 'Modal Heading',
  modalID: 'modal-id',
  headingID: 'modal-heading-id',
  describedByID: 'modal-description-id',
  controlsLayout: 'single',
  setAlertDialog: true
}
Modal.argTypes = {
  setAlertDialog: {
    name: 'ARIA Alert Dialog',
    control: 'boolean'
  }
}

export const FormModal = FormModalTemplate.bind({});
FormModal.args = {
  heading: 'Feedback',
  modalID: 'form-modal',
  headingID: 'form-modal-heading',
  describedByID: 'form-modal-description'
}