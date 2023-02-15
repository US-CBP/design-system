export default {
  title: 'Patterns/Modal'
};

const Template = () => {
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

export const DangerModal = Template.bind({});
DangerModal.args = {}