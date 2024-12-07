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

function handleSubmit(request, popupInstance, loadingText = "Saving...") {
  if (popupInstance.renderLoading) {
    popupInstance.renderLoading(true, loadingText);
  }
  request()
    .then(() => {
      popupInstance.close();
    })
    .catch(console.error)
    .finally(() => {
      if (popupInstance.renderLoading) {
        popupInstance.renderLoading(false);
      }
    });
}

let cardList;
let currentUserId;

const formValidators = {};

const deleteCardPopup = new PopupWithConfirmation("#delete-card-modal");

// prettier-ignore
function handleDeleteCard(card) {
  deleteCardPopup.setAction(() => {
    function makeRequest() {
      return api.deleteCard(card.getId()).then(() => {
        card.removeCard();
      });
    }
    handleSubmit(makeRequest, deleteCardPopup, "Deleting...");
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
  function makeRequest() {
    return api.setUserInfo(formData).then((updatedUser) => {
      userInfo.setUserInfo(updatedUser);
    });
  }
  handleSubmit(makeRequest, editProfilePopup);
}
//prettier-ignore
function handleAvatarFormSubmit(formData) {
  function makeRequest() {
    return api.updateAvatar(formData.avatar).then((updatedUser) => {
      userInfo.setUserInfo(updatedUser);
    });
  }
  handleSubmit(makeRequest, editAvatarPopup);
}

// prettier-ignore
function handleAddCardFormSubmit(formData) {
  function makeRequest() {
    return api.addCard({ name: formData.title, link: formData.url }).then((newCard) => {
      const cardElement = createCard(newCard);
      cardList.addItem(cardElement);
    });
  }
  handleSubmit(makeRequest, addCardPopup);
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
// prettier-ignore
document.querySelector(".profile__edit-button").addEventListener("click", () => {
  const { name, about } = userInfo.getUserInfo();
  editProfilePopup.setInputValues({ name, about });
  if (formValidators["profile-form"]) {
    formValidators["profile-form"].resetValidation();
  }
  editProfilePopup.open();
});

document.querySelector(".profile__add-button").addEventListener("click", () => {
  if (formValidators["card-form"]) {
    formValidators["card-form"].resetValidation();
  }
  addCardPopup.open();
});

//prettier-ignore
document.querySelector(".profile__image").addEventListener("click", () => {
  if (formValidators["avatar-form"]) {
    formValidators["avatar-form"].resetValidation();
  }
  editAvatarPopup.open();
});

// prettier-ignore
document.querySelector(".profile__image-container")
  .addEventListener("click", () => {
    if (formValidators["avatar-form"]) {
      formValidators["avatar-form"].resetValidation();
    }
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

// Call this function to enable validation for all forms
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
