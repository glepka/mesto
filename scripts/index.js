const popupProfile = document.querySelector(".popup_type_profile");
const popupPlace = document.querySelector(".popup_type_place");
const popupImage = document.querySelector(".popup_type_image");

const popupCrossProfile = document.querySelector(".popup__cross_type_profile");
const popupCrossPlace = document.querySelector(".popup__cross_type_place");
const popupCrossImage = document.querySelector(".popup__cross_type_image");

const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const imageOfElement = document.querySelector(".elements__image");
const likeButtons = document.querySelectorAll(".elements__icon");

const nameInput = document.querySelector(".form__text_type_name");
const professionInput = document.querySelector(".form__text_type_profession");

const profileName = document.querySelector(".profile__name");
const profileProfession = document.querySelector(".profile__subtitle");

const formElement = document.querySelector(".form");

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

//ПРОСМОТР КАРТИНКИ

//Открыть картинку

function openPopupImage() {
  popupImage.classList.add("popup_opened");
}
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
