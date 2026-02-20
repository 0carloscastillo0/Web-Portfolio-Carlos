import { Router } from "express";
import { prisma } from "../config/prisma";

const userRouter = Router();

// Create user
userRouter.post("/", async (req, res) => {
    try {
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
        
        // Here to validate information (important) 

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

        // here to validate information (important)
        
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

        // here to validate information (important)
        
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