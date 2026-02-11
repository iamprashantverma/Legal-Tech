const fp = require("fastify-plugin");

async function authPlugin(fastify, options) {

  // Authentication
  fastify.decorate("authenticate", async function (request, reply) {
    try {
      await request.jwtVerify();
    } catch (err) {
      return reply.code(401).send({
        success: false,
        message: "Unauthorized",
      });
    }
  });

  // Role guard
  const roleGuard = (allowedRoles = []) => {
    return async function (request, reply) {
      const { role } = request.user || {};

      if (!role || !allowedRoles.includes(role)) {
        return reply.code(403).send({
          success: false,
          message: "Forbidden: Access denied",
        });
      }
    };
  };

  // Role-based decorators
  fastify.decorate("isAdmin", roleGuard(["ADMIN"]));
  fastify.decorate("isClient", roleGuard(["CLIENT"]));
  fastify.decorate("isLawyer", roleGuard(["LAWYER"]));
  fastify.decorate("isLegalManager", roleGuard(["LEGAL_MANAGER"]));
  fastify.decorate("isParalegal", roleGuard(["PARALEGAL"]));
}

module.exports = fp(authPlugin);
