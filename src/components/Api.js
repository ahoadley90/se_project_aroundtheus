export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    console.log("API Base URL:", this._baseUrl);
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  setUserInfo({ name, about }) {
    console.log("Sending user info:", { name, about });
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ name, about }),
    })
      .then((res) => {
        console.log("Response status:", res.status);
        return this._checkResponse(res);
      })
      .then((data) => {
        console.log("Received data:", data);
        return data;
      });
  }

  addCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ name, link }),
    }).then(this._checkResponse);
  }

  likeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    })
      .then(this._checkResponse)
      .then((data) => {
        console.log("Like card response:", data);
        return data;
      });
  }

  unlikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then(this._checkResponse)
      .then((data) => {
        console.log("Unlike card response:", data);
        return data;
      });
  }

  unlikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then(this._checkResponse)
      .then((data) => {
        console.log("Unlike card response:", data);
        return { ...data, isLiked: false };
      });
  }
  updateAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar }),
    }).then(this._checkResponse);
  }
}
