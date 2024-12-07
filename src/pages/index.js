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
  popupInstance.renderLoading(true, loadingText);
  request()
    .then(() => {
      popupInstance.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      popupInstance.renderLoading(false);
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
function handleProfileFormSubmit(formData) {
  function makeRequest() {
    return api.setUserInfo(formData).then((updatedUser) => {
      userInfo.setUserInfo(updatedUser);
    });
  }
  handleSubmit(makeRequest, editProfilePopup);
}
const editProfilePopup = new PopupWithForm(
  "#profile__edit_modal",
  handleProfileFormSubmit
);
const addCardPopup = new PopupWithForm(
  "#card__edit_modal",
  handleAddCardFormSubmit
);
const avatarForm = document.querySelector("#avatar-edit-modal .modal__form");
const avatarInput = avatarForm.querySelector("#avatar-input");
const avatarSaveButton = avatarForm.querySelector(".modal__button_save_avatar");

avatarInput.addEventListener("input", () => {
  if (formValidators["avatar-edit-form"]) {
    formValidators["avatar-edit-form"].checkButtonState();
  }
});

// prettier-ignore
document.querySelector(".profile__image-container")
  .addEventListener("click", () => {
    if (formValidators["avatar-edit-form"]) {
      formValidators["avatar-edit-form"].resetValidation();
    }
    avatarInput.value = ""; // Clear the input
    formValidators["avatar-edit-form"].checkButtonState(); // Update button state
    editAvatarPopup.open();
  });
const editAvatarPopup = new PopupWithForm(
  "#avatar-edit-modal",
  handleAvatarFormSubmit
);

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
  formValidators["profile-form"].resetValidation();
  formValidators["profile-form"].checkButtonState();
  editProfilePopup.open();
});

document.querySelector(".profile__add-button").addEventListener("click", () => {
  formValidators["card-form"].resetValidation();
  formValidators["card-form"].checkButtonState();
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
document.querySelector(".profile__image-container").addEventListener("click", () => {
  formValidators["avatar-edit-form"].resetValidation();
  formValidators["avatar-edit-form"].checkButtonState();
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
