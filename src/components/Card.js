export default class Card {
  constructor(
    { data, handleCardClick, handleDeleteClick, handleLikeClick, userId },
    cardSelector
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._likes = data.likes || [];
    this._userId = userId;
    this._ownerId = data.owner ? data.owner._id : null;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._cardSelector = cardSelector;
    this._isLiked = this._likes.some((user) => user._id === this._userId);
  }

  // prettier-ignore
  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".card__image");
    this._likeButton = this._element.querySelector(".card__like-button");
    this._deleteButton = this._element.querySelector(".card__delete-button");
    this._likeCounter = this._element.querySelector(".card__like-count");

    this._setEventListeners();
    this._renderLikes();

    // Set card image and name
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._element.querySelector(".card__title").textContent = this._name;

    // Show/hide delete button based on ownership
  if (this._ownerId !== this._userId) {
    console.log("Hiding delete button");
    this._deleteButton.style.display = "none";
  } else {
    console.log("Showing delete button");
  }

    return this._element;
  }

  _setEventListeners() {
    // Image click listener
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });

    // Delete button listener
    if (this._deleteButton) {
      this._deleteButton.addEventListener("click", () => {
        this._handleDeleteClick(this._id);
      });
    }

    // Like button listener
    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick(this._id, !this._isLiked);
    });
  }
  updateLikes(updatedCard) {
    console.log("Updating likes:", updatedCard);
    if (updatedCard) {
      this._likes = updatedCard.likes || [];
      this._isLiked = this._likes.some((user) => user._id === this._userId);
      this._renderLikes();
    } else {
      console.error("Invalid card data:", updatedCard);
    }
  }

  _renderLikes() {
    const likeCountElement = this._element.querySelector(".card__like-count");
    const likeButton = this._element.querySelector(".card__like-button");

    if (likeCountElement) {
      likeCountElement.textContent = this._likes.length;
    }

    if (this._isLiked) {
      likeButton.classList.add("card__like-button_active");
    } else {
      likeButton.classList.remove("card__like-button_active");
    }
  }

  isLiked() {
    return this._isLiked;
  }
  removeCard() {
    this._element.remove();
    this._element = null;
  }
}
  return card.generateCard();
}
removeCard() {
  this._element.remove();
  this._element = null;
}
