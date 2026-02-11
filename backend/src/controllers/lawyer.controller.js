const { intakeService } = require("../services/intake.service");

const lawyerController = {

  async getIntakeById(request, reply) {
    const { id } = request.params;

    const intake = await intakeService.getIntakeById(id, request.log);

    return reply.code(200).send({
      success: true,
      data: intake
    });
  },

  async addCommentToIntake(request, reply) {
    const { id } = request.params;
    const { comment } = request.body;
    const userId = request.user.id;

    const updatedIntake = await intakeService.addComment(
      id,
      comment,
      userId,
      request.log   
    );

    return reply.code(200).send({
      success: true,
      message: "Comment added successfully",
      data: updatedIntake
    });
  },

  async findPendingIntakes(request, reply) {
    const { page, limit } = request.query;

    const result = await intakeService.findPendingIntakes(
      { page, limit },
      request.log 
    );

    return reply.code(200).send({
      success: true,
      data: result
    });
  }

};

module.exports = lawyerController;
