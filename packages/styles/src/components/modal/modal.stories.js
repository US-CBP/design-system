export default {
  title: 'Patterns/Modal'
};

const SimpleModalTemplate = () => {
  return `
    <button class="cbp-btn cbp-btn__primary cbp-hidden" data-modal-target="simple-modal" onclick="openModal('simple-modal', this)">Simple Modal</button><br>
    <div id="simple-modal" role="dialog" aria-modal="true">
      <div class="cbp-modal__content">
        <p id="simple-modal-desc" class="cbp-text-heading-2xs">Are you sure you want to add this user to the list?</p>
      </div>
      <div class="cbp-modal__footer cbp-modal__footer--double">
        <button class="cbp-btn cbp-btn__secondary" onclick="closeModal(this)">
          <i class="fas fa-trash-alt"></i>
          cancel
        </button>
        <button class="cbp-btn cbp-btn__primary">
          <i class="fas fa-plus"></i>
          add user
        </button>
      </div>
    </div>
  `
}

const AcknowledgementModalTemplate = () => {
  return `
    <button class="cbp-btn cbp-btn__primary cbp-hidden" data-modal-target="modal-one" onclick="openModal('modal-one', this)">Acknowledgement Modal</button><br>
    <div id="modal-one" role="dialog" aria-labelledby="modal-one-label" aria-modal="true">
      <div class="cbp-modal__header">
        <h5 class="cbp-modal__title" id="modal-one-label">Terms of Service Update</h5>
      </div>
      <hr>
      <div class="cbp-modal__content">
        <p>There was a change to our terms of service. Continued use of this system constitutes acceptance of these terms.
        </p>
      </div>
      <div class="cbp-modal__footer cbp-modal__footer--single">
        <button class="cbp-btn cbp-btn__primary" onclick="closeModal(this)">
          <i class="fas fa-check"></i>
          accept
        </button>
      </div>
    </div>
  `
}

const ConfirmationModalTemplate = () => {
  return `
    <button class="cbp-btn cbp-btn__primary cbp-hidden" data-modal-target="confirmation-modal" onclick="openModal('confirmation-modal', this)">Confirmation Modal</button><br>
    <div id="confirmation-modal" role="dialog" aria-labelledby="confirmation-modal-label" aria-modal="true">
      <div class="cbp-modal__header">
        <i class="fas fa-check"></i>
        <h5 class="cbp-modal__title" id="confirmation-modal-label">Confirm</h5>
      </div>
      <hr>
      <div class="cbp-modal__content">
        <p>Are you sure you want to submit and close this exam?</p>
      </div>
      <div class="cbp-modal__footer cbp-modal__footer--double">
        <button class="cbp-btn cbp-btn__secondary" onclick="closeModal(this)">
          <i class="fas fa-times"></i>
          <span class="cbp-text-button">cancel</span>
        </button>
        <button class="cbp-btn cbp-btn__primary" onclick="closeModal(this)">
          <i class="fas fa-paper-plane"></i>
          <span class="cbp-text-button">submit</span>
        </button>
      </div>
    </div>
  `
}

const DangerModalTemplate = () => {
  return `
    <button class="cbp-btn cbp-btn__primary cbp-hidden" data-modal-target="danger-modal" onclick="openModal('danger-modal', this)">Danger Modal</button><br>
    <div id="danger-modal" role="dialog" aria-labelledby="danger-modal-label" aria-modal="true">
      <div class="cbp-modal__header cbp-modal__header--danger">
        <i class="fas fa-exclamation-triangle"></i>
        <h5 class="cbp-modal__title" id="danger-modal-label">Warning</h5>
      </div>
      <hr>
      <div class="cbp-modal__content">
        <p id="danger-modal-desc">Are you sure you want to delete this item? This action cannot be undone.</p>
      </div>
      <div class="cbp-modal__footer cbp-modal__footer--double">
        <button class="cbp-btn cbp-btn__secondary" onclick="closeModal(this)">
          <i class="fas fa-times"></i>
          cancel
        </button>
        <button class="cbp-btn cbp-btn__danger">
          <i class="fas fa-trash-alt"></i>
          delete
        </button>
      </div>
    </div>
  `
}

const MultiChoiceModalTemplate = () => {
  return `
    <button class="cbp-btn cbp-btn__primary cbp-hidden" data-modal-target="modal-three" onclick="openModal('modal-three', this)">3 Choice Modal</button>
    <div id="modal-three" role="dialog" aria-labelledby="modal-three-label" aria-modal="true">
      <div class="cbp-modal__header">
        <i class="fas fa-file-alt"></i>
        <h5 class="cbp-modal__title" id="modal-three-label">Document Changes</h5>
      </div>
      <hr>
      <div class="cbp-modal__content">
        <p id="modal-three-desc">What would you like to do with the changes you have made to this document?</p>
      </div>
      <div class="cbp-modal__footer cbp-modal__footer--triple">
        <button class="cbp-btn cbp-btn__secondary" onclick="closeModal(this)">
          <i class="fas fa-times"></i>
          cancel
        </button>
        <button class="cbp-btn cbp-btn__primary" id="alt-btn" style="background-color: #2672de;">
          <i class="fas fa-save"></i>
          save
        </button>
        <button class="cbp-btn cbp-btn__primary">
          <i class="fas fa-paper-plane"></i>
          publish
        </button>
      </div>
    </div>
  `
}

const FormModalTemplate = () => {
  return `
    <button class="cbp-btn cbp-btn__primary cbp-hidden" data-modal-target="form-modal" onclick="openModal('form-modal', this)">Form Modal</button><br>
    <div id="form-modal" role="dialog" role="dialog" aria-labelledby="form-modal-label" aria-modal="true">
      <div class="cbp-modal__header">
        <i class="fas fa-comment"></i>
        <h5 class="cbp-modal__title" id="form-modal-label">Feedback</h5>
      </div>
      <hr>
      <div class="cbp-modal__content">
        <p id="form-modal-desc">If you're experiencing a system error or application problem please contact the Technology
          Service Desk.</p>
        <form action="">
          <label for="description" class="cbp-form__label">Description</label>
          <textarea name="description" id="description" class="cbp-form__textarea" cols="30" rows="5"
            placeholder="Enter a Description"></textarea>
          <div class="cbp-form__validation">
            <p><b>Required.</b> Please describe the issue or feedback you would like the team to know about. 101/200
              Characters remaining.</p>
          </div>
        </form>
      </div>
      <div class="cbp-modal__footer cbp-modal__footer--double">
        <button class="cbp-btn cbp-btn__secondary" onclick="closeModal(this)">
          <i class="fas fa-times"></i>
          cancel
        </button>
        <button class="cbp-btn cbp-btn__primary">
          <i class="fas fa-paper-plane"></i>
          send
        </button>
      </div>
    </div>
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