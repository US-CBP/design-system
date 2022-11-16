
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
(function () {
  'use strict';

  class SelectorEngine {
    static findAll(selector) {
      return document.querySelectorAll(selector);
    }
  }

  class Accordion {
    constructor(domNode) {
      this.accordionNode = domNode;

      this.accordionNode.addEventListener('click', this.toggle);
    }

    toggle(event) {
      const wrapper = event.target.closest('.cbp-accordion__item');
      wrapper.classList.toggle('active');
    }
  }

  const KEY_EVENTS = new Set(["Enter", "Escape", "ArrowUp", "ArrowDown", "Tab", "Space"]);

  const util = {
    openDropdowns: [],
    getCurrentMenu: () => {
      return util.openDropdowns[util.openDropdowns.length - 1];
    },
    focusFirst: (menuItems) => {
      for (let i = 0; i < menuItems.length; i++) {
        const element = menuItems[i];
        element.focus();
        return true;
      }
      return false;
    },
    focusLast: (menuItems) => {
      for (let i = menuItems.length - 1; i >= 0; i--) {
        const element = menuItems[i];
        element.focus();
        return true;
      }
      return false;
    },
  };

  class Dropdown {
    constructor(domNode) {
      this.dropdownNode = domNode;
      this.dropdownMenuNode = this.dropdownNode.nextElementSibling;
      this.selected;
      this.selectionCount = 0;
      this.menuItems = this.dropdownMenuNode.children;
      this.chips = [];
      this.placeHolder = this.dropdownNode.querySelector(".cbp-dropdown__placeholder");

      this.dropdownNode.addEventListener("click", (e) => {
        this.handleClick(e, this);
      });

      this.dropdownNode.addEventListener("keydown", (e) => {
        this.handleKeydown(e, this);
      });

      this.handleMenuItems(this.menuItems, this);
    }

    isOpen() {
      const { getCurrentMenu } = util;
      return (
        typeof getCurrentMenu() != "undefined" &&
        getCurrentMenu().dropdownNode.classList.contains("cbp-dropdown--open")
      );
    }

    close() {
      if (this.isOpen()) {
        util.getCurrentMenu().dropdownNode.classList.remove("cbp-dropdown--open");
        util.openDropdowns.pop();
        this.dropdownNode.focus();
        window.removeEventListener("click", this.handleOutsideClick, true);
      }
    }

    handleOutsideClick(e) {
      const isMultiChoice =
        e.target.classList.contains("cbp-dropdown__item--multiselect") ||
        e.target.type === "checkbox";
      const insideClick =
        e.target.classList.contains("cbp-dropdown__custom") ||
        e.target.classList.contains("cbp-dropdown__item");
      if (insideClick || isMultiChoice) {
        return;
      } else {
        util.getCurrentMenu().close();
      }
    }

    toggle(dropdown) {
      if (typeof util.getCurrentMenu() === "undefined" || util.openDropdowns.length <= 0) {
        util.openDropdowns.push(dropdown);
        util.getCurrentMenu().dropdownNode.classList.add("cbp-dropdown--open");
        window.addEventListener("click", this.handleOutsideClick, true);
      } else if (dropdown.dropdownNode != util.getCurrentMenu().dropdownNode) {
        util.getCurrentMenu().close();
        util.openDropdowns.pop();
        util.openDropdowns.push(dropdown);
        util.getCurrentMenu().dropdownNode.classList.add("cbp-dropdown--open");
        window.addEventListener("click", this.handleOutsideClick, true);
      } else {
        this.close();
      }
    }

    handleClick(e, dropdown) {
      const { target } = e;
      e.preventDefault();
      if (target != this.dropdownNode) {
        this.removeCount(e);
      } else {
        this.toggle(dropdown);
      }
    }

    handleKeydown(e, dropdown) {
      const { menuItems } = dropdown;
      if (e.key === "Escape" && KEY_EVENTS.has(e.key)) {
        e.preventDefault();
        this.close();
      }

      if (e.key === "Enter" && KEY_EVENTS.has(e.key)) {
        e.preventDefault();
        this.toggle(dropdown);
      }

      if (e.key === "ArrowUp" && KEY_EVENTS.has(e.key)) {
        e.preventDefault();
        if (this.isOpen()) {
          util.focusLast(menuItems);
        } else {
          this.toggle(dropdown);
          util.focusLast(menuItems);
        }
      }

      if (e.key === "ArrowDown" && KEY_EVENTS.has(e.key)) {
        e.preventDefault();
        if (this.isOpen()) {
          util.focusFirst(menuItems);
        } else {
          this.toggle(dropdown);
          util.focusFirst(menuItems);
        }
      }

      if (e.key === "Tab" && KEY_EVENTS.has(e.key)) {
        this.close();
      }
    }

    handleMenuItems(items, dropdown) {
      for (let i = 0; i < items.length; i++) {
        const element = items[i];
        element.addEventListener("keydown", (e) => {
          if (e.key === "Escape" && KEY_EVENTS.has(e.key)) {
            e.preventDefault();
            this.close();
          }

          if (e.key === "Enter" && KEY_EVENTS.has(e.key)) {
            if (e.target.nodeName === "A") { // DRY
              e.preventDefault();
              this.selected = e.target.innerHTML;
              if (typeof this.selected != undefined) {
                this.dropdownNode.innerHTML = this.selected;
              }
              util.getCurrentMenu().close();
            }

            if (e.target.nodeName === 'INPUT') {
              e.preventDefault();
              this.close();
            }
          }

          if (e.key === "ArrowUp" && KEY_EVENTS.has(e.key)) {
            e.preventDefault();
            const prevEl = items[i - 1];
            if (typeof prevEl === "undefined") {
              return;
            }
            prevEl.focus();
          }

          if (e.key === "ArrowDown" && KEY_EVENTS.has(e.key)) {
            e.preventDefault();
            const nextEl = items[i + 1];
            if (typeof nextEl === "undefined") {
              return;
            }
            nextEl.focus();
          }

          if (e.key === "Tab" && KEY_EVENTS.has(e.key)) {
            this.close();
          }

          if (e.key === " " && KEY_EVENTS.has(e.code)) {
            if (e.target.nodeName === "A") { // DRY
              e.preventDefault();
              this.selected = e.target.innerHTML;
              if (typeof this.selected != undefined) {
                this.dropdownNode.innerHTML = this.selected;
              }
              util.getCurrentMenu().close();
            }
          }
        });
      }

      for (let i = 0; i < items.length; i++) {
        const element = items[i];
        element.addEventListener("click", (e) => {
          if (e.target.nodeName === "A") { // DRY
            this.selected = e.target.innerHTML;
            if (typeof this.selected != undefined) {
              this.dropdownNode.innerHTML = this.selected;
            }
            util.getCurrentMenu().close();
          }
        });
      }

      for (let i = 0; i < items.length; i++) {
        const element = items[i];

        element.addEventListener("change", (e) => {
          if (element.firstElementChild.checked) {
            this.chips.push(element.firstElementChild.value);
            if (this.selectionCount <= 0) {
              this.selectionCount++;
              this.dropdownNode.insertBefore(this.createChip(this.selectionCount), this.placeHolder);
            } else {
              this.selectionCount++;
              this.dropdownNode.querySelector('.cbp-chips').firstElementChild.innerHTML = this.selectionCount;
            }
          } else {
            this.chips = this.chips.filter((val) => val != element.firstElementChild.value);
            this.selectionCount--;
            if (this.selectionCount == 0) {
              this.dropdownNode.querySelector('.cbp-chips').remove();
            } else {
              this.dropdownNode.querySelector('.cbp-chips').firstElementChild.innerHTML = this.selectionCount;
            }
          }
        });
      }
    }

    createChip(val) {
      const chip = document.createElement("div");
      const text = document.createElement("span");
      const iconWrapper = document.createElement("div");
      const icon = document.createElement("i");
      chip.className = "cbp-chips margin-right-1";
      iconWrapper.className = "plus-border";
      icon.className = "fas fa-times";

      chip.appendChild(text);
      chip.appendChild(iconWrapper);
      iconWrapper.appendChild(icon);
      text.innerHTML = val;

      return chip;
    }

    updateChips(allChips) {
      this.dropdownNode.innerHTML = "";
      allChips.forEach((val) => {
        const chip = this.createChip(val);
        this.dropdownNode.appendChild(chip);
      });

      if (allChips.length == 0) {
        this.dropdownNode.appendChild(this.placeHolder);
      }
    }

    handleChips(parentChip) {
      const chipVal = parentChip.querySelector("span").innerHTML;
      this.chips = this.chips.filter((item) => item != chipVal);
      this.updateChips(this.chips);
    }

    removeCount(e) {
      this.chips = [];
      this.selectionCount = 0;
      this.dropdownNode.querySelector('.cbp-chips').remove();
      this.dropdownMenuNode.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
      });
    }
  }

  class Expand {
    constructor(component) {
      this.expand = component;
      this.title = component.querySelector('.cbp-expand__title');
      this.activeClass = 'active';
      
      this.addListener('click');
    }

    addListener(type) {
      this.title.addEventListener(type, e => {
        this.expand.classList.toggle(this.activeClass);
      });
    }
  }

  class Toggle {
    constructor(node) {
      this.node = node; // Toggle wrapper
      this.checkbox = node.querySelector('input[type="checkbox"]'); // Toggle checkbox
      this.slider = this.checkbox.nextElementSibling; // Slider (span) element should always be adjacent to checkbox input
      this.leftIcon = this.slider.firstElementChild;
      this.rightIcon = this.slider.lastElementChild;

      this.node.addEventListener("change", (e) => {
        this.toggleIcons(e);
      });
    }

    isChecked(event = null) {
      if (event) {
        return event.target.checked;
      } else {
        return this.checkbox.checked;
      }
    }

    isCheckbox(event) {
      return event.target.type === "checkbox";
    }

    containsIcons() {
      return this.slider.children.length > 0;
    }

    toggleIcons(event) {
      if (!this.containsIcons()) {
        return;
      } else {
        if (this.isChecked(event)) {
          this.leftIcon.style.display = "inline-block";
          this.rightIcon.style.display = "none";
        } else {
          this.leftIcon.style.display = "none";
          this.rightIcon.style.display = "inline-block";
        }
      }
    }
  }

  // MDN Doc (https://developer.mozilla.org/en-US/docs/Web/API/File_API/Using_files_from_web_applications)

  const fileUtil = {
    createUpload: (key, name, progressValue, progressMax, files) => {
      const fileProgress = document.createElement("div");
      const fileName = document.createElement("span");
      const cancelIcon = document.createElement("i");
      const cancelBtn = document.createElement("button");
      const progressBar = document.createElement("progress");

      fileProgress.className = "cbp-form__upload";
      fileProgress.id = `${key}_${name}`;

      fileName.innerText = name;
      cancelIcon.className = "fa fa-times";
      cancelBtn.appendChild(cancelIcon);

      cancelBtn.onclick = (e) => {
        fileUtil.cancelUpload(key, files, e);
      };

      progressBar.value = progressValue;
      progressBar.max = progressMax;

      fileProgress.appendChild(fileName);
      fileProgress.appendChild(cancelBtn);
      fileProgress.appendChild(progressBar);

      return fileProgress;
    },
    createErrorUpload: (key, name) => {
      const errorUpload = document.createElement("div");
      const fileContainer = document.createElement("div");
      const errorFile = document.createElement("span");
      const cancelBtn = document.createElement("button");
      const divider = document.createElement("hr");
      const errorMessage = document.createElement("span");
      const errorIcon = document.createElement("i");
      const cancelIcon = document.createElement("i");

      errorUpload.id = `${key}_${name}`;
      errorFile.innerText = name;
      cancelIcon.className = 'fa fa-times';
      cancelBtn.appendChild = cancelIcon;

      errorIcon.className = "fas fa-exclamation-triangle";
      errorMessage.appendChild(cancelIcon);
      errorMessage.innerText = 'File size exceeds the limit.';

      fileContainer.appendChild(errorFile);
      fileContainer.appendChild(cancelBtn);

      errorUpload.appendChild(fileContainer);
      errorUpload.appendChild(divider);
      errorUpload.appendChild(errorMessage);

      return errorUpload;
    },
    cancelUpload: (key, files, event) => {
      const list = new DataTransfer();
      const fileArray = Object.entries(files);
      const filteredList = fileArray.filter(([listkey, value]) => listkey != key);
      const filteredFiles = filteredList.map(arr => arr[1]);
      
      filteredFiles.forEach(file => list.items.add(file));

      const upload = event.target.closest('.cbp-form__upload');

      upload.remove();
    },
  };

  class FileUploader {
    constructor(element) {
      this.formWrapper = element.closest('.cbp-form-wrapper');
      this.element = element;
      this.input = element.querySelector("input[type=file]");

      this.handleInput(this.input, this.reader);
    }

    handleEvent(event, key, value, files) {
      if (event.type === "loadstart") {
        console.log('loadstart process');
        const upload = fileUtil.createUpload(key, value.name, event.loaded, event.total, files);
        this.element.insertAdjacentElement("afterend", upload);
      }

      if (event.type === "progress") {
        // update progress bar value
        const upload = document.getElementById(`${key}_${value.name}`);
        const progress = upload.querySelector("progress");
        console.log('progress process');
        progress.setAttribute("value", event.loaded);
      }

      if (event.type === 'loadend') {
        const upload = document.getElementById(`${key}_${value.name}`);
        const progress = upload.querySelector("progress");

        // Hide progress bar once file has finished uploading
        progress.hidden = true;
      }

      if (event.type === "error") {
        const upload = fileUtil.createErrorUpload(key, value.name);

        this.element.insertAdjacentElement("afterend", upload);
      }
    }

    handleReader(files) {
      for (const [key, value] of Object.entries(files)) {
        const reader = new FileReader();

        reader.addEventListener("loadstart", (e) => this.handleEvent(e, key, value, files));
        reader.addEventListener("load", (e) => this.handleEvent(e, key, value, files));
        reader.addEventListener("loadend", (e) => this.handleEvent(e, key, value, files));
        reader.addEventListener("progress", (e) => this.handleEvent(e, key, value, files));
        reader.addEventListener("error", (e) => this.handleEvent(e, key, value, files));
        reader.addEventListener("abort", this.handleEvent);

        reader.readAsDataURL(value);
      }
    }

    handleInput(input, reader) {
      input.addEventListener("change", (e) => {
        this.handleReader(e.target.files);
      });
    }
  }

  class HashField {
    constructor(component) {
      this.className = ".cbp-form__password";
      this.input = component.querySelector("input[type='password']");
      this.btn = component.querySelector("button[type='button']");

      this.addListener(this.btn, this.input);
    }

    addListener(btn, input) {
      btn.addEventListener("click", (e) => {
        if (input.type === "password") {
          input.type = "text";
          btn.firstElementChild.className = "fas fa-eye";
        } else {
          input.type = "password";
          btn.firstElementChild.className = "fas fa-eye-slash";
        }
      });
    }
  }

  class NumberCounter {
    constructor(component) {
      this.input = component.querySelector('input[type="number"]');
      this.minus = component.querySelector('#decrement');
      this.plus = component.querySelector('#increment');
      this.isDisabled = this.input.disabled;
      this.isReadOnly = this.input.readOnly;

      this.plus.addEventListener('click', (e) => {
        this.increment(this.input);
      });

      this.minus.addEventListener('click', (e) => {
        this.decrement(this.input);
      });

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

  const addOrInstantiate = (Klass, node) => {
    return new Klass(node);
  };

  /**
   * Accordion Component
   */
  SelectorEngine.findAll(".cbp-accordion__title").forEach((accordion) => {
    addOrInstantiate(Accordion, accordion);
  });

  /**
   * Expand Component
   */
  SelectorEngine.findAll(".cbp-expand").forEach((expand) => {
    addOrInstantiate(Expand, expand);
  });

  /**
   * Dropdown Components
   */
  SelectorEngine.findAll('[data-toggle="dropdown"]').forEach((dropdown) => {
    addOrInstantiate(Dropdown, dropdown);
  });

  /**
   * Toggle Component
   */
  window.addEventListener("load", () => {
    SelectorEngine.findAll('[data-component="cbp-toggle"]').forEach((toggle) => {
      new Toggle(toggle);
    });
  });

  /**
   * File Upload Component
   */
  SelectorEngine.findAll('.cbp-form__file').forEach((fileupload) => {
    addOrInstantiate(FileUploader, fileupload);
  });

  /**
   * Hashfield Component
   */
  SelectorEngine.findAll('.cbp-form__password').forEach((hashfield) => {
    addOrInstantiate(HashField, hashfield);
  });

  /**
   * Number Counter Component (Input)
   */
  SelectorEngine.findAll('.cbp-form__number--counter').forEach((counter) => {
    addOrInstantiate(NumberCounter, counter);
  });

})();
