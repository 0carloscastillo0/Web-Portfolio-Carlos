import Joi from "joi";

/// Joi schema for validating project creation/edition input
export const projectCreateSchema = Joi.object({
    title: Joi.string().trim().required(),
    startDate: Joi.date().iso().max('now').required(),
    endDate: Joi.date().iso().max('now').min(Joi.ref("startDate")).allow(null).optional(),
    description: Joi.string().trim().required(),
    
    skillIds: Joi.array().items(Joi.number()).optional(),
});

/// Joi schema for validating route parameters related to projects
export const paramsSchemas = {
  userId: Joi.object({
    userId: Joi.number().integer().positive().required(),
  }),

  userProject: Joi.object({
    userId: Joi.number().integer().positive().required(),
    projectId: Joi.number().integer().positive().required(),
  }),
};