module.exports = async function routes(app) {

  // System
  app.register(require("./health.route"), { prefix: "/api/health" })
  app.register(require("./auth.route"), { prefix: "/api/auth" })


  app.register(require("./client.route"), { prefix: "/api/client" })
  app.register(require("./lawyer.route"), { prefix: "/api/lawyer" })
  app.register(require("./legal.route"), { prefix: "/api/legal" })


  app.register(require("./admin.route"), { prefix: "/api/admin" })

}
