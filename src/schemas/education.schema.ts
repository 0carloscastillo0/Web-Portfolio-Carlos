import Joi from "joi";

/// Joi schema for validating education creation/edition input
export const educationCreateSchema = Joi.object({
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