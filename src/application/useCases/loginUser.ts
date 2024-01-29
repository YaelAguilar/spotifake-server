import { UserRepository } from '../../domain/repositories/userRepository';
import jwt from 'jsonwebtoken';
import { User } from '../../domain/entities/user';

export class LoginUser {
    constructor(private userRepository: UserRepository) {}

    async execute(email: string, password: string): Promise<string> {
        const user = await this.userRepository.findByEmail(email);
        if (!user || !user.validatePassword(password)) {
            throw new Error('Invalid credentials');
        }

        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            throw new Error('JWT_SECRET is not defined');
        }

        const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: '1h' });
        return token;
    }
}
