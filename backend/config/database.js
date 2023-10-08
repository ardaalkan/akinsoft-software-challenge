const mongoose = require("mongoose");
const { MONGO_URL } = process.env;

mongoose.Promise = global.Promise;

exports.connect = () => {}

mongoose
.connect = (MONGO_URL, {
    userNewUrlParse:true
}).then(() => {
    console.log("Database connected success");
}).catch((e) => {
    console.log(e, "database connection failed");
    process.exit(1);
})
