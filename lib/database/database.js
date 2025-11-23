"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize("postgresql://postgres:Emmanuel&99@db.mkwbzprbtczhuzbtoqfs.supabase.co:5432/postgres", {
    // host: "db.mkwbzprbtczhuzbtoqfs.supabase.co",
    // port: 5432,
    database: 'postgres',
    dialectOptions: {
        ssl: { rejectUnauthorized: false }
    }
});
exports.default = sequelize;
// import postgres from 'postgres'
// const connectionString = process.env.DATABASE_URL
// const sql = postgres(connectionString as string)
// export default sql
