const userRoute = require("./User");
const authRouter = require("./Auth");
const articlesRoute = require("./Articles");

const routes = (app, prefix) => {
  app.use(`${prefix}/auth`, authRouter);
  app.use(`${prefix}/users`, userRoute);
  app.use(`${prefix}/article`, articlesRoute);
};

module.exports = routes;
