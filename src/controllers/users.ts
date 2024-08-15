import express from "express";

import {getUsers, deleteUserById, getUserById} from "../db/users";

export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try {
        const users = await getUsers();

        return res.status(200).json(users).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const deleteUser = async (req: express.Request, res: express.Response) => {
    try {
        const {id} = req.params;

        const deletedUser = await deleteUserById(id)

        return res.json(deletedUser).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const updateUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const { name, phone, sector, role } = req.body;

        if (!name && !phone && !sector && !role) {
            return res.sendStatus(400);
        }

        const user = await getUserById(id);

        if (name) user.name = name;
        if (phone) user.phone = phone;
        if (sector) user.sector = sector;
        if (role) user.role = role;

        await user.save();

        return res.status(200).json(user).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};