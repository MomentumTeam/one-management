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
