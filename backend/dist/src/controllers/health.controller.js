"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDatabaseHealth = exports.getHealth = void 0;
const database_1 = require("../config/database");
const getHealth = (_request, response) => {
    response.status(200).json({ status: 'ok' });
};
exports.getHealth = getHealth;
const getDatabaseHealth = async (_request, response) => {
    try {
        await (0, database_1.checkDatabaseConnection)();
        response.status(200).json({ status: 'ok', database: 'connected' });
    }
    catch (error) {
        console.error('Database connection failed:', error);
        response.status(503).json({ status: 'error', database: 'disconnected' });
    }
};
exports.getDatabaseHealth = getDatabaseHealth;
