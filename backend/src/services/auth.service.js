const bcrypt = require("bcrypt");
const  User  = require("../models/user.model");
const { ConflictError, UnauthorizedError } = require("../errors/index");

const authService = {

  async signup(payload) {
    const { name, email, password, role } = payload;

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      throw new ConflictError("Email already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role
    });

    return user;
  },

  async login(payload) {
    const {email, password} = payload;
    const user = await  User.findOne({ where: { email } });
    
    if (!user) {
      throw new UnauthorizedError("Invalid email");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedError("Invalid  password");
    }
  
    return user;
  }
  
};

module.exports = { authService };
