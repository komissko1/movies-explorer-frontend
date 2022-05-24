const apiConfig = {
  baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
};

class MoviesApi {
  constructor(apiConfig) {
    this._baseUrl = apiConfig.baseUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject("Server is not responding");
  }

  getMoviesData() {
    return fetch(this._baseUrl, {
      headers: {
      "Content-Type": "application/json"},
    }).then(this._checkResponse);
  }
}

const moviesApi = new MoviesApi(apiConfig);
export default moviesApi;
