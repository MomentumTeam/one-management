import axios from "axios";


const getBitLockerPassword = (type, input) => {
    return new Promise((resolve, reject) => {
        axios
            .get(`/api/application/BitLocker/password/`,
                {
                    params: {
                        type: type, input: input
                    }
                }
            )
            .then((res) => {
                resolve(res);
            })
            .catch((err) => reject(err));
    });
}

const getLapsPassword = (computerName) => {
    return new Promise((resolve, reject) => {
        axios
            .get(`/api/application/Laps/AdminPassword`,
                {
                    params: {
                        computerName: computerName
                    }
                }
            )
            .then((res) => {
                resolve(res);
            })
            .catch((err) => reject(err));
    });
}

const updateVlan = (macAddress, location, vlan) => {
    return new Promise((resolve, reject) => {
        axios
            .put(`/api/application/VlanChange`,
                {
                    macAddress: macAddress,
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



const apis = {
    getBitLockerPassword,
    getLapsPassword,
    updateVlan,

}

export default apis;