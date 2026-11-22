"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHealth = void 0;
const getHealth = (_request, response) => {
    response.status(200).json({ status: 'ok' });
};
exports.getHealth = getHealth;
