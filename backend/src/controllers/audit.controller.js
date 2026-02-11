const { auditLogService } = require("../services/audit.service");

const auditController = {

  async getAuditLogs(request, reply) {
    const {
      page,
      limit,
      entityType,
      entityId,
      actorId,
      action,
      from,
      to,
    } = request.query;

    const result = await auditLogService.list({
      page,
      limit,
      entityType,
      entityId,
      actorId,
      action,
      from,
      to,
    });

    return reply.code(200).send({
      success: true,
      data: result.data,
      pagination: result.pagination,
    });
  },

  async getEntityAuditHistory(request, reply) {
    const { entityType, entityId } = request.params;

    const logs = await auditLogService.getEntityHistory(entityType, entityId);

    return reply.code(200).send({
      success: true,
      data: logs,
    });
  },
};

module.exports = { auditController };
