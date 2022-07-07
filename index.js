let popup = document.querySelector(".popup");

// Открыть попап
let editButton = document.querySelector(".profile__edit-button");
function openPopup() {
  popup.classList.add("popup_opened");
}
editButton.addEventListener("click", openPopup);

// Закрыть попап
let popupCross = document.querySelector(".popup__cross");
function closePopup() {
  popup.classList.remove("popup_opened");
}
popupCross.addEventListener("click", closePopup);

// Текст в форме такой же как и в профиле

let nameInput = document.querySelector(".form__text_type_name");
let professionInput = document.querySelector(".form__text_type_profession");

let profileName = document.querySelector(".profile__name");
let profileProfession = document.querySelector(".profile__subtitle");

let nameInputValue = nameInput.value;
let professionInputValue = professionInput.value;

nameInput.setAttribute("placeholder", profileName.textContent);
professionInput.setAttribute("placeholder", profileProfession.textContent);

// Изменить имя и профессию в профиле

let formElement = document.querySelector(".form");
let saveButton = document.querySelector(".form__submit-btn");

function formSubmitHandler(evt) {
  evt.preventDefault();

  let nameInputValue = nameInput.value;
  let professionInputValue = professionInput.value;

  let profileName = document.querySelector(".profile__name");
  let profileProfession = document.querySelector(".profile__subtitle");

  profileName.textContent = nameInputValue;
  profileProfession.textContent = professionInputValue;
}

saveButton.addEventListener("click", formSubmitHandler);
