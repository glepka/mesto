let popup = document.querySelector(".popup");
let popupCross = document.querySelector(".popup__cross");
let editButton = document.querySelector(".profile__edit-button");

let nameInput = document.querySelector(".form__text_type_name");
let professionInput = document.querySelector(".form__text_type_profession");

let profileName = document.querySelector(".profile__name");
let profileProfession = document.querySelector(".profile__subtitle");

let formElement = document.querySelector(".form");

// Открыть попап

function openPopup() {
  popup.classList.add("popup_opened");
  nameInput.value = profileName.textContent;
  professionInput.value = profileProfession.textContent;
}
editButton.addEventListener("click", openPopup);

// Закрыть попап

function closePopup() {
  popup.classList.remove("popup_opened");
}
popupCross.addEventListener("click", closePopup);

// Изменить имя и профессию в профиле

function formSubmitHandler(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileProfession.textContent = professionInput.value;
  closePopup();
}

formElement.addEventListener("submit", formSubmitHandler);
