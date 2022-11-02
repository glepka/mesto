export class Card {
  constructor({ name, link, owner, _id, likes}, userId, templateCardDefaultSelector, openPopupImage, handleTrashClick, handleLikeClick) {
    this._title = name;
    this._src = link;
    this._likes = likes;
    this._id = _id;
    this._userId = userId;
    this._isOwner = owner._id === userId ? true : false;
    this._openPopupImage = openPopupImage;
    this._templateCardDefaultSelector = templateCardDefaultSelector;
    this._handleTrashClick = handleTrashClick;
    this._handleLikeClick = handleLikeClick;

    this._settings = {
      cardSelector: '.elements__element',
      likeSelector: '.elements__icon',
      likeNumberSelector: '.elements__like-counter',
      likeActiveClass: 'elements__icon_type_active',
      titleSelector: '.elements__title',
      imgSelector: '.elements__image',
      delBtnSelector: '.elements__trash'
    }
    
    this._card = document.querySelector(this._templateCardDefaultSelector).content.querySelector(this._settings.cardSelector).cloneNode(true);  
    this._titleEl = this._card.querySelector(this._settings.titleSelector);
    this._imgEl = this._card.querySelector(this._settings.imgSelector);
    this._likeBtnEl = this._card.querySelector(this._settings.likeSelector);
    this._likeNumberEl = this._card.querySelector(this._settings.likeNumberSelector);
    this._delBtnEl = this._card.querySelector(this._settings.delBtnSelector);

  }


  createCard() {
    this._generateCard();
    this._setEventsListeners();
    return this._card;
  }


  _generateCard() {
    this._titleEl.textContent = this._title;
    this._imgEl.src = this._src;
    this._imgEl.alt = this._title;
    this._likeNumberEl.innerText = this._likes.length;
    if(!this._isOwner) this._delBtnEl.remove();
    this._renderLike(this.likes);
  }

  _setEventsListeners() {
    this._likeBtnEl.addEventListener('click', () => {
    this._handleLikeClick(this._id, this._isLiked())});
    this._delBtnEl.addEventListener('click', () => { this._handleTrashClick(this) });
    this._imgEl.addEventListener('click', () => { this._openPopupImage(this._title, this._imgSrc) });
  }



  _isLiked() {
    return this._likes.some(el => el._id === this._userId);
  }



  _renderLike() {

    this._isLiked() ?
      this._likeBtnEl.classList.add(this._settings.likeActiveClass)
      : this._likeBtnEl.classList.remove(this._settings.likeActiveClass);
      
      this._likeNumberEl.innerText = this._likes.length;
  }

  setLike(likes){
    this._likes = likes
    this._renderLike();
  }

  deleteCard(card){
    card.remove();
  }
 
}
