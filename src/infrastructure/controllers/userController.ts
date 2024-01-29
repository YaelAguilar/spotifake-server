import { Request, Response } from 'express';
import { RegisterUser } from '../../application/useCases/registerUser';
import { LoginUser } from '../../application/useCases/loginUser';
import { MongooseUserRepository } from '../repository/mongooseUserRepository';

const userRepository = new MongooseUserRepository();
const registerUser = new RegisterUser(userRepository);
const loginUser = new LoginUser(userRepository);

export const userController = {
    async register(req: Request, res: Response) {
        try {
            const { username, email, password, confirmPassword } = req.body;
            await registerUser.execute(username, email, password, confirmPassword);
            res.status(201).send('User registered successfully');
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).send(error.message);
            }
            console.error(error);
            res.status(500).send('An unexpected error occurred');
        }
    },

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const token = await loginUser.execute(email, password);
            res.status(200).json({ token });
        } catch (error) {
            if (error instanceof Error) {
                return res.status(401).send(error.message);
            }
            console.error(error);
            res.status(500).send('An unexpected error occurred');
        }
    }
};
