const axios = require("axios")

module.exports = {

    getById: async function (id){
        let result;

        try {
            
            const options = {
                method: "GET",
                url: "https://kasirpintar.co.id/allAddress.txt",
                responseType: "json"
            }

            const get_address = await axios(options)
            if (!get_address) return result = null

            /** Filtering */
            let address = get_address.data
            let data = []
            Object.keys(address).map((i) => {
                if(Array.isArray(address[i])){
                    let add = address[i].filter((value) => {
                        return value.id === id
                    })

                    if(add.length > 0){
                        add.map((i) => data.push(i))
                    } 
                }
            })

            result = data

        } catch (error) {
            result = null
            console.log(error);
        }

        return result;

    },

    getKecamatanByKotaId: async function (id){
        let result;

        try {
            
            const options = {
                method: "GET",
                url: "https://kasirpintar.co.id/allAddress.txt",
                responseType: "json"
            }

            const get_address = await axios(options)
            if (!get_address) return result = null

            /** Filtering */
            let address = get_address.data
            Object.keys(address).map((i) => {
                if(i === "address_kecamatan"){
                    result = address[i].filter((value) => {
                        return value.kota_id === id
                    })
                }
            })

        } catch (error) {
            result = null
            console.log(error);
        }

        return result;

    },
}