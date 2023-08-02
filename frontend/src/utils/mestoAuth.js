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
      headers: this._headers,
      body: JSON.stringify(data)
    })
      .then(this._checkResponse)
  }

  signUp(data) {
    return fetch(`${this._baseUrl}/signup`,{
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data)
    })
      .then(this._checkResponse)
  }

  checkToken(jwt) {
    return fetch(`${this._baseUrl}/users/me`,{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${jwt}`
      }
    })
      .then(this._checkResponse)
    }
}

export const mestoAuth = new MestoAuth({
  baseUrl: "https://auth.nomoreparties.co",
  headers: {
    "Content-Type": "application/json"
  }
})