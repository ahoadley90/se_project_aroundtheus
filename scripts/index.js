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
const profileEditModal = document.querySelector("#profile__edit-modal");
const modalCloseButton = document.querySelector(".modal__close");
profileEditButton.addEventListener("click", () => {
  if (profileEditModal.classList.contains("modal__opened")) {
    profileEditModal.classList.remove("modal__opened");
  } else {
    profileEditModal.classList.add("modal__opened");
  }
});

profileEditButton.addEventListener("click", () => {
  profileEditModal.style.display = "flex";
  console.log("Modal opened");
});
modalCloseButton.addEventListener("click", () => {
  profileEditModal.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target === profileEditModal) {
    profileEditModal.style.display = "none";
    console.log("Modal closed by clicking outside");
  }
});
