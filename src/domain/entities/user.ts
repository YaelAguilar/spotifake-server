import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

export class User {
    id: string;
    username: string;
    email: string;
    password: string;

    constructor(username: string, email: string, password: string) {
        this.id = uuidv4();
        this.username = username;
        this.email = email;
        this.password = password;
    }

    validatePassword(plainTextPassword: string): boolean {
        return bcrypt.compareSync(plainTextPassword, this.password);
    }
}
