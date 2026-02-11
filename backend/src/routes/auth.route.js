const authController = require("../controllers/auth/auth.controller");
const { signupSchema, loginSchema } = require("../validation/auth.validation");

async function authRoutes(fastify, options) {

  fastify.post("/signup",{ schema: signupSchema }, authController.signup );
  fastify.post("/login",{ schema: loginSchema }, authController.login );
}

module.exports = authRoutes;
