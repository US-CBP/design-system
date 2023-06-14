export default {
  title: 'Patterns/Modal'
};

const SimpleModalTemplate = () => {
  return `
    <button type="button" class="cbp-btn cbp-btn__primary" data-modal="simple-modal">Open Modal</button>
    <dialog class="cbp-modal" id="simple-modal">
      <div class="cbp-modal__content">
        <p>Are you sure you want to add this user to the list?</p>
      </div>
      <div class="cbp-modal__controls">
        <button class="cbp-btn cbp-btn__secondary" data-modal-close>
          <i class="fas fa-trash-alt"></i>
          cancel
        </button>
        <button class="cbp-btn cbp-btn__primary">
          <i class="fas fa-plus"></i>
          add user
        </button>
      </div>
    </dialog>
  `
}

const AcknowledgementModalTemplate = () => {
  return `
    <button type="button" class="cbp-btn cbp-btn__primary" data-modal="acknowledge">Open Model</button>
    <dialog class="cbp-modal" id="acknowledge">
      <div class="cbp-modal__content">
        <h2 class="cbp-modal__title"><i class="fas fa-check"></i>Terms of Service Update</h2>
        <hr>
        <p>There was a change to our terms of service. Continued use of this system constitutes acceptance of these terms.</p>
      </div>
      <div class="cbp-modal__controls">
        <button class="cbp-btn cbp-btn__primary" data-modal-close>
          <i class="fas fa-check"></i>
          accept
        </button>
      </div>
    </dialog>
  `
}

const ConfirmationModalTemplate = () => {
  return `
    <button class="cbp-btn cbp-btn__primary" data-modal="confirm">Confirmation Modal</button>
    <dialog class="cbp-modal" id="confirm">
      <div class="cbp-modal__content">
        <h5 class="cbp-modal__title"><i class="fas fa-check"></i>Confirm</h5>
        <hr>
        <p>Are you sure you want to submit and close this exam?</p>
      </div>
      <div class="cbp-modal__controls">
        <button class="cbp-btn cbp-btn__secondary" data-modal-close>
          <i class="fas fa-times"></i>
          <span class="cbp-text-button">cancel</span>
        </button>
        <button class="cbp-btn cbp-btn__primary">
          <i class="fas fa-paper-plane"></i>
          <span class="cbp-text-button">submit</span>
        </button>
      </div>
    </dialog>
  `
}

const DangerModalTemplate = () => {
  return `
    <button class="cbp-btn cbp-btn__primary" data-modal="danger">Danger Modal</button>
    <dialog class="cbp-modal" id="danger">
      <div class="cbp-modal__content">
        <h5 class="cbp-modal__title"><i class="fas fa-exclamation-triangle"></i>Warning</h5>
        <hr>
        <p>Are you sure you want to delete this item? This action cannot be undone.</p>
      </div>
      <div class="cbp-modal__controls">
        <button class="cbp-btn cbp-btn__secondary" data-modal-close>
          <i class="fas fa-times"></i>
          cancel
        </button>
        <button class="cbp-btn cbp-btn__danger">
          <i class="fas fa-trash-alt"></i>
          delete
        </button>
      </div>
    </dialog>
  `
}

const MultiChoiceModalTemplate = () => {
  return `
    <button class="cbp-btn cbp-btn__primary" data-modal="multi">3 Choice Modal</button>
    <dialog class="cbp-modal" id="multi">
      <div class="cbp-modal__content">
        <h5 class="cbp-modal__title"><i class="fas fa-file-alt"></i>Document Changes</h5>
        <hr>
        <p>What would you like to do with the changes you have made to this document?</p>
      </div>
      <div class="cbp-modal__controls">
        <button class="cbp-btn cbp-btn__secondary" data-modal-close>
          <i class="fas fa-times"></i>
          cancel
        </button>
        <button class="cbp-btn cbp-btn__primary">
          <i class="fas fa-save"></i>
          save
        </button>
        <button class="cbp-btn cbp-btn__primary">
          <i class="fas fa-paper-plane"></i>
          publish
        </button>
      </div>
    </dialog>
  `
}

const FormModalTemplate = () => {
  return `
    <button class="cbp-btn cbp-btn__primary" data-modal="form-modal">Form Modal</button>
    <dialog class="cbp-modal" id="form-modal">
      <div class="cbp-modal__content">
        <h5 class="cbp-modal__title"><i class="fas fa-comment"></i>Feedback</h5>
        <hr>
        <p>If you're experiencing a system error or application problem please contact the Technology Service Desk.</p>
        <form action="dialog" method="">
          <label for="description" class="cbp-input__label">Task Description</label>
          <p class="cbp-input__description">Required. 500/500 Characters remaining.</p>
          <p class="cbp-input__description cbp-input__description--error" hidden="true"><i class="fas fa-exclamation-triangle"></i>You must enter a description.</p>
          <textarea class="cbp-input" name="description" id="description" placeholder="Enter a description"></textarea>
          <p><b>Required.</b> Please describe the issue or feedback you would like the team to know about. 200/200 Characters remaining.</p>
        </form>
      </div>
      <div class="cbp-modal__controls">
        <button class="cbp-btn cbp-btn__secondary" data-modal-close>
          <i class="fas fa-times"></i>
          cancel
        </button>
        <button class="cbp-btn cbp-btn__primary">
          <i class="fas fa-paper-plane"></i>
          send
        </button>
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