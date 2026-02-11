const { Sequelize } = require("sequelize");
const { AsyncLocalStorage } = require("node:async_hooks");
const config = require("../config/config");

const env = process.env.NODE_ENV || "development";
const dbConfig = config[env];

// Request-scoped storage
const asyncLocalStorage = new AsyncLocalStorage();

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    ...dbConfig,
    define: {
      timestamps: true,
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
    logging: false,
  }
);

// Helper to get current store
function getStore() {
  const store = asyncLocalStorage.getStore();
  return store;
}

sequelize.addHook("afterCreate", async (instance) => {
  // prevent cycle
  if (instance.constructor.name === "AuditLog") return;

  const store = getStore();
  if (!store) return;

  const AuditLog = sequelize.models.AuditLog;
  if (!AuditLog) return;

  await AuditLog.create({
    actorId: store.actorId,
    actorRole: store.actorRole,
    actorType: store.actorType,
    action: "CREATE",
    requestId: store.requestId,
    entityType: instance.constructor.name,
    entityId: instance.id,
    afterState: instance.toJSON(),
    metadata: {
      ip: store.ip,
      userAgent: store.userAgent,
    },
  });
});


sequelize.addHook("afterUpdate", async (instance) => {
  // prevent cycle
  if (instance.constructor.name === "AuditLog") return;

  const store = getStore();
  if (!store) return;

  const AuditLog = sequelize.models.AuditLog;
  if (!AuditLog) return;

  await AuditLog.create({
    actorId: store.actorId,
    actorRole: store.actorRole,
    actorType: store.actorType,
    action: "UPDATE",
    entityType: instance.constructor.name,
    entityId: instance.id,
    beforeState: { ...instance._previousDataValues },
    afterState: instance.toJSON(),
    metadata: {
      ip: store.ip,
      userAgent: store.userAgent,
    },
  });
});

module.exports = {
  sequelize,
  asyncLocalStorage,
};
