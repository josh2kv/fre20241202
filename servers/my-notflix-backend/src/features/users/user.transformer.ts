import { User } from "./user.model";
import { BriefUser } from "./user.dto";

export class UserTransformer {
  static toBriefUser(user: User): BriefUser {
    return {
      id: user._id.toString(),
      username: user.username,
      email: user.email,
      role: user.role,
      tmdbApiKey: user.tmdbApiKey,
    };
  }

  static toResponse(user: User) {
    const { password, ...userWithoutPassword } = user;
    return {
      ...userWithoutPassword,
      id: user._id.toString(),
    };
  }
}
