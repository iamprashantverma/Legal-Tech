const lawyerController = require("../controllers/lawyer.controller");
const {idParamSchema} = require("../validation/idParam.validation");
const clientController = require("../controllers/client.controller");
const { getIntakesSchema } = require("../validation/intake.validation");
async function lawyerRoutes(fastify, options) {

  // Authentication && authorization
  fastify.addHook("onRequest", fastify.authenticate);
  fastify.addHook("preHandler", fastify.isLawyer);

  // Get intake  details By Id for lawyer review
  fastify.get("/intakes/:id",{ idParamSchema }, lawyerController.getIntakeById );
  
  // Add review comment to an intake
  fastify.post("/intakes/:id/comment", { idParamSchema }, lawyerController.addCommentToIntake );
  
  // get lawyer profile
  fastify.get("/me", clientController.getMyProfile );

  // return pending intakes for review
  fastify.get("/intakes",{ schema:getIntakesSchema },lawyerController.findPendingIntakes);
}

module.exports = lawyerRoutes;
