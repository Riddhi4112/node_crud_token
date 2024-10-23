const userRouter = require("./user/userRoutes")

module.exports = {
    routes: function (app) {
        app.use("/user", userRouter)
    }
}