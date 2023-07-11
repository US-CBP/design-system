export default {
  title: 'Patterns/Modal'
};

const SimpleModalTemplate = () => {
  return `
    <button type="button" class="cbp-btn cbp-btn__primary" data-modal="simple-modal">Open Modal</button>
    <dialog class="cbp-modal" id="simple-modal" role="alertdialog" aria-describedby="simple-modal-description">
      <div class="cbp-modal__content">
        <p class="cbp-modal__description" id="simple-modal-description">Are you sure you want to add this user to the list?</p>
      </div>
      <div class="cbp-modal__controls">
        <button type="button" class="cbp-btn cbp-btn__secondary" data-modal-close><i class="fas fa-trash-alt"></i>cancel</button>
        <button type="button" class="cbp-btn cbp-btn__primary"><i class="fas fa-plus"></i>add user</button>
      </div>
    </dialog>
  `
}

const AcknowledgementModalTemplate = () => {
  return `
    <button type="button" class="cbp-btn cbp-btn__primary" data-modal="acknowledge">Open Model</button>
    <dialog class="cbp-modal" id="acknowledge" role="alertdialog" aria-labelledby="acknowledge-modal-title" aria-describedby="acknowledge-modal-description">
      <div class="cbp-modal__content">
        <h2 class="cbp-modal__title" id="acknowledge-modal-title">Terms of Service Update</h2>
        <hr>
        <p class="cbp-modal__description" id="acknowledge-modal-description">There was a change to our terms of service. Continued use of this system constitutes acceptance of these terms.</p>
      </div>
      <div class="cbp-modal__controls">
        <button type="button" class="cbp-btn cbp-btn__primary" data-modal-close><i class="fas fa-check"></i>accept</button>
      </div>
    </dialog>
  `
}

const ConfirmationModalTemplate = () => {
  return `
    <button type="button" class="cbp-btn cbp-btn__primary" data-modal="confirmation">Confirmation Modal</button>
    <dialog class="cbp-modal" id="confirmation" role="alertdialog" aria-labelledby="confirmation-modal-title" aria-describedby="confirmation-modal-description">
      <div class="cbp-modal__content">
        <h2 class="cbp-modal__title" id="confirmation-modal-title"><i class="fas fa-check"></i>Confirm</h2>
        <hr>
        <p class="cbp-modal__description" id="confirmation-modal-description">Are you sure you want to submit and close this exam?</p>
      </div>
      <div class="cbp-modal__controls">
        <button type="button" class="cbp-btn cbp-btn__secondary" data-modal-close><i class="fas fa-times"></i>cancel</button>
        <button type="button" class="cbp-btn cbp-btn__primary"><i class="fas fa-paper-plane"></i>submit</button>
      </div>
    </dialog>
  `
}

const DangerModalTemplate = () => {
  return `
    <button type="button" class="cbp-btn cbp-btn__primary" data-modal="danger">Danger Modal</button>
    <dialog class="cbp-modal" id="danger" role="alertdialog" aria-labelledby="danger-modal-title" aria-describedby="danger-modal-description">
      <div class="cbp-modal__content">
        <h2 class="cbp-modal__title" id="danger-modal-title"><i class="fas fa-exclamation-triangle"></i>Warning</h2>
        <hr>
        <p class="cbp-modal__description" id="simple-modal-description">Are you sure you want to delete this item? This action cannot be undone.</p>
      </div>
      <div class="cbp-modal__controls">
        <button type="button" class="cbp-btn cbp-btn__secondary" data-modal-close><i class="fas fa-times"></i>cancel</button>
        <button type="button" class="cbp-btn cbp-btn__danger"><i class="fas fa-trash-alt"></i>delete</button>
      </div>
    </dialog>
  `
}

const MultiChoiceModalTemplate = () => {
  return `
    <button type="button" class="cbp-btn cbp-btn__primary" data-modal="multi">3 Choice Modal</button>
    <dialog class="cbp-modal" id="multi" role="alertdialog" aria-labelledby="multi-modal-title" aria-describedby="multi-modal-description">
      <div class="cbp-modal__content">
        <h2 class="cbp-modal__title" id="multi-modal-title"><i class="fas fa-file-alt"></i>Document Changes</h2>
        <hr>
        <p class="cbp-modal__description" id="multi-modal-description">What would you like to do with the changes you have made to this document?</p>
      </div>
      <div class="cbp-modal__controls">
        <button type="button" class="cbp-btn cbp-btn__secondary" data-modal-close><i class="fas fa-times"></i>cancel</button>
        <button type="button" class="cbp-btn cbp-btn__primary"><i class="fas fa-save"></i>save</button>
        <button type="button" class="cbp-btn cbp-btn__primary"><i class="fas fa-paper-plane"></i>publish</button>
      </div>
    </dialog>
  `
}

const FormModalTemplate = () => {
  return `
    <button type="button" class="cbp-btn cbp-btn__primary" data-modal="form-modal">Form Modal</button>
    <dialog class="cbp-modal" id="form-modal" role="alertdialog" aria-labelledby="form-modal-title" aria-describedby="form-modal-description">
      <div class="cbp-modal__content">
        <h2 class="cbp-modal__title" id="form-modal-title"><i class="fas fa-comment"></i>Feedback</h2>
        <hr>
        <p class="cbp-modal__description" id="form-modal-description">If you're experiencing a system error or application problem please contact the Technology Service Desk.</p>
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
SimpleModal.args = {}

export const AcknowledgementModal = AcknowledgementModalTemplate.bind({});
AcknowledgementModal.args = {}

export const ConfirmationModal = ConfirmationModalTemplate.bind({});
ConfirmationModal.args = {}

export const DangerModal = DangerModalTemplate.bind({});
DangerModal.args = {}

export const MultiChoiceModal = MultiChoiceModalTemplate.bind({});
MultiChoiceModal.args = {}

export const FormModal = FormModalTemplate.bind({});
FormModal.args = {}