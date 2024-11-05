import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";

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

const formValidators = {};
const profileEditButton = document.querySelector("#profile__edit-button");
const profileEditModal = document.querySelector("#profile__edit_modal");
const profileEditCloseButton = profileEditModal.querySelector(".modal__close");
const modalCloseButton = document.querySelector(".modal__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const nameInput = document.querySelector("[name = 'title']");
const descriptionInput = document.querySelector("[name = 'description']");
const profileEditForm = document.forms["profile-form"];
const addNewCardButton = document.querySelector(".profile__add-button");
const cardFormModal = document.querySelector("#card__edit_modal");
const addCardForm = document.forms["card-form"];
const cardTitleInput = cardFormModal.querySelector("#card_edit_input");
const cardUrlInput = cardFormModal.querySelector("#card_url");
const cardFormCloseButton = cardFormModal.querySelector(".modal__close");
const imageModalCloseButton = document.querySelector(
  "#image_modal .modal__close"
);
const profileEditPopup = new Popup("#profile__edit_modal");
const addCardPopup = new Popup("#card__edit_modal");
const imagePopup = new PopupWithImage("#image_modal");

function openProfileEditModal() {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
  formValidators["profile-form"].resetValidation();
  profileEditPopup.open();
}

function openCardFormModal() {
  formValidators["card-form"].disableButton();
  addCardPopup.open();
}

function openImageModal(link, name) {
  imagePopup.open({ name, link });
}

function handleImageClick(name, link) {
  openImageModal(link, name);
}

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, "#card__template", handleImageClick);
      const cardElement = card.generateCard();
      cardSection.addItem(cardElement);
    },
  },
  ".cards__list"
);

cardSection.renderItems();

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  const newCard = new Card({ name, link }, "#card__template", handleImageClick);
  const cardElement = newCard.generateCard();
  cardSection.addItem(cardElement);
  addCardPopup.close();
  addCardForm.reset();
  formValidators["card-form"].disableButton();
}

profileEditButton.addEventListener("click", openProfileEditModal);

profileEditForm.addEventListener("submit", (e) => {
  e.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  profileEditPopup.close();
});

cardFormModal.addEventListener("submit", handleCardFormSubmit);
addNewCardButton.addEventListener("click", openCardFormModal);

profileEditPopup.setEventListeners();
addCardPopup.setEventListeners();
imagePopup.setEventListeners();

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
