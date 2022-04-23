const apiConfig = {
  baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
};

class Api {
  constructor(apiConfig) {
    this._baseUrl = apiConfig.baseUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject("Server is not responding");
  }

  getCardsData() {
    return fetch(this._baseUrl, {
      headers: {
      "Content-Type": "application/json"},
    }).then(this._checkResponse);
  }
}

const api = new Api(apiConfig);
export default api;
