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

let cardList;
let currentUserId;

const formValidators = {};

const deleteCardPopup = new PopupWithConfirmation("#delete-card-modal");

// prettier-ignore
function handleDeleteCard(card) {
  deleteCardPopup.setAction(() => {
    api.deleteCard(card.getId())
      .then(() => {
        card.removeCard();
        deleteCardPopup.close();
      })
      .catch((err) => console.error("Error deleting card:", err));
  });
  deleteCardPopup.open();
}
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

//prettier-ignore
function handleProfileFormSubmit(formData) {
  console.log("Profile form data:", formData);
  console.log("Name:", formData.name);
  console.log("About:", formData.about);
  editProfilePopup.renderLoading(true);
  api.setUserInfo(formData)
    .then((updatedUser) => {
      console.log("Updated user data:", updatedUser);
      userInfo.setUserInfo(updatedUser);
      editProfilePopup.close();
    })
    .catch((err) => {
      console.error("Error updating profile:", err);
    })
    .finally(() => editProfilePopup.renderLoading(false));
}
//prettier-ignore
function handleAvatarFormSubmit(formData) {
  editAvatarPopup.renderLoading(true);
  api.updateAvatar(formData.avatar)
    .then((updatedUser) => {
      userInfo.setUserInfo(updatedUser);
      editAvatarPopup.close();
    })
    .catch((err) => {
      console.error("Error updating avatar:", err);
    })
    .finally(() => {
      editAvatarPopup.renderLoading(false);
    });
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
    .catch((err) => {
      console.error("Error adding card:", err);
    })
    .finally(() => addCardPopup.renderLoading(false));
}
// Initialize all data
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, initialCards]) => {
    userInfo.setUserInfo(userData);
    currentUserId = userData._id;
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
  if (formValidators["add-card-form"]) {
    formValidators["add-card-form"].resetValidation();
  }
  addCardPopup.open();
});
//prettier-ignore
document.querySelector(".profile__image").addEventListener("click", () => {
  editAvatarPopup.open();
});

//prettier-ignore
document.querySelector(".profile__image-container").addEventListener("click", () => {
    editAvatarPopup.open();
  });

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

// prettier-ignore
function createCard(cardData) {
  const card = new Card({
    data: {
      ...cardData,
      ownerId: cardData.owner ? cardData.owner._id : cardData.ownerId,
    },
    handleCardClick: (name, link) => {
      imagePopup.open(name, link);
    },
    handleDeleteClick: (card) => {
      handleDeleteCard(card);
    },
    handleLikeClick: (card) => {
      const isLiked = card.isLiked();
      const likePromise = isLiked ? api.unlikeCard(card.getId()) : api.likeCard(card.getId());

      likePromise
        .then((updatedCard) => {
          card.updateLikes(updatedCard);
        })
        .catch((err) => console.error("Error updating like:", err));
    },
    userId: currentUserId,
  }, cardTemplateSelector);

  return card.generateCard();
}
