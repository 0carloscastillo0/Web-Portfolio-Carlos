import { Request, Response } from "express";
import educationService from "../services/education.service";
import { asyncHandler } from "../utils/asyncHanfler";

/// Controller for user-related operations
const educationController = {

    /*
    Method to create a new Education with error handling.
    Input: JSON body with education details.
    Output: Created education object or error message.
    */
    createEducation: asyncHandler( async (req: Request, res: Response) => {
        const userId = Number(req.params.userId);
        const education = await educationService.createEducation({...req.body, userId: userId});
        res.status(201).json(education);
    }),

    /* 
    Method to get all educations for a user by user ID.
    Input: User ID as a URL parameter.
    Output: Array of education objects for the specified user, or error message if user not found.
    */
    getAllEducationsByUserId: asyncHandler( async (req: Request, res: Response) => {
        const userId = Number(req.params.userId);
        const educations = await educationService.getAllEducationsByUserId(userId);
        res.status(200).json(educations);
    }),

};

export default educationController;