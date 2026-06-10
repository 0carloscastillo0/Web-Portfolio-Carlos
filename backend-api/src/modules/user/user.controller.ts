import { Request, Response } from "express";
import userService from "./user.service";
import { asyncHandler } from "../../utils/asyncHanfler";
import { sendResponse } from "../../utils/response";

/// Controller for user-related operations
const userController = {

    /*
    Method to get a user by ID.
    Input: User ID as a URL parameter.
    Output: User object if found, or error message if not found.
    */
    getUserById: asyncHandler( async (req: Request, res: Response) => {
        const id = Number(req.params.id);
        const user = await userService.getUserById(id);
        sendResponse(res, 200, "User retrieved successfully", user);
    }),

    /* 
    Method to upload a photo for a user.
    Input: User ID as a URL parameter and an image file in the request body (multipart/form-data).
    Output: Updated user object with the new photo URL or an error message if the upload fails.
    */
    uploadUserPhoto: asyncHandler( async (req: Request, res: Response) => {
        const id = Number(req.params.id);
        const updatedUser = await userService.uploadUserPhoto(id, req.file);
        sendResponse(res, 201, "User photo uploaded successfully", updatedUser);  
    }),

    /* 
    Method to upload a CV for a user.
    Input: User ID as a URL parameter and a PDF file in the request body (multipart/form-data).
    Output: Updated user object with the new CV URL or an error message if the upload fails.
     */
    uploadUserCV: asyncHandler( async (req: Request, res: Response) => {
        const id = Number(req.params.id);
        const updatedUser = await userService.uploadUserCV(id, req.file);
        sendResponse(res, 201, "User CV uploaded successfully", updatedUser);  
    }),

    /*
    Method to update an existing user (excludes urlCV and urlPhoto).
    Input: User ID as a URL parameter and JSON body with user details to update.
    Output: Updated user object or error message if user not found.
    */
    updateUser: asyncHandler( async (req: Request, res: Response) => {
        const id = Number(req.params.id);
        const updatedUser = await userService.updateUser(id, req.body);
        sendResponse(res, 200, "User updated successfully", updatedUser);
    }),
    
};

export default userController;