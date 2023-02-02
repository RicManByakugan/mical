const app = require("./app")
const routeAdmin = require("./route/routeAdmin")
const routeClient = require("./route/routeClient")

app.start(4000, routeAdmin, routeClient)