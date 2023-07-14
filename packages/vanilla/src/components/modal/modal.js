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

    this.modal.addEventListener('click', (e) => {
      const rect = e.target.getBoundingClientRect();

      if (
        rect.left > e.clientX ||
        rect.right < e.clientX ||
        rect.top > e.clientY ||
        rect.bottom < e.clientY
      ) {
        this.modal.close();
      }
    })
  }
}

export default Modal