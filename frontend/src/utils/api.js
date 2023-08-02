class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getApiData(path) {
    console.log(`${this._baseUrl}/${path}`);
    return fetch(`${this._baseUrl}/${path}`, {
      method: "GET",
      headers: this._headers,
    })
      .then(this._checkResponse)
  }

  updateUserApi(newData) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify(newData)
    })
      .then(this._checkResponse)
  }

  addNewCard({name, link}) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({name, link})
    })
      .then(this._checkResponse)  
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      credentials: 'include',
      headers: this._headers,
    })
      .then(this._checkResponse)
  }

  putLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      credentials: 'include',
      headers: this._headers,
    })
      .then(this._checkResponse)
  }

  deleteLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      credentials: 'include',
      headers: this._headers,
    })
      .then(this._checkResponse)
  }

  updateAvatar(newLink) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify(newLink)
    })
      .then(this._checkResponse)
  }
}

export const api = new Api({
  baseUrl: 'https://api.r0-0ky.nomoreparties.co',
  headers: {
    'Content-Type': 'application/json'
  }
});