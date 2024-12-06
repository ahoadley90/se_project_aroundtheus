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

  _request(endpoint, options = {}) {
    const finalOptions = {
      headers: this._headers,
      ...options,
    };
    const url = `${this._baseUrl}${endpoint}`;
    return fetch(url, finalOptions).then(this._checkResponse);
  }

  getUserInfo() {
    return this._request("/users/me");
  }
  getInitialCards() {
    return this._request("/cards");
  }

  setUserInfo({ name, about }) {
    console.log("Sending user info:", { name, about });
    return this._request("/users/me", {
      method: "PATCH",
      body: JSON.stringify({ name, about }),
    }).then((data) => {
      console.log("Received data:", data);
      return data;
    });
  }

  addCard({ name, link }) {
    return this._request("/cards", {
      method: "POST",
      body: JSON.stringify({ name, link }),
    });
  }

  likeCard(cardId) {
    return this._request(`/cards/${cardId}/likes`, {
      method: "PUT",
    }).then((data) => {
      console.log("Like card response:", data);
      return data;
    });
  }

  deleteCard(cardId) {
    return this._request(`/cards/${cardId}`, {
      method: "DELETE",
    });
  }

  unlikeCard(cardId) {
    return this._request(`/cards/${cardId}/likes`, {
      method: "DELETE",
    }).then((data) => {
      console.log("Unlike card response:", data);
      return { ...data, isLiked: false };
    });
  }

  updateAvatar(avatar) {
    return this._request("/users/me/avatar", {
      method: "PATCH",
      body: JSON.stringify({ avatar }),
    });
  }
}
