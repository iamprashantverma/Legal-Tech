const { userService } = require("../services/user.service");

const adminController = {
  
  async getMyProfile(request, reply) {

    const userId = request.user.id;

    const user = await userService.getProfileDetail(userId, request.log);

    return reply.code(200).send({
      success: true,
      data:{...user,password:null}
    });
  },
  
  async changeUserRole(request, reply) {
    
    const { id } = request.params;
    const { role } = request.body;

    const updatedUser = await userService.changeUserRole(id, role, request.log);

    return reply.code(200).send({
      success: true,
      message: "User role updated successfully",
      data: updatedUser
    });
  }

};

module.exports = adminController
