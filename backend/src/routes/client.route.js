const clientController = require("../controllers/client.controller");
const { getIntakesSchema,intakeSchema } = require("../validation/intake.validation");
const { idParamSchema } = require("../validation/idParam.validation");

async function clientRoutes(fastify, options) {

  fastify.addHook("onRequest", fastify.authenticate);
  fastify.addHook("preHandler", fastify.isClient);

  fastify.get("/me", clientController.getMyProfile);

  fastify.post("/intake", clientController.createIntake);

  fastify.get("/intakes/:id",{ schema: idParamSchema },clientController.getIntakeById );

  fastify.get( "/intakes", { schema: getIntakesSchema }, clientController.getIntakeByUserId );
}

module.exports = clientRoutes;
