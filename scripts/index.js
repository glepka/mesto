import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

// КАРТОЧКИ
const initialCards = [
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
const validationConfig = {
  formSelector: ".form",
  inputSelector: ".form__text",
  submitButtonSelector: ".form__submit-btn",
  inactiveButtonClass: "form__submit-btn_type_disabled",
  inputErrorClass: "form__input-error",
  errorClass: "form__text_type_error",
};

// ПЕРЕМЕННЫЕ
// ------------------------
const ESC_CODE = "Escape";
const elements = document.querySelector(".elements");

//ПОПАПЫ
const popupOverlay = document.querySelectorAll(".popup");
const popupTypeProfile = document.querySelector(".popup_type_profile");
const popupTypePlace = document.querySelector(".popup_type_place");
const popupTypeImage = document.querySelector(".popup_type_image");

// ДЛЯ ОТКРЫТИЯ ПОПАПОВ
const popupProfileOpenButton = document.querySelector(".profile__edit-button");
const popupAddPlaceButton = document.querySelector(".profile__add-button");

//ДАННЫЕ ДЛЯ ПОПАПА КАРТИНКИ
const popupImage = document.querySelector(".popup__image");
const popupImageText = document.querySelector(".popup__image-text");

// ДАННЫЕ ПРОФИЛЯ, КОТОРЫЕ ВВОДИТ ПОЛЬЗОВАТЕЛЬ
const nameInput = document.querySelector(".form__text_type_name");
const professionInput = document.querySelector(".form__text_type_profession");

// ДАННЫЕ ПРОФИЛЯ
const profileName = document.querySelector(".profile__name");
const profileProfession = document.querySelector(".profile__subtitle");

// ФОРМЫ
const profileForm = popupTypeProfile.querySelector(".form-profile");
const placeForm = popupTypePlace.querySelector(".form-place");

// ИНПУТЫ ПОПАПА ДОБАВЛЕНИЯ МЕСТА
const placeInputText = document.querySelector(".form__text_type_place");
const placeInputLink = document.querySelector(".form__text_type_link");

// ВАЛИДАЦИЯ ФОРМЫ

const formValidProfile = new FormValidator(validationConfig, profileForm);
formValidProfile.enableValidation();

const formValidPlace = new FormValidator(validationConfig, placeForm);
formValidPlace.enableValidation();

// ФУНКЦИИ
// ----------------------------------------------

// Закрыть попап

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEsc);
}

// Закрыть попап по кнопке
function closePopupButtonClick() {
  const popupCloseButtons = document.querySelectorAll(".popup__cross");

  popupCloseButtons.forEach((button) => {
    // находим 1 раз ближайший к крестику попап
    const closestPopup = button.closest(".popup");
    // устанавливаем обработчик закрытия на крестик
    button.addEventListener("click", () => closePopup(closestPopup));
  });
}
closePopupButtonClick();

// Закрыть попап по оверлею
popupOverlay.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    closePopup(evt.target);
  });
});

// Закрыть попап по ESC

function closeByEsc(evt) {
  if (evt.key === ESC_CODE) {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

// ОТКРЫТЬ ПОПАП

function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEsc);
}

// ОТРЫТЬ ПОПАП ПРОФИЛЯ

popupProfileOpenButton.addEventListener("click", function () {
  openPopup(popupTypeProfile);
  nameInput.value = profileName.textContent;
  professionInput.value = profileProfession.textContent;
});

// ОТКРЫТЬ ПОПАП МЕСТА
popupAddPlaceButton.addEventListener("click", () => openPopup(popupTypePlace));

// Изменить имя и профессию в профиле

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileProfession.textContent = professionInput.value;
  closePopup(popupTypeProfile);
}
profileForm.addEventListener("submit", handleProfileFormSubmit);

//ДОБАВИТЬ 6 НАЧАЛЬНЫХ КАРТОЧЕК
function addInitialCards() {
  initialCards.forEach(function (item) {
    const src = item.link;
    const title = item.name;
    renderCards(title, src, elements, "append");
  });
}
addInitialCards();

// ДОБАВИТЬ СОБСТВЕННУЮ КАРТОЧКУ
function addPlaceCard(evt) {
  evt.preventDefault();
  const title = placeInputText.value;
  const src = placeInputLink.value;
  const buttonElement = document.querySelector(
    ".form__submit-btn_action_create"
  );

  renderCards(title, src, elements);
  closePopup(popupTypePlace);
  buttonElement.disabled = true;
  evt.target.reset();
}
placeForm.addEventListener("submit", addPlaceCard);

// РЕНДЕР КАРТОЧЕК
function renderCards(title, src, container, position = "prepend") {
  const cardItem = new Card(
    { title, src, openPopupImage },
    ".card-template_type_default"
  );
  const renderCard = cardItem.createCard();

  switch (position) {
    case "append":
      return container.append(renderCard);
    case "prepend":
      return container.prepend(renderCard);
    default:
      return;
  }
}

// Открыть попап места

function openPopupImage(title, src) {
  popupImage.src = src;
  popupImageText.textContent = title;
  popupImage.alt = title;
  openPopup(popupTypeImage);
}
