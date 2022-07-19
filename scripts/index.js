const popupProfile = document.querySelector(".popup_type_profile");
const popupPlace = document.querySelector(".popup_type_place");

const popupCrossProfile = document.querySelector(".popup__cross_type_profile");
const popupCrossPlace = document.querySelector(".popup__cross_type_place");
const popupCrossImage = document.querySelector(".popup__cross_type_image");

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");

const likeButtons = document.querySelectorAll(".elements__icon");

const nameInput = document.querySelector(".form__text_type_name");
const professionInput = document.querySelector(".form__text_type_profession");

const profileName = document.querySelector(".profile__name");
const profileProfession = document.querySelector(".profile__subtitle");

const formElement = document.querySelector(".form");
const formElementPlace = document.querySelector(".form-place");

// ПРОФИЛЬ

// Открыть попап профиля

function openPopupProfile() {
  popupProfile.classList.add("popup_opened");
  nameInput.value = profileName.textContent;
  professionInput.value = profileProfession.textContent;
}
editButton.addEventListener("click", openPopupProfile);

// Закрыть попап профиля

function closePopupProfile() {
  popupProfile.classList.remove("popup_opened");
}
popupCrossProfile.addEventListener("click", closePopupProfile);

// Изменить имя и профессию в профиле

function formSubmitHandler(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileProfession.textContent = professionInput.value;
  closePopup();
}

formElement.addEventListener("submit", formSubmitHandler);

// МЕСТО

// Открыть попап места

function openPopupPlace() {
  popupPlace.classList.add("popup_opened");
}
addButton.addEventListener("click", openPopupPlace);

// Закрыть попап места

function closePopupPlace() {
  popupPlace.classList.remove("popup_opened");
}
popupCrossPlace.addEventListener("click", closePopupPlace);

// КАРТОЧКИ
const placeOnline = document.querySelector(".elements");
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

  placeOnline.append(placeElement);
}
initialCards.forEach(addCards);
// Добавить новую карточку

function formSubmitPlace(evt) {
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

  placeOnline.prepend(placeElement);

  closePopupPlace();
}

formElementPlace.addEventListener("submit", formSubmitPlace);

//ПРОСМОТР КАРТИНКИ

//Открыть картинку
const popupImage = document.querySelector(".popup_type_image");
const imageOfElement = document.querySelector(".elements__image");
const popupImageSrc = document.querySelector(".popup__image");
const popupImageText = document.querySelector(".popup__image-text");

function openPopupImage() {
  popupImage.classList.add("popup_opened");

  popupImageSrc.src = this.src;
  popupImageText.textContent = placeElement.textContent;
}
console.log(imageOfElement);
imageOfElement.addEventListener("click", openPopupImage);

// Закрыть картинку

function closePopupImage() {
  popupImage.classList.remove("popup_opened");
}
popupCrossImage.addEventListener("click", closePopupImage);

// ИКОНКА ЛАЙКА
function toggleLike() {
  this.classList.toggle("elements__icon_type_active");
}

likeButtons.forEach((btn) => {
  btn.addEventListener("click", toggleLike);
});
