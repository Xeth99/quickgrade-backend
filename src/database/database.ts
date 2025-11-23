import { Sequelize } from 'sequelize'

const sequelize = new Sequelize("postgresql://postgres:Emmanuel&99@db.mkwbzprbtczhuzbtoqfs.supabase.co:5432/postgres", {
  database: 'postgres',
  dialectOptions: {
    ssl: { rejectUnauthorized: false }
  },
  logging: false
})

export default sequelize
