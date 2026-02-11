const { healthService } = require("../services/health.service");

const healthController = {

  async getHealthStatus(request, reply) {

    const status = await healthService.getHealthStatus();

    reply.status(200).send({
        success: true,
        data: status
    });
  },

  async getHealthDetails(request, reply) {
    
    const details = await healthService.getHealthDetails();

    reply.status(200).send({
        success: true,
        data: details
    });
  },
};

module.exports = healthController;
