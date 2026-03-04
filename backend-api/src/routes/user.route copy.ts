// Don't touch, phantom file for reference, the real file is user.route.ts
/*************/
/*************/
/*************/
/*************/
/*************/
/*************/
/*
import { Router } from "express";
import { prisma } from "../config/prisma";
import { userCreateSchema } from "../schemas/user.schema";

const userRouter = Router();

// Create user
userRouter.post("/", async (req, res) => {
    try {
        
        // validate information
        const { error, value } = userCreateSchema.validate(req.body);

        if (error) {
            return void res.status(400).json({ message: error.details[0].message });
        }
        
        const { 
            name, 
            lastname, 
            email,
            title,
            city,
            country,
            description,
            urlCV, 
        } = value;

        // Check if email already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return void res.status(409).json({ message: "Email already registered" });
        }

        // create user
        const newUser = await prisma.user.create({
            data: {
                name,
                lastname,
                email,
                title,
                city,
                country,
                urlCV,
                description,
            },
        });
        res.status(201).json(newUser);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
});

// Get user by id
userRouter.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        // find user by id
        const user = await prisma.user.findUnique({
            where: { id: Number(id) },
        });
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
});

// Edit user by id
userRouter.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { 
            name, 
            lastname, 
            email,
            title,
            city,
            country,
            description,
            urlCV, 
        } = req.body;
        
        // here to validate information (important)

        // Check if email already exists (excluding current user)
        const existingUser = await prisma.user.findFirst({
            where: {
                email,
                NOT: { id: Number(id) }
            },
        });

        if (existingUser) {
            return void res.status(409).json({ message: "Email already registered" });
        }

        // update user by id
        const updatedUser = await prisma.user.update({
            where: { id: Number(id) },
            data: {
                name,
                lastname,
                email,
                title,
                city,
                country,
                urlCV,
                description,
            },
        });
        res.json(updatedUser);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});

    }
});

// Delete user by id
userRouter.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        
        // delete user by id
        await prisma.user.delete({
            where: { id: Number(id) },
        });
        res.status(204).send();
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
});

export default userRouter;

*/