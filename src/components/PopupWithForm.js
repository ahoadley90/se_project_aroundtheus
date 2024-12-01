import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".modal__form");
    this._inputs = this._form.querySelectorAll(".modal__input");
    this._submitButton = this._form.querySelector(".modal__button");
    this._submitButton.dataset.originalText = this._submitButton.textContent;
  }

  _getInputValues() {
    const inputList = this._form.querySelectorAll(".modal__input");
    const formValues = {};
    inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });
    console.log("Collected form values:", formValues);
    return formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._form.reset();
  }

  setInputValues(data) {
    this._inputs.forEach((input) => {
      input.value = data[input.name];
    });
  }

  renderLoading(isLoading, loadingText = "Saving...") {
    if (isLoading) {
      this._submitButton.textContent = loadingText;
      this._submitButton.disabled = true;
    } else {
      this._submitButton.textContent = this._submitButton.dataset.originalText;
      this._submitButton.disabled = false;
    }
  }
}
