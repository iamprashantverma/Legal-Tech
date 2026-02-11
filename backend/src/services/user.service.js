const { User } = require("../models/index");
const { NotFoundError, ConflictError } = require("../errors/index");

const userService = {

  // Get user profile details by ID
  async getProfileDetail(userId, log = console) {
    log.info(
      { userId },
      "Fetching user profile"
    );

    const user = await User.findByPk(userId);

    if (!user) {
      log?.warn(
        { userId },
        "User not found while fetching profile"
      );
      throw new NotFoundError(`User not found with id ${userId}`);
    }

    log?.info(
      { userId, role: user.role },
      "User profile fetched successfully"
    );

    return user;
  },

  // Update a user's role
  async changeUserRole(userId, newRole, log = console) {
    log.info(
      { userId, newRole },
      "Attempting to change user role"
    );

    const user = await User.findByPk(userId);

    if (!user) {
      log.warn(
        { userId },
        "User not found while changing role"
      );
      throw new NotFoundError(`User not found with id ${userId}`);
    }

    if (user.role === "ADMIN") {
      log.warn(
        { userId, currentRole: user.role },
        "Blocked attempt to change ADMIN role"
      );
      throw new ConflictError("Admin role cannot be changed");
    }

    const oldRole = user.role;
    
    user.role = newRole;
    await user.save();

    log.info(
      { userId, oldRole, newRole },
      "User role changed successfully"
    );

    return user;
  }
  
};

module.exports = { userService };
