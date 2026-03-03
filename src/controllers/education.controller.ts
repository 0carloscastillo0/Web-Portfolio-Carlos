import { Request, Response } from "express";
import educationService from "../services/education.service";
import { asyncHandler } from "../utils/asyncHanfler";
import { sendResponse } from "../utils/response";

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
        sendResponse(res, 201, "Education created successfully", education);
    }),

    /* 
    Method to get all educations for a user by user ID.
    Input: User ID as a URL parameter.
    Output: Array of education objects for the specified user, or error message if user not found.
    */
    getAllEducationsByUserId: asyncHandler( async (req: Request, res: Response) => {
        const userId = Number(req.params.userId);
        const educations = await educationService.getAllEducationsByUserId(userId);
        sendResponse(res, 200, "Educations retrieved successfully", educations);
    }),

};

export default educationController;