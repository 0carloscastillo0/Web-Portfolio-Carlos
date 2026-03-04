import { Request, Response } from "express";
import contactService from "../services/contact.service";
import { asyncHandler } from "../utils/asyncHanfler";
import { sendResponse } from "../utils/response";

/// Controller for contact-related operations
const contactController = {

    /*
    Method to create a new contact with error handling.
    Input: JSON body with contact details (name, icon, url).
    Output: Created contact object or error message.
    */
    createContact: asyncHandler( async (req: Request, res: Response) => {
        const userId = Number(req.params.userId);
        const contact = await contactService.createContact({...req.body, userId: userId});
        sendResponse(res, 201, "Contact created successfully", contact);
    }),

    /* 
    Method to get all contacts for a user by user ID.
    Input: User ID as a URL parameter.
    Output: Array of contact objects for the specified user, or error message if user not found.
    */
    getAllContactsByUserId: asyncHandler( async (req: Request, res: Response) => {
        const userId = Number(req.params.userId);
        const contacts = await contactService.getAllContactsByUserId(userId);
        sendResponse(res, 200, "Contacts retrieved successfully", contacts);
    }),

};

export default contactController;