import { User } from './User';
import { RasberySql } from './RasberySQL';
import { Model, Column, Table, BelongsToMany, Scopes, CreatedAt, UpdatedAt, HasMany, ForeignKey, AllowNull, Unique, NotNull, Default, HasOne, BelongsTo } from "sequelize-typescript";

@Scopes(() => ({
    notification: {

    },
}))
@Table
export class Notification extends Model<Notification> {


    @AllowNull(false)
    @Unique
    @Column
    message!: string;




    @CreatedAt
    @Column
    createdAt!: Date;

    @UpdatedAt
    @Column
    updatedAt!: Date;


    @ForeignKey(() => User)
    userId!: number;

    @BelongsTo(() => User)
    UserId?: User;




}