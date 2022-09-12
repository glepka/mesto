export class UserInfo {
  constructor({ profileName, profileAbout }) {
    this._profileNameElement = document.querySelector(profileName);
    this._profileAboutElement = document.querySelector(profileAbout);
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
