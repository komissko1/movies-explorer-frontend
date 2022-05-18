const apiConfig = {
  baseUrl: "https://api.movies-explorer.kkom.nomoredomains.work",
};

class Api {
  constructor(apiConfig) {
    this._baseUrl = apiConfig.baseUrl;
    this._usersUrl = `${apiConfig.baseUrl}/users/me`;
    this._moviesUrl = `${apiConfig.baseUrl}/movies/`;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject("Server is not responding");
  }

  getMoviesData() {
    return fetch(this._moviesUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      credentials: "include",
    }).then(this._checkResponse);
  }

  postMovieData(movie) {
    return fetch(this._moviesUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      credentials: "include",
      body: JSON.stringify(movie),
    }).then(this._checkResponse);
  }

  deleteMovieData(itemId) {
    return fetch(`${this._moviesUrl}${itemId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      credentials: "include",
    }).then(this._checkResponse);
  }

  getUserData() {
    return fetch(this._usersUrl, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    }).then(this._checkResponse);
  }

  patchUserData({name, email}) {
    return fetch(this._usersUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      credentials: "include",
      body: JSON.stringify({
        name,
        email,
      }),
    }).then(this._checkResponse);
  }
}

const mainApi = new Api(apiConfig);
export default mainApi;
