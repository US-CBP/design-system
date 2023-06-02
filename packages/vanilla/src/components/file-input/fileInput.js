// MDN Doc (https://developer.mozilla.org/en-US/docs/Web/API/File_API/Using_files_from_web_applications)

const fileUtil = {
  createUpload: (key, name, progressValue, progressMax, files) => {
    const fileProgress = document.createElement("div");
    const fileName = document.createElement("span");
    const cancelIcon = document.createElement("i");
    const cancelBtn = document.createElement("button");
    const progressBar = document.createElement("progress");

    fileProgress.className = "cbp-file-input__file";
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
    cancelBtn.appendChild = cancelIcon

    errorIcon.className = "fas fa-exclamation-triangle";
    errorMessage.appendChild(cancelIcon);
    errorMessage.innerText = 'File size exceeds the limit.'

    fileContainer.appendChild(errorFile);
    fileContainer.appendChild(cancelBtn);

    errorUpload.appendChild(fileContainer);
    errorUpload.appendChild(divider);
    errorUpload.appendChild(errorMessage)

    return errorUpload;
  },
  cancelUpload: (key, files, event) => {
    const list = new DataTransfer();
    const fileArray = Object.entries(files)
    const filteredList = fileArray.filter(([listkey, value]) => listkey != key);
    const filteredFiles = filteredList.map(arr => arr[1]);
    
    filteredFiles.forEach(file => list.items.add(file));

    const upload = event.target.closest('.cbp-file-input__file')
    upload.remove();
    // Reset the input's value to no files selected (this won't work with multiple file uploads)
    //event.srcElement.value="";
    this.input.value=undefined;
    
    console.log("File Removed: ", this.input, event.srcElement.value, event.srcElement.files);
  },
};


class FileInput {
  constructor(element) {
    this.formWrapper = element.closest('.cbp-form-wrapper');
    this.fileinput = element;
    this.input = element.querySelector("input[type=file]");

    this.handleInput(this.input, this.reader);
  }

  handleInput(input, reader) {
    input.addEventListener("change", (e) => {
      this.handleReader(e.target.files);
      console.log('Change event: ', e, "Files: ", e.srcElement.files.length)
    });
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

  handleEvent(event, key, value, files) {
    if (event.type === "loadstart") {
      console.log('loadstart process');
      const upload = fileUtil.createUpload(key, value.name, event.loaded, event.total, files);
      this.fileinput.insertAdjacentElement("afterend", upload);
    }

    if (event.type === "progress") {
      // update progress bar value
      const upload = document.getElementById(`${key}_${value.name}`);
      const progress = upload.querySelector("progress");
      console.log('progress process')
      progress.setAttribute("value", event.loaded);
    }

    if (event.type === 'loadend') {
      const upload = document.getElementById(`${key}_${value.name}`);
      const progress = upload.querySelector("progress");

      // Hide progress bar once file has finished reading
      progress.hidden = true;
    }

    if (event.type === "error") {
      const upload = fileUtil.createErrorLoad(key, value.name);
      this.fileinput.insertAdjacentElement("afterend", upload);
    }
  }
}

// Below is Demo Code
/*
const fileuploadDemo = (e) => {
  const formWrapper = document.getElementById('fileupload-demo');
  const labelArr = formWrapper.querySelectorAll('label');

  if (e.target.name === 'invalid') {
    handleInvalid(e.target.checked, labelArr, formWrapper);
  }

  if (e.target.name === 'disable') {
    handleDisable(e.target.checked, labelArr);
  }

  if (e.target.name === 'readonly') {
    handleReadonly(e.target.checked, labelArr);
  }
}

const handleInvalid = (checked, labels, parent) => {
  const [label, error, component] = labels;
  const upload = parent.querySelector('.cbp-form__upload--error');

  if (checked) {
    label.hidden = true;
    error.hidden = false;

    upload.style.display = 'revert';
  } else {
    label.hidden = false;
    error.hidden = true;

    upload.style.display = 'none';
  }
}

const handleDisable = (checked, labels) => {
  const [label, error, component] = labels;
  const input = component.querySelector('input[type=file]');

  if (checked) {
    component.classList.add('disabled')
    input.disabled = true;
  } else {
    component.classList.remove('disabled')
    input.disabled = false;
  }
}

const handleReadonly = (checked, labels) => {
  const [label, error, component] = labels;
  const input = component.querySelector('input[type=file]');

  if (checked) {
    component.classList.add('read-only')
    input.disabled = true;
  } else {
    component.classList.remove('read-only')
    input.disabled = false;
  }
}
*/

export default FileInput;