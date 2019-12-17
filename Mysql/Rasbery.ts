import { RasberyId } from './../proprieties/RasberyId';
import { Model, Column, Table, BelongsToMany, Scopes, CreatedAt, UpdatedAt, HasMany, ForeignKey, AllowNull, Unique, NotNull, Default, BelongsTo } from "sequelize-typescript";
import { User } from "./User";

@Scopes(() => ({
    Rasbery: {

    },
}))
@Table
export class Rasbery extends Model<Rasbery> {


    @AllowNull(false)
    @Default(RasberyId.getInstance().getId())
    @Column
    rasberyId!: string;

    @AllowNull(false)
    @Default(RasberyId.getInstance().getKey())
    @Column
    rasberyKey!: string;

    @CreatedAt
    @Column
    createdAt!: Date;

    @UpdatedAt
    @Column
    updatedAt!: Date;






}