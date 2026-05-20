import Joi from "joi";

/// Joi schema for validating social link creation input
export const socialLinkCreateSchema = Joi.object({
    name: Joi.string().trim().required(),
    icon: Joi.string().trim().required(),
    url: Joi.string().trim().required(),
});

/// Joi schema for validating social link update input
export const socialLinkUpdateSchema = Joi.object({
    name: Joi.string().trim().required(),
    icon: Joi.string().trim().required(),
    url: Joi.string().trim().required(),
});

/// Joi schema for validating userId URL parameter
export const userIdParamSchema = Joi.object({
    userId: Joi.number().integer().positive().required(),
});

/// Joi schema for validating userId and socialLinkId URL parameters
export const userSocialLinkParamSchema = Joi.object({
    userId: Joi.number().integer().positive().required(),
    socialLinkId: Joi.number().integer().positive().required(),
});