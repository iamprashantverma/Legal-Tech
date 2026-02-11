const userRoleSchema = {
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: {
        type: "integer",
        minimum: 1,
        errorMessage: {
          type: "User ID must be a number",
          minimum: "User ID must be greater than 0"
        }
      }
    },
    additionalProperties: false,
    errorMessage: {
      required: {
        id: "User ID is required"
      }
    }
  },

  body: {
    type: "object",
    required: ["role"],
    properties: {
      role: {
        type: "string",
        enum: ["ADMIN", "CLIENT", "LAWYER", "LEGAL_MANAGER", "PARALEGAL"],
        errorMessage: {
          type: "Role must be a string",
          enum: "Invalid role provided"
        }
      }
    },
    additionalProperties: false,
    errorMessage: {
      required: {
        role: "Role is required"
      }
    }
  }
};

module.exports = { userRoleSchema };
