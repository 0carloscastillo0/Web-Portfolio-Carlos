import { Request, Response } from "express";
import userService from "../services/user.service";


const userController = {
    createUser: async (req: Request, res: Response) => {
        try {
            const user = await userService.createUser(req.body);
            res.status(201).json(user);

        } catch (error: any) {

            if (error.message === "EMAIL_ALREADY_EXISTS") {
                return res.status(409).json({ message: "Email already registered" });
            }

            res.status(500).json({ message: "Internal server error" });
        }
    },
        
};

export default userController;