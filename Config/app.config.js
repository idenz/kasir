if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

module.exports = {
    secret_key: process.env.JWT_SECRETKEY,
    mongodb_url: process.env.MONGODB_URL,
    port: process.env.PORT || 3005,
    client_url: process.env.CLIENT_URL || 'http://localhost:4200',
};