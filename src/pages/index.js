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
  return request()
    .then((result) => {
      popupInstance.close();
      if (popupInstance.resetForm) {
        popupInstance.resetForm();
      }
      return result;
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
const profileEditPopup = new PopupWithForm(
  "#profile__edit_modal",
  handleProfileFormSubmit
);

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
      profileEditPopup.resetForm(); // Reset form after successful submission
    });
  }
  handleSubmit(makeRequest, profileEditPopup);
}

// prettier-ignore
const editProfilePopup = new PopupWithForm(
  "#profile__edit_modal",
  (formData) => {
    function makeRequest() {
      return api.setUserInfo(formData).then((updatedUser) => {
        userInfo.setUserInfo(updatedUser);
      });
    }
    handleSubmit(makeRequest, editProfilePopup);
  }
);
//prettier-ignore
const addCardPopup = new PopupWithForm("#card__edit_modal", (formData) => {
  function makeRequest() {
    return api.addCard({
        name: formData.title,
        link: formData.url,
      })
      .then((cardData) => {
        const card = createCard(cardData);
        cardList.addItem(card);
        return cardData;
      });
  }
  handleSubmit(makeRequest, addCardPopup, "Creating...");
});
const editAvatarPopup = new PopupWithForm("#avatar-edit-modal", (formData) => {
  function makeRequest() {
    return api.updateAvatar(formData.avatar).then((updatedUser) => {
      userInfo.setUserInfo(updatedUser);
      return updatedUser;
    });
  }
  handleSubmit(makeRequest, editAvatarPopup, "Saving...");
});

// prettier-ignore

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

//prettier-ignore
const profileEditButton = document.querySelector(".profile__edit-button");
profileEditButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  profileEditPopup.setInputValues(userData);
  formValidators["profile-form"].resetValidation();
  profileEditPopup.open();
});

//prettier-ignore
const addCardButton = document.querySelector(".profile__add-button");
addCardButton.addEventListener("click", () => {
  formValidators["card-form"].resetValidation();
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
