import bodyParser from 'body-parser';
import cors from 'cors'
import express from 'express';
import dotenv from "dotenv"
import session from 'express-session';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import {login, signup} from './middleware/login.js';

dotenv.config();
mongoose.connect(process.env.MONGO_URI);

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false, limit: 100000, parameterLimit: 20}))
app.use(session({secret: process.env.SECRET_KEY, resave: false, saveUninitialized: true,}));
app.use(cors());

app.route('/').get((req, res) =>{
    res.send("Welcome");
});

app.post("/login", login);
app.post("/signup", signup)


app.listen(process.env.PORT);