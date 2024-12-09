import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector(".modal__form");
    this._inputs = this._form.querySelectorAll(".modal__input");
    this._submitButton = this._form.querySelector(".modal__button");
  }

  _getInputValues() {
    const formValues = {};
    this._inputs.forEach((input) => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  setInputValues(data) {
    console.log("Setting input values:", data);
    this._inputs.forEach((input) => {
      if (data[input.name]) {
        input.value = data[input.name];
      }
    });
    console.log("Input values after setting:", this._getInputValues());
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const inputValues = this._getInputValues();
      this._handleFormSubmit(inputValues);
    });
  }

  close() {
    console.log("Closing popup...");
    console.log("Form values before closing:", this._getInputValues());
    super.close();
    console.log("Form values after closing:", this._getInputValues());
  }

  resetForm() {
    console.log("Resetting form...");
    this._form.reset();
    this._inputs.forEach((input) => {
      console.log(`Resetting input ${input.name}. Old value: "${input.value}"`);
      input.value = "";
      console.log(`New value: "${input.value}"`);
    });
    console.log("Form reset. Current values:", this._getInputValues());
  }

  renderLoading(isLoading, loadingText = "Saving...") {
    if (isLoading) {
      this._submitButton.textContent = loadingText;
    } else {
      this._submitButton.textContent =
        this._submitButton.dataset.text || "Save";
    }
  }
}
