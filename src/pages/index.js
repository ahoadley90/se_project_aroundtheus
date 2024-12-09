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
      console.log("Request successful");
      return result;
    })
    .catch((err) => {
      console.error(err);
      throw err;
    })
    .finally(() => {
      popupInstance.renderLoading(false);
      if (typeof popupInstance.resetForm === "function") {
        popupInstance.resetForm(); // Reset the form
      }
      popupInstance.close(); // Close the popup
      if (typeof popupInstance._getInputValues === "function") {
        console.log(99
          "Form values after closing:",
          popupInstance._getInputValues()
        );
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
function handleProfileFormSubmit(formData) {
  function makeRequest() {
    return api.setUserInfo(formData).then((updatedUser) => {
      userInfo.setUserInfo(updatedUser);
    });
  }
  handleSubmit(makeRequest, editProfilePopup);
}
const addCardPopup = new PopupWithForm("#card__edit_modal", (formData) => {
  function makeRequest() {
    console.log("Sending card data:", {
      name: formData.title,
      link: formData.url,
    });
    return api.addCard({
      name: formData.title,
      link: formData.url,
    });
  }
  handleSubmit(makeRequest, addCardPopup, "Creating...")
    .then((cardData) => {
      console.log("Received card data:", cardData);
      const card = createCard(cardData);
      cardList.addItem(card);
    })
    .catch((err) => {
      console.error("Error adding card:", err);
      console.error("Error details:", err.message);
    });
});

const editProfilePopup = new PopupWithForm(
  "#profile__edit_modal",
  (formData) => {
    function makeRequest() {
      return api.setUserInfo(formData);
    }
    handleSubmit(makeRequest, editProfilePopup)
      .then((updatedUser) => {
        if (updatedUser) {
          userInfo.setUserInfo(updatedUser);
        }
      })
      .catch((err) => console.error("Error updating profile:", err));
  }
);

const editAvatarPopup = new PopupWithForm("#avatar-edit-modal", (formData) => {
  function makeRequest() {
    return api.setUserAvatar(formData.avatar);
  }
  handleSubmit(makeRequest, editAvatarPopup, "Saving...")
    .then((updatedUser) => {
      userInfo.setUserInfo(updatedUser);
    })
    .catch((err) => console.error("Error updating avatar:", err));
});

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
