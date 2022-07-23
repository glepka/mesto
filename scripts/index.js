const elements = document.querySelector(".elements");

const cardTemplate = document.querySelector(".card").content;

//ПОПАПЫ
const popupTypeProfile = document.querySelector(".popup_type_profile");
const popupTypePlace = document.querySelector(".popup_type_place");
const popupTypeImage = document.querySelector(".popup_type_image");

// ДЛЯ ОТКРЫТИЯ ПОПАПОВ
const editButton = document.querySelector(".profile__edit-button");
const addPlaceButton = document.querySelector(".profile__add-button");

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
const profileForm = document.querySelector(".form-profile");
const placeForm = document.querySelector(".form-place");

// ИНПУТЫ ПОПАПА ДОБАВЛЕНИЯ МЕСТА
const placeInputText = document.querySelector(".form__text_type_place");
const placeInputLink = document.querySelector(".form__text_type_link");

// Закрыть попап

function closePopup(item) {
  item.classList.remove("popup_opened");
}

function closePopupButtonClick(evt) {
  const closeButtons = document.querySelectorAll(".popup__cross");

  closeButtons.forEach((button) => {
    // находим 1 раз ближайший к крестику попап
    const popup = button.closest(".popup");
    // устанавливаем обработчик закрытия на крестик
    button.addEventListener("click", () => closePopup(popup));
  });
}
elements.addEventListener("click", closePopupButtonClick);

// ОТКРЫТЬ ПОПАП

function openPopup(item) {
  item.classList.add("popup_opened");
}

// ОТРЫТЬ ПОПАП ПРОФИЛЯ

editButton.addEventListener("click", function () {
  openPopup(popupTypeProfile);
  nameInput.value = profileName.textContent;
  professionInput.value = profileProfession.textContent;
});

// ОТКРЫТЬ ПОПАП МЕСТА
addPlaceButton.addEventListener("click", () => openPopup(popupTypePlace));

// Изменить имя и профессию в профиле

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileProfession.textContent = professionInput.value;
  closePopup(popupTypeProfile);
}
profileForm.addEventListener("submit", handleProfileFormSubmit);

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
//  СОЗДАНИЕ КАРТОЧКИ

function createCard(title, src) {
  const card = cardTemplate.querySelector(".elements__element").cloneNode(true);
  const cardImage = card.querySelector(".elements__image");
  card.querySelector(".elements__title").textContent = title;

  cardImage.src = src;
  cardImage.alt = title;
  cardImage.addEventListener("click", () => openPopupImage(title, src));
  card
    .querySelector(".elements__trash")
    .addEventListener("click", () => deleteCard(card));
  card
    .querySelector(".elements__icon")
    .addEventListener("click", () => toggleLike(card));

  console.log(card);
  return card;
}

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

  renderCards(title, src, elements);
  closePopup(popupTypePlace);
}
placeForm.addEventListener("submit", addPlaceCard);

// РЕНДЕР КАРТОЧЕК
function renderCards(title, src, container, position = "prepend") {
  const renderCard = createCard(title, src);
  switch (position) {
    case "append":
      return container.append(renderCard);
    case "prepend":
      return container.prepend(renderCard);
    default:
      return;
  }
}
// ПОСТАВИТЬ И УБРАТЬ ЛАЙК

function toggleLike(card) {
  const btn = card.querySelector(".elements__icon");
  btn.classList.toggle("elements__icon_type_active");
}

// УДАЛИТЬ КАРТОЧКУ

function deleteCard(card) {
  const btn = card.querySelector(".elements__trash");
  btn.closest(".elements__element").remove();
}

// Открыть попап места

function openPopupImage(title, src) {
  popupImage.src = src;
  popupImageText.textContent = title;
  popupImage.alt = title;
  openPopup(popupTypeImage);
}
