const contentApi = require("./contentApi");
const admin = require("./admin");

module.exports = {
    "content-api": {
        type: "content-api",
        routes: [...contentApi],
    },
    admin: {
        type: "admin",
        routes: [...admin],
    },
};
