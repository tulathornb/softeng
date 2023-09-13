const dotenv = require('dotenv');
const express = require('express');
const http = require('http');

dotenv.config();

const router = express();

const MONGO_URL = `mongodb+srv://ttm_db:uJU5daA7qCfpJv4O@cluster0.635b7oh.mongodb.net`;

const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 5000;

const config = {
    mongo: {
        url: MONGO_URL
    },
    server: {
        port: SERVER_PORT
    }
};

module.exports = {
    config
};
