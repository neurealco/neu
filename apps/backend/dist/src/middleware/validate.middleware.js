"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: Object.getOwnPropertyDescriptor(all, name).get
    });
}
_export(exports, {
    get validate () {
        return validate;
    },
    get webhookValidator () {
        return webhookValidator;
    },
    get youtubeStatsValidator () {
        return youtubeStatsValidator;
    }
});
const _expressvalidator = require("express-validator");
const validate = (validations)=>{
    return async (req, res, next)=>{
        await Promise.all(validations.map((validation)=>validation.run(req)));
        const errors = (0, _expressvalidator.validationResult)(req);
        if (errors.isEmpty()) {
            return next();
        }
        res.status(400).json({
            errors: errors.array()
        });
    };
};
const webhookValidator = [
    (0, _expressvalidator.body)('user_id').isString().notEmpty(),
    (0, _expressvalidator.body)('amount').isInt({
        min: 0
    }),
    (0, _expressvalidator.body)('survey_id').isString().notEmpty(),
    (0, _expressvalidator.body)('status').isIn([
        'completed',
        'terminated'
    ])
];
const youtubeStatsValidator = [
    (0, _expressvalidator.body)('channelId').optional().isString(),
    (0, _expressvalidator.body)('refresh').optional().isBoolean()
];
