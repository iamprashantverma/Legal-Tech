const { default: fastify } = require("fastify");
const {AuditLog}  = require("../models");
const auditLogService = {
  
  async list({
    page = 1,
    limit = 20,
    entityType,
    entityId,
    actorId,
    action,
    from,
    to,
  }) {
    const where = {};

    if (entityType) where.entityType = entityType;
    if (entityId) where.entityId = entityId;
    if (actorId) where.actorId = actorId;
    if (action) where.action = action;

    if (from || to) {
      where.timestamp = {};
      if (from) where.timestamp[Op.gte] = from;
      if (to) where.timestamp[Op.lte] = to;
    }

    const offset = (page - 1) * limit;

    const { rows, count } = await AuditLog.findAndCountAll({
      where,
      limit,
      offset,
      order: [['timestamp', 'DESC']],
    });

    return {
      data: rows.map(auditLogService.formatForUI),
      pagination: {
        page,
        limit,
        total: count,
        totalPages: Math.ceil(count / limit),
      },
    };
  },

  async getEntityHistory(entityType, entityId) {
    const logs = await AuditLog.findAll({
      where: { entityType, entityId },
      order: [['timestamp', 'ASC']],
    });

    return logs.map(auditLogService.formatForUI);
  },

  // Shape data for UI
  formatForUI(log) {
    return {
      id: log.id,
      timestamp: log.timestamp,
      action: log.action,
      entity: {
        type: log.entityType,
        id: log.entityId,
      },
      actor: {
        id: log.actorId,
        role: log.actorRole,
        type: log.actorType,
      },
      requestId: log.requestId,
      beforeState: log.beforeState,
      afterState: log.afterState,
      metadata: log.metadata,
    };
  },

};

module.exports = { auditLogService };