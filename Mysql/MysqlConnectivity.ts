import { Notification } from './Notification';
import { RasberySql } from './RasberySQL';
// for connecting to databases in mysql workbunch
export { };
import { Sequelize } from 'sequelize-typescript';
import { User } from './User';
import { UserInfo } from './UserInfo';
export const sequelize = new Sequelize({
    database: 'Iot',
    // dialect: 'sqlite',
    username: 'Iot',
    password: 'Iot',
    //storage: ':memory:',
    dialect: "mysql",
    host: 'localhost',
    //logging: false,
    //timestamps: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    models: [User, UserInfo, RasberySql, Notification],
});