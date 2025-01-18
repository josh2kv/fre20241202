import { AppDataSource } from "@/config/db";
import { User } from "./user.model";
import { CreateUserDto } from "./user.dto";
import bcrypt from "bcrypt";
import { ConflictError } from "@/shared/errors";

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
}
