import { request } from "./helpers";

class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _getHeaders() {
    return {
      authorization: localStorage.getItem('token'),
      ...this._headers,
    }
  }

  getUserInfo() {
    return request(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._getHeaders()
    }).then(({ data }) => data);

  }
  getCardsInfo() {
    return request(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._getHeaders()
    }).then(({ data }) => data);
  }

  updateProfileInfo(name, about) {
    return request(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: name,
        about: about
      })
    }).then(({ data }) => data);
  }

  addCard(name, link) {
    return request(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._getHeaders(),
      body: JSON.stringify({
        name: name,
        link: link
      })
    }).then(({ data }) => data);
  }

  removeCard(cardId) {
    return request(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._getHeaders(),
    }).then(({ data }) => data);
  }

  likeCard = (cardId) => {
    return request(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._getHeaders(),
    }).then(({ data }) => data);
  }

  deleteCardLike = (cardId) => {
    return request(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._getHeaders(),
    }).then(({ data }) => data);
  }

  changeLikeCardStatus = (cardId, isLiked) => {
    if (isLiked) {
      return this.deleteCardLike(cardId);
    } else {
      return this.likeCard(cardId);
    }
  }

  updateAvatar = (avatar) => {
    return request(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify({
        avatar,
      })
    }).then(({ data }) => data);
  }
  register({ email, password }) {
    return request(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: this._getHeaders(),
      body: JSON.stringify({
        email,
        password
      })
    })
  }

  authorize({ email, password }) {
    return request(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: this._getHeaders(),
      body: JSON.stringify({
        email,
        password
      })
    })
  }

  checkMe() {
    return request(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        ...this._getHeaders(),
      }
    })
  }

}

export default Api;
//Если файл с маленькой буквы, не проходит проверку на автотестах

export const apiInstance = new Api({
  baseUrl: 'https://lebedeva.back.nomoredomains.club',
  headers: {
    'Content-Type': 'application/json'
  }
});

