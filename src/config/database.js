require('dotenv/config');

module.exports = {
  dialect: 'postgres',
  host: process.env.POSTGRES_HOST,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASS,
  database: process.env.POSTGRES_NAME,
  port: process.env.POSTGRES_PORT,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
