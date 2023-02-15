export default {
  title: 'Patterns/Modal'
};

const Template = () => {
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

export const ConfirmationModal = Template.bind({});
ConfirmationModal.args = {}