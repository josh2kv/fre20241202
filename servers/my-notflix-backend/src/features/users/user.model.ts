import { Plan, UserRole } from "@/types";
import { ObjectId } from "mongodb";
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ObjectIdColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("user")
export class User {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column({ nullable: false })
  username: string;

  @Column({ nullable: false })
  @Index({ unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({
    nullable: false,
    type: "enum",
    enum: Plan,
    default: Plan.STANDARD_WITH_ADS,
  })
  plan: Plan;

  @Column({ nullable: false })
  tmdbApiKey: string;

  @Column({
    nullable: false,
    type: "enum",
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
