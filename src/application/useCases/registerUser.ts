import { UserRepository } from '../../domain/repositories/userRepository';
import { User } from '../../domain/entities/user';
import bcrypt from 'bcrypt';

export class RegisterUser {
    constructor(private userRepository: UserRepository) {}

    async execute(username: string, email: string, password: string, confirmPassword: string): Promise<void> {
        if (password !== confirmPassword) {
            throw new Error('Passwords do not match');
        }

        const existingUser = await this.userRepository.findByEmail(email);
        if (existingUser) {
            throw new Error('Email already in use');
        }

        const hashedPassword = bcrypt.hashSync(password, 10);
        const user = new User(username, email, hashedPassword);
        await this.userRepository.save(user);
    }
}
