const fp = require("fastify-plugin");
const { AppError } = require("../errors/app.error");

module.exports = fp(async function (fastify) {

  fastify.setErrorHandler((error, request, reply) => {

    let statusCode = error.statusCode || 500;
    let message = error.message ;

    if (error instanceof AppError) {
      statusCode = error.statusCode;
      message = error.message;

    } else if (error.validation) {
      statusCode = 400;
      message = error.validation
        .map(err => {
          const field = err.instancePath
            ? err.instancePath.replace("/", "")
            : err.params?.missingProperty;
          return field ? `${field}: ${err.message}` : err.message;
        })
        .join(", ");

    } else if (error.code && error.code.startsWith("FST_JWT")) {
      statusCode = 401;
      message = error.message;

    } else if (error.name === "SequelizeUniqueConstraintError") {
      statusCode = 409;
      message =
        error.errors?.map(err => `${err.path}: ${err.message}`).join(", ") ||
        error.message;

    } else if (error.name === "SequelizeForeignKeyConstraintError") {
      statusCode = 400;

    } else if (error.name === "SequelizeValidationError") {
      statusCode = 400;
      message = error.errors.map(e => e.message).join(", ");
    }

    reply.status(statusCode).send({
      success: false,
      message
    });
  });
  
});
