import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleConfirm) {
    super(popupSelector);
    this._handleConfirm = handleConfirm;
    this._form = this._popup.querySelector(".modal__form");
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleConfirm(this._cardId);
    });
  }

  open(cardId) {
    this._cardId = cardId;
    super.open();
  }
}
