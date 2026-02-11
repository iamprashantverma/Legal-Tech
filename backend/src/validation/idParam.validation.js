exports.idParamSchema = {
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: {
        type: "integer",
        minimum: 1,
        errorMessage: {
          type: "ID must be a number",
          minimum: "ID must be greater than 0"
        }
      }
    },
    additionalProperties: false,
    errorMessage: {
      required: {
        id: "ID is required"
      }
    }
  }
};
