const { userService } = require("../services/user.service");
const {intakeSchema}  = require("../validation/intake.validation");
const { intakeService } = require("../services/intake.service");
const clientController = {
  
  async getMyProfile(request, reply) {

    const userId = request.user.id;

    const user = await userService.getProfileDetail(userId, request.log);

    return reply.code(200).send({
      success: true,
      data:user
    });
  },

  async createIntake(request, reply) {
    
    if (!request.isMultipart()) {
      const err = new Error("Request must be multipart/form-data");
      err.statusCode = 400;
      throw err;
    }

    const fields = Object.create(null);
    const files = {
      uploadDocs: [],
      uploadId: []
    };
    
    for await (const part of request.parts()) {
      if (part.type === "file") {
        const buffer = await part.toBuffer();
       
        if (part.fieldname === "uploadDocs") {
          
          files.uploadDocs.push({
            buffer,
            mimetype: part.mimetype,
            filename: part.filename
          });
        } else if (part.fieldname === "uploadId") {
          files.uploadId.push({
            buffer,
            mimetype: part.mimetype,
            filename: part.filename
          });
        }
      } else {
        fields[part.fieldname] = part.value;
      }
    }
    
    const validate = request.server.validatorCompiler({
      schema: intakeSchema.body,
      method: request.method,
      url: request.routerPath,
      httpPart: "body"
    });

    if (!validate(fields)) {
      const err = new Error("Validation failed");
      err.statusCode = 400;
      err.validation = validate.errors;
      throw err;
    }

    if (!files.uploadDocs.length) {
      const err = new Error("Documents are required");
      err.statusCode = 400;
      throw err;
    }

    if (!files.uploadId.length) {
      const err = new Error("ID proof is required");
      err.statusCode = 400;
      throw err;
    }
    
    const allowedTypes = new Set([
      "image/png",
      "image/jpeg",
      "application/pdf"
    ]);

    for (const file of [...files.uploadDocs, ...files.uploadId]) {
      if (!allowedTypes.has(file.mimetype)) {
        const err = new Error("Invalid file type uploaded");
        err.statusCode = 400;
        throw err;
      }
    }

    const intake = await intakeService.createIntake({...fields,userId: request.user.id},files, request.log);
    return reply.code(201).send({
      success: true,
      message: "Intake created successfully",
      data: intake
    });
  },
  
  async getIntakeById(request, reply) {

    const { id } = request.params;

    const intake = await intakeService.getIntakeById(id,request.log);

    return reply.code(200).send({
      success: true,
      data: intake
    });
  },

  async getIntakeByUserId(request, reply) {

    const userId = request.user.id;
    const { status,page, limit } = request.query;
    const intakes = await intakeService.getIntakesByUser(userId, { status, page, limit },request.log);

    return reply.code(200).send({
      success: true,
      data: intakes
    });
  }
  
};

module.exports = clientController
