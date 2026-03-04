import Joi from "joi";

/// Joi schema for validating contact creation/edition input
export const contactCreateSchema = Joi.object({
    name: Joi.string().trim().required(),
    icon: Joi.string().trim().required(),
    url: Joi.string().trim().required(),
});

/// Joi schema for validating userId URL parameter
export const userIdParamSchema = Joi.object({
    userId: Joi.number().integer().positive().required(),
});