export default {
  title: 'Patterns/Modal/Examples',
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
    }
  }
};

const SimpleModalTemplate = ({ modalID, ariaLabel, describedByID }) => {
  return `
    <button type="button" class="cbp-btn cbp-btn__primary" data-modal="${modalID}">Open Simple Modal</button>
    <dialog class="cbp-modal" id="${modalID}" role="alertdialog" aria-label="${ariaLabel}" aria-describedby="${describedByID}">
      <div class="cbp-modal__content">
        <p class="cbp-modal__description" id="${describedByID}">Are you sure you want to add this user to the list?</p>
      </div>
      <div class="cbp-modal__controls">
        <button type="button" class="cbp-btn cbp-btn__secondary" data-modal-close><i class="fas fa-trash-alt"></i>cancel</button>
        <button type="button" class="cbp-btn cbp-btn__primary"><i class="fas fa-plus"></i>add user</button>
      </div>
    </dialog>
  `
}

const AcknowledgementModalTemplate = ({ title, modalID, titleID, describedByID }) => {
  return `
    <button type="button" class="cbp-btn cbp-btn__primary" data-modal="${modalID}">Open Acknowledgement Model</button>
    <dialog class="cbp-modal" id="${modalID}" role="alertdialog" aria-labelledby="${titleID}" aria-describedby="${describedByID}">
      <div class="cbp-modal__content">
        <h2 class="cbp-modal__title" id="${titleID}">${title}</h2>
        <hr>
        <p class="cbp-modal__description" id="${describedByID}">There was a change to our terms of service. Continued use of this system constitutes acceptance of these terms.</p>
      </div>
      <div class="cbp-modal__controls">
        <button type="button" class="cbp-btn cbp-btn__primary" data-modal-close><i class="fas fa-check"></i>accept</button>
      </div>
    </dialog>
  `
}

const ConfirmationModalTemplate = ({ title, modalID, titleID, describedByID }) => {
  return `
    <button type="button" class="cbp-btn cbp-btn__primary" data-modal="${modalID}">Open Confirmation Modal</button>
    <dialog class="cbp-modal" id="${modalID}" role="alertdialog" aria-labelledby="${titleID}" aria-describedby="${describedByID}">
      <div class="cbp-modal__content">
        <h2 class="cbp-modal__title" id="${titleID}"><i class="fas fa-check"></i>${title}</h2>
        <hr>
        <p class="cbp-modal__description" id="${describedByID}">Are you sure you want to submit and close this exam?</p>
      </div>
      <div class="cbp-modal__controls">
        <button type="button" class="cbp-btn cbp-btn__secondary" data-modal-close><i class="fas fa-times"></i>cancel</button>
        <button type="button" class="cbp-btn cbp-btn__primary"><i class="fas fa-paper-plane"></i>submit</button>
      </div>
    </dialog>
  `
}

const DangerModalTemplate = ({ title, modalID, titleID, describedByID }) => {
  return `
    <button type="button" class="cbp-btn cbp-btn__primary" data-modal="${modalID}">Open Danger Modal</button>
    <dialog class="cbp-modal" id="${modalID}" role="alertdialog" aria-labelledby="${titleID}" aria-describedby="${describedByID}">
      <div class="cbp-modal__content">
        <h2 class="cbp-modal__title" id="${titleID}"><i class="fas fa-exclamation-triangle"></i>${title}</h2>
        <hr>
        <p class="cbp-modal__description" id="${describedByID}">Are you sure you want to delete this item? This action cannot be undone.</p>
      </div>
      <div class="cbp-modal__controls">
        <button type="button" class="cbp-btn cbp-btn__secondary" data-modal-close><i class="fas fa-times"></i>cancel</button>
        <button type="button" class="cbp-btn cbp-btn__danger"><i class="fas fa-trash-alt"></i>delete</button>
      </div>
    </dialog>
  `
}

const MultiChoiceModalTemplate = ({ title, modalID, titleID, describedByID }) => {
  return `
    <button type="button" class="cbp-btn cbp-btn__primary" data-modal="${modalID}">Open Multi-Choice Modal</button>
    <dialog class="cbp-modal" id="${modalID}" role="alertdialog" aria-labelledby="${titleID}" aria-describedby="${describedByID}">
      <div class="cbp-modal__content">
        <h2 class="cbp-modal__title" id="${titleID}"><i class="fas fa-file-alt"></i>${title}</h2>
        <hr>
        <p class="cbp-modal__description" id="${describedByID}">What would you like to do with the changes you have made to this document?</p>
      </div>
      <div class="cbp-modal__controls">
        <button type="button" class="cbp-btn cbp-btn__secondary" data-modal-close><i class="fas fa-times"></i>cancel</button>
        <button type="button" class="cbp-btn cbp-btn__primary"><i class="fas fa-save"></i>save</button>
        <button type="button" class="cbp-btn cbp-btn__primary"><i class="fas fa-paper-plane"></i>publish</button>
      </div>
    </dialog>
  `
}

const FormModalTemplate = ({ title, modalID, titleID, describedByID }) => {
  return `
    <button type="button" class="cbp-btn cbp-btn__primary" data-modal="${modalID}">Open Form Modal</button>
    <dialog class="cbp-modal" id="${modalID}" role="alertdialog" aria-labelledby="${titleID}" aria-describedby="${describedByID}">
      <div class="cbp-modal__content">
        <h2 class="cbp-modal__title" id="${titleID}"><i class="fas fa-comment"></i>${title}</h2>
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

export const SimpleModal = SimpleModalTemplate.bind({});
SimpleModal.args = {
  modalID: 'simple-modal',
  ariaLabel: 'Confirm User',
  describedByID: 'simple-modal-description'
}
SimpleModal.argTypes = {
  ariaLabel: {
    name: 'ARIA Label',
    description: 'Accessible label used when a modal title/heading is not present'
  },
  title: {
    table: {
      disable: true
    }
  },
  titleID: {
    table: {
      disable: true
    }
  }
}

export const AcknowledgementModal = AcknowledgementModalTemplate.bind({});
AcknowledgementModal.args = {
  title: 'Terms of Service Update',
  modalID: 'acknowledge-modal',
  titleID: 'acknowledge-modal-title',
  describedByID: 'acknowledge-modal-description'
}

export const ConfirmationModal = ConfirmationModalTemplate.bind({});
ConfirmationModal.args = {
  title: 'Confirm',
  modalID: 'confirmation',
  titleID: 'confirmation-modal-title',
  describedByID: 'confirmation-modal-description'
}

export const DangerModal = DangerModalTemplate.bind({});
DangerModal.args = {
  title: 'Warning',
  modalID: 'danger',
  titleID: 'danger-modal-title',
  describedByID: 'danger-modal-description'
}

export const MultiChoiceModal = MultiChoiceModalTemplate.bind({});
MultiChoiceModal.args = {
  title: 'Document Changes',
  modalID: 'multi',
  titleID: 'multi-modal-title',
  describedByID: 'multi-modal-description'
}

export const FormModal = FormModalTemplate.bind({});
FormModal.args = {
  title: 'Feedback',
  modalID: 'form-modal',
  titleID: 'form-modal-title',
  describedByID: 'form-modal-description'
}