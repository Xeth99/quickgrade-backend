import { Sequelize } from 'sequelize'
import * as dotenv from 'dotenv'
dotenv.config()

const sequelize = new Sequelize(process.env.DATABASE_URL as string, {
  database: 'postgres',
  dialectOptions: {
    ssl: {require: true, rejectUnauthorized: false }
  },
  logging: console.log
})

export default sequelize
