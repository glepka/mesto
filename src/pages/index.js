import "./index.css";

import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
import { Api } from "../components/Api.js";
import { PopupDeleteCardAccept } from "../components/PopupDeleteCardAccept.js";
import {
  validationConfig,
  cardsContainer,
  templateCardDefaultSelector,
  popupTypeProfileSelector,
  popupTypePlaceSelector,
  popupTypeImageSelector,
  popupTypeAvatarSelector,
  popupProfileOpenButton,
  popupAddPlaceButton,
  popupDelCardSelector,
  nameInput,
  professionInput,
  profileNameSelector,
  profileAboutSelector,
  profileAvatarSelector,
  profileForm,
  placeForm,
  avatarForm,
  apiConfig,
  profileAvatarContainer,
  inputAvatarUrl,
  inputUserName,
  inputUserAbout,
  inputCardName,
  inputCardUrl,
} from "../utils/constants.js";


// Проверка форм на валидность
const formValidProfile = new FormValidator(validationConfig, profileForm);
formValidProfile.enableValidation();

const formValidPlace = new FormValidator(validationConfig, placeForm);
formValidPlace.enableValidation();

const formValidAvatarUpdate = new FormValidator(validationConfig, avatarForm);
formValidAvatarUpdate.enableValidation();

// API
const api = new Api(apiConfig);

// Инфо профиля
const userInfo = new UserInfo({
  profileNameSelector,
  profileAboutSelector,
  profileAvatarSelector,
});


api
  .getUserInfo()
  .then((data) => {
    userInfo.setUserInfo(data);
    
  })
  .then(() => {
    api
      .getInitialCards()
      .then((cards) => {
        cardSection.renderItems(cards.reverse());
      })
      .catch((err) => {
        console.error(`Карточки не получены. Код ошибки: ${err}`);
      });
  })
  .catch((err) => {
    console.error(
      `Данные не получены. Код ошибки: ${err}, `
    );
  });

  const popupUserAvatar = new PopupWithForm(
    popupTypeAvatarSelector,
    (data) => {
      return api
        .patchAvatar(data[inputAvatarUrl])
        .then((data) => {
          userInfo.setUserInfo(data);
          popupUserAvatar.close();
        })
        .catch((err) => {
          console.error(`Аватар не обновлен. Код ошибки: ${err}, `);
        })
        .finally(() =>{
          popupUserAvatar._submitButtonElement.textContent = "Сохранить";
          popupUserAvatar._submitButtonElement.disabled = false;
        });
    },
    () => {
      formValidAvatarUpdate.clearValidationErrors();
    }
  );
  popupUserAvatar.setEventListeners("Сохранение...");
  
  profileAvatarContainer.addEventListener("click", () => {
    popupUserAvatar.open();
  });


  const popupUserInfo = new PopupWithForm(
    popupTypeProfileSelector,
    (data) => {
      return api
        .patchUserInfo(data[inputUserName], data[inputUserAbout])
        .then((data) => {
          userInfo.setUserInfo(data);
          popupUserInfo.close();
        })
        .catch((err) => {
          console.error(
            `Ошибка обновления данных пользователя, код: ${err}, `
          );
      })
      .finally(() =>{
        popupUserInfo._submitButtonElement.textContent = "Сохранить";
        popupUserInfo._submitButtonElement.disabled = false;
      });
    },
    () => {
      const info = userInfo.getUserInfo();
      nameInput.value = info.userName;
      professionInput.value = info.userAbout;
      formValidProfile.clearValidationErrors();
    }
  );
  popupUserInfo.setEventListeners("Сохранение...");
  popupProfileOpenButton.addEventListener("click", () => {
    popupUserInfo.open();
  });



const popupWithImage = new PopupWithImage(popupTypeImageSelector);
popupWithImage.setEventListeners();

const popupImg = new PopupWithForm(
  popupTypePlaceSelector,
  (data) => {
    return api
    .postCard(data[inputCardName], data[inputCardUrl])
    .then((card) => {
      
      cardSection.renderItem(card);
      popupImg.close();
    })
    .catch((err) => {
      return Promise.reject(`Ошибка добавления карточки. ${err}`);
    })
    .finally(() =>{
      popupImg._submitButtonElement.textContent = "Создать";
      popupImg._submitButtonElement.disabled = false;
    });
  },
  () => {
    formValidPlace.clearValidationErrors();
  }
);
popupImg.setEventListeners("Создание...");
popupAddPlaceButton.addEventListener("click", () => {
  popupImg.open();
});

const cardSection = new Section((item) => {
  const newCard = new Card(
    item,
    userInfo.getUserId(),
    templateCardDefaultSelector,
    () => {
      popupWithImage.open(item.name, item.link);
    },
    (card) => {
      popupDelCard.open();
      popupDelCard.setAcceptingCallback(
      () => {
        return api
          .delCard(card._id)
          .then(() => {
            card.deleteCard(card._card);
            popupDelCard.close();
          })
          .catch((err) => {
            return Promise.reject(`${err} Ошибка удаления карточки.`);
          })
          .finally(() => {
            popupDelCard._submitButtonElement.textContent = "Да";
            popupDelCard._submitButtonElement.disabled = false;
          });
        }
      )
    },
    (cardId, isLiked) => {
      if (isLiked) {
        return api.deleteLike(cardId)
        .then((card) => {
          newCard.setLike(card.likes);
        })
        .catch((err) => {
          return Promise.reject(`${err} Ошибка удаления лайка.`);
        });
      } else {
        return api.putLike(cardId)
        .then(
          (card) => {
            newCard.setLike(card.likes);
          }
        )
        .catch((err) => {
          return Promise.reject(`${err} Ошибка постановки лайка.`);
        });
      }
    }
  );
  return newCard.createCard();
}, cardsContainer);


const popupDelCard = new PopupDeleteCardAccept(popupDelCardSelector);
popupDelCard.setEventListeners("Удаление...");

















