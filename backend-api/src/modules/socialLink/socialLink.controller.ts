import { Request, Response } from "express";
import socialLinkService from "./socialLink.service";
import { asyncHandler } from "../../utils/asyncHanfler";
import { sendResponse } from "../../utils/response";

/// Controller for socialLink-related operations
const socialLinkController = {

    /*
    Method to create a new social link with error handling.
    Input: JSON body with social link details (name, icon, url).
    Output: Created social link object or error message.
    */
    createSocialLink: asyncHandler( async (req: Request, res: Response) => {
        const userId = Number(req.params.userId);
        const socialLink = await socialLinkService.createSocialLink({...req.body, userId: userId});
        sendResponse(res, 201, "Social link created successfully", socialLink);
    }),

/*
    Method to get all social links for a user by user ID.
    Input: User ID as a URL parameter.
    Output: Array of social link objects for the specified user, or error message if user not found.
    */
    getAllSocialLinksByUserId: asyncHandler( async (req: Request, res: Response) => {
        const userId = Number(req.params.userId);
        const socialLinks = await socialLinkService.getAllSocialLinksByUserId(userId);
        sendResponse(res, 200, "Social links retrieved successfully", socialLinks);
    }),

    /*
    Method to update an existing social link for a specific user.
    Input: User ID and Social Link ID as URL parameters, JSON body with social link details to update.
    Output: Updated social link object or error message if social link not found or does not belong to the user.
    */
    updateSocialLink: asyncHandler(async (req: Request, res: Response) => {
        const userId = Number(req.params.userId);
        const socialLinkId = Number(req.params.socialLinkId);
        const updatedSocialLink = await socialLinkService.updateSocialLink(userId, socialLinkId, req.body);
        sendResponse(res, 200, "Social link updated successfully", updatedSocialLink);
    }),

    /*
    Method to delete a social link for a specific user.
    Input: User ID and Social Link ID as URL parameters.
    Output: Success message or error message if social link not found or does not belong to the user.
    */
    deleteSocialLink: asyncHandler(async (req: Request, res: Response) => {
        const userId = Number(req.params.userId);
        const socialLinkId = Number(req.params.socialLinkId);
        await socialLinkService.deleteSocialLink(userId, socialLinkId);
        sendResponse(res, 200, "Social link deleted successfully", null);
    }),

};

export default socialLinkController;