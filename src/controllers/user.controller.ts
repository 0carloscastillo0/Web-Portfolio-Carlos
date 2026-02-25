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
};

export default userController;