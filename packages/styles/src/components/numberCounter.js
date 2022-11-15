class NumberCounter {
  constructor(id) {
    this.numCounterNode = document.getElementById(id)
    this.input = this.numCounterNode.querySelector('input[type="number"]');
    this.minus = this.numCounterNode.querySelector('#decrement');
    this.plus = this.numCounterNode.querySelector('#increment');
    this.isDisabled = this.input.disabled;
    this.isReadOnly = this.input.readOnly;

    this.plus.addEventListener('click', (e) => {
      this.increment(this.input)
    })

    this.minus.addEventListener('click', (e) => {
      this.decrement(this.input)
    })

    this.setReadOnly();
  }

  increment(input, step = 1) {
    if (step > 1) {
      input.value += step;
    } else {
      input.value++;
    }
  }

  decrement(input, step = 1) {
    if (step > 1) {
      input.value -= step;
    } else {
      input.value--;
    }
  }

  setReadOnly() {
    if (this.isReadOnly || this.isDisabled) {
      this.minus.disabled = true;
      this.plus.disabled = true;
    } else {
      this.minus.disabled = false;
      this.plus.disabled = false;
    }
  }
 }

const demoNumInput = new NumberCounter('number-counter');
