export default {
  title: 'Patterns/Modal'
};

const Template = () => {
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

export const AcknowledgementModal = Template.bind({});
AcknowledgementModal.args = {}