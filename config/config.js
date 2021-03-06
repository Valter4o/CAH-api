const pass = process.env.DBPASS;
const env = process.env.NODE_ENV || "development";
const port = process.env.PORT || 6969;
const dbUrl = `mongodb+srv://CAH-api:${pass}@type-champ-jbbfu.mongodb.net/CAH?retryWrites=true`;
const authCookie = "x-auth-cookie";
const secret = process.env.SECRET;

const config = {
  development: {
    port,
    dbUrl,
    authCookie,
    secret,
  },
  production: {
    port,
    dbUrl,
    authCookie,
    secret,
  },
};

module.exports = config[env];
