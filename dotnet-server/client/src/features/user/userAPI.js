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

    axios({
      method: 'put',
      url: '/api/users',
      data: user,
      headers: {
        'Content-Type': 'application/json'
      }
  })
  .then(function (response) {
      resolve(response.data)
  })
  .catch(function (error) {
      reject(error);
  });
  
});
};

