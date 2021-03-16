import axios from "axios";

const getBitLockerPassword = (type, input) => {
    return new Promise((resolve, reject) => {
        axios
            .get(`/api/BitLocker`, {
                params: {
                    type: type,
                    input: input,
                },
            })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => reject(err));
    });
};

const getLapsPassword = (computerName) => {
    return new Promise((resolve, reject) => {
        axios
            .get(`/api/Laps`, {
                params: {
                    computerName: computerName,
                },
            })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => reject(err));
    });
};

const addMac = (macAddress) => {
    return new Promise((resolve, reject) => {
        axios
            .post(`/api/allowList`,
                {
                    macAddress: macAddress
                }
            )
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => reject(err));
    });
}

// const getLocationOptions = () => {
//     return new Promise((resolve, reject) => {
//         axios
//             .get(`/api/vlan/locationOptions`)
//             .then((res) => {
//                 resolve(res.data);
//             })
//             .catch((err) => reject(err));
//     });
// };

// const updateVlan = (macAddress, location, vlan) => {
//     return new Promise((resolve, reject) => {
//         axios
//             .post(`/api/Vlan`, {
//                 macAddress: macAddress,
//                 location: location,
//                 vlan: vlan,
//             })
//             .then((res) => {
//                 resolve(res.data);
//             })
//             .catch((err) => reject(err));
//     });
// };

const searchUsers = (userPrefix) => {
    return new Promise((resolve, reject) => {
        axios
            .get(`/api/userManagement/search`, {
                params: {
                    userPrefix: userPrefix,
                },
            })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => reject(err));
    });
};

const getUserStatus = (samAccountName) => {
    return new Promise((resolve, reject) => {
        axios
            .get(`/api/userManagement/userStatus`, {
                params: {
                    samAccountName: samAccountName,
                },
            })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => reject(err));
    });
};

const unlock = (userId) => {
    return new Promise((resolve, reject) => {
        axios
            .put(`/api/userManagement/unlock`, { userId: userId })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => reject(err));
    });
}

const searchGroup = (groupPrefix) => {
    return new Promise((resolve, reject) => {
        axios
            .get(`/api/userManagement/searchGroup`, {
                params: {
                    groupPrefix,
                },
            })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => reject(err));
    });
};

const addGroup = (group) => {
    return new Promise((resolve, reject) => {
        axios
            .patch(`/api/userManagement/addGroup`, {
                ...group
            })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => reject(err));
    });
};

const removeGroup = (group) => {
    return new Promise((resolve, reject) => {
        axios
            .delete(`/api/userManagement/removeGroup`, {
                data: { ...group }
            })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => reject(err));
    });
};

const resetPassword = (userId) => {
    return new Promise((resolve, reject) => {
        axios
            .get(`/api/userManagement/resetPassword`, {
                params: {
                    userId: userId,
                },
            })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => reject(err));
    });
};

const changeDisplayName = (userName, displayname) => {
    return new Promise((resolve, reject) => {
        axios
            .put(`/api/userManagement/displayname`, {
                userName: userName,
                Displayname: displayname,
            })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => reject(err));
    });
};

const getFaq = () => {
    return new Promise((resolve, reject) => {
        axios
            .get(`/api/Faq`)
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => reject(err));
    });
};

const addToFaq = (question) => {
    return new Promise((resolve, reject) => {
        axios
            .post(`/api/Faq`,
                question)
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => reject(err));
    });
};

const removeFromFaq = (id) => {
    return new Promise((resolve, reject) => {
        axios
            .delete(`/api/Faq/remove`,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: { id: id }
                }
            )
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => reject(err));
    });
};

const apis = {
    getBitLockerPassword,
    getLapsPassword,
    addMac,
    // getLocationOptions,
    // updateVlan,
    searchUsers,
    getUserStatus,
    unlock,
    searchGroup,
    addGroup,
    removeGroup,
    resetPassword,
    changeDisplayName,
    getFaq,
    addToFaq,
    removeFromFaq
}

export default apis;
