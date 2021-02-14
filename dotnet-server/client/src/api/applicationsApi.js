import axios from "axios";
import { useImperativeHandle } from "react";


const getBitLockerPassword = (type, input) => {
    return new Promise((resolve, reject) => {
        axios
            .get(`/api/BitLocker`,
                {
                    params: {
                        type: type, input: input
                    }
                }
            )
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => reject(err));
    });
}

const getLapsPassword = (computerName) => {
    return new Promise((resolve, reject) => {
        axios
            .get(`/api/Laps`,
                {
                    params: {
                        computerName: computerName
                    }
                }
            )
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => reject(err));
    });
}
const searchUsers = (userPrefix) => {
    return new Promise((resolve, reject) => {
        axios
            .get(`/api/userManagement/search`,
            {
                params: {
                    userPrefix: userPrefix
                }
            })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => reject(err));
    });
}

const unlock = (userId) => {
    return new Promise((resolve, reject) => {
        axios
            .put(`/api/userManagement/unlock`,{userId: userId})
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => reject(err));
    });
}

const resetPassword = (userId) => {
    console.log("userId=",userId);
    return new Promise((resolve, reject) => {
        axios
            .get(`/api/userManagement/resetPassword`,
            {
                params: {
                    "userId": userId
                }
            })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => reject(err));
    });
}


const getUserStatus = (samAccountName) => {
    return new Promise((resolve, reject) => {
        axios
            .get(`/api/userManagement/userStatus`,
            {
                params: {
                    samAccountName: samAccountName
                }
            })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => reject(err));
    });
}

const updateVlan = (macAddress, location, vlan) => {
    return new Promise((resolve, reject) => {
        axios
            .post(`/api/Vlan`,
                {
                    mac: macAddress,
                    location: location,
                    vlan: vlan,
                }
            )
            .then((res) => {
                resolve(res);
            })
            .catch((err) => reject(err));
    });
}

const getLocationOptions = () => {
    return new Promise((resolve, reject) => {
        axios
            .get(`/api/vlan/locationOptions`)
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => reject(err));
    });
}



const apis = {
    getBitLockerPassword,
    getLapsPassword,
    updateVlan,
    getLocationOptions,
    searchUsers,
    getUserStatus,
    resetPassword,
    unlock

}

export default apis;