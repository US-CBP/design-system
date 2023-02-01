class NumberSwitch {
  constructor(id) {
    this.node = document.getElementById(id);
    this.btns = this.node.querySelector('.cbp-btn--segment');
    this.unit = this.node.querySelector('.cbp-form__unit');
    this.activeBtn = this.btns.querySelector('.active');

    this.toggleActive();
  }

  toggleActive() {
    this.btns.addEventListener('click', ({ target }) => {
      const { classList } = target;
      if (classList.contains('active')) {
        return;
      } else {
        this.clearActive();
        classList.add('active');
        this.activeBtn = target;

        this.setUnit(this.activeBtn.innerText);
      }
    })
  }

  clearActive() {
    const [...btns] = this.btns.children;
    btns.forEach(btn => {
      if (btn.classList.contains('active')) {
        btn.classList.remove('active')
      }
    })
  }

  setUnit(unit) {
    this.unit.innerHTML = unit.toLowerCase();
  }
}

const demoSwitch = new NumberSwitch('demo-switch');