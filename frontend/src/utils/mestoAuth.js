class MestoAuth {
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

  signIn(data) {
    return fetch(`${this._baseUrl}/signin`,{
      method: "POST",
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify(data),
    })
      .then(this._checkResponse)
  }

  signUp(data) {
    return fetch(`${this._baseUrl}/signup`,{
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    })
      .then(this._checkResponse)
  }

  signOut() {
    return fetch(`${this._baseUrl}/signout`,{
      method: "GET",
      credentials: 'include',
    })
      .then(this._checkResponse)
  }

  checkToken() {
    return fetch(`${this._baseUrl}/users/me`,{
      method: "GET",
      credentials: 'include',
      headers: this.headers,
    })
      .then(this._checkResponse)
    }
}

export const mestoAuth = new MestoAuth({
  baseUrl: 'https://api.r0-0ky.nomoreparties.co',
  headers: {
    "Content-Type": "application/json"
  }
})