const fp = require("fastify-plugin");
const Ajv = require("ajv");
const addFormats = require("ajv-formats");

module.exports = fp(async function (fastify) {
  const ajv = new Ajv({ allErrors: true, strict: false, coerceTypes: true, useDefaults: true });

  addFormats(ajv);

  function isFutureDateValidate(schema, data) {
    if (!schema) return true;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const inputDate = new Date(data);
    const isValid = inputDate.getTime() >= today.getTime();

    if (!isValid) {
      isFutureDateValidate.errors = [
        {
          keyword: "isFutureDate",
          message: "Date must be today or a future date",
          params: {},
        },
      ];
    }

    return isValid;
  }

  function isPastDateValidate(schema, data) {
    if (!schema) return true;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const inputDate = new Date(data);
    const isValid = inputDate.getTime() <= today.getTime();

    if (!isValid) {
      isPastDateValidate.errors = [
        {
          keyword: "isPastDate",
          message: "Date must be today or a past date",
          params: {},
        },
      ];
    }

    return isValid;
  }

  ajv.addKeyword({
    keyword: "isFutureDate",
    type: "string",
    errors: true,
    validate: isFutureDateValidate,
  });

  ajv.addKeyword({
    keyword: "isPastDate",
    type: "string",
    errors: true,
    validate: isPastDateValidate,
  });

  fastify.setValidatorCompiler(({ schema }) => {
    return ajv.compile(schema);
  });
  
});
