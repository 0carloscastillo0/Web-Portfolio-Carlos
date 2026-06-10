import Joi from "joi";

/// Joi schema for validating user registration input
export const registerSchema = Joi.object({
    name: Joi.string().trim().required(),
    lastname: Joi.string().trim().required(),
    email: Joi.string().trim().email().required(),
    password: Joi.string().min(8).required(),
    title: Joi.string().trim().required(),
    city: Joi.string().trim().required(),
    country: Joi.string().trim().required(),
    description: Joi.string().trim().required(),
});

/// Joi schema for validating login input
export const loginSchema = Joi.object({
    email: Joi.string().trim().email().required(),
    password: Joi.string().required(),
});

/// Joi schema for validating refresh token input sent through JSON body
export const refreshTokenSchema = Joi.object({
    refreshToken: Joi.string().required(),
});

/// Joi schema for validating logout input sent through JSON body
export const logoutSchema = Joi.object({
    refreshToken: Joi.string().required(),
});

/// Joi schema for validating authenticated password change input
export const changePasswordSchema = Joi.object({
    currentPassword: Joi.string().required(),
    newPassword: Joi.string().min(8).required(),
});
