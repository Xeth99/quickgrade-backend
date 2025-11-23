import sequelize from './lib/database/database'; 

async function test() {
  try {
    await sequelize.authenticate();
    console.log('✅ Connected to Supabase PostgreSQL!');
  } catch (err) {
    console.error('❌ Connection failed:', err);
  }
}

test();
