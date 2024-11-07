import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";
import { validationConfig, initialCards } from "../utils/constants.js";

const formValidators = {};
const profileEditButton = document.querySelector("#profile__edit-button");
const addNewCardButton = document.querySelector(".profile__add-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const cardListSelector = ".cards__list";

const profileEditPopup = new PopupWithForm(
  "#profile__edit_modal",
  handleProfileFormSubmit
);
const addCardPopup = new PopupWithForm(
  "#card__edit_modal",
  handleCardFormSubmit
);
const imagePopup = new PopupWithImage("#image_modal");
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

function handleProfileFormSubmit(formData) {
  userInfo.setUserInfo({
    name: formData.title,
    job: formData.description,
  });
  profileEditPopup.close();
}

function handleCardFormSubmit(formData) {
  const newCard = createCard({ name: formData.title, link: formData.url });
  cardSection.addItem(newCard);
  addCardPopup.close();
  addCardPopup.resetForm();
}

function createCard(data) {
  const card = new Card(data, "#card__template", handleImageClick);
  return card.generateCard();
}

function handleImageClick(name, link) {
  imagePopup.open({ name, link });
}

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item);
      cardSection.addItem(cardElement);
    },
  },
  cardListSelector
);

function openProfileEditModal() {
  const currentUserInfo = userInfo.getUserInfo();
  profileEditPopup.setInputValues({
    title: currentUserInfo.name,
    description: currentUserInfo.job,
  });
  formValidators["profile-form"].resetValidation();
  profileEditPopup.open();
}

function openCardFormModal() {
  addCardPopup.open();
}

profileEditButton.addEventListener("click", openProfileEditModal);
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

cardSection.renderItems();
