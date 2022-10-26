export class UserInfo {
  constructor({ profileNameSelector, profileAboutSelector }) {
    this._profileNameElement = document.querySelector(profileNameSelector);
    this._profileAboutElement = document.querySelector(profileAboutSelector);
  }

  getUserInfo() {
    
    return {
      userName: this._profileNameElement.textContent,
      userAbout: this._profileAboutElement.textContent,
    };
  }

  setUserInfo({ userName, userAbout }) {
    this._profileNameElement.textContent = userName;
    this._profileAboutElement.textContent = userAbout;
  }
}
