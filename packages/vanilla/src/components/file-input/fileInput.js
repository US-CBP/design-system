const fileUtil = {
  createUpload: (key, name, progressValue, progressMax, files) => {
    const fileProgress = document.createElement('div');
    const fileName = document.createElement('span');
    const cancelIcon = document.createElement('i');
    const cancelBtn = document.createElement('button');
    const progressBar = document.createElement('progress');

    fileProgress.className = 'cbp-file-input__file';
    fileProgress.id = `${key}_${name}`;

    fileName.innerText = name;
    cancelIcon.className = 'fa fa-times';
    cancelBtn.setAttribute('type','button');
    cancelBtn.setAttribute('aria-label','Remove File');
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
    const errorUpload = document.createElement('div');
    const fileContainer = document.createElement('div');
    const errorFile = document.createElement('span');
    const cancelBtn = document.createElement('button');
    const divider = document.createElement('hr');
    const errorMessage = document.createElement('span');
    const errorIcon = document.createElement('i');
    const cancelIcon = document.createElement('i');

    errorUpload.id = `${key}_${name}`;
    errorFile.innerText = name;
    cancelIcon.className = 'fa fa-times';
    cancelBtn.appendChild = cancelIcon;

    errorIcon.className = 'fas fa-exclamation-triangle';
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
    const filteredFiles = filteredList.map((arr) => arr[1]);

    filteredFiles.forEach((file) => list.items.add(file));

    const upload = event.target.closest('.cbp-file-input__file');
    upload.remove();
  },
};


class FileInput {
  constructor(element) {
    this.fileinput = element;
    this.input = element.querySelector('input[type=file]');

    // Create a container for selected files when initialized
    const filesContainer = document.createElement('div');
    filesContainer.className = 'cbp-file-input__selected-files';
    this.fileinput.appendChild(filesContainer);
    this.filesContainer=filesContainer;

    this.handleInput(this.input, this.reader);
  }

  handleInput(input, reader) {
    input.addEventListener('change', (e) => {
      // Clear the selected files because selecting new files will overwrite the previous selection and values
      this.filesContainer.innerHTML='';
      this.handleReader(e.target.files);
    });
  }

  handleReader(files) {
    for (const [key, value] of Object.entries(files)) {
      const reader = new FileReader();

      reader.addEventListener('loadstart', (e) =>
        this.handleEvent(e, key, value, files)
      );
      reader.addEventListener('load', (e) =>
        this.handleEvent(e, key, value, files)
      );
      reader.addEventListener('loadend', (e) =>
        this.handleEvent(e, key, value, files)
      );
      reader.addEventListener('progress', (e) =>
        this.handleEvent(e, key, value, files)
      );
      reader.addEventListener('error', (e) =>
        this.handleEvent(e, key, value, files)
      );
      reader.addEventListener('abort', this.handleEvent);

      reader.readAsDataURL(value);
    }
  }

  handleEvent(event, key, value, files) {
    if (event.type === 'loadstart') {
      const upload = fileUtil.createUpload(
        key,
        value.name,
        event.loaded,
        event.total,
        files
      );
      this.filesContainer.appendChild(upload);
    }

    if (event.type === 'progress') {
      // update progress bar value
      const upload = document.getElementById(`${key}_${value.name}`);
      const progress = upload.querySelector('progress');
      progress.setAttribute('value', event.loaded);
    }

    if (event.type === 'loadend') {
      const upload = document.getElementById(`${key}_${value.name}`);
      const progress = upload.querySelector('progress');

      // Hide progress bar once file has finished reading
      progress.hidden = true;
    }

    if (event.type === 'error') {
      const upload = fileUtil.createErrorLoad(key, value.name);
      this.filesContainer.appendChild(upload);
    }
  }
}

export default FileInput;
