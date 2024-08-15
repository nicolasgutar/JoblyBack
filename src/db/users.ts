import mongoose from 'mongoose';
import {Int32} from "mongodb";

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    sector: { type: String, required: true },
    role: { type: Number, required: false },
    authentication: {
        salt: { type: String, required: true },
        password: { type: String, required: true },
        sessionToken: { type: String, required: true }
    }
});


export const UserModel = mongoose.model('User', UserSchema);

export const getUserByEmail = (email: string) => UserModel.findOne({ email });
export const getUserById = (id: string) => UserModel.findById(id);
export const createUser = (values: Record<string, any>) => new UserModel(values).save().then((user) => user.toObject());
export const deleteUserById = (id: string) => UserModel.findOneAndDelete({ _id: id });
export const getUsers = () => UserModel.find();
export const getUserBySessionToken = (sessionToken: string) => UserModel.findOne({ 'authentication.sessionToken': sessionToken });