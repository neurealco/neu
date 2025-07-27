"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.youtubeStatsValidator = exports.webhookValidator = exports.validate = void 0;
const express_validator_1 = require("express-validator");
const validate = (validations) => {
    return async (req, res, next) => {
        await Promise.all(validations.map(validation => validation.run(req)));
        const errors = (0, express_validator_1.validationResult)(req);
        if (errors.isEmpty()) {
            return next();
        }
        res.status(400).json({ errors: errors.array() });
    };
};
exports.validate = validate;
// Validador para webhook de Theorem Reach
exports.webhookValidator = [
    (0, express_validator_1.body)('user_id').isString().notEmpty(),
    (0, express_validator_1.body)('amount').isInt({ min: 0 }),
    (0, express_validator_1.body)('survey_id').isString().notEmpty(),
    (0, express_validator_1.body)('status').isIn(['completed', 'terminated'])
];
// Validador para solicitudes de YouTube
exports.youtubeStatsValidator = [
    (0, express_validator_1.body)('channelId').optional().isString(),
    (0, express_validator_1.body)('refresh').optional().isBoolean()
];
