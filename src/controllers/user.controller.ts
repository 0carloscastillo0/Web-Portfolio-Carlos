import { Request, Response } from "express";
import userService from "../services/user.service";
import { asyncHandler } from "../utils/asyncHanfler";

/// Controller for user-related operations
const userController = {

    /*
    Method to create a new user with error handling.
    Input: JSON body with user details (name, email, password).
    Output: Created user object or error message.
    */
    createUser: asyncHandler( async (req: Request, res: Response) => {
        const user = await userService.createUser(req.body);
        res.status(201).json(user);
    }),

    /*
    Method to get a user by ID.
    Input: User ID as a URL parameter.
    Output: User object if found, or error message if not found.
    */
    getUserById: asyncHandler( async (req: Request, res: Response) => {
        const id = Number(req.params.id);
        const user = await userService.getUserById(id);
        res.status(200).json(user);
    }),

    /* 
    Method to upload a photo for a user.
    Input: User ID as a URL parameter and an image file in the request body (multipart/form-data).
    Output: Updated user object with the new photo URL or an error message if the upload fails.
    */
    uploadUserPhoto: asyncHandler( async (req: Request, res: Response) => {
        const id = Number(req.params.id);
        const updatedUser = await userService.uploadUserPhoto(id, req.file);
        res.status(200).json(updatedUser);  
    }),

    /* 
    Method to upload a CV for a user.
    Input: User ID as a URL parameter and a PDF file in the request body (multipart/form-data).
    Output: Updated user object with the new CV URL or an error message if the upload fails.
     */
    uploadUserCV: asyncHandler( async (req: Request, res: Response) => {
        const id = Number(req.params.id);
        const updatedUser = await userService.uploadUserCV(id, req.file);
        res.status(200).json(updatedUser);  
    }),
    
};

export default userController;