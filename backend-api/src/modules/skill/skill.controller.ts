import { Request, Response } from "express";
import skillService from "./skill.service";
import { asyncHandler } from "../../utils/asyncHanfler";
import { sendResponse } from "../../utils/response";

/// Controller for user-related operations
const skillController = {

    /*
    Method to create a new Skill with error handling.
    Input: JSON body with skill details.
    Output: Created skill object or error message.
    */
    createSkill: asyncHandler( async (req: Request, res: Response) => {
        const userId = Number(req.params.userId);
        const skill = await skillService.createSkill({...req.body, userId: userId});
        sendResponse(res, 201, "Skill created successfully", skill);
    }),

/*
    Method to get all skills for a user by user ID.
    Input: User ID as a URL parameter.
    Output: Array of skill objects for the specified user, or error message if user not found.
    */
    getAllSkillsByUserId: asyncHandler( async (req: Request, res: Response) => {
        const userId = Number(req.params.userId);
        const skills = await skillService.getAllSkillsByUserId(userId);
        sendResponse(res, 200, "Skills retrieved successfully", skills);
    }),

    /*
    Method to update an existing skill for a specific user.
    Input: User ID and Skill ID as URL parameters, JSON body with skill details to update.
    Output: Updated skill object or error message if skill not found or does not belong to the user.
    */
    updateSkill: asyncHandler(async (req: Request, res: Response) => {
        const userId = Number(req.params.userId);
        const skillId = Number(req.params.skillId);
        const updatedSkill = await skillService.updateSkill(userId, skillId, req.body);
        sendResponse(res, 200, "Skill updated successfully", updatedSkill);
    }),

    /*
    Method to delete a skill for a specific user.
    Input: User ID and Skill ID as URL parameters.
    Output: Success message or error message if skill not found or does not belong to the user.
    */
    deleteSkill: asyncHandler(async (req: Request, res: Response) => {
        const userId = Number(req.params.userId);
        const skillId = Number(req.params.skillId);
        await skillService.deleteSkill(userId, skillId);
        sendResponse(res, 200, "Skill deleted successfully", null);
    }),

};

export default skillController;