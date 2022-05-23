export const BASE_URL = 'https://api.movies-explorer.kkom.nomoredomains.work';

export const register = ({name, email, password }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      'Accept': "application/json",
      'Content-Type': "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  })
    .then((res) => {
      try {
        if (res.status === 400 || res.status === 409 ) {
          return false;
        } else {
          return res.json();
        }
      } catch (err) {
        return err;
      }
    })
};

export const authorize = ({password, email}) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      'Accept': "application/json",
      "Content-Type": "application/json",
    },
    credentials: 'include',
    body: JSON.stringify({ password, email }),
  })
    .then((res) => {
      try {
        if (res.status === 400 || res.status === 401) {
          return false;
        } else {
          return res.json();
        }
      } catch (err) {
        return err;
      }
    })
    .then((data) => data)
    .catch((err) => console.log(err));
};

export const getToken = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    credentials: 'include',
    headers: {
      'Accept': "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    },

  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => console.log(err));
};
