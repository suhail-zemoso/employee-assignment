/**
 * @file common.js
 * @summary Contains common constants for app
 * @description This file defines constant variables used by app. It also reads .env file and merges it with
 * our defined constants
 * */

const { config } = require("dotenv");

const dotEnv = config();

if (dotEnv.error) {
    throw dotEnv.error;
}

const {
    PORT,
    ENV,
    JWT_SECRET,
    MONGO_URI,
    ENABLE_ACCESS_LOGS,
    ENABLE_DEBUG_LOGS,
    IS_CLUSTERING_ENABLED,
    CHARSET,
    RECORDS_PER_PAGE,
    JWT_EXPIRE_TIME,
    BCRYPT_SALT_ROUNDS,
} = process.env;

const commonConstants = {
    PORT,
    ENV,
    JWT_SECRET,
    JWT_EXPIRE_TIME,
    BCRYPT_SALT_ROUNDS,
    MONGO_URI,
    CHARSET,
    RECORDS_PER_PAGE,
    IS_CLUSTERING_ENABLED: IS_CLUSTERING_ENABLED === "true",
    ENABLE_ACCESS_LOGS: ENABLE_ACCESS_LOGS === "true",
    ENABLE_DEBUG_LOGS: ENABLE_DEBUG_LOGS === "true",
    ENVIRONMENTS: {
        DEVELOPMENT: "development",
        PRODUCTION: "production"
    },
    LOG_CONFIG: {
        DATE_PATTERN: "YYYY-MM-DD",
        MAX_FILE: "30d"
    },
    LOG_LEVELS: {
        INFO: "info",
        ERROR: "error",
        DEBUG: "debug",
    },
    SUCCESS: {
        CODE: 200
    },
    ERROR: {
        BAD_REQUEST: {
            TYPE: "BAD_REQUEST",
            CODE: 400
        },
        NOT_FOUND: {
            TYPE: "NOT_FOUND",
            CODE: 404
        },
        INTERNAL_SERVER_ERROR: {
            TYPE: "INTERNAL_SERVER_ERROR",
            CODE: 500
        },
        UNAUTHORIZED: {
            TYPE: "UNAUTHORIZED",
            CODE: 403
        },
        UNAUTHENTICATED: {
            TYPE: "UNAUTHENTICATED",
            CODE: 401
        },
        UNPROCESSABLE_ENTITY: {
            TYPE: "UNPROCESSABLE_ENTITY",
            CODE: 422
        }
    }
};

module.exports = {
    commonConstants,
};
