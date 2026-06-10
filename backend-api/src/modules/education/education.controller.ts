import { Request, Response } from "express";
import educationService from "./education.service";
import { asyncHandler } from "../../utils/asyncHanfler";
import { sendResponse } from "../../utils/response";

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

    /*
    Method to update an existing education for a specific user.
    Input: User ID and Education ID as URL parameters, JSON body with education details to update.
    Output: Updated education object or error message if education not found or does not belong to the user.
    */
    updateEducation: asyncHandler(async (req: Request, res: Response) => {
        const userId = Number(req.params.userId);
        const educationId = Number(req.params.educationId);
        const updatedEducation = await educationService.updateEducation(userId, educationId, req.body);
        sendResponse(res, 200, "Education updated successfully", updatedEducation);
    }),

    /*
    Method to delete an education for a specific user.
    Input: User ID and Education ID as URL parameters.
    Output: Success message or error message if education not found or does not belong to the user.
    */
    deleteEducation: asyncHandler(async (req: Request, res: Response) => {
        const userId = Number(req.params.userId);
        const educationId = Number(req.params.educationId);
        await educationService.deleteEducation(userId, educationId);
        sendResponse(res, 200, "Education deleted successfully", null);
    }),

};

export default educationController;