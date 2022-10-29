export class UserInfo {
  constructor({ profileNameSelector, profileAboutSelector, profileAvatarSelector }) {
    this._profileNameElement = document.querySelector(profileNameSelector);
    this._profileAboutElemenet = document.querySelector(profileAboutSelector);
    this._profileAvatarElement = document.querySelector(profileAvatarSelector);
    
  }

  setUserInfo({ name, about, avatar, _id, cohort }) {
    this._name = name;
    this._about = about;
    this._avatar = avatar;
    this._id = _id;
    this._cohort = cohort;

    this._profileNameElement.textContent = this._name;
    this._profileAboutElemenet.textContent = this._about;
    this._profileAvatarElement.src = this._avatar;
  }

  getUserInfo() {
    return {
      userName: this._name,
      userAbout: this._about,
    };
  }

  getUserId() {
    return this._id;
  }
}