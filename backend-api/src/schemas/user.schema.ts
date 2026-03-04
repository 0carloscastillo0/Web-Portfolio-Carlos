import Joi from "joi";

/// Joi schema for validating user creation/edition input
export const userCreateSchema = Joi.object({
    name: Joi.string().trim().required(),
    lastname: Joi.string().trim().required(),
    email: Joi.string().trim().email().required(),
    title: Joi.string().trim().required(),
    city: Joi.string().trim().required(),
    country: Joi.string().trim().required(),
    description: Joi.string().trim().required(),
    urlCV: Joi.string().trim().optional(),
    urlPhoto: Joi.string().trim().optional(),
});