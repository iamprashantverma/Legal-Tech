const fp = require("fastify-plugin");
const { asyncLocalStorage } = require("../config/database");

module.exports = fp(async function auditorPlugin(fastify) {
  fastify.addHook("preHandler", (request, reply, done) => {
    const store = {
      requestId: request.id,     
      actorId: request.user?.id || null,
      actorRole: request.user?.role || null,
      actorType: request.user ? "USER" : "SYSTEM",
      ip: request.ip,
      userAgent: request.headers["user-agent"],
    };

    asyncLocalStorage.run(store, () => {
      done();
    });
  });
});
