'use strict';

/** @typedef {Object} FileList
 * Загруженные через input[type="file"] данные
 */

(function () {
  var offerForm = document.querySelector('.notice__form');

  var avatarInputElem = offerForm.querySelector('#avatar');
  var avatarDropElem = offerForm.querySelector('#avatar + .drop-zone');
  var avatarPreviewElem = offerForm.querySelector('.notice__preview img');

  var photoInputElem = offerForm.querySelector('#images');
  var photoDropElem = offerForm.querySelector('#images + .drop-zone');
  var photoPreviewElem = offerForm.querySelector('.form__photo-container');


  var initialAvatarImgSrc = 'img/muffin.png';
  var isImageRegExp = /image.*/;


  var checkUploadMethod = function (event, callback) {
    var files = event.dataTransfer ? event.dataTransfer.files : event.target.files;

    callback(files);
  };


  var createPhotoPreviewElem = function (src) {
    var image = document.createElement('img');
    image.classList.add('photo-preview');
    image.src = src.target.result;

    photoPreviewElem.appendChild(image);
  };

  /**
   * Принимает файл/файлы, проверяет, изображения ли это, если да - отрисовывает первых из них в качестве превью аватара
   * @param {FileList} file
   */
  var renderAvatar = function (file) {
    if (!file[0].type.match(isImageRegExp)) {
      return;
    }

    var reader = new FileReader();

    reader.addEventListener('load', function () {
      avatarPreviewElem.src = reader.result;
    });

    reader.readAsDataURL(file[0]);
  };

  /**
   * Принимает файл/файлы, проверяет, изображения ли это, если да - отрисовывает каждый из них в качестве превью фото
   * @param {FileList} files
   */
  var renderPhotos = function (files) {
    for (var i = 0; i < files.length; i += 1) {
      if (!files[i].type.match(isImageRegExp)) {
        return;
      }

      var reader = new FileReader();

      reader.addEventListener('load', createPhotoPreviewElem);
      reader.readAsDataURL(files[i]);
    }
  };

  var resetPhotos = function () {
    avatarPreviewElem.src = initialAvatarImgSrc;

    var photoPreviewImgElems = photoPreviewElem.querySelectorAll('img');
    photoPreviewImgElems.forEach(function (imgElem) {
      imgElem.parentNode.removeChild(imgElem);
    });
  };


  /**
   * Раздает слушатели для инпута, области таскания и документа. У документа отрубает натаскивание
   * @param {Node} dropZoneElem
   * @param {HTMLInputElement} inputElem
   * @param {Function} renderFunction - Функция-коллбек, обрабатывающая событие загрузки/натаскивания
   */
  var setImgUploadListeners = function (dropZoneElem, inputElem, renderFunction) {
    inputElem.addEventListener('change', function (event) {
      checkUploadMethod(event, renderFunction);
    });

    document.addEventListener('dragover', function (event) {
      event.stopPropagation();
      event.preventDefault();
    });

    dropZoneElem.addEventListener('dragenter', function (event) {
      event.stopPropagation();
      event.preventDefault();
      event.target.classList.add('drop-zone--dragenter');
    });

    dropZoneElem.addEventListener('dragleave', function (event) {
      event.stopPropagation();
      event.preventDefault();
      event.target.classList.remove('drop-zone--dragenter');
    });

    dropZoneElem.addEventListener('drop', function (event) {
      event.stopPropagation();
      event.preventDefault();
      event.target.classList.remove('drop-zone--dragenter');
      checkUploadMethod(event, renderFunction);
    });
  };


  setImgUploadListeners(avatarDropElem, avatarInputElem, renderAvatar);
  setImgUploadListeners(photoDropElem, photoInputElem, renderPhotos);


  window.photos = {
    reset: resetPhotos
  };
})();
