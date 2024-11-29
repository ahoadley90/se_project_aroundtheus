export default class Card {
  constructor(
    { data, handleCardClick, handleDeleteClick, handleLikeClick, userId },
    templateSelector
  ) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes || [];
    this._id = data._id;
    this._ownerId = data.owner ? data.owner._id : null;
    this._userId = userId;
    this._isLiked = data.likes
      ? data.likes.some((like) => like._id === userId)
      : false;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.dataset.cardId = this._id;
    this._cardImage = this._element.querySelector(".card__image");
    this._cardTitle = this._element.querySelector(".card__title");
    this._likeButton = this._element.querySelector(".card__like-button");
    this._likeCount = this._element.querySelector(".card__like-count");
    this._deleteButton = this._element.querySelector(".card__delete-button");

    this._setEventListeners();

    if (this._cardImage) {
      this._cardImage.src = this._link;
      this._cardImage.alt = this._name;
    }

    if (this._cardTitle) {
      this._cardTitle.textContent = this._name;
    }
    this._renderLikes();

    if (this._ownerId !== this._userId && this._deleteButton) {
      this._deleteButton.remove();
    }

    return this._element;
  }

  _setEventListeners() {
    if (this._cardImage) {
      this._cardImage.addEventListener("click", () => {
        this._handleCardClick(this._name, this._link);
      });
    }

    if (this._deleteButton) {
      this._deleteButton.addEventListener("click", () => {
        this._handleDeleteClick(this._id);
      });
    }

    if (this._likeButton) {
      this._likeButton.addEventListener("click", () => {
        this._handleLikeClick(this._id, !this.isLiked());
      });
    }
  }
  updateLikes(updatedCard) {
    console.log("Updating likes:", updatedCard);
    if (updatedCard) {
      this._likes = updatedCard.likes || [];
      this._isLiked = updatedCard.likes
        ? updatedCard.likes.some((like) => like._id === this._userId)
        : false;
      this._renderLikes();
    } else {
      console.error("Invalid card data:", updatedCard);
    }
  }

  _renderLikes() {
    console.log(
      "Rendering likes:",
      this._likes.length,
      "Is liked:",
      this._isLiked
    );
    if (this._likeCount) {
      this._likeCount.textContent = this._likes.length;
    }

    if (this._likeButton) {
      if (this._isLiked) {
        console.log("Card is liked");
        this._likeButton.classList.add("card__like-button_active");
      } else {
        console.log("Card is not liked");
        this._likeButton.classList.remove("card__like-button_active");
      }
    }
  }

  isLiked() {
    return this._isLiked;
  }
}
