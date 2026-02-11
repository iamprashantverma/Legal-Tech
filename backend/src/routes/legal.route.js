const legalController = require("../controllers/legal.controller");
const {idParamSchema} = require("../validation/idParam.validation");

async function legalRoutes(fastify, options) {

  // Authenticate && Authorize
  fastify.addHook("onRequest", fastify.authenticate);
  fastify.addHook("preHandler", fastify.isLegalManager);

  // Get intake by ID for legal review
  fastify.get("/intakes/:id", { idParamSchema } , legalController.getIntakeById);
 
  // Update intake status (APPROVED / REJECTED)
  fastify.patch("/intakes/:id/status",{ idParamSchema },legalController.updateIntakeStatus);

  
}

module.exports = legalRoutes;
