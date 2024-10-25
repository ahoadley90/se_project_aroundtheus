import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

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

const editFormValidator = new FormValidator(
  validationConfig,
  document.forms["profile-form"]
);
const addCardFormValidator = new FormValidator(
  validationConfig,
  document.forms["card-form"]
);
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
  formValidators["profile-form"].resetValidation();
  openPopup(profileEditModal);
}

function handleImageClick(name, link) {
  openImageModal(link, name);
}

function renderCard(cardData) {
  const cardElement = createCard(cardData);
  cardListEl.prepend(cardElement);
}

function renderInitialCards() {
  initialCards.forEach((cardData) => {
    renderCard(cardData);
  });
}

function createCard(data) {
  const card = new Card(data, "#card__template", handleImageClick);
  return card.generateCard();
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
  const cardTitle = cardTitleInput.value;
  const cardUrl = cardUrlInput.value;

  const cardData = {
    name: cardTitle,
    link: cardUrl,
  };
  renderCard(cardData, cardListEl);
  closePopup(cardFormModal);
  evt.target.reset();
  formValidators["card-form"].resetValidation();
  formValidators["card-form"].disableButton();
}

profileEditButton.addEventListener("click", openProfileEditModal);

profileEditForm.addEventListener("submit", (e) => {
  e.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopup(profileEditModal);
  formValidators["profile-form"].resetValidation();
});

cardFormModal.addEventListener("submit", handleCardFormSubmit);
addNewCardButton.addEventListener("click", openCardFormModal);

function openCardFormModal() {
  formValidators["card-form"].resetValidation();
  openPopup(cardFormModal);
}

function openImageModal(imageSrc, imageAlt) {
  modalImage.src = imageSrc;
  modalImage.alt = imageAlt;
  modalCaption.textContent = imageAlt;

  openPopup(imageModal);
}

renderInitialCards();

const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute("name");
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(validationConfig);
