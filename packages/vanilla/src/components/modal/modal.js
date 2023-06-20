class Modal {
  constructor(modal) {
    this.modal = modal;
    this.control = document.querySelector(`[data-modal="${modal.id}"]`);
    this.closeControls = this.modal.querySelectorAll('[data-modal-close]');

    this.control.addEventListener('click', () => {
      this.modal.showModal();
    })

    this.closeControls.forEach(close => {
      close.addEventListener('click', () => {
        this.modal.close();
      })
    });
  }
}

export default Modal