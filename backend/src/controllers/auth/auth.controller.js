const { authService } = require("../../services/auth.service");

const authController = {
  
  async login(request, reply) {
    const user = await authService.login(request.body, request.log);

    const token = await reply.jwtSign({
      id: user.id,
      role: user.role,
      email: user.email,
      name: user.name
    });

    reply.code(200).send({
      success: true,
      token,
      data:user
    });
  },

  async signup(request, reply) {
    const user = await authService.signup(request.body, request.log);
    reply.code(201).send({
      success: true,
      message: "User registered successfully",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  }
  
};

module.exports = authController;
