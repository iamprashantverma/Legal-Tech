const intakeSchema = {
  body: {
    type: "object",
    required: [
      "name",
      "dob",
      "email",
      "phoneNumber",
      "address",
      "priority",
      "caseType",
      "description",
    ],
    properties: {
      name: {
        type: "string",
        maxLength: 150,
        errorMessage: {
          type: "Name is required",
          maxLength: "Name must not exceed 150 characters"
        }
      },

      dob: {
        type: "string",
        format: "date",
        isPastDate: true,
        errorMessage: {
          type: "Date of birth is required",
          format: "Date of birth must be in YYYY-MM-DD format",
          isPastDate: "Date of birth must be today or a past date",
        },
      },
      
      email: {
        type: "string",
        maxLength: 100,
        format: "email",
        errorMessage: {
          type: "Email is required",
          format: "Email must be a valid email address",
          maxLength: "Email must not exceed 100 characters"
        }
      },

      phoneNumber: {
        type: "string",
        maxLength: 20,
        errorMessage: {
          type: "Phone number is required",
          maxLength: "Phone number must not exceed 20 characters"
        }
      },

      address: {
        type: "string",
        maxLength: 255,
        errorMessage: {
          type: "Address is required",
          maxLength: "Address must not exceed 255 characters"
        }
      },

      priority: {
        type: "string",
        enum: ["LOW", "MEDIUM", "HIGH"],
        errorMessage: {
          type: "Priority is required",
          enum: "Priority must be one of LOW, MEDIUM, or HIGH"
        }
      },

      caseType: {
        type: "string",
        maxLength: 100,
        errorMessage: {
          type: "Case type is required",
          maxLength: "Case type must not exceed 100 characters"
        }
      },

      description: {
        type: "string",
        minLength: 1,
        errorMessage: {
          type: "Description is required",
          minLength: "Description cannot be empty"
        }
      },
    },
    errorMessage: {
      required: {
        name: "Name is required",
        dob: "Date of birth is required",
        email: "Email is required",
        phoneNumber: "Phone number is required",
        address: "Address is required",
        priority: "Priority is required",
        caseType: "Case type is required",
        description: "Description is required",
        uploadDocs: "Documents are required",
        uploadId: "ID proof is required"
      },
      additionalProperties: "Invalid additional fields provided"
    }
  }
};

const getIntakesSchema = {
  query: {
    type: "object",
    properties: {
      status: {
        type: "string",
        enum: ["PENDING", "APPROVED", "REJECTED", "IN_REVIEW"],
        errorMessage: {
          type: "Status must be a string",
          enum:
            "Status must be one of PENDING, APPROVED, REJECTED, or IN_REVIEW"
        }
      },

      page: {
        type: "integer",
        minimum: 1,
        default: 1,
        errorMessage: {
          type: "Page must be a number",
          minimum: "Page must be greater than or equal to 1"
        }
      },

      limit: {
        type: "integer",
        minimum: 1,
        maximum: 100,
        default: 10,
        errorMessage: {
          type: "Limit must be a number",
          minimum: "Limit must be at least 1",
          maximum: "Limit cannot be greater than 100"
        }
      }
    },

    additionalProperties: false,

    errorMessage: {
      additionalProperties: "Invalid query parameter provided"
    }
  }
};

module.exports = {
  intakeSchema,
  getIntakesSchema
};
