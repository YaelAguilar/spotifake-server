// src/application/useCases/RegisterUser.ts
import { UserRepository } from '../../domain/repositories/userRepository';
import { User } from '../../domain/entities/user';
import bcrypt from 'bcrypt';

export class RegisterUser {
    constructor(private userRepository: UserRepository) {}

    async execute(username: string, email: string, password: string): Promise<void> {
        // Comprobar que ninguno de los campos esté vacío
        if (!username || !email || !password) {
            throw new Error('All fields must be filled');
        }

        // Comprobar si el usuario ya existe
        const existingUser = await this.userRepository.findByEmail(email);
        if (existingUser) {
            throw new Error('Email already in use');
        }

        // Hashear la contraseña antes de guardarla en la base de datos
        const hashedPassword = bcrypt.hashSync(password, 10);
        const user = new User(username, email, hashedPassword);
        await this.userRepository.save(user);
    }
}
