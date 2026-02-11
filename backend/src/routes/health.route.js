const healthController = require("../controllers/health.controller");


const healthRoutes = async (fastify) => {
  
  // Basic health check
  fastify.get('/', healthController.getHealthStatus)
  // Detailed health and system metrics
  fastify.get("/details",healthController.getHealthDetails);
}

module.exports = healthRoutes;