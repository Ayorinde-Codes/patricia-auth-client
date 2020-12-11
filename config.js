require('dotenv').config();

let CONFIG = {}

CONFIG.CLIENT_DB_CONNECTION = process.env.CLIENT_DB_CONNECTION || '';
CONFIG.CLIENT_DB_HOST = process.env.CLIENT_DB_HOST || '';
CONFIG.CLIENT_DB_PORT = process.env.CLIENT_DB_PORT || '';
CONFIG.CLIENT_DB_DATABASE = process.env.CLIENT_DB_DATABASE || '';
CONFIG.CLIENT_DB_USERNAME = process.env.CLIENT_DB_USERNAME || '';
CONFIG.CLIENT_DB_PASSWORD = process.env.CLIENT_DB_PASSWORD || '';

module.exports = CONFIG;
