const app = require("./Applications/");
const config = require("./Config/app.config");

/** Start Server */
app.listen(config.port, () => {
    console.log(`server started at port ${config.port}: Restful API`);
})