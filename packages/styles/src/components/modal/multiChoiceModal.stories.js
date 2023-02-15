export default {
  title: 'Patterns/Modal'
};

const Template = () => {
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

export const MultiChoiceModal = Template.bind({});
MultiChoiceModal.args = {}