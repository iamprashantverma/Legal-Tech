const { sequelize } = require("../config/database");

const toGB = (bytes) => `${(bytes / 1024 / 1024 / 1024).toFixed(3)} GB`;

const healthService = {
  
  // Basic application health check
  async getHealthStatus() {
    const timestamp = new Date().toISOString();

    try {
      await sequelize.authenticate();

      return {
        status: "UP",
        timestamp,
        dependencies: {
          database: "UP",
        },
      };
    } catch (error) {
      console.error("[HEALTH] Database check failed:", error.message);

      return {
        status: "DEGRADED",
        timestamp,
        dependencies: {
          database: "DOWN",
        },
      };
    }
  },

  // Detailed system and application health metrics
  async getHealthDetails() {
    const memoryUsage = process.memoryUsage();
    const uptimeSeconds = process.uptime();

    return {
      status: "UP",
      timestamp: new Date().toISOString(),

      uptime: {
        seconds: Math.floor(uptimeSeconds),
        minutes: `${(uptimeSeconds / 60).toFixed(2)} min`,
        hours: `${(uptimeSeconds / 3600).toFixed(2)} hr`,
      },

      memory: {
        rss: toGB(memoryUsage.rss),
        heapTotal: toGB(memoryUsage.heapTotal),
        heapUsed: toGB(memoryUsage.heapUsed),
        external: toGB(memoryUsage.external),
      },

      system: {
        nodeVersion: process.version,
        platform: process.platform,
        env: process.env.NODE_ENV || "development",
      },
    };
  },
  
};

module.exports = { healthService };
