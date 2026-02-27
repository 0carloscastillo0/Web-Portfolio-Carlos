import { Request, Response } from "express";
import skillService from "../services/skill.service";
import { asyncHandler } from "../utils/asyncHanfler";

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
        res.status(201).json(skill);
    }),

    /* 
    Method to get all skills for a user by user ID.
    Input: User ID as a URL parameter.
    Output: Array of skill objects for the specified user, or error message if user not found.
    */
    getAllSkillsByUserId: asyncHandler( async (req: Request, res: Response) => {
        const userId = Number(req.params.userId);
        const skills = await skillService.getAllSkillsByUserId(userId);
        res.status(200).json(skills);
    }),

};

export default skillController;