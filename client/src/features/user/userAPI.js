import axios from "axios";

export const getUserFromServer = () => {
  return new Promise((resolve, reject) => {
    axios(`/api/users`,{ 
      withCredentials:true,
    })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => reject(err));
  });
};

export const updateUserInServer = (user) => {
  return new Promise((resolve, reject) => {
    axios
      .put(`/api/users`, user,{withCredentials:true})
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => reject(err));
  });
};
