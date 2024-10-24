const express=require('express');
const router=express.Router();
const mysql=require('mysql2');
require('dotenv').config();

const Data=mysql.createPool({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_DATABASE
}).promise()

module.exports=Data;

