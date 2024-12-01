import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._form = this._popup.querySelector(".modal__form");
    this._submitButton = this._form.querySelector(".modal__button");
  }

  open(card) {
    this._card = card;
    super.open();
  }
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmit(this._card);
    });
  }
}
