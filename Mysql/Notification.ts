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
    @Column
    sendername!: string;

    @AllowNull(false)
    @Column
    message!: string;


    @CreatedAt
    @Column
    createdAt!: Date;

    @UpdatedAt
    @Column
    updatedAt!: Date;






}