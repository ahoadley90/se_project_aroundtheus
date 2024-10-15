const validationConfig = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button_save",
  inactiveButtonClass: "modal__button_inactive",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const profileEditButton = document.querySelector("#profile__edit-button");
const profileEditModal = document.querySelector("#profile__edit_modal");
const profileEditCloseButton = profileEditModal.querySelector(".modal__close");
const modalCloseButton = document.querySelector(".modal__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const nameInput = document.querySelector("[name = 'title']");
const descriptionInput = document.querySelector("[name = 'description']");
const profileEditForm = document.forms["profile-form"];
const cardTemplate =
  document.querySelector("#card__template").content.firstElementChild;
const cardListEl = document.querySelector(".cards__list");
const addNewCardButton = document.querySelector(".profile__add-button");
const cardFormModal = document.querySelector("#card__edit_modal");
const addCardForm = document.forms["card-form"];
const cardTitleInput = cardFormModal.querySelector("#card_edit_input");
const cardUrlInput = cardFormModal.querySelector("#card_url");
const imageModal = document.querySelector("#image_modal");
const modalImage = imageModal.querySelector(".modal__image");
const cardFormCloseButton = cardFormModal.querySelector(".modal__close");
const imageModalCloseButton = document.querySelector(
  "#image_modal .modal__close"
);
const modalCaption = imageModal.querySelector(".modal__caption");

function closePopup(popup) {
  popup.classList.remove("modal_opened");
  document.removeEventListener("keydown", closePopupByEscape);
  popup.removeEventListener("mousedown", closePopupByOverlay);
}

function closePopupByOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
  }
}

function closePopupByEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".modal_opened");
    if (openedPopup) {
      closePopup(openedPopup);
    }
  }
}
function openPopup(popup) {
  popup.classList.add("modal_opened");
  document.addEventListener("keydown", closePopupByEscape);
  popup.addEventListener("mousedown", closePopupByOverlay);
}

function openProfileEditModal() {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;

  const inputList = Array.from(
    profileEditForm.querySelectorAll(".modal__input")
  );
  const buttonElement = profileEditForm.querySelector(".modal__button");

  inputList.forEach((inputElement) => {
    hideInputError(profileEditForm, inputElement, validationConfig);
  });

  toggleButtonState(inputList, buttonElement, validationConfig);

  openPopup(profileEditModal);
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  console.log(cardElement);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  cardTitleEl.textContent = cardData.name;
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });
  cardImageEl.addEventListener("click", () => {
    openImageModal(cardImageEl.src, cardImageEl.alt);
  });
  return cardElement;
}

const popups = document.querySelectorAll(".modal");
popups.forEach((popup) => {
  popup.addEventListener("mousedown", closePopupByOverlay);
  const closeButton = popup.querySelector(".modal__close");
  if (closeButton) {
    closeButton.addEventListener("click", () => closePopup(popup));
  }
});

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const nameInput = cardFormModal.querySelector(".modal__input_type_title");
  const linkInput = cardFormModal.querySelector(".modal__input_type_url");
  const name = nameInput.value;
  const link = linkInput.value;

  const newCard = getCardElement({ name, link });
  cardListEl.prepend(newCard);

  closePopup(cardFormModal);

  evt.target.reset();

  const inputList = Array.from(evt.target.querySelectorAll(".modal__input"));
  const buttonElement = evt.target.querySelector(".modal__button_save");
  toggleButtonState(inputList, buttonElement, validationConfig);
}

profileEditButton.addEventListener("click", openProfileEditModal);

profileEditForm.addEventListener("submit", (e) => {
  e.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopup(profileEditModal);
});

cardFormModal.addEventListener("submit", handleCardFormSubmit);
addNewCardButton.addEventListener("click", openCardFormModal);

function openCardFormModal() {
  openPopup(cardFormModal);
}
function resetCardForm() {
  const form = cardFormModal.querySelector(".modal__form");
  form.reset();
  const inputList = Array.from(form.querySelectorAll(".modal__input"));
  const buttonElement = form.querySelector(".modal__button_save");
  const config = {
    inputErrorClass: "modal__input_type_error",
    errorClass: "modal__error_visible",
    inactiveButtonClass: "modal__button_inactive",
  };
  inputList.forEach((inputElement) => {
    hideInputError(form, inputElement, config);
  });
  toggleButtonState(inputList, buttonElement, config);
}

function openImageModal(imageSrc, imageAlt) {
  const modalImage = imageModal.querySelector(".modal__image");
  const modalCaption = imageModal.querySelector(".modal__caption");

  modalImage.src = imageSrc;
  modalImage.alt = imageAlt;
  modalCaption.textContent = imageAlt;

  openPopup(imageModal);
}

function renderCard(item, method = "prepend") {
  const cardElement = getCardElement(item);
  cardListEl[method](cardElement);
}
initialCards.forEach((cardData) => {
  renderCard(cardData);
});

document.addEventListener("DOMContentLoaded", () => {
  enableValidation(validationConfig);
});
