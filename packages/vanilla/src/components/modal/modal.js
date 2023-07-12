class Modal {
  constructor(modal) {
    this.modal = modal;
    this.openControl = document.querySelector(`[data-modal="${modal.id}"]`);
    this.closeControls = this.modal.querySelectorAll('[data-modal-close]');

    this.openControl.addEventListener('click', () => {
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