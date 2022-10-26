export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

// КОНФИГ ФОРМЫ
export const validationConfig = {
  formSelector: ".form",
  inputSelector: ".form__text",
  submitButtonSelector: ".form__submit-btn",
  inactiveButtonClass: "form__submit-btn_type_disabled",
  inputErrorClass: "form__input-error",
  errorClass: "form__text_type_error",
};


// НАСТРОЙКИ API
export const apiConfig = {
  token: "d99936ac-0e6d-482a-94c1-06e6187f6afe",
  cohort: "/cohort-48",
  serverUrl: "https://mesto.nomoreparties.co/v1",
}


// ПЕРЕМЕННЫЕ
// ------------------------

export const cardsContainer = document.querySelector(".elements");
export const templateCardDefaultSelector = ".card-template_type_default";
//ПОПАПЫ

export const popupTypeProfileSelector = ".popup_type_profile";
export const popupTypePlaceSelector = ".popup_type_place";
export const popupTypeImageSelector = ".popup_type_image";

// ДЛЯ ОТКРЫТИЯ ПОПАПОВ
export const popupProfileOpenButton = document.querySelector(
  ".profile__edit-button"
);
export const popupAddPlaceButton = document.querySelector(
  ".profile__add-button"
);

// ДАННЫЕ ПРОФИЛЯ, КОТОРЫЕ ВВОДИТ ПОЛЬЗОВАТЕЛЬ
export const nameInput = document.querySelector(".form__text_type_name");
export const professionInput = document.querySelector(
  ".form__text_type_profession"
);

// ДАННЫЕ ПРОФИЛЯ
export const profileNameSelector = ".profile__name";
export const profileAboutSelector = ".profile__subtitle";
export const inputProfileNameSelector = "name";
export const inputProfileAboutSelector = "profession";

// ФОРМЫ
export const profileForm = document.querySelector(".form-profile");
export const placeForm = document.querySelector(".form-place");