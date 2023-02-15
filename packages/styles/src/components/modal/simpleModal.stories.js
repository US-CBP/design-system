export default {
  title: 'Patterns/Modal'
};

const Template = () => {
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

export const SimpleModal = Template.bind({});
SimpleModal.args = {}