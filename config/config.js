const pass = "capitan1928374655";
const env = process.env.NODE_ENV || "development";
const port = process.env.PORT || 6969;
const dbUrl = `mongodb+srv://user1:${pass}@type-champ-jbbfu.mongodb.net/CAH?retryWrites=true`;
const authCookie = "x-auth-cookie";
const secret = "shano";

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
