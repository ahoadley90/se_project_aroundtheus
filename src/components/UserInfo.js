export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
    this._avatarElement = document.querySelector(avatarSelector);
    this._name = "";
    this._about = "";
    this._avatar = "";
  }

  getUserInfo() {
    return {
      name: this._name,
      about: this._about,
      avatar: this._avatar,
    };
  }

  setUserInfo({ name, about, avatar }) {
    if (name) this._name = name;
    if (about) this._about = about;
    if (avatar) this._avatar = avatar;
    this.updateDOM();
  }

  updateDOM() {
    this._nameElement.textContent = this._name;
    this._jobElement.textContent = this._about;
    if (this._avatar) this._avatarElement.src = this._avatar;
  }
}
