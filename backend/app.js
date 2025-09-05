import express from "express";
import morgan from 'morgan';
import connect from "./db/db.js";
import userRoute from "./routes/userRoute.js"
import projectRoute from "./routes/projectRoute.js";
import cookieParser from 'cookie-parser';
import genAiRoute from "./routes/genAiRoute.js"
import cors from 'cors';
connect();


const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/users', userRoute);
app.use('/projects', projectRoute);
app.use("/ai",genAiRoute )



app.get('/', (req, res) => {
    res.send('Hello World!');
});

export default app; 