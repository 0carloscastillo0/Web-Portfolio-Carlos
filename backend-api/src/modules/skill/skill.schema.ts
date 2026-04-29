import Joi from "joi";

/// Joi schema for validating skill creation/edition input
export const skillCreateSchema = Joi.object({
    name: Joi.string().trim().required(),
    category: Joi.string().trim().required(),
    icon: Joi.string().trim().required(),
});

/// Joi schema for validating userId URL parameter
export const userIdParamSchema = Joi.object({
    userId: Joi.number().integer().positive().required(),
});