import Api from "../components/Api.js";
import UserInfo from "../components/UserInfo.js";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "../pages/index.css";
import { validationConfig, initialCards } from "../utils/constants.js";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "f0941fd9-c5f6-43bc-8de5-e0d1323157dc",
    "Content-Type": "application/json",
  },
});
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
  api
    .updateProfile(formData.title, formData.description)
    .then((updatedUser) => {
      userInfo.setUserInfo({
        name: updatedUser.name,
        job: updatedUser.about,
      });
      profileEditPopup.close();
    })
    .catch((err) => console.error("Error updating profile:", err));
}

function handleCardFormSubmit(formData) {
  api
    .addCard(formData.title, formData.url)
    .then((newCardData) => {
      const newCard = createCard(newCardData);
      cardSection.addItem(newCard);
      addCardPopup.close();
      formValidators["card-form"].disableButton();
    })
    .catch((err) => console.error("Error adding new card:", err));
}

function createCard(data) {
  const card = new Card(
    {
      id: data._id,
      name: data.name,
      link: data.link,
      likes: data.likes,
      owner: data.owner,
    },
    "#card__template",
    handleImageClick,
    handleDeleteCard,
    handleLikeCard
  );
  return card.generateCard();
}

function handleImageClick(name, link) {
  imagePopup.open({ name, link });
}

function handleDeleteCard(cardId) {
  api
    .deleteCard(cardId)
    .then(() => {})
    .catch((err) => console.error("Error deleting card:", err));
}

function handleLikeCard(cardId, isLiked) {
  const likeMethod = isLiked ? api.unlikeCard : api.likeCard;
  likeMethod(cardId)
    .then((updatedCard) => {})
    .catch((err) => console.error("Error updating like status:", err));
}
let cardSection;

api
  .getAppInfo()
  .then(([userData, initialCards]) => {
    userInfo.setUserInfo({
      name: userData.name,
      job: userData.about,
      avatar: userData.avatar,
    });

    cardSection = new Section(
      {
        items: initialCards,
        renderer: (item) => {
          const cardElement = createCard(item);
          cardSection.addItem(cardElement);
        },
      },
      cardListSelector
    );
    cardSection.renderItems();
  })
  .catch((err) => console.error("Error initializing app:", err));
