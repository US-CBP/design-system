export default {
  title: 'Patterns/Modal'
};

const Template = () => {
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

export const FormModal = Template.bind({});
FormModal.args = {}