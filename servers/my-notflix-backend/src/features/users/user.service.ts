import { AppDataSource } from "@/config/db";
import { User } from "./user.model";
import { CreateUserDto, UpdateUserDto } from "./user.dto";
import bcrypt from "bcrypt";
import { ConflictError, NotFoundError } from "@/shared/errors";
import { ObjectId } from "mongodb";

export class UserService {
  private userRepository = AppDataSource.getRepository(User);

  async createUser({ password, ...rest }: CreateUserDto): Promise<User> {
    const found = await this.userRepository.findOne({
      where: {
        email: rest.email,
      },
    });
    if (found) throw new ConflictError(`Email [${rest.email}] already exists`);

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({
      ...rest,
      password: hashedPassword,
    });

    return this.userRepository.save(user);
  }

  // TODO: Check if creator is admin
  // TODO: Check if creator is updating himself
  async updateUser(
    id: string,
    { password, ...rest }: UpdateUserDto
  ): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { _id: new ObjectId(id) },
    });
    if (!user) throw new NotFoundError(`User ${id} not found`);
    Object.assign(user, rest);

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    return this.userRepository.save(user);
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findUserById(id: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { _id: new ObjectId(id) } });
  }
}
