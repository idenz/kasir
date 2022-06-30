const UserModel = require('../../Database/mongodb.database').User

module.exports = {

    create: async function (body){
        let result;

        try {

            /**
             * List code
             * 1 => exist
             */
            
            const find_by_email = await this.getByEmail(body.email)
            if(find_by_email) return result = 1
            
            result = await UserModel.create(body)
            if(!result) result = null

        } catch (error) {
            result = null
            console.log(error);
        }

        return result;

    },

    getByEmail: async function (email){
        let result;

        try {

            let filter = { isDelete: false, email: email }
            result = await UserModel.findOne(filter)

            if(!result) result = null
            
        } catch (error) {
            result = null
            console.log(error);
        }

        return result
    }
}