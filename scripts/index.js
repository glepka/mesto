const page = document.querySelector(".page");

const elements = document.querySelector(".elements");
const element = document.querySelector(".elements__element");
//ПОПАПЫ
const popupProfile = document.querySelector(".popup_type_profile");
const popupPlace = document.querySelector(".popup_type_place");
const popupImage = document.querySelector(".popup_type_image");

// КНОПКИ ОТКРЫТИЯ ПОПАПОВ
const editButton = document.querySelector(".profile__edit-button");
const addPlaceButton = document.querySelector(".profile__add-button");
const gridImage = document.querySelectorAll(".elements__image");

//ДАННЫЕ ДЛЯ ПОПАПА КАРТИНКИ
const popupImageSrc = document.querySelector(".popup__image");
const popupImageText = document.querySelector(".popup__image-text");

//КНОПКИ ЛАЙКА
const likeButtons = document.querySelectorAll(".elements__icon");

// ДАННЫЕ ПРОФИЛЯ, КОТОРЫЕ ВВОДИТ ПОЛЬЗОВАТЕЛЬ
const nameInput = document.querySelector(".form__text_type_name");
const professionInput = document.querySelector(".form__text_type_profession");

// ДАННЫЕ ПРОФИЛЯ
const profileName = document.querySelector(".profile__name");
const profileProfession = document.querySelector(".profile__subtitle");

// ФОРМЫ
const formElement = document.querySelector(".form");
const formElementPlace = document.querySelector(".form-place");

// Закрыть попап

function closePopup(item) {
  item.classList.remove("popup_opened");
}

function closePopupButtonClick(evt) {
  const closeBtn = evt.target;
  if (closeBtn.classList.contains("popup__cross")) {
    closeBtn.closest(".popup").classList.remove("popup_opened");
  }
}
page.addEventListener("click", closePopupButtonClick);

// ОТКРЫТЬ ПОПАП

function openPopup(item) {
  item.classList.add("popup_opened");
}

// ОТРЫТЬ ПОПАП ПРОФИЛЯ

editButton.addEventListener("click", function () {
  openPopup(popupProfile);
  nameInput.value = profileName.textContent;
  professionInput.value = profileProfession.textContent;
});

// ОТКРЫТЬ ПОПАП МЕСТА
addPlaceButton.addEventListener("click", () => openPopup(popupPlace));

// Изменить имя и профессию в профиле

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileProfession.textContent = professionInput.value;
  closePopup(popupProfile);
}
formElement.addEventListener("submit", formSubmitHandler);

// КАРТОЧКИ

const placeTemplate = document.querySelector("#place").content;
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

// Добавить начальные карточки

function addCards(item) {
  const placeElement = placeTemplate
    .querySelector(".elements__template")
    .cloneNode(true);
  placeElement.querySelector(".elements__image").src = item.link;
  placeElement.querySelector(".elements__title").textContent = item.name;
  elements.append(placeElement);
}
initialCards.forEach(addCards);

// Добавить новую карточку

function addPlaceCard(evt) {
  evt.preventDefault();
  const placeInput = document.querySelector(".form__text_type_place").value;
  const imageLinkImput = document.querySelector(".form__text_type_link").value;
  const placeElement = placeTemplate
    .querySelector(".elements__template")
    .cloneNode(true);
  initialCards.push({ name: placeInput, link: imageLinkImput });
  item = initialCards[initialCards.length - 1];
  placeElement.querySelector(".elements__image").src = item.link;
  placeElement.querySelector(".elements__title").textContent = item.name;
  elements.prepend(placeElement);
  closePopup(popupPlace);
}
formElementPlace.addEventListener("submit", addPlaceCard);

// ПРОВЕРЯЕМ КУДА КЛИКНУЛИ
elements.onclick = function (event) {
  const target = event.target;
  if (target.classList.contains("elements__icon")) {
    addOrRemoveLike(target);
  } else if (target.classList.contains("elements__image")) {
    openPopupImage(target);
  } else if (target.classList.contains("elements__trash")) {
    deleteCard(target);
  } else return;
};

// ПОСТАВИТЬ И УБРАТЬ ЛАЙК

function addOrRemoveLike(btn) {
  btn.classList.toggle("elements__icon_type_active");
}
// УДАЛИТЬ КАРТОЧКУ

function deleteCard(btn) {
  btn.closest(".elements__template").remove();
}

// КОГДА НАЖАЛ НА КАРТИНКУ

function openPopupImage(img) {
  openPopup(popupImage);
  popupImageSrc.src = img.src;
  // popupImageText.textContent = imageTitle.textContent;
}
