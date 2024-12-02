export default class Card {
  constructor(
    { data, handleCardClick, handleDeleteClick, handleLikeClick, userId },
    cardSelector
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._likes = data.likes || [];
    this._ownerId = data.owner._id;
    this._userId = userId;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;

    this._isLiked = this._likes.some((user) => user._id === this._userId);
  }

  getId() {
    return this._id;
  }

  isLiked() {
    return this._isLiked;
  }

  updateLikes(updatedCard) {
    this._likes = updatedCard.likes;
    this._isLiked = this._likes.some((user) => user._id === this._userId);
    this._renderLikes();
  }

  _renderLikes() {
    if (this._likeCounter) {
      this._likeCounter.textContent = this._likes.length;
    }
    if (this._likeButton) {
      if (this._isLiked) {
        this._likeButton.classList.add("card__like-button_active");
      } else {
        this._likeButton.classList.remove("card__like-button_active");
      }
    }
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick(this);
    });

    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteClick(this);
    });

    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  removeCard() {
    this._element.remove();
    this._element = null;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".card__image");
    this._likeButton = this._element.querySelector(".card__like-button");
    this._deleteButton = this._element.querySelector(".card__delete-button");
    this._likeCounter = this._element.querySelector(".card__like-count");

    this._setEventListeners();
    this._renderLikes();

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector(".card__title").textContent = this._name;

    return this._element;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }
}
