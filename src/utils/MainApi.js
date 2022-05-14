const apiConfig = {
  baseUrl: 'http://localhost:3000',
};

class Api {
  constructor(apiConfig) {
    this._baseUrl = apiConfig.baseUrl;
    this._usersUrl = `${apiConfig.baseUrl}/users/`;
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
      // Authorization: `Bearer ${localStorage.getItem('jwt')}`},
      }
      // credentials: "include",
    }).then(this._checkResponse);
  }

  postMovieData(movie) {
    return fetch(this._moviesUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${localStorage.getItem('jwt')}`
      },
      // credentials: "include",
      body: JSON.stringify({
        movie
      }),
    }).then(this._checkResponse);
  }

  deleteCardData(itemId) {
    return fetch(`${this._moviesUrl}${itemId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${localStorage.getItem('jwt')}`
      },
      // credentials: "include",
    }).then(this._checkResponse);
  }

  getUserData() {
    return fetch(this._usersUrl, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('jwt')}`},
    }).then(this._checkResponse);
  }

  patchUserData(newName, newJob) {
    return fetch(this._usersUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('jwt')}`},
      credentials: "include",
      body: JSON.stringify({
        name: newName,
        about: newJob,
      }),
    }).then(this._checkResponse);
  }

  changeCardLikeStatus(itemId, status) {
    const method = status === true ? "DElETE" : "PUT";
    return fetch(`${this._moviesUrl}likes/${itemId}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('jwt')}`},
      credentials: "include",
    }).then(this._checkResponse);
  }

  patchAvatar(avatarInfo) {
    return fetch(`${this._userUrl}avatar`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('jwt')}`},
      credentials: "include",
      body: JSON.stringify({ avatar: avatarInfo }),
    }).then(this._checkResponse);
  }
}

const api = new Api(apiConfig);
export default api;
