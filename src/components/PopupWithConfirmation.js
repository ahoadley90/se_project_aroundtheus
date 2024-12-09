import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector(".modal__form");
    this._submitButton = this._form.querySelector(".modal__button");
  }

  setAction(action) {
    this._handleSubmit = action;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      if (typeof this._handleSubmit === "function") {
        this._handleSubmit();
      } else {
        console.error("No submit action set for PopupWithConfirmation");
      }
    });
  }
  renderLoading(isLoading, loadingText = "Deleting...") {
    if (isLoading) {
      this._submitButton.textContent = loadingText;
    } else {
      this._submitButton.textContent = "Yes";
    }
  }
}
