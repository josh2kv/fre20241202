import { Column, CreateDateColumn, Entity, ObjectIdColumn } from "typeorm";

@Entity("refresh_token")
export class RefreshToken {
  @ObjectIdColumn()
  _id: string;

  @Column({
    nullable: false,
  })
  userId: string;

  @Column({
    nullable: false,
  })
  token: string;

  @Column({
    nullable: false,
  })
  expiresAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @Column({
    default: false,
  })
  isRevoked: boolean;
}
