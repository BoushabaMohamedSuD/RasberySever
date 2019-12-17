import { RasberyId } from '../proprieties/RasberyId';
import { Model, Column, Table, BelongsToMany, Scopes, CreatedAt, UpdatedAt, HasMany, ForeignKey, AllowNull, Unique, NotNull, Default, BelongsTo } from "sequelize-typescript";
import { User } from "./User";

@Scopes(() => ({
    Rasbery: {

    },
}))
@Table
export class RasberySql extends Model<RasberySql> {


    @AllowNull(false)
    @Default(RasberyId.getInstance().getId())
    @Column
    rasberyId!: string;

    @AllowNull(false)
    @Default(RasberyId.getInstance().getKey())
    @Column
    rasberyKey!: string;

    @AllowNull(false)
    @Default(false)
    @Column
    isBlocked!: boolean;

    @CreatedAt
    @Column
    createdAt!: Date;

    @UpdatedAt
    @Column
    updatedAt!: Date;


    @HasMany(() => User, 'RasberyId')
    users?: User[];






}