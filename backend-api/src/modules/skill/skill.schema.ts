import Joi from "joi";

/// Joi schema for validating skill creation input
export const skillCreateSchema = Joi.object({
    name: Joi.string().trim().required(),
    category: Joi.string().trim().required(),
    icon: Joi.string().trim().required(),
});

/// Joi schema for validating skill update input
export const skillUpdateSchema = Joi.object({
    name: Joi.string().trim().required(),
    category: Joi.string().trim().required(),
    icon: Joi.string().trim().required(),
});

/// Joi schema for validating userId URL parameter
export const userIdParamSchema = Joi.object({
    userId: Joi.number().integer().positive().required(),
});

/// Joi schema for validating userId and skillId URL parameters
export const userSkillParamSchema = Joi.object({
    userId: Joi.number().integer().positive().required(),
    skillId: Joi.number().integer().positive().required(),
});