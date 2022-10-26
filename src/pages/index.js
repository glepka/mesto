import "./index.css";

import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
// import { Api } from "../components/Api";
import {
  initialCards,
  validationConfig,
  cardsContainer,
  templateCardDefaultSelector,
  popupTypeProfileSelector,
  popupTypePlaceSelector,
  popupTypeImageSelector,
  popupProfileOpenButton,
  popupAddPlaceButton,
  nameInput,
  professionInput,
  profileNameSelector,
  profileAboutSelector,
  inputProfileNameSelector,
  inputProfileAboutSelector,
  profileForm,
  placeForm,
  apiConfig,
} from "../utils/constants.js";

// API
// const api = new Api(apiConfig);

// const userInfo = new UserInfo({
//   userNameSelector,
//   userAboutSelector,
//   userAvatarSelector,
// });

// Классы
// формы
const formValidProfile = new FormValidator(validationConfig, profileForm);
formValidProfile.enableValidation();

const formValidPlace = new FormValidator(validationConfig, placeForm);
formValidPlace.enableValidation();

// Инфо профиля
const userInfo = new UserInfo({ profileNameSelector, profileAboutSelector });
console.log(profileNameSelector);
// Попапы
const popupWithImage = new PopupWithImage(popupTypeImageSelector);
popupWithImage.setEventListeners();

// СОЗДАНИЕ КАРТОЧКИ
const createCard = (item) => {
  const newCard = new Card(item, templateCardDefaultSelector, (title, link) => {
    popupWithImage.open(title, link);
  });
  return newCard.createCard();
};

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (card) => {
      return createCard(card);
    },
  },
  cardsContainer
);
cardSection.renderItems();

// ПОПАП ПРОФИЛЯ

const popupUserInfo = new PopupWithForm(
  popupTypeProfileSelector,
  (data) => {
    userInfo.setUserInfo({
      userName: data[inputProfileNameSelector],
      userAbout: data[inputProfileAboutSelector],
    });
  },
  () => {
    const info = userInfo.getUserInfo();
    nameInput.value = info.userName;
    professionInput.value = info.userAbout;
    formValidProfile.clearValidationErrors();
  }
);
popupUserInfo.setEventListeners();
popupProfileOpenButton.addEventListener("click", () => {
  popupUserInfo.open();
});

// Добавить свою карточку
const popupImg = new PopupWithForm(
  popupTypePlaceSelector,
  (data) => {
    const card = {
      name: data.place,
      link: data.link,
    };
    cardSection.addItem(createCard(card));
  },
  () => {
    formValidPlace.clearValidationErrors();
  }
);
popupImg.setEventListeners();
popupAddPlaceButton.addEventListener("click", () => {
  popupImg.open();
});
