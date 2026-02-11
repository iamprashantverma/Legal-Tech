const { intakeService } = require("../services/intake.service");

const legalController = {

  async getIntakeById(request, reply) {
    const { id } = request.params;

    const intake = await intakeService.getIntakeById(id, request.log);

    return reply.code(200).send({
      success: true,
      data: intake
    });
  },

  async updateIntakeStatus(request, reply) {
    const { id } = request.params;
    const { status } = request.body;

    
    const updatedIntake = await intakeService.updateIntakeStatusByLegalManager(id, status, request.log);

    return reply.code(200).send({
      success: true,
      message: `Intake ${String(status).toLowerCase()} successfully`,
      data: updatedIntake
    });
  }

};

module.exports = legalController;
