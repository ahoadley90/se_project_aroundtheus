export default class Card {
  constructor({ data, handleCardClick, handleDeleteClick, handleLikeClick, userId }, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes || [];
    this._id = data._id;
    this._ownerId = data.owner ? data.owner._id : null;
    this._userId = userId;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content
      .querySelector(".card")
      .cloneNode(true);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    const cardImage = this._element.querySelector(".card__image");
    const cardTitle = this._element.querySelector(".card__title");

    if (cardImage) {
      cardImage.src = this._link;
      cardImage.alt = this._name;
    }
    if (cardTitle) {
      cardTitle.textContent = this._name;
    }

    this._renderLikes();

    const deleteButton = this._element.querySelector(".card__delete-button");
    if (deleteButton && this._ownerId !== this._userId) {
      deleteButton.style.display = "none";
    }

    return this._element;
  }

  _setEventListeners() {
    const cardImage = this._element.querySelector(".card__image");
    const deleteButton = this._element.querySelector(".card__delete-button");
    const likeButton = this._element.querySelector(".card__like-button");

    if (cardImage) {
      cardImage.addEventListener("click", () => {
        this._handleCardClick(this._name, this._link);
      });
    }

    if (deleteButton) {
      deleteButton.addEventListener("click", () => {
        this._handleDeleteClick(this._id);
      });
    }

    if (likeButton) {
      likeButton.addEventListener("click", () => {
        this._handleLikeClick(this._id, this.isLiked());
      });
    }
  }

  _renderLikes() {
    const likeCountElement = this._element.querySelector(".card__like-count");
    const likeButton = this._element.querySelector(".card__like-button");

    if (likeCountElement) {
      likeCountElement.textContent = this._likes.length;
    }

    if (likeButton) {
      if (this.isLiked()) {
        likeButton.classList.add("card__like-button_active");
      } else {
        likeButton.classList.remove("card__like-button_active");
      }
    }
  }

  isLiked() {
    return this._likes.some((like) => like._id === this._userId);
  }

  updateLikes(newLikes) {
    this._likes = newLikes;
    this._renderLikes();
  }

  removeCard() {
    if (this._element) {
      this._element.remove();
      this._element = null;
    }
  }
}
