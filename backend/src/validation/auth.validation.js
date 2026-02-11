exports.signupSchema = {
  body: {
    type: "object",
    required: ["name", "email", "password"],
    properties: {
      name: {
        type: "string",
        minLength: 2,
        errorMessage: {
          type: "Name is required",
          minLength: "Name must be at least 2 characters long"
        }
      },
      email: {
        type: "string",
        format: "email",
        errorMessage: {
          type: "Email is required",
          format: "Email must be a valid email address"
        }
      },
      password: {
        type: "string",
        minLength: 6,
        errorMessage: {
          type: "Password is required",
          minLength: "Password must be at least 6 characters long"
        }
      },
      role: {
        type: "string"
      }
    },
    errorMessage: {
      required: {
        name: "Name is required",
        email: "Email is required",
        password: "Password is required"
      }
    }
  }
};

exports.loginSchema = {
  body: {
    type: "object",
    required: ["email", "password"],
    properties: {
      email: {
        type: "string",
        format: "email",
        errorMessage: {
          type: "Email is required",
          format: "Email must be a valid email address"
        }
      },
      password: {
        type: "string",
        minLength: 1,
        errorMessage: {
          type: "Password is required",
          minLength: "Password cannot be empty"
        }
      }
    },
    errorMessage: {
      required: {
        email: "Email is required",
        password: "Password is required"
      }
    }
  }
};
