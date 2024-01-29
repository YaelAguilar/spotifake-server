import { UserRepository } from '../../domain/repositories/userRepository';
import { User } from '../../domain/entities/user';
import UserModel from '../models/userModel';

export class MongooseUserRepository implements UserRepository {
    async findByEmail(email: string): Promise<User | null> {
        const userDoc = await UserModel.findOne({ email });
        if (!userDoc) return null;
        
        const { username, email: userEmail, password } = userDoc;
        if (typeof username !== 'string' || typeof userEmail !== 'string' || typeof password !== 'string') {
            throw new Error('One or more required fields are missing or not a string');
        }
        
        return new User(username, userEmail, password);
    }

    async findById(id: string): Promise<User | null> {
        const userDoc = await UserModel.findById(id);
        if (!userDoc) return null;
        
        const { username, email, password } = userDoc;
        if (typeof username !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
            throw new Error('One or more required fields are missing or not a string');
        }
        
        return new User(username, email, password);
    }

    async save(user: User): Promise<void> {
        const newUser = new UserModel(user);
        await newUser.save();
    }
}
