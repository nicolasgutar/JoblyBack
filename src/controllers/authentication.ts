import express from "express";
import { createUser, getUserByEmail } from "../db/users";
import { random, authentication } from "../helpers";


export const login = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            console.log("incomplete info");
            return res.sendStatus(400);
        }

        const user = await getUserByEmail(email).select('+authentication.salt +authentication.password');

        if (!user) {
            return res.sendStatus(400);
        }

        const expectedHash = authentication(user.authentication.salt, password);

        if (expectedHash !== user.authentication.password) {
            return res.sendStatus(403);
        }
        const salt = random();
        user.authentication.sessionToken = authentication(salt, user._id.toString());

        await user.save();

        res.cookie('JOBLY-AUTH', user.authentication.sessionToken, { domain: 'localhost', path: '/' });

        return res.status(200).json(user).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const register = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password, name, phone, sector, role } = req.body;
        if (!email || !password || !name) {
            console.log("incomplete info");
            return res.sendStatus(400);
        }

        const existingUser = await getUserByEmail(email);

        if (existingUser) {
            console.log('User already exists');
            return res.sendStatus(409);
        }

        const salt = random();
        const sessionToken = authentication(salt, email); // Generate session token
        const user = await createUser({
            email,
            name,
            phone,
            sector,
            role,
            authentication: {
                salt,
                password: authentication(salt, password),
                sessionToken // Include session token
            }
        });

        return res.status(201).json(user).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};