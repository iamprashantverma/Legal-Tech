const { Intake, IntakeReview } = require("../models");
const { NotFoundError, ConflictError, BadRequestError } = require("../errors");
const {documentService} = require("../services/document.service");
const intakeService = {

  async createIntake(payload, files, log = console) {

    log.info({ user_id: payload.userId }, "Creating intake");

    const uploadedDocs = [];
    const uploadedIds = [];
    if (files && (files.uploadId?.length || files.uploadDocs?.length)) {
      log.info("Uploading intake documents with versioning");

      const author = payload.userId ?? "System";

      // Upload document files 
      if (files.uploadDocs?.length) {
        for (const file of files.uploadDocs) {
          const result = await documentService.uploadDocumentToCloudinary(
            file,
            author
          );
          uploadedDocs.push(result.cloudUrl);
        }
      }

      // Upload ID images 
      if (files.uploadId?.length) {
        for (const file of files.uploadId) {
          const result = await documentService.uploadDocumentToCloudinary(
            file,
            author
          );
          console.log(result,"Result");
          uploadedIds.push(result.cloudUrl);
        }
      }
    }

    payload.uploadDocs = uploadedDocs;
    payload.uploadId = uploadedIds;
    const intake = await Intake.create(payload);

    log.info({ intakeId: intake.id }, "Intake created successfully");

    return intake;
  },

  async getIntakeById(id, log = console) {
    log.debug({ intakeId: id }, "Fetching intake");

    const intake = await Intake.findByPk(id);

    if (!intake) {
      log.warn({ intakeId: id }, "Intake not found");
      throw new NotFoundError(`Intake not found with id ${id}`);
    }

    return intake;
  },

  async getIntakesByUser(userId, query = {}, log = console) {
    log.debug({ userId, query }, "Fetching user intakes");

    const { status, page = 1, limit = 10 } = query;
    const where = { userId };

    if (status) where.status = status;

    const offset = (page - 1) * limit;

    const { rows, count } = await Intake.findAndCountAll({
      where,
      limit: Number(limit),
      offset,
      order: [["created_at", "DESC"]],
    });

    return {
      data: rows,
      pagination: {
        total: count,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(count / limit),
      },
    };
  },

  async transitionIntakeStatus(
    { intakeId, from, to, onApprove = false, onReject = false },
    log = console
  ) {
    log.info({ intakeId, from, to }, "Transitioning intake status");

    const intake = await Intake.findByPk(intakeId);

    if (!intake) {
      log.warn({ intakeId }, "Intake not found");
      throw new NotFoundError(`Intake not found: ${intakeId}`);
    }

    if (intake.status !== from) {
      throw new ConflictError(`Cannot change status from ${intake.status}`);
    }

    if (intake.status === to) {
      throw new ConflictError(`Intake already in ${to} state`);
    }

    intake.status = to;

    if (to === "APPROVED" && onApprove) intake.approvedAt = new Date();
    if (to === "REJECTED" && onReject) intake.rejectedAt = new Date();

    await intake.save();

    log.info({ intakeId, newStatus: to }, "Status updated");

    return intake;
  },

  async updateIntakeStatusByLegalManager(intakeId, status, log = console) {
    if (!["APPROVED", "REJECTED"].includes(status)) {
      throw new ConflictError(
        "Legal manager can only set status to APPROVED or REJECTED"
      );
    }

    return this.transitionIntakeStatus(
      {
        intakeId,
        from: "IN_REVIEW",
        to: status,
        onApprove: true,
        onReject: true,
      },
      log
    );

    // on approved create the Case
  },

  async addComment(intakeId, comment, lawyerId, log = console) {
    if (!comment || !comment.trim()) {
      throw new BadRequestError("Comment cannot be empty");
    }

    log.info({ intakeId, lawyerId }, "Adding intake review");

    return Intake.sequelize.transaction(async (transaction) => {
      const intake = await Intake.findByPk(intakeId, { transaction });

      if (!intake) {
        throw new NotFoundError(`Intake not found with id ${intakeId}`);
      }

      if (intake.status !== "PENDING") {
        throw new BadRequestError(
          "Comments can only be added when intake status is PENDING"
        );
      }

      const existingReview = await IntakeReview.findOne({
        where: { intakeId },
        transaction,
      });

      if (existingReview) {
        throw new ConflictError("Review already exists for this intake");
      }

      const review = await IntakeReview.create(
        { intakeId, lawyerId, comment: comment.trim() },
        { transaction }
      );

      intake.status = "IN_REVIEW";
      await intake.save({ transaction });

      log.info({ intakeId }, "Review added and intake moved to IN_REVIEW");

      return { intakeId: intake.id, status: intake.status, review };
    });
  },

  async findPendingIntakes(query = {}, log = console) {
    log.debug({ query }, "Fetching pending intakes");

    const { page = 1, limit = 10 } = query;
    const offset = (page - 1) * limit;

    const { rows, count } = await Intake.findAndCountAll({
      where: { status: "PENDING" },
      limit: Number(limit),
      offset,
      order: [["created_at", "DESC"]],
    });

    return {
      data: rows,
      pagination: {
        total: count,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(count / limit),
      },
    };
  },
};

module.exports = { intakeService };
