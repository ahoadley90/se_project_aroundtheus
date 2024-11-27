import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import { validationConfig } from "../utils/constants.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

const deleteCardPopup = new PopupWithConfirmation(
  "#delete-card-modal",
  handleDeleteCard
);

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "5db111ac-010a-455f-8b65-a9484d0efcee",
    "Content-Type": "application/json",
  },
});

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
  avatarSelector: ".profile__image",
});

const cardTemplateSelector = "#card__template";
const imagePopup = new PopupWithImage("#image_modal");
const editProfilePopup = new PopupWithForm(
  "#profile__edit_modal",
  handleProfileFormSubmit
);
const addCardPopup = new PopupWithForm(
  "#card__edit_modal",
  handleAddCardFormSubmit
);
const editAvatarPopup = new PopupWithForm(
  "#avatar-edit-modal",
  handleAvatarFormSubmit
);

let cardList;

// prettier-ignore
function createCard(cardData) {
  const card = new Card(
    {
      data: cardData,
      handleCardClick: (name, link) => {
        imagePopup.open(name, link);
      },
      handleDeleteClick: (cardId) => {
        deleteCardPopup.open(cardId);
      },
      handleLikeClick: (cardId, isLiked) => {
        const likeMethod = isLiked
          ? api.removeLike.bind(api)
          : api.addLike.bind(api);
        likeMethod(cardId)
          .then((updatedCard) => {
            card.updateLikes(updatedCard.likes);
          })
          .catch((err) => console.error(err));
      },
      userId: userInfo.getUserId(),
    },
    cardTemplateSelector
  );

  return card.generateCard();
}

// prettier-ignore
function handleDeleteCard() {
  const cardId = deleteCardPopup._cardId;
  api.deleteCard(cardId)
    .then(() => {
      const cardElement = document.querySelector(`[data-card-id="${cardId}"]`);
      cardElement.remove();
      deleteCardPopup.close();
    })
    .catch((err) => console.error(err));
}
// prettier-ignore
function handleProfileFormSubmit(formData) {
  editProfilePopup.renderLoading(true);
  api.setUserInfo({ name: formData.name, about: formData.about })
    .then((updatedUser) => {
      userInfo.setUserInfo(updatedUser);
      editProfilePopup.close();
    })
    .catch((err) => console.error(err))
    .finally(() => editProfilePopup.renderLoading(false));
}
// prettier-ignore
function handleAddCardFormSubmit(formData) {
  addCardPopup.renderLoading(true);
  api.addCard({ name: formData.title, link: formData.url })
    .then((newCard) => {
      const cardElement = createCard(newCard);
      cardList.addItem(cardElement);
      addCardPopup.close();
    })
    .catch((err) => console.error(err))
    .finally(() => addCardPopup.renderLoading(false));
}
// prettier-ignore
function handleAvatarFormSubmit(formData) {
  editAvatarPopup.renderLoading(true);
  api.updateAvatar(formData.avatar)
    .then((updatedUser) => {
      userInfo.setUserInfo(updatedUser);
      editAvatarPopup.close();
    })
    .catch((err) => console.error(err))
    .finally(() => editAvatarPopup.renderLoading(false));
}
// Initialize all data
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, initialCards]) => {
    userInfo.setUserInfo(userData);
    cardList = new Section(
      {
        items: initialCards,
        renderer: (item) => {
          const cardElement = createCard(item);
          cardList.addItem(cardElement);
        },
      },
      ".cards__list"
    );
    cardList.renderItems();
  })
  .catch((err) => console.error(err));

// prettier-ignore
document.querySelector(".profile__edit-button").addEventListener("click", () => {
  const { name, about } = userInfo.getUserInfo();
  editProfilePopup.setInputValues({ name, about });
  editProfilePopup.open();
});

document.querySelector(".profile__add-button").addEventListener("click", () => {
  addCardPopup.open();
});

document.querySelector(".profile__image").addEventListener("click", () => {
  editAvatarPopup.open();
});
document
  .querySelector(".profile__image-container")
  .addEventListener("click", () => {
    editAvatarPopup.open();
  });
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

// Set up popups
imagePopup.setEventListeners();
editProfilePopup.setEventListeners();
addCardPopup.setEventListeners();
editAvatarPopup.setEventListeners();
deleteCardPopup.setEventListeners();
