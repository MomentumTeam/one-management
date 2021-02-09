import axios from "axios";


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
                resolve(res);
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
                resolve(res);
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
    getLocationOptions

}

export default apis;