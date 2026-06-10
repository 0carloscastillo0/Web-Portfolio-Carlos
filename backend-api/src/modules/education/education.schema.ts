import Joi from "joi";

/// Joi schema for validating education creation input
export const educationCreateSchema = Joi.object({
    place: Joi.string().trim().required(),
    name: Joi.string().trim().required(),
    startDate: Joi.date().iso().max('now').required(),
    endDate: Joi.date().iso().max('now').min(Joi.ref("startDate")).allow(null).optional(),
    description: Joi.string().trim().allow("").optional(),
});

/// Joi schema for validating education update input
export const educationUpdateSchema = Joi.object({
    place: Joi.string().trim().required(),
    name: Joi.string().trim().required(),
    startDate: Joi.date().iso().max('now').required(),
    endDate: Joi.date().iso().max('now').min(Joi.ref("startDate")).allow(null).optional(),
    description: Joi.string().trim().allow("").optional(),
});

/// Joi schema for validating userId URL parameter
export const userIdParamSchema = Joi.object({
    userId: Joi.number().integer().positive().required(),
});

/// Joi schema for validating userId and educationId URL parameters
export const userEducationParamSchema = Joi.object({
    userId: Joi.number().integer().positive().required(),
    educationId: Joi.number().integer().positive().required(),
});