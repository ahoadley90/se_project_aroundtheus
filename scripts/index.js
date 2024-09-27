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

const profileEditButton = document.querySelector("#profile__edit-button");
const profileEditModal = document.querySelector("#profile__edit_modal");
const profileEditCloseButton = profileEditModal.querySelector(".modal__close");
const modalCloseButton = document.querySelector(".modal__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const nameInput = document.querySelector("[name = 'title']");
const descriptionInput = document.querySelector("[name = 'description']");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const cardTemplate =
  document.querySelector("#card__template").content.firstElementChild;
const cardListEl = document.querySelector(".cards__list");
const addNewCardButton = document.querySelector(".profile__add-button");
const cardFormModal = document.querySelector("#card__edit_modal");
const addCardForm = cardFormModal.querySelector("#add-card-form");
const cardTitleInput = cardFormModal.querySelector("#card_edit_input");
const cardUrlInput = cardFormModal.querySelector("#card_url");
const imageModal = document.querySelector("#image_modal");
const modalImage = imageModal.querySelector(".modal__image");
const cardFormCloseButton = cardFormModal.querySelector(".modal__close");
const imageModalCloseButton = document.querySelector(
  "#image_modal .modal__close"
);
const modalCaption = imageModal.querySelector(".modal__caption");

function closePopup() {
  document.querySelectorAll(".modal_opened").forEach((modal) => {
    modal.classList.remove("modal_opened");
  });
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  console.log(cardElement);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  cardTitleEl.textContent = cardData.name;
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });
  return cardElement;
}

function saveNewCard(e) {
  e.preventDefault();
  const cardTitle = cardTitleInput.value;
  const cardImageUrl = cardUrlInput.value;
  const newCardData = {
    name: cardTitle,
    link: cardImageUrl,
  };
  const newCardElement = getCardElement(newCardData);
  cardListEl.append(newCardElement);
  cardTitleInput.value = "";
  cardUrlInput.value = "";
  closePopup();
}

function openImageModal(imageSrc, imageAlt) {
  modalImage.src = imageSrc;
  modalImage.alt = imageAlt;
  modalCaption.textContent = imageAlt;
  imageModal.classList.add("modal_opened");
}

function enableImageModal() {
  const cardImages = document.querySelectorAll(".card__image");
  cardImages.forEach((image) => {
    image.addEventListener("click", (e) => {
      console.log("Image clicked", e.target);
      const imageSrc = e.target.src;
      const imageAlt = e.target.alt;
      openImageModal(imageSrc, imageAlt);
    });
  });
}

imageModalCloseButton.addEventListener("click", () => {
  closePopup();
});

profileEditButton.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
  profileEditModal.classList.add("modal_opened");
});

profileEditCloseButton.addEventListener("click", () => {
  closePopup();
});

profileEditForm.addEventListener("submit", (e) => {
  e.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closePopup();
});

addNewCardButton.addEventListener("click", () => {
  cardFormModal.classList.add("modal_opened");
});

cardFormModal.addEventListener("submit", (e) => {
  e.preventDefault();
  const newCardData = {
    name: cardTitleInput.value,
    link: cardUrlInput.value,
  };
  const cardElement = getCardElement(newCardData);
  cardListEl.append(cardElement);
  closePopup();
});

cardFormCloseButton.addEventListener("click", () => {
  closePopup();
});

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListEl.append(cardElement);
});

enableImageModal();
