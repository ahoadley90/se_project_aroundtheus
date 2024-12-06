export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
    this._avatarElement = document.querySelector(avatarSelector);
    this._userId = null;
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      about: this._jobElement.textContent,
      avatar: this._avatarElement.src,
      id: this._userId,
    };
  }

  setUserInfo({ name, about, avatar, _id }) {
    this._nameElement.textContent = name;
    this._jobElement.textContent = about;
    if (avatar) {
      this._avatarElement.src = avatar;
    }
    this._userId = _id;
  }

  getUserId() {
    return this._userId;
  }
}
