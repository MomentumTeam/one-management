import axios from "axios";

export const getUserFromServer = () => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/users`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => reject(err));
  });
};

export const updateUserInServer = (user) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`/api/users`, user)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => reject(err));
  });
};
